import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtInterceptor, ErrorInterceptor } from '@shared/helpers';
import { fakeAuthBackendProvider } from '@authentication/helpers';
import { fakeFeedBackendProvider } from '@feed/helpers';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    ButtonComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeAuthBackendProvider,
    fakeFeedBackendProvider
  ],
  exports: [HeaderComponent]
})

export class SharedModule { }
