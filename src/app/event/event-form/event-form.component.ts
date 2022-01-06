import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, pairwise, take } from 'rxjs/operators';
import { DataService } from '../../../shared/data.service';
import { ActionTypes, Event, EventMember } from '../../../models/Event';
import { setLocalEvents } from '../../../shared/local-storage.service';
import {
  duplicateMembersValidator,
  organizerInMembersValidation,
} from '../../../utils/FormValidators';
import * as moment from 'moment';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { EventActionCreator } from '../../../shared/event-action-creator';

@Component({
  selector: 'event-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {
  isEdit!: boolean;
  eventId!: string;
  event!: Event;
  eventForm!: FormGroup;
  hasRePayedDebts: boolean = false;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private eventActionCreator: EventActionCreator,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        date: new FormControl(new Date()),
        organizer: ['', Validators.required],
        members: this.formBuilder.array([]),
      },
      {
        validators: [
          organizerInMembersValidation(),
          duplicateMembersValidator(),
        ],
      }
    );

    this.isEdit = this.route.snapshot.data['isEdit'];
    this.eventId = this.route.snapshot.paramMap.get('id') ?? '';

    if (this.isEdit && this.eventId) {
      this.loading$.next(true);

      forkJoin({
        event: this.dataService.getEventById(this.eventId).pipe(take(1)),
        rePayedDebts: this.dataService
          .getRePayedDebts(this.eventId)
          .pipe(take(1)),
      }).subscribe((x) => {
        this.event = x.event;
        this.fillFormFromEvent();
        this.subscribeMembersChanges();

        this.hasRePayedDebts = x.rePayedDebts?.length > 0;
        if (this.hasRePayedDebts) {
          this.eventForm.disable();
          this.members.controls.forEach((control) => {
            control.disable();
          });
        }

        this.loading$.next(false);
      });
    } else {
      this.subscribeMembersChanges();
    }
  }

  get members(): FormArray {
    return this.eventForm.get('members') as FormArray;
  }

  fillFormFromEvent() {
    const { name, date, organizer, members } = this.event;

    this.eventForm.patchValue({
      name,
      organizer,
      date: new Date(date),
    });

    this.fillFormArray(
      members
        .filter((x) => x !== organizer)
        .map((name) => this.formBuilder.group({ name })) || []
    );
  }

  fillFormArray(config: any) {
    this.eventForm.setControl('members', this.formBuilder.array(config || []));
  }

  subscribeMembersChanges() {
    this.members?.valueChanges
      .pipe(debounceTime(100), pairwise())
      .subscribe(([prev, curr]: [EventMember[], EventMember[]]) => {
        if (
          prev[prev.length - 1].name === '' &&
          curr[curr.length - 1].name !== ''
        ) {
          this.addMember();
        }

        this.removeEmptyMembers(curr);
      });

    this.addMember();
  }

  removeEmptyMembers(members: EventMember[]) {
    members
      .map(({ name }, i) => (name === '' && i != members.length - 1 ? i : null))
      .forEach((n) => {
        if (n !== null) {
          this.members.removeAt(n);
        }
      });
  }

  addMember() {
    const newMember = this.formBuilder.group({ name: '' });
    this.members.push(newMember);
  }

  async onSubmit() {
    if (this.eventForm.valid) {
      this.loading$.next(true);

      let { name, date, organizer, members } = this.eventForm.value;

      const event: Event = {
        id: '',
        name,
        organizer,
        date: moment.utc(date).valueOf(),
        members: [
          organizer,
          ...this.members?.value
            .filter((n: EventMember) => n.name !== '')
            .map((x: EventMember) => x.name),
        ],
      };

      if (this.isEdit && this.eventId) {
        event.id = this.eventId;

        await this.dataService.updateEvent(event).then(async (res: any) => {
          await this.onChange(this.eventId, event.organizer);
        });
      } else {
        await this.dataService.addEvent(event).then(async (res: any) => {
          const id = res._key.path.segments[1];

          [
            {
              type: ActionTypes.CreateEvent,
              manager: organizer,
              date: moment().utc().valueOf(),
            },
            {
              type: ActionTypes.AddMembersToEvent,
              manager: organizer,
              eventMembersCount: members.length,
              date: moment().utc().valueOf(),
            },
          ].forEach((action) => this.dataService.addEventAction(id, action));

          await this.onChange(id, event.organizer);
        });
      }
    }
  }

  async onChange(id: string, organizer: string) {
    setLocalEvents(id, organizer);
    this.loading$.next(false);
    await this.router.navigate(['events', id], { state: { isCreated: true } });
  }
}
