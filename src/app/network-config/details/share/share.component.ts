import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Loading} from '../../../_services/loading';
import {Server} from '../../../_services/server';
import {ActivatedRoute} from '@angular/router';
import {concatMap, map, mergeMap} from 'rxjs/operators';
import {Shared} from '../../../_models/shared';
import {MatDialog} from '@angular/material/dialog';
import {SharingDialogComponent} from './sharing-dialog/sharing-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

declare let window: any;

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit, Loading {
  loading = true;
  sharedList: Shared[] = [];

  constructor(private snackBar: MatSnackBar,
              private server: Server,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              public location: Location) {
  }

  openShareDialog(i: number): void {
    const shared = this.sharedList[i];
    this.dialog.open(SharingDialogComponent, {
      width: '600px',
      data: shared
    }).afterClosed().subscribe(result => {
      if (result.result) {
        window.location.reload();
      }
    });
  }

  unshare(i: number): void {
    const shared = this.sharedList[i];
    this.server.unshare(shared).subscribe(result => {
      if (result) {
        window.location.reload();
      } else {
        this.snackBar.open('Could not cancel. Try again', '', {
          duration: 2000,
        });
      }
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.route.parent.params.pipe(
      map(params => +params.id),
      mergeMap(id => this.server.availableZips(id)),
      mergeMap(array => array),
      concatMap(s => this.server.sharedInfo(s.id))
    ).subscribe(result => {
      this.loading = false;
      this.sharedList.push(result);
    }, e => {
      this.loading = false;
    });
  }
}
