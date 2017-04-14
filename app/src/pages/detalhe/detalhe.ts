import { Component, NgZone } from '@angular/core'
import { Carro, CarroService } from '../../services/carro.service';
import { NavParams, NavController, Platform } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { Geolocation } from '@ionic-native/geolocation';
import {GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, GoogleMapsMarkerOptions, Toast, GoogleMapsMarker} from 'ionic-native';
import 'rxjs/add/operator/map';

@Component({
    selector: 'page-detalhe',
    templateUrl: 'detalhe.html',
    providers: [CarroService, Geolocation]
})

export class DetalhePage {
  carro: Carro;
  private map: GoogleMap;
  latLng: any;

  constructor(
      private navParams: NavParams, 
      public carroService: CarroService, 
      public navCtrl: NavController,
      private geolocation: Geolocation,
      private platform: Platform
  ) {
      this.carro = navParams.get('carro');
      let coord = this.carro.last_location.split(',');
      console.log(coord);
      
      //this.platform.ready().then(() => this.onPlatformReady());

      this.platform.ready().then(() => {
        if(this.carro.last_location){
          this.loadMap( coord[0], coord[1] );
        } else {
          Toast.show("Carro não possui coordenadas cadastradas.", '5000', 'bottom').subscribe(
          toast => {
            console.log(toast);
          }
        );
        }
      });

  }
  
  loadMap(lat, lgt){
        this.latLng = new GoogleMapsLatLng(lat, lgt);
        this.map = new GoogleMap('map', {
          'backgroundColor': 'white',
          'center': this.latLng,
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true,
            'zoom': true
          },
          'gestures': {
            'scroll': true,
            'tilt': false,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            'latLng': this.latLng,
            'tilt': 30,
            'zoom': 15,
            'bearing': 50
          }
        });
        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
            this.map.clear();
            this.map.setCenter(this.latLng);
            this.setMarker();
        });
    }
    
    setMarker(){
      if(this.latLng){
        //let customMarker = "www/assets/custom-marker.png";
        let markerOptions: GoogleMapsMarkerOptions = {
          position: this.latLng,
          title: 'última localização'
          //icon: customMarker
        };
        this.map.addMarker(markerOptions)
          .then((marker: GoogleMapsMarker) => {
            marker.showInfoWindow();
        });
      } else {
        Toast.show("Não foi possível obter a sua localização.", '5000', 'bottom').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
  }

  marcar() {
    this.carro.status = !this.carro.status;
    if(this.carro.status==true){
        this.geolocation.getCurrentPosition().then((resp) => {
          console.log(resp);
            this.carro.last_location = resp.coords.latitude + "," + resp.coords.longitude;
            this.loadMap(resp.coords.latitude, resp.coords.longitude);
            console.log(resp.coords.latitude + "," + resp.coords.longitude)
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }
    this.carroService.update(this.carro.id, this.carro).subscribe();
  }

  excluir() {
    this.carroService.remove(this.carro.id)
      .subscribe(() => this.navCtrl.pop());
  }

  tirarFoto() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 150,
      targetHeight: 150
    }).then((imageData) => {
      this.carro.foto = "data:image/jpeg;base64," + imageData;
      this.carroService.update(this.carro.id, this.carro).subscribe();
    }, (err) => {
      console.log(err);
    });
  }
}