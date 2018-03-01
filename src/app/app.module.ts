import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {ListService} from "../../services/listservice";
import {ListsComponent} from "./lists.component";
import {ItemsComponent} from "./items.component";
import {ListViewComponent} from "./listView.component";
import {ItemViewComponent} from "./itemViewComponent";
import {ItemEditComponent} from "./itemEdit.component";
import {SocketIoConfig, SocketIoModule} from "ng-socket-io";

const routes: Routes = [
  { path: 'items', component: ItemsComponent },
  { path: 'lists', component: ListsComponent },
  { path: '', component: ListsComponent },
];

const socketIoConfig: SocketIoConfig = { url: 'http://localhost:3001', options: {}};

@NgModule({
  declarations: [
    AppComponent, ListsComponent, ItemsComponent,
    ListViewComponent, ItemViewComponent, ItemEditComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    RouterModule.forRoot(routes),
    SocketIoModule.forRoot(socketIoConfig)
  ],
  providers: [ListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
