import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Network} from '../../_models/fabric/network';
import {Channel} from '../../_models/fabric/channel';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
  form: FormGroup;
  @Input() network: Network;
  channels: Channel[];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({});
  }

  channelControl(i: number): string {
    return `channel-${i}`;
  }

  nameControl(i?: number): string {
    const name = 'name';
    if (i !== undefined) {
      return `${this.channelControl(i)}.${name}`;
    }
    return name;
  }

  consortiumControl(i?: number): string {
    const name = 'consortium';
    if (i !== undefined) {
      return `${this.channelControl(i)}.${name}`;
    }
    return name;
  }

  addChannel(): void {
    const length = this.channels.length;
    this.channels.push(new Channel());
    this.addChannelControls(length);
  }

  private addChannelControls(i: number): void {
    const innerForm = this.formBuilder.group({});
    const channelName = this.formBuilder.control('', [Validators.required]);
    const channelConsortium = this.formBuilder.control('', [Validators.required]);

    innerForm.addControl(this.nameControl(), channelName);
    innerForm.addControl(this.consortiumControl(), channelConsortium);

    this.form.addControl(this.channelControl(i), innerForm);

    channelName.valueChanges.subscribe(v => {
      this.channels[i].name = v?.trim();
    });
    channelConsortium.valueChanges.subscribe(v => {
      if (v) {
        this.channels[i].consortium = this.network.consortiums.find(c => {
          return c.name === v;
        });
        this.channels[i].orgs = this.channels[i].consortium.orgs;
      }
    });
  }

  removeChannel(): void {
    const length = this.channels.length;
    if (length > 1) {
      this.form.removeControl(this.channelControl(length - 1));
      this.channels.pop();
    }
  }

  ngOnInit(): void {
    this.channels = this.network.channels;
    if (!this.channels) {
      this.channels = [];
      this.network.channels = this.channels;
    }
    if (this.channels.length > 0) {
      this.channels.forEach((c, index) => {
        this.addChannelControls(index);
        this.form.get(this.nameControl(index)).setValue(c.name);
        this.form.get(this.consortiumControl(index)).setValue(c.consortium?.name);
      });
    } else {
      this.addChannel();
    }
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
}
