import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CarrosPage } from '../pages/carros/carros';
import { DetalhePage } from '../pages/detalhe/detalhe';

@NgModule({
  declarations: [
    MyApp,
    CarrosPage,
    DetalhePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CarrosPage,
    DetalhePage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
