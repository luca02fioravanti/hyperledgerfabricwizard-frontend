import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Network} from '../../_models/fabric/network';
import {Client, Orderer, Peer} from '../../_models/fabric/entity';
import {Server} from '../../_services/server';
import {Router} from '@angular/router';
import {Loading} from '../../_services/loading';

export type Table1 = {
  org: string,
  orderer: number,
  peer: number,
  admin: number,
  client: number
};

type Table2 = {
  consortium: string,
  orgs: string,
};

type Table3 = {
  channel: string,
  consortium: string,
};

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  @Input() network: Network;
  @Output() loading = new EventEmitter<boolean>();

  table1: string[] = ['org', 'orderer', 'peer', 'admin', 'client'];
  table2: string[] = ['consortium', 'orgs'];
  table3: string[] = ['channel', 'consortium'];
  disabled: boolean;

  data1: Table1[];
  data2: Table2[];
  data3: Table3[];

  constructor(private server: Server, private router: Router) {
  }

  ngOnInit(): void {
    this.data1 = this.network.orgs.map(o => {
      let orderer = 0;
      let peer = 0;
      let client = 0;
      let admin = 0;
      o.entities.forEach(e => {
        if (e instanceof Peer) {
          peer++;
        }
        if (e instanceof Client) {
          if (e.isAdmin) {
            admin++;
          } else {
            client++;
          }
        }
        if (e instanceof Orderer) {
          orderer++;
        }
      });
      return {org: o.fullName, orderer, peer, client, admin};
    });
    this.data2 = this.network.consortiums.map(c => {
      return {
        consortium: c.name,
        orgs: c.orgs.map(o => o.fullName).join(', ')
      };
    });
    this.data3 = this.network.channels.map(c => {
      return {
        channel: c.name,
        consortium: c.consortium.name
      };
    });
  }

  saveConfiguration(): void {
    this.disabled = true;
    this.loading.emit(true);
    this.server.addNetworkConfig(this.network).subscribe(e => {
      if (e.ok) {
        this.router.navigateByUrl('/');
      } else {
        this.disabled = false;
        this.loading.emit(false);
      }
    });
  }

}
