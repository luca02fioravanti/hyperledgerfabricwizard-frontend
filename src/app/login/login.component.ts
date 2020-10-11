import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/authService';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Loading} from '../_services/loading';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, Loading {
  form: FormGroup;
  loading: boolean;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.valid) {
      const email = this.form.get('email').value;
      const password = this.form.get('password').value;
      this.loading = true;
      this.login(email, password).subscribe(result => {
        this.loading = false;
        if (result) {
          this.router.navigateByUrl('/');
        } else {
          this.snackBar.open('Login non riuscita', '', {
            duration: 2000,
          });
        }
      });
    }
  }

  login(email: string, password: string): Observable<boolean> {
    return this.authService.login(email, password);
  }

}
