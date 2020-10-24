import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';


@Directive({
  selector: '[appDroppable]'
})
export class DroppableDirective {
  @HostBinding('class.fileover') fileOver: boolean;
  @Output() fileDropped = new EventEmitter<any>();
  @Output() over = new EventEmitter<boolean>();

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
    this.over.emit(true);
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    this.over.emit(false);
  }

  // Drop listener
  @HostListener('drop', ['$event'])
  public ondrop(evt): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    this.over.emit(false);
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }

}
