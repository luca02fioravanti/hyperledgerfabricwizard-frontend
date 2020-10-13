import {Component, Inject, OnInit} from '@angular/core';
import {Result} from '../share/sharing-dialog/sharing-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Server} from '../../../_services/server';
import {NetworkConfig} from '../../../_models/networkConfig';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {
  constructor(private server: Server,
              private snackBar: MatSnackBar,
              private router: Router,
              public dialogRef: MatDialogRef<DeleteDialogComponent, Result>,
              @Inject(MAT_DIALOG_DATA) public data: NetworkConfig) {
  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close({
      result: false
    });
  }

  yes(): void {
    this.server.deleteNetworkConfig(this.data.id).subscribe(e => {
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
