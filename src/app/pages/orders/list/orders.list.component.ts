import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ingredient } from 'src/app/model/ingredient.model';
import { Order } from 'src/app/model/order.model';
import { Service } from 'src/app/model/services.model';
import { AlertService } from 'src/app/services/alert.service';
import { ClientService } from 'src/app/services/client.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { InventoryIngredientService } from 'src/app/services/inventoryIngredient.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './orders.list.component.html',
})
export class ListOrdersComponent implements OnInit {
  public orders: Order[];
  pageNumber = 1;
  filter = '';
  finished: boolean = false;
  constructor(
    private translateService: TranslateService,
    private routeService: Router,
    private inventoryService: InventoryIngredientService,
    private serviceService: OrderService,
    private clientService: ClientService,
    private alert: AlertService,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit() {
    this.refresh();
  }
  ionViewDidEnter() {
    this.refresh();
  }
  filterData(event) {
    this.filter = event.detail.value;
    this.refresh();
  }
  async refresh() {
    await this.serviceService
      .getPaged(this.pageNumber, this.filter, this.finished)
      .toPromise()
      .then((response) => {
        this.orders = response['data'];
      });
  }
  createNew() {
    this.routeService.navigate(['/orders/create/0']);
  }
  edit(id) {
    this.routeService.navigate(['/orders/create/' + id]);
  }
  goHome() {
    this.routeService.navigate(['/']);
  }
  setInvoiced(id, data) {
    data.isFinished = 'Yes';
    data.detail.forEach(element => {
     let rawMaterial= element.service.ingredientPerService;
     rawMaterial.forEach(res=>{
      let data=res.ingredientPerService
       this.inventoryService.substract(data._id,res.quantity*element.quantity).subscribe(respos=>{
        console.log('inventory removed successfully')
       })
     })
    });
    this.serviceService.put(id, data).subscribe((response) => {});
  }
  bill(id) {
    this.serviceService.getById(id).subscribe((response) => {
      const data = response['data'];
      if (data.pendingAmount > 0)
        return this.alert.error(
          this.translateService.instant('havePendingAmount')
        );
      data.invoiceDate = new Date().toISOString();
      this.invoiceService.post(data).subscribe((response2) => {
        const invoice = response2['data'];
        this.updateClientOrders(data['client']._id);
        this.setInvoiced(id, data);
        this.alert.success(this.translateService.instant('successBill'));
        this.routeService.navigate(['/invoice/list/' + invoice['_id']]);
      });
    });
  }
  async updateClientOrders(id) {
    await this.clientService.getById(id).subscribe((response) => {
      const client = response['existingClient'];
      client.invoiceQuantity = +1;
      this.clientService.put(id, client).subscribe((respone) => {});
    });
  }
  remove(id) {
    this.alert.confirmation(() => {
      this.serviceService.delete(id).subscribe((response) => {
        this.alert.success('Servicio Removido');
        this.refresh();
      });
    }, this.translateService.instant('sureDelete'));
  }
  loadData(event, type) {
    setTimeout(() => {
      if (type == 'B') this.pageNumber++;
      else this.pageNumber--;
      if (this.pageNumber < 1) this.pageNumber = 1;
      this.refresh();
      event.target.complete();
    }, 500);
  }
}
