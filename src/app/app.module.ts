/* eslint-disable prettier/prettier */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { YoutubeApiInterceptor } from './core/services/youtube-api.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CoreModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: YoutubeApiInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent],
})
export class AppModule { }
