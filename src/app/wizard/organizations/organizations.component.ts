import {Component, Input, OnInit} from '@angular/core';
import {CdkStepper} from '@angular/cdk/stepper';
import {AbstractControl, Form, FormBuilder, FormGroup} from '@angular/forms';
import {Org} from '../../_models/fabric/org';
import {Network} from '../../_models/fabric/network';

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
      const orderers = flatMap(Object.values(control.controls), (group: FormGroup) => {
        return Object.values(group.controls).filter(c => {
          const typeControl = c.get('type');
          return c instanceof FormGroup && typeControl != null && typeControl.valid && typeControl.value === 'Orderer';
        });
      });
      const children = Object.values(control.controls);
      if (children.length === children.filter(child => child.valid).length) {
        if (orderers.length === 0) {
          return {orderer: true};
        }
      }
      return null;
    });
  }
}

export function flatMap<T, U>(array: T[], callbackfn: (value: T, index: number, array: T[]) => U[]): U[] {
  return Array.prototype.concat(...array.map(callbackfn));
}
