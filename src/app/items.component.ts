import {Component, OnInit} from "@angular/core";
import {ListService} from "../../services/listservice";
import {Item} from "./models";

@Component({
  selector: 'kze-items',
  template: `<div>
    <h2>Items</h2>

    <ul class="list-group">
      <li class="list-group-item" *ngFor="let item of items">
        <item-edit [item]="item" (result)="changeItem($event)"></item-edit>
      </li>
      <li class="list-group-item">
        <h5>add new item</h5>
        <item-edit [item]="newItem" (result)="changeItem($event)"></item-edit>
      </li>
    </ul>
  </div>`,
  styles: []
})
export class ItemsComponent implements OnInit {
  constructor(private listService: ListService) {}

  items: Item[];
  newItem: Item = { count: 1, name: ''} as Item;

  changeItem(item: Item) {
    if (item.count != 0) {
      this.listService.saveItem(item);
    } else {
      this.listService.deleteItem(item);
    }
  }

  ngOnInit() {
    this.listService.getAllItems().subscribe(items => {
      this.items = items;
    });

    this.listService.receiveItemsUpdate().subscribe(data => {
      let item = data as Item;
      if (item.count) {
        let oldItem = this.items.find(it => it.id === item.id);
        if (oldItem) {
          oldItem.name = item.name;
          oldItem.count = item.count;
        } else {
          this.items.push(item);
          this.newItem = { count: 1, name: ''} as Item;
        }
      } else {
        this.items = this.items.filter(it => it.id !== item.id);
      }
    }, error => {
      console.log(error.message);
    });
  }
}