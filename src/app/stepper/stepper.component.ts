import {Component, OnInit} from '@angular/core';
import {CdkStepper} from '@angular/cdk/stepper';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [{provide: CdkStepper, useExisting: StepperComponent}]
})
export class StepperComponent extends CdkStepper implements OnInit {
  ngOnInit(): void {

  }

  onClick(index: number): void {
    if (this.selected && this.selected.stepControl) {
      this.selected.stepControl.markAllAsTouched();
    }
    this.selectedIndex = index;
  }

  next(): void {
    if (this.selected && this.selected.stepControl) {
      this.selected.stepControl.markAllAsTouched();
    }
    super.next();
  }

  previous(): void {
    if (this.selected && this.selected.stepControl) {
      this.selected.stepControl.markAllAsTouched();
    }
    super.previous();
  }
}
