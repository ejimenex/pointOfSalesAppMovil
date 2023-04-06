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
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-service',
  templateUrl: './service.create.component.html',
})
export class CreateServiceComponent implements OnInit {
  service: Service = new Service();
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
    private serviceService: ServicesService,
    private alert: AlertService,
    private routeService: Router,
    private ingredientService: IngredientService,
    private translate:TranslateService
  ) {}

  ngOnInit() {
    this.service.cost=0
    this.service.ingredientPerService = [];
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getData();
    this.getAllIngredient();
    //this.service.ingredientPerService.push()
  }
  ingredientChange(event) {
    this.unitOfMeasure = event.value.unitOfMeasure;
    this.ingredientObj = event.value;
  }
  puchIngredient() {
    if (!this.ingredientPerService.quantity)
      return this.alert.error('Debe digitar una cantidad');
    this.service.ingredientPerService.push({
      quantity: this.ingredientPerService.quantity,
      ingredientPerService: this.ingredientObj,
    });
    this.setCost()    
    this.ingredientPerService.quantity=0;
    return this.alert.success('1 Ingrediente insertado');
  }

  removeDetail(index,item){
    this.service.ingredientPerService.splice(index,1)
    this.subtractCost(item);
    this.ingredientPerService.quantity=0;
  }
  async getAllIngredient() {
    this.ingredientService
      .getAll()
      .toPromise()
      .then((response) => {
        this.ingredient = response['ingredients'];
      });
  }
 
setCost(){
  this.service.cost += this.ingredientPerService.quantity * this.ingredientObj.cost;

}
subtractCost(item){
  this.service.cost -= (item.quantity * item.ingredientPerService.cost);

}
  getData() {
    if (this.id != '0') {
      this.serviceService.getById(this.id).subscribe((c) => {
        this.service = c['existingService'];
      });
    }
  }
  goBack() {
    this.routeService.navigate(['/services']);
  }
  goHome() {
    this.routeService.navigate(['/']);
  }
  edit() {
    this.serviceService.put(this.id, this.service).subscribe(
      (response) => {
        this.alert.success(this.translate.instant('successEdit'));
        if (this.exit) this.goBack();
      },
      (error) => {
        this.alert.success(error.error.message.join('-') | error.error);
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
    if (this.id != '0') this.edit();
    else this.add();
  }
  add() {
    this.service.createdDate = new Date().toISOString();
    if(!this.service.name || !this.service.price || !this.service.description || !this.service.ingredientPerService)
    return this.alert.error('Debe llenar todos los campos')
    this.serviceService.post(this.service).subscribe(
      (response) => {
        this.alert.success('Creado exitosamente');
        if (this.exit) this.goBack();
        this.service = new Service();
      },
      (error) => {

        typeof error.error.message == 'string'
        ? error.error.message
        : error.error.message.join('-')
      }
    );
  }
}
