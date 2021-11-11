import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'grey-title',
  templateUrl: './grey-title.component.html',
  styleUrls: ['./grey-title.component.scss'],
})
export class GreyTitleComponent implements OnInit {
  @Input() text!: string;

  constructor() {}

  ngOnInit(): void {}
}
