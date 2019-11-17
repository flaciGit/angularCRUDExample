import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api/in-memory-web-api.module';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateupdateComponent } from './createupdate/createupdate.component';
import { RouterModule } from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateupdateComponent
  ],
  imports: [
    NgbModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(DataService),
    RouterModule.forRoot([
      { path: '', component: ListComponent },
      { path: 'list', component: ListComponent },
      { path: 'update/:id', component: CreateupdateComponent },
      { path: 'create', component: CreateupdateComponent },
      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
