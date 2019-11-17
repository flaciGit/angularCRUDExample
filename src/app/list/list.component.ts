import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../crud.service';

import { Model } from '../model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})


export class ListComponent implements OnInit {

  entries: Model[];
  statusCode: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crudService: CRUDService) { }

  ngOnInit() {
    this.getAll();
  }
  
  getAll(){
    this.crudService.getAll().subscribe((data : any[])=>{
      this.entries = data;
    });
  }

  delete(policyId){
    this.crudService.delete(policyId).subscribe(successCode =>{
      this.getAll();
    })
  }

}
