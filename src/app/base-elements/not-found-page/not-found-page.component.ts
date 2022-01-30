import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
})
export class NotFoundPageComponent implements OnInit {
  path!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.pipe(take(1)).subscribe((data: any) => {
      this.path = data.path;
    });
  }
}
