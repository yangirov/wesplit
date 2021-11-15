import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../shared/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {
  Event,
  LocalEvent,
  Purchase,
  PurchaseMember,
} from '../../../models/Event';
import { EventActionService } from '../../../shared/eventAction.service';
import {
  minMembersCountInPurchase,
  organizerInMembersValidation,
  sumGreaterZero,
} from '../../../utils/FormValidators';
import { getLocalEvents } from '../../../shared/localStorage.service';

@Component({
  selector: 'purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.scss'],
})
export class PurchaseFormComponent implements OnInit {
  isEdit!: boolean;
  eventId!: string;
  purchaseIndex!: string;
  event!: Event;
  purchaseForm!: FormGroup;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    private dataService: DataService,
    private eventActionService: EventActionService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isEdit = this.route.snapshot.data['isEdit'];
    this.eventId = this.route.snapshot.paramMap.get('id') ?? '';
    this.purchaseIndex = this.route.snapshot.paramMap.get('purchaseId') ?? '';

    this.purchaseForm = this.formBuilder.group(
      {
        title: ['', Validators.required],
        payer: ['', Validators.required],
        sum: [
          0,
          Validators.compose([
            Validators.required,
            Validators.pattern('^[0-9]*$'),
          ]),
        ],
        members: this.formBuilder.array([]),
      },
      {
        validators: [sumGreaterZero(), minMembersCountInPurchase()],
      }
    );

    this.dataService.getEventById(this.eventId).subscribe((event) => {
      this.event = event;

      if (this.isEdit && this.purchaseIndex) {
        this.fillFormFromEvent(event);
      } else {
        this.checkAllMembers(true);
      }

      this.loading$.next(false);
    });
  }

  get members(): FormArray {
    return this.purchaseForm.get('members') as FormArray;
  }

  get title(): string {
    return this.isEdit && this.purchaseIndex
      ? 'Редактирование покупки'
      : 'Новая покупка';
  }

  fillFormFromEvent(event: Event) {
    const { title, payer, sum, members } =
      event.purchases[Number(this.purchaseIndex)];

    this.purchaseForm.patchValue({
      title,
      payer,
      sum,
    });

    this.fillFormArray(
      event.members.map((name) =>
        this.formBuilder.group({
          name,
          selected: members.some((x) => x === name),
        })
      )
    );
  }

  checkAllMembers(selected: boolean) {
    this.fillFormArray(
      this.event.members.map((name) =>
        this.formBuilder.group({ name, selected })
      )
    );
  }

  fillFormArray(config: any) {
    this.purchaseForm.setControl(
      'members',
      this.formBuilder.array(config || [])
    );
  }

  async onSubmit() {
    if (this.purchaseForm.valid) {
      this.loading$.next(true);

      const currentUser =
        getLocalEvents().find((x: LocalEvent) => x.id === this.event.id)
          ?.organizer ?? '';

      const { title, payer, sum, members } = this.purchaseForm.value;

      const purchase: Purchase = {
        title,
        payer,
        sum,
        members: this.members?.value
          .filter((x: PurchaseMember) => x.selected)
          .map((x: PurchaseMember) => x.name),
      };

      if (this.isEdit && this.purchaseIndex) {
        await this.dataService.updatePurchase(
          this.event,
          Number(this.purchaseIndex),
          purchase
        );

        await this.onChange();
      } else {
        await this.dataService.addPurchase(this.eventId, purchase);

        const action = this.eventActionService.addPurchase(
          currentUser,
          title,
          sum
        );
        await this.dataService.addEventAction(this.eventId, action);

        await this.onChange();
      }
    }
  }

  async onChange() {
    await this.router.navigate(['events', this.eventId]);
    this.loading$.next(false);
  }
}
