import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Loading} from '../_services/loading';
import {Server} from '../_services/server';
import {User} from '../_models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, Loading {
  form: FormGroup;
  loading: boolean;

  constructor(private formBuilder: FormBuilder, private server: Server, private router: Router, private snackBar: MatSnackBar) {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control('', Validators.required),
      surname: this.formBuilder.control('', Validators.required),
      email: this.formBuilder.control('', Validators.required),
      password: this.formBuilder.control('', Validators.required),
      password1: this.formBuilder.control('', Validators.required)
    });
    this.form.setValidators((control: FormGroup) => {
      const pw = control.get('password');
      const pw1 = control.get('password1');
      if (pw.valid && pw1.valid) {
        const password = pw.value;
        const password1 = pw1.value;
        if (password !== password1) {
          return {error: true};
        }
        return null;
      }
      return null;
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.valid) {
      const user: User = this.form.getRawValue();
      this.loading = true;
      this.server.signup(user).subscribe(result => {
        this.loading = false;
        switch (result) {
          case -2:
            this.snackBar.open('Email already exists', '', {
              duration: 2000,
            });
            break;
          case 0:
            this.router.navigateByUrl('/login');
            break;
          case -1:
            this.snackBar.open('Error', '', {
              duration: 2000,
            });
            break;
        }
      });
    }
  }

}
