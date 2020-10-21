import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Result} from '../../network-config/details/share/sharing-dialog/sharing-dialog.component';

@Component({
  selector: 'app-import-dialog',
  templateUrl: './import-dialog.component.html',
  styleUrls: ['./import-dialog.component.scss']
})
export class ImportDialogComponent {
  constructor(public dialogRef: MatDialogRef<ImportDialogComponent, Result>) {
  }

  cancel(): void {
    this.dialogRef.close({
      result: false
    });
  }

  yes(): void {
    this.dialogRef.close({
      result: true
    });
  }

}
