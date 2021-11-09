import { FormArray, FormBuilder } from '@angular/forms';
import {
  duplicateMembersValidator,
  organizerInMembersValidation,
} from './FormValidators';
import { fakeAsync } from '@angular/core/testing';

describe('Form custom validators test', function () {
  it('should detect the duplicates in organizer and members list', fakeAsync(() => {
    // Arrange
    const formBuilder = new FormBuilder();
    const form = formBuilder.group(
      {
        organizer: 'Emil',
        members: formBuilder.array([], duplicateMembersValidator()),
      },
      {
        validators: [organizerInMembersValidation()],
      }
    );

    // Act
    const name = formBuilder.group({ name: 'Emil' });
    (form.get('members') as FormArray).push(name);
    (form.get('members') as FormArray).push(name);

    const organizerInMembers = form.errors?.organizerInMembers;
    const hasMembersDuplicates =
      form.get('members')?.errors?.hasMembersDuplicates;

    // Assert
    expect(false).toEqual(form.valid);
    expect(true).toEqual(organizerInMembers);
    expect(true).toEqual(hasMembersDuplicates);
  }));
});
