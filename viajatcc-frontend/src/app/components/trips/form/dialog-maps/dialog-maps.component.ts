import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-maps',
  standalone: false,
  templateUrl: './dialog-maps.component.html',
  styleUrl: './dialog-maps.component.scss'
})
export class DialogMapsComponent implements AfterViewInit  {
  @ViewChild('mapElement', { static: false }) mapElement!: ElementRef;

  map!: google.maps.Map;
  marker!: google.maps.Marker;
  geocoder!: google.maps.Geocoder;
  responseDiv!: HTMLElement;
  response!: HTMLElement;

  constructor(private dialog: MatDialogRef<DialogMapsComponent>) {}

  ngAfterViewInit(): void {
    this.loadGoogleMapsScript().then(() => {
      this.initMap();
    });
  }

  private loadGoogleMapsScript(): Promise<void> {
    return new Promise((resolve) => {
      if ((window as any).google) {
        resolve();
      } else {
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=SUA_API_KEY&callback=initMap';
        script.async = true;
        script.defer = true;
        (window as any).initMap = () => resolve();
        document.head.appendChild(script);
      }
    });
  }

  private initMap(): void {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 10,
      center: { lat: -23.4045877, lng: -46.4196069 },
      mapTypeControl: false
    });


    this.geocoder = new google.maps.Geocoder();

    const inputText = document.createElement('input');
    inputText.type = 'text';
    inputText.placeholder = 'Coloque o endereço';
    inputText.classList.add('input')

    const submitButton = document.createElement('input');
    submitButton.type = 'button';
    submitButton.value = 'Buscar';
    submitButton.classList.add('button', 'button-primary');

    const ConfirmButton = document.createElement('input');
    ConfirmButton.type = 'button';
    ConfirmButton.value = 'Confirmar';
    ConfirmButton.id = 'confirm'
    ConfirmButton.classList.add( 'button-disabled');
    ConfirmButton.disabled = true;

    const clearButton = document.createElement('input');
    clearButton.type = 'button';
    clearButton.value = 'Clear';
    clearButton.classList.add('button', 'button-secondary');

    this.response = document.createElement('pre');
    this.response.id = 'response';
    this.response.innerText = '';

    this.responseDiv = document.createElement('div');
    this.responseDiv.id = 'response-container';
    this.responseDiv.appendChild(this.response);

    const instructionsElement = document.createElement('p');
    instructionsElement.id = 'instructions';
    instructionsElement.innerHTML = '<strong>Instructions</strong>: Enter an address in the textbox to geocode or click on the map to reverse geocode.';

    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(ConfirmButton);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
    this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(instructionsElement);
    this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(this.responseDiv);

    this.marker = new google.maps.Marker({
      map: this.map
    });

    this.map.addListener('click', (e: google.maps.MapMouseEvent) => {
      this.geocode({ location: e.latLng! });
    });

    submitButton.addEventListener('click', () => {
      this.geocode({ address: inputText.value });
    });
    ConfirmButton.addEventListener('click', () => {
      this.geocodeConfirm({ address: inputText.value }, inputText.value);
    });

    clearButton.addEventListener('click', () => {
      this.clear();
    });

    this.clear();
  }

  private clear(): void {
    this.marker.setMap(null);
  }

  private geocode(request: google.maps.GeocoderRequest): void {
    this.clear();
    this.geocoder
      .geocode(request)
      .then((result) => {
        const { results } = result;
        console.log(result)
        this.map.setCenter(results[0].geometry.location);
        this.map.setZoom(16)
        this.marker.setPosition(results[0].geometry.location);
        this.marker.setMap(this.map);
        const confirm = document.getElementById('confirm')  as HTMLInputElement
        confirm?.classList.remove('button-disabled')
        confirm?.classList.add('button-primary')
        confirm.disabled = false
      })
      .catch((e) => {
        alert('Geocode was not successful: ' + e);
      });
  }
  geocodeConfirm(request: google.maps.GeocoderRequest, namePoint: string){
    this.clear();
    this.geocoder.geocode(request).then((result) => {
        const { results } = result;
        this.dialog.close({result: results[0], namePoint})
      })
      .catch((e) => {
        alert('Geocode was not successful: ' + e);
      });
  }
}
