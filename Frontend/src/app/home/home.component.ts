import { Component, OnInit } from '@angular/core';
import { ProductCrudService } from '../service/product-crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  Products: any = [];

  constructor(private productService: ProductCrudService) {}

  ngOnInit(): void {
    this.productService.GetBooks().subscribe((res) => {
      console.log(res);
      this.Products = res;
    });
  }

  delete(id: any, i: any) {
    console.log(id);
    if (window.confirm('Do you want to delete this?')) {
      this.productService.deleteBook(id).subscribe((res) => {
        this.Products.splice(i, 1);
      });
    }
  }
}
