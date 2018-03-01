import {Component, OnInit} from '@angular/core';
import {ListService} from "../../services/listservice";

const BASE_URL = 'http://localhost:3000/api/';

@Component({
  selector: 'kze-lists',
  template: `
  <div>
    <h2>Listen</h2>
  
    <ul class="list-group">
      <li class="list-group-item" *ngFor="let listId of listIds">
         <list-view [listId]="listId"></list-view>
      </li>
    </ul>
  </div>`,
  styles: []
})
export class ListsComponent implements OnInit {
  constructor(private listService: ListService) {}

  listIds: number[];

  ngOnInit() {
    this.listService.getListIds().subscribe(listIds => {
      this.listIds = listIds;
    });
  }
}
