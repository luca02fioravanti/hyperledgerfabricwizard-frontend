import {Component, OnInit} from '@angular/core';
import {Loading} from '../_services/loading';
import {Server} from '../_services/server';
import {User} from '../_models/user';
import {DeleteDialogComponent} from '../network-config/details/delete-dialog/delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {DeleteAccountComponent} from "./delete-account/delete-account.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, Loading {
  loading = true;
  user: User;

  constructor(private server: Server, private dialog: MatDialog, private router: Router) {
  }

  ngOnInit(): void {
    this.server.profile().subscribe(result => {
      this.loading = false;
      if (result) {
        this.user = result;
      }
    }, error => {
      this.loading = false;
    });
  }

  closeAccount(): void {
    this.dialog.open(DeleteAccountComponent, {
      width: '600px',
      data: this.user
    }).afterClosed().subscribe(result => {
      if (result.result) {
        this.router.navigateByUrl('/logout');
      }
    });
  }

}
