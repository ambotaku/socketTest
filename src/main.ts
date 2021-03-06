import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import "rxjs/add/operator/share";
import "rxjs/add/operator/publishReplay";
import "rxjs/add/operator/map";
import "rxjs/add/operator/max";
import "rxjs/add/operator/do";


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
