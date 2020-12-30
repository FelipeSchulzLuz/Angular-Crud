import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from './../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  product!: Product;
  constructor(
    private ProductService: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id
    console.log(id);
    this.ProductService.readById(id).subscribe(product => {
      this.product = product
    })
  }

  deleteProduct(): void {
    this.ProductService.delete(`${this.product.id}`).subscribe(() => {
      this.ProductService.showMessage('Produto removido com sucesso')
      this.router.navigate(["/products"])
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }

}
