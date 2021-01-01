import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@service/authentication.service';
import { UserService } from '@service/user.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMsg: string | undefined;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

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
        () => {
          // Success
          this.router.navigateByUrl(this.returnUrl);
        },
        () => {
          // Error
          this.errorMsg = 'Login failed.';
          this.loginForm.reset();
          this.loginForm.setErrors(null);
        });
  }
}
