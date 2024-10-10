import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { CharactersService } from 'src/app/services/characters.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit, AfterViewChecked {
  isSupported = false;
  barcodes: Barcode[] = [];
  characters: any[] = [];
  mapInitialized = false; // Para evitar inicializar varias veces los mapas

  constructor(private alertController: AlertController, private characterServ: CharactersService, private localStor: LocalstorageService) {}

  ngOnInit() {
    this.cargarLocalStorage();
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  ngAfterViewChecked() {
    if (!this.mapInitialized && this.characters.length > 0) {
      this.characters.forEach((data, index) => {
        const mapId = 'map' + index;
        this.initializeMap(data.latitude, data.longitude, mapId);
      });
      this.mapInitialized = true; // Evitamos inicializar los mapas más de una vez
    }
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermission();
    if (!granted) {
      this.presentAlert();
      return;
    }

    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
    const urlApi = this.barcodes[0].rawValue;
    this.fetchCharacterByUrl(urlApi);
  }

  async requestPermission(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please enable camera access to use the barcode scanner.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async fetchCharacterByUrl(endpoint: string) {
    this.characterServ.getDataByUrl(endpoint).subscribe((data) => {
      this.addItemLocalStor(data);
    });
  }

  async addItemLocalStor(data: any) {
    let qrpeople = this.localStor.getItemQR('qrpeople');
    const data_with_coords = await this.addLocationMetadata(data);
    qrpeople.push(data_with_coords);
    this.localStor.setItem('qrpeople', qrpeople);
    this.characters = qrpeople;
    this.mapInitialized = false; // Volvemos a permitir la inicialización de los mapas
  }

  cargarLocalStorage() {
    let qrpeople = this.localStor.getItemQR('qrpeople');
    this.characters = qrpeople;
  }

  async addLocationMetadata(data: any) {
    const coordinates = await Geolocation.getCurrentPosition();
    const { latitude, longitude } = coordinates.coords;

    data.latitude = latitude;
    data.longitude = longitude;
    data.time = new Date();
    return data;
  }

  initializeMap(latitude: number, longitude: number, mapId: string) {
    setTimeout(() => {
      const map = L.map(mapId).setView([latitude, longitude], 13);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);
  
      // Crear un ícono personalizado
      const customIcon = L.icon({
        iconUrl: 'assets/img/marker-icon.png',  // Ruta de la imagen
        iconSize: [32, 32], // Tamaño del ícono
        iconAnchor: [16, 32], // Punto donde el ícono apunta (mitad abajo)
        popupAnchor: [0, -32], // Punto donde se muestra el popup (por encima del ícono)
      });
  
      // Agregar el marcador con el ícono personalizado
      L.marker([latitude, longitude], { icon: customIcon }).addTo(map)
        .bindPopup('Ubicación del QR')
        .openPopup();
    }, 500); // Retraso para asegurar que el contenedor esté listo
  }
}
