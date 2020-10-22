import {Component, Input, OnInit} from '@angular/core';
import {CdkStepper} from '@angular/cdk/stepper';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Org} from '../../_models/fabric/org';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({});
  }

  @Input() rootStepper: CdkStepper;

  form: FormGroup;

  @Input() orgs: Org[];
  @Input() isLocalhost: boolean;

  ngOnInit(): void {
    this.form.setValidators((control: FormGroup) => {
      const children = Object.values(control.controls);
      const orderers = flatMap(children, (group: FormGroup) => {
        return Object.values(group.controls).filter(c => {
          const typeControl = c.get('type');
          return c instanceof FormGroup && typeControl != null && typeControl.valid && typeControl.value === 'Orderer';
        });
      });
      if (children.length === children.filter(child => child.valid).length) {
        if (orderers.length === 0) {
          return {orderer: true};
        }
      }
      if (this.isLocalhost) {
        const ports = flatMap(flatMap(children, (group: FormGroup) => {
          return Object.values(group.controls).filter(c => {
            const typeControl = c.get('type');
            const portControl = c.get('port');
            return c instanceof FormGroup
              && c.valid
              && typeControl != null
              && typeControl.valid
              && (typeControl.value === 'Orderer' || typeControl.value === 'Peer')
              && portControl != null
              && portControl.valid;
          });
        }), (form => {
          if (form.get('type').value === 'Peer') {
            return [form.get('port'), form.get('port1')];
          }
          return [form.get('port')];
        }));
        console.log(ports.map(portControl => portControl.value));
        const portSet = new Set(ports.map(portControl => portControl.value));
        if (ports.length > portSet.size) {
          return {ports: true};
        }
      } else {
        const forms = flatMap(flatMap(children, (group: FormGroup) => {
          return Object.values(group.controls).filter(c => {
            const typeControl = c.get('type');
            const portControl = c.get('port');
            const urlControl = c.get('url');
            return c instanceof FormGroup
              && c.valid
              && typeControl != null
              && typeControl.valid
              && (typeControl.value === 'Orderer' || typeControl.value === 'Peer')
              && portControl != null
              && portControl.valid
              && urlControl != null
              && urlControl.valid;
          });
        }), (form => {
            if (form.get('type').value === 'Peer') {
              return [form.get('url').value + ':' + form.get('port').value, form.get('url').value + ':' + form.get('port1').value];
            }
            return [form.get('url').value + ':' + form.get('port').value];
          }
        ));
        const set = new Set(forms);
        if (forms.length > set.size) {
          return {url: true};
        }
      }
      return null;
    });
  }
}

export function flatMap<T, U>(array: T[], callbackfn: (value: T, index: number, array: T[]) => U[]): U[] {
  return Array.prototype.concat(...array.map(callbackfn));
}
