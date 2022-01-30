import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuard, isNotAnonymous } from '@angular/fire/auth-guard';
import isPwa from '../../utils/PwaExtensions';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const redirectToEventsIfIsPwa = (redirect: any[]) =>
  pipe(
    isNotAnonymous,
    map((loggedIn) => !loggedIn || (isPwa() && redirect) || true)
  );

const redirectLoggedInToEvents = () => redirectToEventsIfIsPwa(['events']);

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectLoggedInToEvents,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
