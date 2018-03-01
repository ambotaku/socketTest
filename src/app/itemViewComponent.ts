import {Component, Input, OnInit} from "@angular/core";
import {Item} from "./models";
import {ListService} from "../../services/listservice";

@Component({
  selector: 'item-view',
  template: `
  <div class="row">
    <input type="number" class="form-control col-sm-1" [value]="item?.count">
    <select class="form-control col-sm-10" [value]="item?.id">
      <option *ngFor="let item of items" [value]="item?.id">{{item.name}}</option>
    </select>
    <button class="btn btn-dark"><i class="fa fa-times"></i></button>
  </div>`
})
export class ItemViewComponent implements OnInit {
  @Input() itemId: number;
  @Input() items: Item[];

  item: Item;

  constructor(private listService: ListService) {}

  ngOnInit() {
    this.listService.getItem(this.itemId).subscribe(item => {
      this.item = item;
    });
  }
}