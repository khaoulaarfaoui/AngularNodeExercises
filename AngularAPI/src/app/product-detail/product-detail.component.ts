import { Component, OnInit } from '@angular/core';
import { CrudProductsService } from '../service/crud-products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/Product';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  id: string;
  product: Product;
  productForm: FormGroup;

  constructor(
    private productService: CrudProductsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.productService.getProduct(parseInt(this.id)).subscribe((data) => {
      this.product = data;
    });
    this.productForm = new FormGroup({
      idProduct: new FormControl(),
      title: new FormControl(),
      category: new FormControl(),
      price: new FormControl(),
      description: new FormControl(),
    });
  }
  updateProduct(id: number) {
    this.productService
      .updateProduct(id, this.productForm.value)
      .subscribe((res) => {
        this.product = res;
      });
  }

  get idProduct() {
    return this.productForm.get('id');
  }
  get title() {
    return this.productForm.get('title');
  }

  get category() {
    return this.productForm.get('category');
  }

  get price() {
    return this.productForm.get('price');
  }

  get description() {
    return this.productForm.get('description');
  }
}
