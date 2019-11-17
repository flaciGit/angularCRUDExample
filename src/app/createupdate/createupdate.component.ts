import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { CRUDService } from '../crud.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-createupdate',
  templateUrl: './createupdate.component.html',
  styleUrls: ['./createupdate.component.css']
})
export class CreateupdateComponent implements OnInit {

  current: any;
  currentIdToUpdate = null;

  createForm = new FormGroup({
		name: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crudService: CRUDService) { }

  ngOnInit() {

    if( this.route.snapshot.paramMap.get('id') ){
      this.currentIdToUpdate = this.route.snapshot.paramMap.get('id');
      this.loadToEdit(this.currentIdToUpdate);
    }
      
  }

  clearForm(){
    this.currentIdToUpdate = null;
    this.createForm = new FormGroup({
      name: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required)
    });

  }
  
  loadToEdit(currentId: string){
    this.crudService.getById(currentId).subscribe(current =>{
      this.currentIdToUpdate = current.id;
      this.createForm.setValue({ name: current.name, number: current.number });
        
    });
    
  }

  onCurrentSubmit() {
    if (this.createForm.invalid) {
			return;
		}
    let policy = this.createForm.value;

    if (this.currentIdToUpdate === null) { // create path
      this.crudService.getAll()
				.subscribe(policies => {
					//Generate article id (logic is for demo)	 
					let maxIndex = policies.length - 1;
					let policyWithMaxIndex = policies[maxIndex];
					let policyId = policyWithMaxIndex.id + 1;
					policy.id = policyId;

					//Create article
					this.crudService.create(policy)
						.subscribe(statusCode => {
              this.router.navigate(['list']);
              this.clearForm();
						});
				});

    }else{ // update path
      policy.id = this.currentIdToUpdate;
			this.crudService.update(policy)
				.subscribe(statusCode => {
          this.router.navigate(['list']);
				});
		}
  }
}
