import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products:Product[];

  constructor(private service:ProductService){

  }
   
  ngOnInit(): void {
    this.getproducts();
  }

  openAdd(){

  }

  getproducts(){
    this.products = [];
    this.service.getAll().subscribe({
      next:(response)=>{
        this.products = response;
        this.products = this.products.sort((a, b) => a.name.localeCompare(b.name))
      }
    })
  }

  updateSale(productId:number){
    this.service.plusSale(productId,1).subscribe({
      next:()=>{
        this.getproducts();
      }
    });
  }
}
