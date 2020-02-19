import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class Dev_apiService {

  DEV_API = environment.dev_api

  constructor(private http: HttpClient) { }
  getDev(pos, techs) {
    let params = new HttpParams().set("latitude", pos[1]).set("longitude", pos[0]).set("techs", techs);
    return this.http.get(`${this.DEV_API}searchNearby`, { headers: { 'Content-Type': 'application/json' }, params: params })
  }
}
