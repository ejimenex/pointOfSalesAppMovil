import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ingredient } from 'src/app/model/ingredient.model';
import { unitOfMeasure } from 'src/app/model/unitOfMeasure.model';
import { IngredientService } from 'src/app/services/ingredient.service';
import { UnitOfMeasuerService } from 'src/app/services/unitOfMeasure.service';

import { ToastController } from '@ionic/angular';
import { Service } from 'src/app/model/services.model';
import { ServicesService } from 'src/app/services/services.service';
import { IngredientPerServices } from 'src/app/model/ingredientPerService.model';
import { AlertService } from 'src/app/services/alert.service';
import { InventoryIngredient } from 'src/app/model/inventoryIngredient.model';
import { TranslateService } from '@ngx-translate/core';
import { InventoryIngredientService } from 'src/app/services/inventoryIngredient.service';

@Component({
  selector: 'app-create-inventory-ingredient',
  templateUrl: './inventoryIngredient.create.html',
})
export class CreateInventoryIngredientComponent implements OnInit {
  data: InventoryIngredient = new InventoryIngredient();
  id: string;
  exit = true;
  public ingredient: ingredient[];
  ingredientObj: ingredient = new ingredient();
  ingredientPerService: IngredientPerServices = new IngredientPerServices();
  ingredientPerServiceArr: IngredientPerServices[];
  isModalOpen = false;
  isIngredientOpen=false;
  unitOfMeasure = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private inventoryService: InventoryIngredientService,
    private alert: AlertService,
    private routeService: Router,
    private ingredientService: IngredientService,
    private translateService:TranslateService
  ) {}

  ngOnInit() {
    this.data.detail = [];
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.id)
    this.data.detail = [];

    console.log(this.id);
    this.getData();
    this.getAllIngredient();
    //this.service.ingredientPerService.push()
  }
  ingredientChange(event) {
    this.unitOfMeasure = event.value.unitOfMeasure;
    this.ingredientObj = event.value;
  }
  pushDetail() {
    this.data.detail.push({
    commentary:this.data.commentary,
    date:new Date().toISOString(),
    isEntry:true,
    quantity:this.data.quantity
    }); 
  }


  async getAllIngredient() {
    this.ingredientService
      .getAll()
      .toPromise()
      .then((response) => {
        this.ingredient = response['ingredients'];
      });
  }

  getData() {
    if (this.id != '0') {
      
      this.inventoryService.getById(this.id).subscribe((c) => {
        this.data = c['existingService'];
        this.ingredientObj=this.data.ingredient
      });
    }
  }
  goBack() {
    this.routeService.navigate(['/inventoryIngredient']);
  }
  goHome() {
    this.routeService.navigate(['/']);
  }
  edit() {
    this.inventoryService.put(this.id, this.data).subscribe(
      (response) => {
        this.alert.success(this.translateService.instant('successEdit'));
        if (this.exit) this.goBack();
      },
      (error) => {
        this.alert.error(typeof(error.error.message)=='string'?this.translateService.instant(error.error.message) : error.error.message.join('-'));
      }
    );
  }
  openHelp(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  viewIngredient(isOpen: boolean) {
    this.isIngredientOpen = isOpen;
  }
  addOrUpdate() {
    if(!this.data.commentary) this.data.commentary=''
    if(!this.data.name || !this.ingredientObj || !this.data.quantity)
    return this.alert.error(this.translateService.instant('fillAllField'))
    if(!this.data.stock) this.data.stock=0
    this.data.lastDateModified = new Date().toISOString();
    this.pushDetail();
    this.data.ingredient=this.ingredientObj
    this.data.stock=this.data.stock+this.data.quantity
    if (this.id != '0') this.edit();
    else this.add();
  }
  add() {
    this.inventoryService.post(this.data).subscribe(
      (response) => {
        this.alert.success(this.translateService.instant('succesfullInsertion'));
        if (this.exit) this.goBack();
        this.data = new InventoryIngredient();
      },
      (error) => {
        this.data.detail.splice(this.data.detail.length-1,1)
        this.alert.error(typeof(error.error.message)=='string'?this.translateService.instant(error.error.message) : error.error.message.join('-'));
      }
    );
  }
}
