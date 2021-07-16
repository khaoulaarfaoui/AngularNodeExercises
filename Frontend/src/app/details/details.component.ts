import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductCrudService } from '../service/product-crud.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  getId: any;
  updateForm: FormGroup;
  image: String;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private productService: ProductCrudService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.productService.GetBook(this.getId).subscribe((res) => {
      this.image = res.image;
      this.updateForm.setValue({
        id: res['id'],
        title: res['title'],
        price: res['price'],
        description: res['description'],
      });
    });

    this.updateForm = this.formBuilder.group({
      id: [''],
      title: [''],
      price: [''],
      description: [''],
    });
  }

  ngOnInit() {}

  onUpdate(): any {
    this.productService.updateBook(this.getId, this.updateForm.value).subscribe(
      () => {
        console.log('Data updated successfully!');
        this.ngZone.run(() => this.router.navigateByUrl('/home'));
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
