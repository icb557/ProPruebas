import { AbstractControl, ValidatorFn } from '@angular/forms';

export function birthdateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        const today = new Date();
        const selectedDate = new Date(control.value);

        if (selectedDate >= today) {
            return { futureDate: true };
        }

        const age = today.getFullYear() - selectedDate.getFullYear();
        const monthDiff = today.getMonth() - selectedDate.getMonth();
        const dayDiff = today.getDate() - selectedDate.getDate();

        if (age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
            return { underage: true };
        }

        return null;
    };
}