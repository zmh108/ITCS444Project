import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  favlist = [];

  orders=[
    {Name: "Order 01", Date: "25-07-2022", Supplier: "Bab Almorad", Status: "Review", 
    Items: 
    [{Img: "pizza-outline", Name: "Pizza", Desc: "Very tasty", Qty: 36},
    {Img: "rose-outline", Name: "Roses", Desc: "Beautiful", Qty: 14}] 
  },

    {Name: "Order 02",Date: "25-07-2022", Qty: 80, Supplier: "Bab Almorad", Status: "Canceled",
  Items: 
    [{Img: "rose-outline", Name: "Roses", Desc: "Beautiful", Qty: 7}] 
  },

  {Name: "Order 03",Date: "23-07-2022", Supplier: "Bab Almorad", Status: "Review",
  Items: 
    [    {Img: "pizza-outline", Name: "Pizza", Desc: "Very tasty", Qty: 36},
    {Img: "rose-outline", Name: "Roses", Desc: "Beautiful", Qty: 9},
    {Img: "person-outline", Name: "Ahmad", Desc: "Useful", Qty: 30}] 
  },
  {Name: "Order 04",Date: "23-07-2022", Supplier: "Bab Almorad", Status: "Pending",
  Items: 
    [{Img: "rose-outline", Name: "Roses", Desc: "Beautiful", Qty: 11},
    {Img: "person-outline", Name: "Ahmad", Desc: "Useful", Qty: 7}] 
  }
  ]

  Items=[
    {Img: "../../assets/icon/dairy.png", Name: "Pizza", Desc: "Very tasty", Qty: 36},
    {Img: "../../assets/icon/pasta.png", Name: "Roses", Desc: "Beautiful", Qty: 9},
    {Img: "person-outline", Name: "Ahmad", Desc: "Useful", Qty: 30}
  ]


}

/*
  favlist = [];
  Total=0; //total price of items in the cart
  cart=[];
  orders = [
    { 
     name:"Order# MJSJSN18392",
    date:"2022-12-3",
    status:"Processing",
    TotalPrice:this.Total,
    item:[],
  }
   ];

}
*/

