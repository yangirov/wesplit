import { FormArray, FormBuilder } from '@angular/forms';
import {
  duplicateMembersValidator,
  minMembersCountInPurchase,
  organizerInMembersValidation,
  sumGreaterZero,
  sumLessOrEqualDebt,
} from './FormValidators';
import { fakeAsync } from '@angular/core/testing';

describe('Form custom validators test', function () {
  it('should detect the duplicates in organizer and members list', fakeAsync(() => {
    // Arrange
    const formBuilder = new FormBuilder();
    const form = formBuilder.group(
      {
        organizer: 'Emil',
        members: formBuilder.array([]),
      },
      {
        validators: [
          organizerInMembersValidation(),
          duplicateMembersValidator(),
        ],
      }
    );

    // Act
    const name = formBuilder.group({ name: 'Emil' });
    (form.get('members') as FormArray).push(name);
    (form.get('members') as FormArray).push(name);

    const organizerInMembers = form.errors?.organizerInMembers;
    const hasMembersDuplicates = form.errors?.hasMembersDuplicates;

    // Assert
    expect(false).toEqual(form.valid);
    expect(true).toEqual(organizerInMembers);
    expect(true).toEqual(hasMembersDuplicates);
  }));

  it('should validate the minimal sum and minimum members count in purchase', fakeAsync(() => {
    // Arrange
    const formBuilder = new FormBuilder();
    const form = formBuilder.group(
      {
        sum: [0],
        members: formBuilder.array([]),
      },
      {
        validators: [sumGreaterZero(), minMembersCountInPurchase()],
      }
    );

    // Act
    const minimalSum = form.errors?.minimalSum;
    const minimalMembersCount = form.errors?.minimalMembersCount;

    // Assert
    expect(false).toEqual(form.valid);
    expect(true).toEqual(minimalSum);
    expect(true).toEqual(minimalMembersCount);
  }));

  it('should validate the number not be equal or greater debt sum', fakeAsync(() => {
    // Arrange
    const formBuilder = new FormBuilder();
    const form = formBuilder.group(
      {
        sum: [250],
        members: formBuilder.array([]),
      },
      {
        validators: [sumLessOrEqualDebt(200)],
      }
    );

    // Act
    const error = form.errors?.sumLessOrEqualDebt;

    // Assert
    expect(false).toEqual(form.valid);
    expect(true).toEqual(error);
  }));
});
