import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Carro, CarroService } from '../../services/carro.service';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { DetalhePage } from '../detalhe/detalhe';

@Component({
  selector: 'page-carros',
  templateUrl: 'carros.html',
  providers: [CarroService]
})
export class CarrosPage {
  items: Observable<Carro[]>;

  constructor(private CarroService: CarroService, public alertCtrl: AlertController, public navCtrl: NavController) {
    this.items = CarroService.get();
  }

  ionViewWillEnter(){
    this.items = this.CarroService.get();
  }
  /*
  doRefresh(refresher) {
   this.items = this.CarroService.get();
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 100);
  }
  */
  itemTapped(carro) {
    carro.status = !carro.status;
    this.CarroService.update(carro.id, carro).subscribe();
  }

  detalhe(ev, carro: Carro) {
    this.navCtrl.push(DetalhePage, { carro: carro });
    ev.stopPropagation();
  }

  addCarro() {
    let prompt = this.alertCtrl.create({
      title: 'Adicionar Carro',
      inputs: [{ name: 'carro', placeholder: 'nome do carro' }],
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Salvar',
          handler: data => {
            this.CarroService.add({ title: data.carro, status: true, last_location: "" })
              .subscribe(() => this.items = this.CarroService.get());
          }
        }
      ]
    });
    prompt.present();
  }

  removerCarro(ev, carro: Carro) {
    this.CarroService.remove(carro.id)
      .subscribe(() => this.items = this.CarroService.get());
      ev.stopPropagation();
  }
} 
