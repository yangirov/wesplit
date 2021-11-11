import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'empty-items',
  templateUrl: './empty-items.component.html',
  styleUrls: ['./empty-items.component.scss'],
})
export class EmptyItemsComponent implements OnInit {
  @Input() icon!: string;
  @Input() text!: string;

  constructor() {}

  ngOnInit(): void {}
}
