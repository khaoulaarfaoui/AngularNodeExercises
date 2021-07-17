import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root',
})
export class CrudProductsService {
  crudAPI = 'https://fakestoreapi.com/products';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product> {
    return this.http
      .get<Product>(this.crudAPI)
      .pipe(retry(1), catchError(this.handleError));
  }
  getProduct(id: number) {
    return this.http.get<Product>(this.crudAPI + '/' + id, {
      headers: this.httpHeaders,
    });
  }
  createProduct(product: Product): Observable<Product> {
    return this.http
      .post<Product>(this.crudAPI + '/', product, {
        headers: this.httpHeaders,
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteProduct(id: number) {
    return this.http
      .delete(this.crudAPI + '/' + id, {
        headers: this.httpHeaders,
      })
      .pipe(retry(1), catchError(this.handleError));
  }
  updateProduct(id: number, produit: Product): Observable<Product> {
    return this.http
      .put<Product>(this.crudAPI + '/' + id, produit, {
        headers: this.httpHeaders,
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
