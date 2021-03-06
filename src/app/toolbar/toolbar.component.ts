import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../_services/authService';

export type Menu = { name: string, link: string, emit?: boolean };

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  title = 'HyperledgerFabric Wizard';
  menus: Menu[] = [];
  @Input() threeDots: Menu[] = [];
  @Output() threeDotsSelected: EventEmitter<Menu> = new EventEmitter<Menu>();
  @Input() loading = false;
  dropdown: { name: string, menus: Menu[] };

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    if (this.authService.isLogged()) {
      this.dropdown = {
        name: this.authService.getEmail(), menus: [
          {name: 'Shared with me', link: '/shared'},
          ...this.threeDots,
          {name: 'Logout', link: '/logout'}
        ]
      };
    }
    switch (this.router.url) {
      case '/login':
        this.menus.push({name: 'Sign up', link: '/signup'});
        break;
      case '/signup':
        this.menus.push({name: 'Login', link: '/login'});
        break;
      case '/':
        break;
    }
  }

}
