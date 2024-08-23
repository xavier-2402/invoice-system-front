import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'src/app/models/chart-options';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {


  public chartOptions: Partial<ChartOptions>={
    series: [
      {
        name: "",
        data: []
      }
    ],
    chart: {
      height: 350,
      type: "bar"
    },
    options: {
      bar: {
        borderRadius: 8,
      }
    },
    title: {
      text: ""
    },
    xaxis: {
      categories: ["Productos"]
    },
    stroke: {
      colors: ['transparent'],
      width: 5,
    },
  }

  constructor(private productService:ProductService){

  }

  ngOnInit(): void {
    this.getDashboard();
  }

  getDashboard(){
    let products:Product[] = [];
    this.productService.getAll().subscribe({
      next:(response)=>{
        products = response;
        let values:any[] = [];
        let data = products;
        if(products.length > 10){
          data = products.slice(0,10);
        }
        for (const item of data) {
          values.push({name:item.name,data:[item.sales]});
        }
        this.chartOptions.series = values;
      }
    })
  }
}
