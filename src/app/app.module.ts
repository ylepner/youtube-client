/* eslint-disable prettier/prettier */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { YoutubeApiInterceptor } from './core/services/youtube-api.interceptor';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './redux/reducers';
import { EffectsModule } from '@ngrx/effects';
import { YoutubeApiEffects } from './redux/effects/youtube-api.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CoreModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers: metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true
      },
    }),
    EffectsModule.forRoot([YoutubeApiEffects])
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
