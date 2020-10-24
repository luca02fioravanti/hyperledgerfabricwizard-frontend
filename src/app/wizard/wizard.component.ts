import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Network} from '../_models/fabric/network';
import {Loading} from '../_services/loading';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as FileSaver from 'file-saver';
import {ImportDialogComponent} from './import-dialog/import-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Menu} from '../toolbar/toolbar.component';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit, Loading {
  network: Network;
  loading = false;
  dropping = false;
  @ViewChild('importFile', {static: true}) input: ElementRef;
  file: File;
  menus: Menu[] = [];

  constructor(private snackbar: MatSnackBar, private dialog: MatDialog) {
    const network = localStorage.getItem('json');
    if (network) {
      this.network = Network.parse(JSON.parse(network));
      localStorage.removeItem('json');
    } else {
      this.network = new Network();
    }
  }

  ngOnInit(): void {
    this.menus.push({name: 'Import', link: '', emit: true},
      {name: 'Export', link: '', emit: true});
  }

  handleMenu(menu: Menu): void {
    if (menu.name === 'Import') {
      this.import();
    }
    if (menu.name === 'Export') {
      this.export();
    }
  }

  export(): void {
    const blob = new Blob([JSON.stringify(this.network)], {type: 'text/json;charset=utf-8'});
    FileSaver.saveAs(blob, 'config.json');
  }

  import(): void {
    this.input.nativeElement.click();
  }

  fileToImportSelected(file: File): void {
    if (file.type !== 'application/json') {
      this.snackbar.open('Unsupported file', null, {
        duration: 2000
      });
      return;
    }
    this.file = file;
    this.dialog.open(ImportDialogComponent)
      .afterClosed()
      .subscribe(d => {
        if (d.result) {
          this.loadData();
          this.file = undefined;
        } else {
          this.file = undefined;
        }
      });
    this.input.nativeElement.value = '';
  }

  loadData(): void {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      try {
        const json = JSON.parse(fileReader.result as string);
        localStorage.setItem('json', JSON.stringify(json));
        location.reload();
      } catch (e) {
        localStorage.clear();
        this.snackbar.open('Unsupported file', null, {
          duration: 2000
        });
      }
    };
    fileReader.readAsText(this.file);
  }
}
