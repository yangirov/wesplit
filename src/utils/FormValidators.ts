import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { EventMember } from '../models/Event';

export function duplicateMembersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const members = control.value.map((x: EventMember) => x.name);
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
