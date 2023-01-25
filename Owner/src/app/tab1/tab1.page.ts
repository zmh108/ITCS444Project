import { Component, ViewChild } from '@angular/core';
import { Item, ItemsService } from '../items.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Chart } from 'chart.js';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Console } from 'console';


import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexMarkers,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent
} from "ng-apexcharts";

export type ChartOptions = {
  chart: ApexChart;
  series: ApexAxisChartSeries | any[];
  stroke: ApexStroke;
  markers: ApexMarkers;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  colors: any[];
  labels: any[];
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  fill: ApexFill;
  plotOptions: ApexPlotOptions;
};


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  public barOptions: Partial<ChartOptions> | any;
  public radial: Partial<ChartOptions> | any;

  searchTerm:string = "";

  Items: any;
  Categories: any;


  public index: any;
  public item: Item = {} as Item;
  id=-1;

  public n: number[] = [];
  public c: string[]= [];
  public a: number[] = [];
  public i = 0;
  public j = 0;
  public r = 0;
  public m: number= 0;
  public d = 0;
  public t = 0;
  public f = 0;
  public p = 0;

  public k = 0;
  constructor(public DataSrv: ItemsService, private firestore: AngularFirestore, public activatedRoute: ActivatedRoute, public route: Router) {
    this.firestore
    .collection('Items')
    .valueChanges({idField: 'id'})
    .subscribe((Items) => {
      this.Items = Items;
      console.log(Items);
      for(this.r; this.r<this.Items.length; this.r++){
        if(this.Items[this.r].Quantity<this.Items[this.r].Threshold)
        this.m++;
      };
      this.m = (this.m/this.Items.length);
      this.m =+ (this.m*100).toFixed(3);
      this.a.push(this.m);

      
      for(this.j; this.j < Items.length; this.j++){
        if(this.Items[this.j].Category=='Dairy'){
          this.d++;
        }
        if(this.Items[this.j].Category=='Fruits & Vegetables'){
          this.f++;
          }
          if(this.Items[this.j].Category=='Coffee & Tea'){
            this.t++;
            }
            if(this.Items[this.j].Category=='Pastas'){
              this.p++;
            }
        };

      
    });


    this.firestore
    .collection('Categories')
    .valueChanges({idField: 'id'})
    .subscribe((Categories) => {
      this.Categories = Categories;
      console.log(Categories);

      for(this.i; this.i < this.Categories.length; this.i++){
        this.c.push(this.Categories[this.i].Category);
      };
      console.log(this.c);

      for(this.k; this.k< 1; this.k++ ){
        this.n.push(this.d);
        this.n.push(this.t);
        this.n.push(this.p);
        this.n.push(this.f);
      };
      console.log(this.n);
  });


    this.barChart();
    this.radialChart();

    

}

ngOnInit() {

}




barChart() {
  this.barOptions = {
    chart: {
      type: 'bar',
      height: 230,
      width: '100%',
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    series: [
      {
        name: 'Items',
        data: this.n,
      },
    ],
    labels: this.c,
    grid: {
      borderColor: '#fff',
      padding: {
        right: 0,
        left: 0,
      },
    },
    xaxis: {
      labels: {
        show: true,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: '#fff',
        },
      },
    },
    title: {
      text: 'Items per Category',
      align: 'left',
      style: {
        fontSize: '16px',
        colors: '#fff',
      },
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      labels: {
        colors: '#fff',
      },
    },
  };
}


  radialChart() {
    this.radial = {
      chart: {
        type: 'radialBar',
        height: 180,
      },
      series: this.a,
      plotOptions: {
        radialBar: {
          track: {
            background: '#c7c7c7',
            margin: 0,
            strokeWidth: '70%',
          },
          dataLabels: {
            name: {
              color: '#fff',
              offsetY: -10,
              fontSize: '14px',
            },
            value: {
              color: '#fff',
              fontSize: '20px',
              offsetY: 0,
            },
          },
          hollow: {
            size: '65%',
          },
        },
      },
      fill: {
        colors: ['#fd6585'],
      },
      labels: ['Items below Threshold'],
    };
  
}



}