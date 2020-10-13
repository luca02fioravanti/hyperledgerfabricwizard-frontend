import {Component, OnInit} from '@angular/core';
import {Shared} from '../../../../_models/shared';
import {Server} from '../../../../_services/server';
import * as FileSaver from 'file-saver';
import {MatSnackBar} from '@angular/material/snack-bar';

type SharedTable = {
  org: string,
  network: string,
  author: string,
  download: number
};

@Component({
  selector: 'app-shared-with-me',
  templateUrl: './shared-with-me.component.html',
  styleUrls: ['./shared-with-me.component.scss']
})
export class SharedWithMeComponent implements OnInit {
  loading = false;

  shared: Shared[];
  heading = ['org', 'network', 'author', 'download'];
  data: SharedTable[];

  constructor(private server: Server, private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.server.sharedWithMe().subscribe(shared => {
      this.shared = shared;
      this.data = this.shared.map((s, i) => {
        return {
          org: s.networkZip.zipName,
          network: s.networkZip.networkConfig.network.name,
          author: s.networkZip.networkConfig.author.email,
          download: i
        };
      });
    });
  }


  download(i: number): void {
    const s = this.shared[i];
    const id = s.networkZip.networkConfig.id;
    const name = s.networkZip.zipName;
    this.server.getZip(id, name).subscribe(result => {
      this.loading = false;
      FileSaver.saveAs(result.body, result.headers.get('Content-Disposition').split('filename=')[1]);
    }, e => {
      this.loading = false;
      this.snackbar.open('Error', null, {
        duration: 2000
      });
    });
  }

}
