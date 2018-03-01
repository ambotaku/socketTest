import {Component, Input, OnChanges, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Item, List} from "./models";
import {ListService} from "../../services/listservice";

@Component({
  selector: 'list-view',
  template: `
    <div class="col-sm-9">
      <div class="row">
        <input type="text" class="form-control col-sm-9" [value]="list?.name">
        <ul class="list-group col-sm-12">
          <li class="list-group-item" *ngFor="let itemId of list?.items">
            <item-view [itemId]="itemId" [items]="items"></item-view>
          </li>
        </ul>
      </div>
      <div class="row">
        <input type="number" class="form-control col-sm-1">
        <select class="form-control col-sm-7" [value]="newItem?.id">
          <option *ngFor="let item of items" [value]="newItem?.id">{{item?.name}}</option>
        </select>
        <button class="btn btn-dark"><i class="fa fa-plus-circle"></i></button>
        <button class="btn btn-dark"><i class="fa fa-save"></i></button>
      </div>
    </div>`
})
export class ListViewComponent implements OnInit {
  @Input() listId: number;
  list: List;
  items: Item[];
  newItem: Item = {id: 1, count: 1, name: ''} as Item;

  constructor(private listService: ListService) {}

  ngOnInit() {
    this.listService.getAllItems().subscribe(items => {
      this.items = items;
    });
    this.listService.getList(this.listId)
      .subscribe(list => {
        this.list = list;
      })
  }
}