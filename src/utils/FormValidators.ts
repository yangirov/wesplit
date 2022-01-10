import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { EventDto, EventMember, PurchaseMember } from '../models/Event';

export interface AllValidationErrors {
  control_name: string;
  error_name: string;
  error_value: any;
}

export interface FormGroupControls {
  [key: string]: AbstractControl;
}

export function duplicateMembersValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const members = form.get('members')?.value.map((x: EventMember) => x.name);

    return members.length > 1 && members.length !== new Set(members).size
      ? { hasMembersDuplicates: true }
      : null;
  };
}

export function notDeleteMemberExistedInPurchase(event: EventDto): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    if (!event) {
      return null;
    }

    const allPurchasesMembers = event.purchases.reduce((acc, x) => {
      x.members.forEach((m) => {
        if (!acc.includes(m)) {
          acc.push(m);
        }
      });

      return acc;
    }, Array<string>());

    const members = (form.get('members')?.value as EventMember[])
      .filter((x) => x.name !== '')
      .map((x) => x.name);

    const organizer = form.get('organizer')?.value;
    if (!members.includes(organizer)) {
      members.push(organizer);
    }

    return !allPurchasesMembers.every((r) => members.includes(r))
      ? { notDeleteMemberExistedInPurchase: true }
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

export function payerNotExistsInPurchaseMembers(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const payer = form.get('payer')?.value;
    const members = (form.get('members')?.value as PurchaseMember[]).filter(
      (x) => x.selected
    );

    return !members.some((x) => x.name == payer)
      ? { payerNotExistsInPurchaseMembers: true }
      : null;
  };
}

export function sumLessOrEqualDebt(debtSum: number): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const sum = form.get('sum')?.value;
    return Number(sum) > debtSum ? { sumLessOrEqualDebt: true } : null;
  };
}

export function calculateFormValidationErrors(
  form: FormGroup,
  translation: { [key: string]: string }
): string[] {
  const errors = getFormValidationErrors(form.controls);

  return errors.map((error) => {
    let getErrorName = (error: AllValidationErrors) =>
      error.control_name.charAt(0).toUpperCase() + error.control_name.slice(1);

    switch (error.error_name) {
      case 'required':
        return `${getErrorName(error)} ${translation['isRequired']}`;
      case 'pattern':
        return `${getErrorName(error)} ${translation['hasWrongPattern']}`;
      case 'email':
        return `${getErrorName(error)} ${translation['hasWrongEmailFormat']}`;
      case 'minlength':
        return `${getErrorName(error)} ${translation['hasWrongLength']} ${
          error.error_value.requiredLength
        }`;
      case 'areEqual':
        return `${getErrorName(error)} ${translation['mustBeEqual']}`;
      default:
        return `${getErrorName(error)}: ${error.error_name}: ${
          error.error_value
        }`;
    }
  });
}

export function getFormValidationErrors(
  controls: FormGroupControls
): AllValidationErrors[] {
  let errors: AllValidationErrors[] = [];
  Object.keys(controls).forEach((key) => {
    const control = controls[key];

    if (control instanceof FormGroup) {
      errors = errors.concat(getFormValidationErrors(control.controls));
    }

    const controlErrors = controls[key]?.errors;
    if (controlErrors !== null) {
      Object.keys(controlErrors).forEach((keyError) => {
        errors.push({
          control_name: key,
          error_name: keyError,
          error_value: controlErrors[keyError],
        });
      });
    }
  });

  return errors;
}
