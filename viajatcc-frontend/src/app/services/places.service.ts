import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private apiUrl = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';
  private apiKey = 'SUA_GOOGLE_API_KEY_AQUI'; // Ou injete via environment

  constructor(private http: HttpClient) {}

  findPlace(input: string): Observable<any> {
    const params = new HttpParams()
      .set('input', input)
      .set('inputtype', 'textquery')
      .set('fields', 'place_id,formatted_address,geometry,name')
      .set('key', this.apiKey);

    return this.http.get(this.apiUrl, { params });
  }
}
