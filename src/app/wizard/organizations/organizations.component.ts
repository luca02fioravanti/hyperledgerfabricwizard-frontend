import {Component, Input, OnInit} from '@angular/core';
import {CdkStepper} from '@angular/cdk/stepper';
import {FormBuilder, FormGroup} from '@angular/forms';
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
  }
}
