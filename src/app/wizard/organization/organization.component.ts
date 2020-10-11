import {Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges} from '@angular/core';
import {Org} from '../../_models/fabric/org';
import {Client, Entity, Orderer, Peer, Type} from '../../_models/fabric/entity';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Ca} from '../../_models/fabric/ca';
import {states} from '../../_models/fabric/states';
import {CdkStepper} from '@angular/cdk/stepper';


@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit, OnDestroy, OnChanges {
  @Input() rootStepper: CdkStepper;
  @Input() isLocalhost: boolean;
  @Input() parentForm: FormGroup;
  @Input() last: boolean;
  @Input() i: number;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({});
  }

  memberTypologies = Object.keys(Type).filter(i => isNaN(Number(i)));

  @Input() org: Org;
  entities: Entity[];

  states = states;

  memberControl(i: number): string {
    return `member-${i}`;
  }

  stateControl(i?: number): string {
    const name = 'state';
    if (i === undefined) {
      return name;
    } else {
      return this.memberControl(i) + `.${name}`;
    }
  }

  nameControl(i?: number): string {
    const name = 'name';
    if (i === undefined) {
      return name;
    } else {
      return this.memberControl(i) + `.${name}`;
    }
  }

  typeControl(i?: number): string {
    const name = 'type';
    if (i === undefined) {
      return name;
    } else {
      return this.memberControl(i) + `.${name}`;
    }
  }

  urlControl(i?: number): string {
    const name = 'url';
    if (i === undefined) {
      return name;
    } else {
      return this.memberControl(i) + `.${name}`;
    }
  }

  portControl(i?: number): string {
    const name = 'port';
    if (i === undefined) {
      return name;
    } else {
      return this.memberControl(i) + `.${name}`;
    }
  }

  anchorControl(i?: number): string {
    const name = 'anchor';
    if (i === undefined) {
      return name;
    } else {
      return this.memberControl(i) + `.${name}`;
    }
  }

  couchDBControl(i?: number): string {
    const name = 'couchDB';
    if (i === undefined) {
      return name;
    } else {
      return this.memberControl(i) + `.${name}`;
    }
  }

  isAnchor(entity: Entity): boolean {
    if (entity instanceof Peer) {
      return entity.isAnchor;
    }
    return false;
  }

  isCouchDB(entity: Entity): boolean {
    if (entity instanceof Peer) {
      return entity.couchDB;
    }
    return false;
  }

  removeMember(): void {
    const length = this.entities.length;
    if (length > 1) {
      this.form.removeControl(this.memberControl(length - 1));
      this.entities.pop();
    }
  }

  isHost(entity: Entity): boolean {
    return entity instanceof Peer || entity instanceof Orderer;
  }

  isPeer(entity: Entity): boolean {
    return entity instanceof Peer;
  }

  addMember(): void {
    const length = this.entities.length;
    // @ts-ignore
    this.entities.push(new Entity(undefined, this.org));
    this.addMemberControl(length);
  }

  private addMemberControl(i: number): FormGroup {
    const innerForm = this.formBuilder.group({});
    const nameControl = this.formBuilder.control('', Validators.required);
    const typeControl = this.formBuilder.control('', Validators.required);
    const urlControl = this.formBuilder.control('', []);
    const portControl = this.formBuilder.control('', []);
    const anchorControl = this.formBuilder.control('', []);
    const couchDBControl = this.formBuilder.control('', []);
    const stateControl = this.formBuilder.control('', []);

    innerForm.addControl(this.nameControl(), nameControl);
    innerForm.addControl(this.typeControl(), typeControl);
    innerForm.addControl(this.urlControl(), urlControl);
    innerForm.addControl(this.portControl(), portControl);
    innerForm.addControl(this.anchorControl(), anchorControl);
    innerForm.addControl(this.couchDBControl(), couchDBControl);
    innerForm.addControl(this.stateControl(), stateControl);

    this.form.addControl(this.memberControl(i), innerForm);

    nameControl.valueChanges.subscribe(e => {
      this.entities[i].name = e?.trim();
    });
    typeControl.valueChanges.subscribe(e => {
      this.entities[i] = this.entities[i].toEntityInstance(Type[e] as unknown as Type);
      const url = this.form.get(this.urlControl(i));
      const port = this.form.get(this.portControl(i));
      if (this.isHost(this.entities[i])) {
        url.setValidators(Validators.required);
        port.setValidators(Validators.required);
      } else {
        url.setValidators([]);
        url.updateValueAndValidity();
        port.setValidators([]);
        port.updateValueAndValidity();
      }
    });
    urlControl.valueChanges.subscribe(e => {
      const entity = this.entities[i];
      if (entity instanceof Peer || entity instanceof Orderer) {
        entity.url = e?.trim();
      }
    });
    portControl.valueChanges.subscribe(e => {
      const entity = this.entities[i];
      if (entity instanceof Peer || entity instanceof Orderer) {
        entity.port = e;
      }
    });
    anchorControl.valueChanges.subscribe(e => {
      const entity = this.entities[i];
      if (entity instanceof Peer) {
        entity.isAnchor = e;
      }
    });
    couchDBControl.valueChanges.subscribe(e => {
      const entity = this.entities[i];
      if (entity instanceof Peer) {
        entity.couchDB = e;
      }
    });
    stateControl.valueChanges.subscribe(e => {
      const entity = this.entities[i];
      if (!e) {
        return;
      }
      entity.state = states.find(s => s.code === e);
    });
    return innerForm;
  }

  ngOnInit(): void {
    if (!this.org.entities) {
      this.org.entities = [];
    }
    this.entities = this.org.entities;
    if (this.entities.length > 0) {
      this.entities.forEach((value, index) => {
        let type: string;
        if (value instanceof Peer) {
          type = 'Peer';
        } else if (value instanceof Orderer) {
          type = 'Orderer';
        } else {
          if ((value as Client).isAdmin) {
            type = 'Admin';
          } else {
            type = 'Client';
          }
        }
        const controls = this.addMemberControl(index);
        controls.get(this.nameControl()).setValue(value.name);
        controls.get(this.typeControl()).setValue(type);
        if (value.state) {
          controls.get(this.stateControl()).setValue(value.state.code);
        }
        if (value instanceof Peer || value instanceof Orderer) {
          controls.get(this.urlControl()).setValue(value.url);
          controls.get(this.portControl()).setValue(value.port);
          if (value instanceof Peer) {
            controls.get(this.anchorControl()).setValue(value.isAnchor);
            controls.get(this.couchDBControl()).setValue(value.couchDB);
          }
        }
      });
    } else {
      // this.addMember();
      this.entities.push(new Client(undefined, this.org, true, null));
      const typeControl = this.addMemberControl(0).get(this.typeControl());
      typeControl.setValue('Admin');
      typeControl.disable();
    }
    this.parentForm.addControl(String(this.i), this.form);
    this.form.setValidators((control: FormGroup) => {
      const memberNames = Object.values(control.controls).filter(c => {
        const nameControl = c.get(this.nameControl());
        return c instanceof FormGroup && nameControl != null && nameControl.valid;
      }).map(o => o.get(this.nameControl()).value.trim());
      const set = new Set(memberNames);
      if (memberNames.length > set.size) {
        return {error: true};
      }
      return null;
    });
  }

  ngOnDestroy(): void {
    this.parentForm.removeControl(String(this.i));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isLocalhost && this.entities) {
      this.entities.forEach((e, index) => {
        if (changes.isLocalhost.currentValue === true) {
          if (e instanceof Peer || e instanceof Orderer) {
            const url = this.form.get(this.urlControl(index));
            url.setValidators([]);
            url.updateValueAndValidity();
            e.url = undefined;
          }
        } else {
          if (e instanceof Peer || e instanceof Orderer) {
            const url = this.form.get(this.urlControl(index));
            url.setValidators(Validators.required);
            url.updateValueAndValidity();
          }
        }
      });
    }
  }
}
