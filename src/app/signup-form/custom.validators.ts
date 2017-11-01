import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {
    static cannotContainSpaces(control: AbstractControl) : ValidationErrors | null {
        if ((<string>control.value).indexOf(' ') >= 0)
            return { cannotContainSpaces: true};
        return null;
    }

    static shouldBeUnique(control: AbstractControl) : Promise<ValidationErrors | null> {
        return new Promise((resol, reject) => {
            setTimeout(() => {
                if (control.value === 'treve')
                    resol({shouldBeUnique: true});
                else resol(null);
            }, 2000);
        });
    }
}