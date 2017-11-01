import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'favorite',
  template: `<span role="button" 
        (click)="onClick()" 
        class="glyphicon gi-2x"
        [style.color] = "isSelected ? 'red' : 'black'"
        [class.glyphicon-star]="isSelected"
        [class.glyphicon-star-empty] ="!isSelected"   ></span>
        `,
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent {
  @Output("change") change = new EventEmitter();
  @Input() isSelected: boolean = false;
  timesChanged = 0;
  constructor() { }

  onClick(){
    this.isSelected = !this.isSelected;
    this.timesChanged++;
    if (this.isSelected) this.change.emit(this.timesChanged);
  }

}
