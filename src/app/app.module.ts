import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { ToastrModule } from 'ngx-toastr';
import { appRoutingModule } from './app.routing';

import { AuthenticationModule } from '@authentication/authentication.module';
import { FeedModule } from '@feed/feed.module';
import { SharedModule } from '@shared/shared.module';
import { FeedStoreModule } from '@store/feed/feed-store.module';

import { AppComponent } from './app.component';

const featureModules = [
  AuthenticationModule,
  FeedModule,
  SharedModule
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FeedStoreModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({}, {}),
    appRoutingModule,
    ...featureModules
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
