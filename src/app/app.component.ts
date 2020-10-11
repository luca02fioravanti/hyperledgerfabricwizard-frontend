import {Component, Inject, OnInit} from '@angular/core';
import {ThemingService} from './_services/theming.service';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hyperledgerfabricwizard';

  constructor(private themingService: ThemingService, @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit(): void {
    this.themingService.theme.subscribe((theme: string) => {
      this.themingService.themes.forEach(t => {
        this.document.body.classList.remove(t);
      });
      this.document.body.classList.add(theme);
    });
  }
}
