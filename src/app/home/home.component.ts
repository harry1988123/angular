import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserData  } from '../models/dataModel';
import { DataFetchService } from '../data-fetch.service';
import {SelectionModel} from '@angular/cdk/collections';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';

 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements AfterViewInit  {
  displayedColumns: string[] = ['select','Name', 'Price', 'Bet', 'Profile Image','level','win','lost'];
  dataSource: MatTableDataSource<UserData>;
  selection = new SelectionModel<UserData>(true, []);  

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort; 
  selectedName:any;
  constructor(private service: DataFetchService,private http: HttpClient) { 
    let users = new Array();
    this.service.getData().subscribe(data => {
      users = data;
      console.log(data);   
      this.dataSource = new MatTableDataSource(data); 
    });   
    this.dataSource = new MatTableDataSource(users);   
  } 

  ngOnInit() {     
    throw new Error('Method not implemented.');    
  }

  isAllSelected() {  
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;    
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));     
  } 

  checkboxLabel(row?: UserData): string {  
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }     
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Bet + 1}`;
  } 

  submit(){
    console.log(this.selection.selected.map((d) =>{ return d.Name }));     
    let params = new HttpParams();
    params = params.append('users',this.selection.selected.map((d) =>{ return d.Name }).join(','));
    console.log(params);    
    this.http.get("http://localhost:4200/second",{ params: params }); 
    window.location.href = "http://localhost:4200/second?" + params;
  }

   ngAfterViewInit() {    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }  
}
