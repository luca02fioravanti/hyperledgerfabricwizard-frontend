import {Component, OnInit} from '@angular/core';
import {Network} from '../_models/fabric/network';
import {Org} from '../_models/fabric/org';
import {Client} from '../_models/fabric/entity';
import {Ca} from '../_models/fabric/ca';
import {Consortium} from '../_models/fabric/consortium';
import {Channel} from '../_models/fabric/channel';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {
  network: Network;

  constructor() {
    this.network = new Network();
    /*this.network.name = 'test-network';
    this.network.isLocalhost = true;
    const org1 = new Org('org1', 'example', undefined, undefined);
    org1.entities = [
      new Client('admin', org1, true)
    ];
    org1.ca = new Ca();
    org1.ca.port = 7050;
    const org2 = new Org('org2', 'example', undefined, undefined);
    org2.entities = [
      new Client('admin', org2, true)
    ];
    org2.ca = new Ca();
    org2.ca.port = 7051;
    const org3 = new Org('org3', 'example', undefined, undefined);
    org3.entities = [
      new Client('admin', org3, true)
    ];
    org3.ca = new Ca();
    org3.ca.port = 7051;
    this.network.orgs = [org1, org2, org3];
    const sample = new Consortium('sample', [org1, org2]);
    this.network.consortiums = [sample];
    this.network.channels = [
      new Channel('channel', sample, sample.orgs)
    ];*/
  }

  ngOnInit(): void {
  }
}
