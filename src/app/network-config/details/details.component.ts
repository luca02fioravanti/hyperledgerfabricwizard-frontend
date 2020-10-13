import {Component, OnInit} from '@angular/core';
import {Server} from '../../_services/server';
import {NetworkConfig} from '../../_models/networkConfig';
import {ActivatedRoute, Router} from '@angular/router';
import {map, mergeMap, tap} from 'rxjs/operators';
import * as FileSaver from 'file-saver';
import {Loading} from '../../_services/loading';
import {Client, Entity, Orderer, Peer} from '../../_models/fabric/entity';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from './delete-dialog/delete-dialog.component';
import {Location} from '@angular/common';

type EntityTable = { name: string, type: string, url: string, port: string };
declare let window: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, Loading {

  config: NetworkConfig;
  loading: boolean;
  entitiesTable: EntityTable[];
  entitiesTableHeadings = ['name', 'type', 'url', 'port'];
  cachedTables: Map<number, EntityTable[]> = new Map<number, EntityTable[]>();

  constructor(private dialog: MatDialog,
              private server: Server,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.pipe(
      map(params => +params.id),
      mergeMap(id => this.server.getNetworkConfiguration(id))
    ).subscribe(config => {
      this.loading = false;
      if (!config) {
        this.router.navigateByUrl('/');
      } else {
        this.config = config;
      }
    });
  }

  setEntitityTable(i: number): void {
    let table = (this.cachedTables)[i];
    if (!table) {
      table = this.loadEntityTable(i);
      this.cachedTables[i] = table;
    }
    this.entitiesTable = table;
  }

  download(i: number): void {
    this.loading = true;
    const org = this.config.network.orgs[i];
    this.server.getZip(this.config.id, org.fullName).subscribe(s => {
      this.loading = false;
      FileSaver.saveAs(s.body, s.headers.get('Content-Disposition').split('filename=')[1]);
    }, e => {
      this.loading = false;
      this.snackbar.open('Error', null, {
        duration: 2000
      });
    });
  }

  deleteConfig(): void {
    this.dialog.open(DeleteDialogComponent, {
      width: '600px',
      data: this.config
    }).afterClosed().subscribe(result => {
      if (result.result) {
        window.location.reload();
      }
    });
  }

  loadEntityTable(i: number): EntityTable[] {
    const org = this.config.network.orgs[i];
    const ca = org.ca;
    const t = {
      name: 'ca.' + org.fullName,
      type: 'Certificate Authority',
      url: ca.url,
      port: '' + ca.port
    };
    const array = org.entities.map(e => {
      let type = '';
      let url = '-';
      let port = '-';
      e = Entity.parse(e, org);
      if (e instanceof Peer) {
        type = 'Peer';
        url = e.url;
        port = '' + e.port;
      }
      if (e instanceof Client) {
        if (e.isAdmin) {
          type = 'Admin';
        } else {
          type = 'Client';
        }
      }
      if (e instanceof Orderer) {
        type = 'Orderer';
        url = e.url;
        port = '' + e.port;
      }
      return {
        name: e.name,
        type,
        url,
        port
      };
    });
    array.push(t);
    return array;
  }
}
