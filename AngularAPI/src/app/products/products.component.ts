import { Component, OnInit } from '@angular/core';
import { CrudProductsService } from '../service/crud-products.service';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
} from '@angular/forms';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any = [];
  constructor(private productService: CrudProductsService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe((data) => {
      console.log(id);
      this.products.splice(id, 1);
    });
  }
}
