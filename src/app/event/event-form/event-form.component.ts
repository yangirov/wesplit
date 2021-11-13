import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, pairwise } from 'rxjs/operators';
import { DataService } from '../../../shared/data.service';
import {
  ActionTypes,
  Event,
  EventAction,
  EventMember,
  Purchase,
  RePayedDebt,
} from '../../../models/Event';
import { setLocalEvents } from '../../../shared/localStorage.service';
import {
  duplicateMembersValidator,
  organizerInMembersValidation,
} from '../../../utils/FormValidators';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'event-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {
  isEdit!: boolean;
  eventId!: string;

  eventForm!: FormGroup;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        date: new FormControl(new Date()),
        organizer: ['', Validators.required],
        members: this.formBuilder.array([], duplicateMembersValidator()),
      },
      {
        validators: [organizerInMembersValidation()],
      }
    );

    this.isEdit = this.route.snapshot.data['isEdit'];
    this.eventId = this.route.snapshot.paramMap.get('id') ?? '';

    if (this.isEdit && this.eventId) {
      this.loading$.next(true);

      this.dataService.getEventById(this.eventId).subscribe((event) => {
        if (event) {
          this.fillForm(event);
          this.subscribeMembersChanges();
          this.loading$.next(false);
        }
      });
    } else {
      this.subscribeMembersChanges();
    }
  }

  fillForm(event: Event) {
    const { name, date, organizer, members } = event;

    this.eventForm.patchValue({
      name,
      date: new Date(date),
      organizer,
    });

    this.eventForm.setControl(
      'members',
      this.formBuilder.array(
        members
          .filter((x) => x !== organizer)
          .map((name) => this.formBuilder.group({ name })) || [],
        duplicateMembersValidator()
      )
    );
  }

  subscribeMembersChanges() {
    this.members()
      ?.valueChanges.pipe(debounceTime(100), pairwise())
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

  title() {
    return this.isEdit && this.eventId
      ? 'Редактирование события'
      : 'Новое событие';
  }

  removeEmptyMembers(members: EventMember[]) {
    members
      .map(({ name }, i) => (name === '' && i != members.length - 1 ? i : null))
      .forEach((n) => {
        if (n !== null) {
          this.members().removeAt(n);
        }
      });
  }

  members(): FormArray {
    return this.eventForm.get('members') as FormArray;
  }

  addMember() {
    const newMember = this.formBuilder.group({ name: '' });
    this.members().push(newMember);
  }

  async onSubmit() {
    if (this.eventForm.valid) {
      this.loading$.next(true);

      let { name, date, organizer } = this.eventForm.value;

      const event: Event = {
        id: '',
        name,
        organizer,
        date: moment.utc(date).valueOf(),
        purchases: [],
        rePayedDebts: [],
        members: [
          organizer,
          ...this.members()
            ?.value.filter((n: EventMember) => n.name !== '')
            .map((x: EventMember) => x.name),
        ],
      };

      const purchases: Purchase[] = [
        {
          id: '3',
          title: 'Пиво',
          payer: 'Эмиль',
          sum: 1000,
          members: ['Эмиль', 'Диана', 'Глеб', 'Даша', 'Дима'],
        },
        {
          id: '3',
          title: 'Бургеры',
          payer: 'Диана',
          sum: 1000,
          members: ['Эмиль', 'Диана', 'Глеб', 'Даша', 'Дима'],
        },
        {
          id: '3',
          title: 'Аренда дома',
          payer: 'Глеб',
          sum: 5000,
          members: ['Эмиль', 'Диана', 'Глеб', 'Даша', 'Дима'],
        },
      ];

      const rePayedDebts: RePayedDebt[] = [
        { name: 'Эмиль', sum: 1000 },
        { name: 'Дима', sum: 500 },
        { name: 'Даша', sum: 750 },
        { name: 'Даша', sum: 750 },
      ];

      const actions: EventAction[] = [
        {
          type: ActionTypes.AddPurchase,
          currentUser: 'Эмиль',
          date: 1636389685329,
          purchaseName: 'Пиво',
          sum: 1000,
        },
        {
          type: ActionTypes.AddParticipantsToPurchase,
          currentUser: 'Эмиль',
          date: 1636389685330,
          purchaseName: 'Пиво',
          eventMembersCount: 4,
        },
        {
          type: ActionTypes.AddPurchase,
          currentUser: 'Диана',
          date: 1636389705277,
          purchaseName: 'Аренда боулинга',
          sum: 2000,
        },
        {
          type: ActionTypes.AddParticipantsToPurchase,
          currentUser: 'Эмиль',
          date: 1636389705278,
          purchaseName: 'Аренда боулинга',
          eventMembersCount: 4,
        },
        {
          type: ActionTypes.GiveBack,
          currentUser: 'Эмиль',
          date: 1636389738105,
          debtSum: 250,
          payerName: 'Даша',
        },
        {
          type: ActionTypes.GiveBack,
          currentUser: 'Даша',
          date: 1636399418983,
          debtSum: 500,
          payerName: 'Диана',
        },
      ];

      event.purchases = purchases;
      event.rePayedDebts = rePayedDebts;
      event.actions = actions;

      await this.dataService.saveEvent(event).then((res: any) => {
        const id = res._key.path.segments[1];
        setLocalEvents(id, event.organizer);
        this.loading$.next(false);
        this.router.navigate([`/events/${id}`]);
      });
    }
  }
}
