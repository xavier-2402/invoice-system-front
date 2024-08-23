import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Product } from 'src/app/models/product';
import { Supplier } from 'src/app/models/supplier';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products:Product[];
  showModal:boolean = false;
  form:UntypedFormGroup;
  action:number = 0;
  productSelected:Product;
  suppliers:Supplier[]=[];

  constructor(private service:ProductService, private fb:FormBuilder, private msg:NzMessageService){
    this.buildForm();
  }
   
  ngOnInit(): void {
    this.getproducts();
    this.getSuppliers();
  }

  buildForm(){
    this.form = this.fb.group({
      unitPrice:[0,[Validators.required]],
      name:[null,Validators.required],
      supplier:[null,[Validators.required]]
    });
  }

  openAdd(){
    this.action = 1;
    this.showModal = true;
    this.form.reset();
  }

  openEdit(product:Product){
    this.action = 2;
    this.productSelected = product;
    this.showModal = true;
    this.form.get('name').setValue(product.name);
    this.form.get('unitPrice').setValue(product.unitPrice);
    this.form.get('supplier').setValue(product.supplier.supplierId);
  }

  close(){
    this.showModal = false;
  }

  Ok(){
    if(!this.form.valid){
      this.msg.warning('Ingrese la información correcta');
      return;
    }

    let supplier:Supplier={
      supplierId: this.form.get('supplier').value
    }
    let product:Product={
      stock: 0,
      unitPrice:this.form.get('unitPrice').value,
      iva:true,
      name:this.form.get('name').value,
      sales:0,
      supplier: supplier
    }

    if(this.action == 1){
      this.service.add(product).subscribe({
        next:()=>{
          this.msg.success('Agregado correctamente');
          this.showModal = false;
          this.getproducts();
        }
      })
    }else if(this.action == 2){
      product.productId = this.productSelected.productId;
      this.service.update(product).subscribe({
        next:()=>{
          this.msg.success('Actualizado correctamente');
          this.showModal = false;
          this.getproducts();
        }
      })

    }
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

  getSuppliers(){
    this.service.getSuppliers().subscribe({
      next:(response)=>{
        this.suppliers = response;
      }
    })
  }
}
