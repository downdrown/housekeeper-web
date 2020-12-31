import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMsg: string | undefined;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) {

    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onSubmit(): void {

    this.errorMsg = undefined;

    if (this.loginForm.invalid) {
      return;
    }

    const username = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;

    this.authenticationService.authenticate(username, password)
      .then(
        () => {},
        error => {
          this.errorMsg = 'Login failed.';
          this.loginForm.reset();
          this.loginForm.setErrors(null);
        });
  }
}
