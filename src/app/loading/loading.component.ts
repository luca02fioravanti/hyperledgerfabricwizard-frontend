import {Component, Input, OnInit} from '@angular/core';
import {Loading} from '../_services/loading';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, Loading {
  @Input() loading = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
