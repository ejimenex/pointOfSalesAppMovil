import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ingredient } from 'src/app/model/ingredient.model';
import { InventoryIngredient } from 'src/app/model/inventoryIngredient.model';
import { Service } from 'src/app/model/services.model';
import { AlertService } from 'src/app/services/alert.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { InventoryIngredientService } from 'src/app/services/inventoryIngredient.service';

@Component({
  selector: 'app-list-inventoryIngredient',
  templateUrl: './inventoryIngredient.list.component.html',
})
export class ListInventoryIngredientComponent implements OnInit {
  public inventory: InventoryIngredient[];
  pageNumber = 1;
  filter = '';

  constructor(
    private translateService: TranslateService,
    private routeService: Router,
    private inventoryService: InventoryIngredientService,
    private alert: AlertService
  ) {}

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.refresh()
  } 
  filterData(event) {
    this.filter = event.detail.value;
    this.refresh();
  }
  async refresh() {
    await this.inventoryService
      .getPaged(this.pageNumber, this.filter)
      .toPromise()
      .then((response) => {
        this.inventory = response['inventory'] as [];
      });
  }
  createNew() {
    this.routeService.navigate(['/inventoryIngredient/create/0']);
  }
  edit(id) {
    this.routeService.navigate(['/inventoryIngredient/create/' + id]);
  }
  viewDetail(id) {
    this.routeService.navigate(['/inventoryIngredient/historical/' + id]);
  }
  adjust(id) {
    this.routeService.navigate(['/inventoryIngredient/adjust/' + id]);
  }
  goHome() {
    this.routeService.navigate(['/']);
  }
  remove(id){
     this.alert.confirmation(()=>{this.inventoryService.delete(id).subscribe(response=>{

      this.alert.success('Servicio Removido')
      this.refresh()
     })},this.translateService.instant('sureRemove'))
  }
  loadData(event) {
    setTimeout(() => {
      this.pageNumber++;
      this.refresh();
      event.target.complete();
    }, 500);
  }
}
