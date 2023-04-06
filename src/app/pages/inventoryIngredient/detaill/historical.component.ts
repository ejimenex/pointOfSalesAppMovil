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
  templateUrl: './historical.component.html',
})
export class DetailInventoryIngredientComponent implements OnInit {
  data: InventoryIngredient = new InventoryIngredient();
  id: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private inventoryService: InventoryIngredientService,
    private alert: AlertService,
    private routeService: Router,
    private translateService:TranslateService
  ) {}

  ngOnInit() {
    this.data.detail = [];
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.id)
    this.data.detail = [];
    this.getData();
  }


  getData() {
    if (this.id != '0') {
      
      this.inventoryService.getById(this.id).subscribe((c) => {
        this.data = c['existingService']
      });
    }
  }
  goBack() {
    this.routeService.navigate(['/inventoryIngredient']);
  }
  goHome() {
    this.routeService.navigate(['/']);
  }
 
}
