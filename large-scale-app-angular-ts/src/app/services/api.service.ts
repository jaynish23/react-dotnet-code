import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductDto } from '../models/product.model';
import { OrderDto } from '../models/order.model';
import { CustomerDto } from '../models/customer.model';
import { InventoryDto } from '../models/inventory.model';
import { SupplierDto } from '../models/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5189/api';

  constructor(private http: HttpClient) {}

  getProducts(page: number): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${this.apiUrl}/Products`, {
      params: new HttpParams().set('page', page.toString())
    }).pipe(
      catchError(err => throwError(() => new Error(`Failed to fetch products: ${err.message}`)))
    );
  }

  getOrders(): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>(`${this.apiUrl}/Orders`).pipe(
      catchError(err => throwError(() => new Error(`Failed to fetch orders: ${err.message}`)))
    );
  }

  getCustomers(page: number): Observable<CustomerDto[]> {
    return this.http.get<CustomerDto[]>(`${this.apiUrl}/Customers`, {
      params: new HttpParams().set('page', page.toString())
    }).pipe(
      catchError(err => throwError(() => new Error(`Failed to fetch customers: ${err.message}`)))
    );
  }

  getInventory(page: number): Observable<InventoryDto[]> {
    return this.http.get<InventoryDto[]>(`${this.apiUrl}/Inventory`, {
      params: new HttpParams().set('page', page.toString())
    }).pipe(
      catchError(err => throwError(() => new Error(`Failed to fetch inventory: ${err.message}`)))
    );
  }

  getSuppliers(page: number): Observable<SupplierDto[]> {
    return this.http.get<SupplierDto[]>(`${this.apiUrl}/Suppliers`, {
      params: new HttpParams().set('page', page.toString())
    }).pipe(
      catchError(err => throwError(() => new Error(`Failed to fetch suppliers: ${err.message}`)))
    );
  }
}
