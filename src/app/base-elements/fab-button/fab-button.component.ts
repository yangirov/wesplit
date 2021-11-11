import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss'],
})
export class FabButtonComponent implements OnInit {
  @Input() link!: string;
  @Input() icon!: string;

  constructor() {}

  ngOnInit(): void {}
}
