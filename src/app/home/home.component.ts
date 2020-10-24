import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Server} from '../_services/server';
import {Table1} from '../wizard/summary/summary.component';
import {Client, Entity, Orderer, Peer} from '../_models/fabric/entity';
import {NetworkConfig} from '../_models/networkConfig';
import {Loading} from '../_services/loading';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, Loading {
  list: { name: string; id: number, timestamp: string }[];

  table1: string[] = ['org', 'orderer', 'peer', 'admin', 'client'];
  data1: Table1[];
  configs: NetworkConfig[];
  loading = true;


  constructor(private router: Router, private server: Server) {
  }

  ngOnInit(): void {
    this.server.listNetworkConfigs().subscribe(configs => {
      this.configs = configs;
      this.list = configs.map(config => {
        return {
          name: config.network.name,
          id: config.id,
          timestamp: config.network.isLocalhost ? 'Local' : 'Distributed'
        };
      });
      this.loading = false;
    });
  }

  setCurrent(i: number): void {
    this.data1 = this.loadTable(i);
  }


  loadTable(i: number): Table1[] {
    return (this.configs)[i].network.orgs.map(o => {
      let orderer = 0;
      let peer = 0;
      let client = 0;
      let admin = 0;
      o.entities.forEach(e => {
        e = Entity.parse(e, o);
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
  }

  newConfiguration(): void {
    this.router.navigateByUrl('/wizard');
  }

  configDetails(id: number): string {
    return '/config/' + id;
  }

}
