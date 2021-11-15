import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { EventMember, PurchaseMember } from '../models/Event';

export function duplicateMembersValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const members = form.get('members')?.value.map((x: EventMember) => x.name);

    return members.length > 1 && members.length !== new Set(members).size
      ? { hasMembersDuplicates: true }
      : null;
  };
}

export function organizerInMembersValidation(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const organizer = form.get('organizer')?.value;
    const members = form.get('members')?.value.map((x: EventMember) => x.name);

    return members.length > 1 && members.includes(organizer)
      ? { organizerInMembers: true }
      : null;
  };
}

export function sumGreaterZero(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const sum = form.get('sum')?.value;
    return Number(sum) === 0 ? { minimalSum: true } : null;
  };
}

export function minMembersCountInPurchase(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const members = form
      .get('members')
      ?.value.filter((x: PurchaseMember) => x.selected);

    return members?.length === 0 ? { minimalMembersCount: true } : null;
  };
}
