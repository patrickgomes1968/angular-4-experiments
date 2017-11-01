import { CustomValidators } from './custom.validators';
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {

  form = new FormGroup({
    account: new FormGroup({
      username: new FormControl('', [ 
        Validators.minLength(5),
        Validators.required,
        //  Validators.email,
        CustomValidators.cannotContainSpaces],
        [CustomValidators.shouldBeUnique, 
      ]),
      password: new FormControl('', Validators.required)
    })
  })

  get username() {
    return this.form.get('account.username');
  }
  
  keyPressed(){
    console.log(this.username.errors)
  }

}
