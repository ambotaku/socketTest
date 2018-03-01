import {Component, EventEmitter, Input, OnChanges, Output} from "@angular/core";
import {Item} from "./models";
import {ListService} from "../../services/listservice";

@Component({
  selector: 'item-edit',
  template: `
  <div class="row">
    <input type="number" id="count" class="form-control col-sm-1" [value]="item.count" 
           (change)="item.count=$event.target.value">
    <input type="text" id="name" class="form-control col-sm-8" [value]="item.name" 
           (change)="item.name=$event.target.value">
    <button class="btn btn-primary" (click)="delete()"><i class="fa fa-times"></i></button>
    <button class="btn btn-primary" (click)="update()"><i class="fa fa-save"></i></button>
  </div>`
})
export class ItemEditComponent {
  @Input() item: Item;
  @Output() result= new EventEmitter<Item>();

  update(target: any)
  {
    this.result.emit(this.item);
  }

  delete() {
    this.item.count = 0;
    this.result.emit(this.item);
  }
}