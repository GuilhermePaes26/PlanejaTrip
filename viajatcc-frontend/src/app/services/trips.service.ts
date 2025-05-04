import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { bus } from './bus.service';
import { user } from './user.service';

export interface Trip {
  _id?: string;
  nome: string;
  descricao?: string;
  preco: number;
  data: string;
  onibus: bus;
  passageiros: user[];
  startPoint: {namePoint: string, lat: number, lng: number}
}

@Injectable({
  providedIn: 'root',
})
export class TripsService {
  private readonly apiUrl = 'http://localhost:3000/trips';

  constructor(private http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl);
  }

  getTrip(id: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiUrl}/${id}`);
  }

  createTrip(trip: Trip): Observable<Trip> {
    console.log(trip);
    
    return this.http.post<Trip>(this.apiUrl, trip);
  }

  updateTrip(id: string, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiUrl}/${id}`, trip);
  }

  deleteTrip(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
