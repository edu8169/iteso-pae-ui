import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signUpForm;
  showPassword: boolean = false;
  
  public isSubmitted = false;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm: ['', [Validators.required, Validators.minLength(8)]],
      tc: ['',[Validators.requiredTrue]]

    }, {
      validators: [
        ()=>{
          return this.matchPasswords()
        }
      ]
    });
  }

  ngOnInit(): void {
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  sendData() {
    if(this.form.valid) {
      const { password, confirm } = this.form.getRawValue();
      console.log('Enviar datos', password, confirm);
    } else {
      console.log('Error, faltan datos', this.form);
    }
  }

  matchPasswords() {
    if(!this.form) return;
    const { password, confirm } = this.form.getRawValue();
    if(password === confirm) {
      return null;
    } else {
      return { passwordMismatch: true }
    }
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.signUpForm.invalid){
      return;
    }
    alert(JSON.stringify(this.signUpForm.value));
  }
 
}

}
