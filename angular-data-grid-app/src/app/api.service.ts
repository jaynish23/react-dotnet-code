import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_URL = 'http://localhost:5189/api';

  constructor(private http: HttpClient) { }

  getProducts(page: number): Observable<any> {
    return this.http.get(`${this.API_URL}/Products?page=${page}`);
  }

  getOrders(): Observable<any> {
    return this.http.get(`${this.API_URL}/Orders`);
  }

  getCustomers(page: number): Observable<any> {
    return this.http.get(`${this.API_URL}/Customers?page=${page}`);
  }

  getInventory(page: number): Observable<any> {
    return this.http.get(`${this.API_URL}/Inventory?page=${page}`);
  }

  getSuppliers(page: number): Observable<any> {
    return this.http.get(`${this.API_URL}/Suppliers?page=${page}`);
  }
}