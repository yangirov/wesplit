import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'separator',
  templateUrl: './separator.component.html',
  styleUrls: ['./separator.component.scss'],
})
export class SeparatorComponent implements OnInit {
  @Input() position: string = '';

  constructor() {}

  ngOnInit(): void {}
}
