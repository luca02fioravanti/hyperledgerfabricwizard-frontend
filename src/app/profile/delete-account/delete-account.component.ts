import {Component, Inject, OnInit} from '@angular/core';
import {Server} from '../../_services/server';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Result} from '../../network-config/details/share/sharing-dialog/sharing-dialog.component';
import {User} from '../../_models/user';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit {
  constructor(private server: Server,
              private snackBar: MatSnackBar,
              private router: Router,
              public dialogRef: MatDialogRef<DeleteAccountComponent, Result>,
              @Inject(MAT_DIALOG_DATA) public data: User) {
  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close({
      result: false
    });
  }

  yes(): void {
    this.server.closeAccount().subscribe(e => {
      if (e) {
        this.dialogRef.close({
          result: true
        });
      } else {
        this.snackBar.open('Error', '', {
          duration: 2000,
        });
      }
    });
  }
}
