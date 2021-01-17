import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataFetchService } from '../data-fetch.service';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.less']
})
export class SecondPageComponent implements OnInit {

  items:any;
  usersFromHomePage:any;
  constructor(private service: DataFetchService,private activatedRoute: ActivatedRoute) {

    this.activatedRoute.queryParams.subscribe(params => {
      this.usersFromHomePage = params['users'].split(',');  
    });


    this.service.getData().subscribe(data => {
      this.items = [];  
      for(let i=0;i<this.usersFromHomePage.length;i++){  
        this.items.push(data.filter((x: { Name: string; }) => x.Name == this.usersFromHomePage[i])[0]);
      }   
    }); 
   }

  ngOnInit(): void {
  }
}
