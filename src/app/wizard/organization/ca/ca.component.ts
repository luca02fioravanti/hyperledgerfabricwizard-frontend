import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {states} from '../../../_models/fabric/states';
import {Network} from '../../../_models/fabric/network';
import {Ca} from '../../../_models/fabric/ca';
import {Org} from '../../../_models/fabric/org';

@Component({
  selector: 'app-ca',
  templateUrl: './ca.component.html',
  styleUrls: ['./ca.component.scss']
})
export class CaComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() isLocalhost: boolean;
  @Input() org: Org;
  ca: Ca;
  form: FormGroup;
  port: FormControl;
  state: FormControl;

  states = states;

  constructor(private formBuilder: FormBuilder) {
    this.port = this.formBuilder.control('', [Validators.required, Validators.max(65535)]);
    this.state = this.formBuilder.control('', []);

    this.form = this.formBuilder.group({
      port: this.port,
      state: this.state
    });
    this.port.valueChanges.subscribe(n => {
      this.ca.port = n;
    });
    this.state.valueChanges.subscribe((value: string) => {
      if (!value) {
        return;
      }
      this.ca.state = states.find(s => s.code === value);
    });
  }


  ngOnInit(): void {
    this.ca = this.org.ca;
    if (!this.ca) {
      this.ca = new Ca();
      this.org.ca = this.ca;
    } else {
      this.port.setValue(this.ca.port);
      if (this.ca.state) {
        this.state.setValue(this.ca.state.code);
      }
    }
    this.parentForm.addControl('ca', this.form);
  }
}
