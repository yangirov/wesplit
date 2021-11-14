import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../shared/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.scss'],
})
export class PurchaseFormComponent implements OnInit {
  isEdit!: boolean;
  eventId!: string;
  purchaseId!: string;

  purchaseForm!: FormGroup;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isEdit = this.route.snapshot.data['isEdit'];
    this.eventId = this.route.snapshot.paramMap.get('id') ?? '';
    this.purchaseId = this.route.snapshot.paramMap.get('purchaseId') ?? '';

    this.purchaseForm = this.formBuilder.group({
      message: ['', Validators.required],
      email: [
        '',
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ],
    });

    this.loading$.next(false);
  }

  title() {
    return this.isEdit && this.purchaseId
      ? 'Редактирование покупки'
      : 'Новая покупка';
  }

  onSubmit() {}
}
