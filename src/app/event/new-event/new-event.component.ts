import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, pairwise } from 'rxjs/operators';
import { DataService } from '../../../shared/data.service';
import { Event, EventMember } from '../../../models/Event';
import { setLocalEvents } from '../../../shared/localStorage.service';
import {
  duplicateMembersValidator,
  organizerInMembersValidation,
} from '../../../utils/FormValidators';

@Component({
  selector: 'app-new-event',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss'],
})
export class NewEventComponent implements OnInit {
  public eventForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group(
      {
        name: '',
        date: new FormControl(new Date()),
        organizer: '',
        members: this.formBuilder.array([], duplicateMembersValidator()),
      },
      {
        validators: [organizerInMembersValidation()],
      }
    );

    this.members()
      ?.valueChanges.pipe(debounceTime(200), pairwise())
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

  async saveEvent() {
    if (this.eventForm.valid) {
      let { name, date, organizer } = this.eventForm.value;

      const event: Event = {
        id: '',
        name,
        organizer,
        date: date.toString(),
        purchases: [],
        rePayedDebts: [],
        members: [
          organizer,
          ...this.members()
            ?.value.filter((n: EventMember) => n.name !== '')
            .map((x: EventMember) => x.name),
        ],
      };

      await this.dataService.saveEvent(event).then((res: any) => {
        const id = res._key.path.segments[1];
        setLocalEvents(id, event.organizer);
        this.router.navigate([`/events/${id}`]);
      });
    }
  }
}
