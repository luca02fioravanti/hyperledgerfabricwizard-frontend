import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Shared} from '../../../../_models/shared';
import {Server} from '../../../../_services/server';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface Result {
  result: boolean;
}

@Component({
  selector: 'app-sharing-dialog',
  templateUrl: './sharing-dialog.component.html',
  styleUrls: ['./sharing-dialog.component.scss']
})
export class SharingDialogComponent implements OnInit {
  form: FormGroup;
  email: FormControl;


  constructor(private server: Server,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<SharingDialogComponent, Result>,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: Shared) {
    this.email = this.formBuilder.control('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);
    this.form = this.formBuilder.group({
      email: this.email
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.share(this.email.value.trim());
    }
  }

  share(email: string): void {
    this.server.share(this.data, email).subscribe(result => {
      switch (result) {
        case 0:
          this.dialogRef.close({
            result: true
          });
          break;
        case 1:
          this.snackBar.open('Email doesn\'t exist', '', {
            duration: 2000,
          });
          break;
        case 2:
          this.snackBar.open('Provide a valid email!', '', {
            duration: 2000,
          });
          break;
        case -1:
          this.snackBar.open('Error, Retry.', '', {
            duration: 2000,
          });
          this.dialogRef.close();
          break;
      }
    });
  }
}
