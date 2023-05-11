import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WpServiceService {

  constructor(private http: HttpClient) { }

  async getQr(): Promise<any> {
    return JSON.parse(JSON.stringify(await this.http.get('https://wpservicecoy.onrender.com/wp-message/qr').toPromise()))['message'];
  }
  async getStatus() {
    return JSON.parse(JSON.stringify(await this.http.get('https://wpservicecoy.onrender.com/wp-message/status').toPromise()))['message'];
  }
  async getSent() {
    return JSON.parse(JSON.stringify(await this.http.get('https://wpservicecoy.onrender.com/wp-message/sent').toPromise()))['message'];
  }
  async getError() {
    return JSON.parse(JSON.stringify(await this.http.get('https://wpservicecoy.onrender.com/wp-message/error').toPromise()))['message'];
  }
  async sendFile(file: File, message: string) {
    const formData: FormData = new FormData();

    formData.append('xlsx', file);
    formData.append('message', message)
    return await this.http.post('https://wpservicecoy.onrender.com/wp-message', formData).toPromise()
  }

}
