import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {List, Item} from '../src/app/models';
import {Subject} from "rxjs/Subject";
import {Socket} from 'ng-socket-io';

const BASE_URL = 'http://localhost:3000/api/';

@Injectable()
export class ListService {

  constructor(private http: HttpClient, private socket: Socket) {}

  getListIds(): Observable<number[]> {
    let obs = new Subject<number[]>();

    this.http.get<List[]>(BASE_URL+'lists/').subscribe(lists => {
      let ids: number[] =[];

      lists.forEach(list => {
        ids.push(list.id);
      });

      obs.next(ids);
    }, error => {
      console.log(error.message);
    });

    return obs;
  }

  getList(id: number): Observable<List> {
    return this.http.get<List>(`${BASE_URL}lists/${id}`)
      .publishReplay(1).refCount();
  }

  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(`${BASE_URL}items/${id}`)
      .publishReplay(1).refCount();
  }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${BASE_URL}items/`)
      .publishReplay(1).refCount();
  }

  saveItem(item: Item): void {
    if (item.id) {
      this.http.put<Item>(`${BASE_URL}items/${item.id}`, item).subscribe(r => {
        console.log(`PUT ${JSON.stringify(r)}`);
        this.broadcastItemsUpdate(item);
      })
    } else {
      this.getAllItems().subscribe(items => {
        let nextItemId= items.reduce((itp,itv) => itp.id > itv.id ? itp : itv).id +1;
        item.id = nextItemId;
        this.http.post<Item>(`${BASE_URL}items/`, item).subscribe(r => {
          console.log(`POST ${JSON.stringify(r)}`);
          this.broadcastItemsUpdate(item);
        });
      }, error => {
        console.log(error.message);
      });
    }
  }

  deleteItem(item: Item): void {
    this.http.delete<Item>(`${BASE_URL}items/${item.id}`).subscribe(r => {
      console.log(`DELETE ${JSON.stringify(r)}`);
      this.broadcastItemsUpdate(item);
    }, error => {
      console.log(error.message)
    });
  }

  broadcastItemsUpdate(item: Item) {
    this.socket.emit('broadcast', item);
  }

  receiveItemsUpdate() {
    return this.socket
      .fromEvent('update')
      .map(data => data).share();
  }
}
