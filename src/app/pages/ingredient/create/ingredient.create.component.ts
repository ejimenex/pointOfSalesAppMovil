import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ingredient } from 'src/app/model/ingredient.model';
import { unitOfMeasure } from 'src/app/model/unitOfMeasure.model';
import { IngredientService } from 'src/app/services/ingredient.service';
import { UnitOfMeasuerService } from 'src/app/services/unitOfMeasure.service';

import { ToastController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-ingredient',
  templateUrl: './ingredient.create.component.html',
})
export class CreateIngredientComponent implements OnInit {
  ingredient: ingredient = new ingredient();
  id:string
  exit=true
  isModalOpen = false;
  unitOfMeasures: unitOfMeasure[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private unitOfMeasureService: UnitOfMeasuerService,
    private ingredientService: IngredientService,
    private alert: AlertService,
    private routeService: Router,
    private translate:TranslateService
  ) {}

  ngOnInit() {
    this.ingredient.isInventable=false
     this.id = this.activatedRoute.snapshot.paramMap.get('id');
     console.log(this.id)
          this.getData();
    this.getAllUnitOfMeasure();
  }

  async getAllUnitOfMeasure() {
    await this.unitOfMeasureService
      .getAllUoM()
      .toPromise()
      .then((response) => {
        this.unitOfMeasures = response['uomData'];
      });
  }
  getData(){
    if(this.id!="0")
    {
        this.ingredientService.getById(this.id).subscribe(c=> {
            this.ingredient=c['existingIngredient']
        })
    }
  }
  goBack(){
    this.routeService.navigate(['/ingredient'])
}
goHome(){
    this.routeService.navigate(['/'])
}
edit() {
  
  if(!this.ingredient.commentary)this.ingredient.commentary=''
  this.ingredientService.put(this.id,this.ingredient).subscribe(
    (response) => {
      this.alert.success(this.translate.instant('successEdit'));
      if(this.exit)
      this.goBack()
    },
    (error) => {
      this.alert.error(error.error.message.join('-')| error.error);
    }
  );
}
openHelp(isOpen: boolean) {
  this.isModalOpen = isOpen;
}
addOrUpdate(){
  if(this.id!="0")
  this.edit()
  else  
  this.add();
}
  add() {
    if(!this.ingredient.commentary)this.ingredient.commentary=''
    
    this.ingredientService.post(this.ingredient).subscribe(
      (response) => {
        this.alert.success(this.translate.instant('successCreation'));
        if(this.exit)
         this.goBack()
      this.ingredient = new ingredient();
      },
      (error) => {
        this.alert.error(typeof(error.error.message)=='string'?error.error.message : error.error.message.join('-'));
      }
    );
  }
}
