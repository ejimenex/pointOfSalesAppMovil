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
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/model/client.model';
import { Order } from 'src/app/model/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-create-ordrs',
  templateUrl: './orders.create.component.html',
})
export class CreateSOrdersComponent implements OnInit {
  services: Service[];
  id: string;
  exit = true;
  public ingredient: ingredient[];
  payType=[]
  serviceObj: Service = new Service();
  order: Order = new Order();
  isModalOpen = false;
  isServiceOpen = false;
  payObj:any={}
  clients: Client[];
  payTypeStr:string
  detail: any = {};
  clientObj: Client = new Client();
  constructor(
    private activatedRoute: ActivatedRoute,
    private serviceService: ServicesService,
    private orderService: OrderService,
    private alert: AlertService,
    private routeService: Router,
    private clientService: ClientService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.order.payDetail=[]
    this.order.detail = [];
    this.clients = [];
    this.payType=[{value:'transfer'},{value:'efective'},{value:'card'}]
    this.services = [];
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getClients();
    this.getServices();
    this.getData();
  }
  clientChange(event) {
    this.clientObj = event.value;
  }
  serviceChange(event) {
    this.serviceObj = event.value;
  }
  async getClients() {
    await this.clientService
      .getAll()
      .toPromise()
      .then((res: Client[]) => {
        this.clients = res['data'] as [];
      });
  }
  async getServices() {
    await this.serviceService
      .getAll()
      .toPromise()
      .then((res) => {
        this.services = res['service'];
      });
  }

  getData() {
    if (this.id != '0') {
      this.orderService.getById(this.id).subscribe((c) => {
        this.order = c['data'];
        this.clientObj = this.order.client;
      });
    }
  }
  puchDetail() {
    if (!this.detail.price || !this.detail.quantity)
      return this.alert.error(this.translate.instant('fillPriceOrQty'));
    if (this.detail.price > this.serviceObj.price)
      return this.alert.error(
        this.translate.instant('salesPriceNotMajorToRealProce')
      );
    this.order.detail.push({
      service: this.serviceObj,
      discount:
        this.detail.quantity * (this.serviceObj.price - this.detail.price),
      quantity: this.detail.quantity,
      total: this.detail.quantity * this.detail.price,
      price: this.serviceObj.price,
    });
    this.detail = {};
    this.calculate();
    return this.alert.success(this.translate.instant('oneDetailInserted'));
  }
 
  calculate() {
    this.order.total = 0;
    this.order.subTotal = 0;
    this.order.discount = 0;
    this.order.totalQty = 0;
    for (const i in this.order.detail) {
      this.order.total +=this.order.detail[i].total;
      this.order.subTotal +=this.order.detail[i].price;
      this.order.discount +=this.order.detail[i].discount;
      this.order.totalQty +=this.order.detail[i].quantity;
    }
    
    this.order.pendingAmount = this.order.total - this.order.amountPaid;
  }
  calculatePay() {
    this.order.amountPaid =0;
    for (const i in this.order.payDetail) {
      this.order.amountPaid +=this.order.payDetail[i].amount;
      
    }
  }
  pushPayType(){
    if(this.order.total==this.order.amountPaid) return;
    this.order.payDetail.push({amount:this.payObj.amount,payType:this.payObj.type})
    this.calculatePay()
  }
  removeDetail(index) {
    this.order.detail.splice(index, 1);
    this.calculate();
  }
  removePayDetail(index){
    this.order.payDetail.splice(index,1)
    this.calculatePay()
  }
  goBack() {
    this.routeService.navigate(['/orders']);
  }
  goHome() {
    this.routeService.navigate(['/']);
  }
  edit() {
    this.orderService.put(this.id, this.order).subscribe(
      (response) => {
        this.alert.success(this.translate.instant('successEdit'));
        if (this.exit) this.goBack();
      },
      (error) => {
        typeof error.error.message == 'string'
          ? error.error.message
          : error.error.message.join('-');
      }
    );
  }
  openHelp(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  viewService(isOpen: boolean) {
    this.isServiceOpen = isOpen;
  }
  addOrUpdate() {
    if (this.id != '0') this.edit();
    else this.add();
  }
  async updateClientOrders(id) {
    await this.clientService.getById(id).subscribe((response) => {
      const client = response['existingClient'];
      client.ordersQuantity = +1;
      this.clientService.put(id, client).subscribe((respone) => {});
    });
  }
  add() {
    this.order.ordersDate = new Date().toISOString();
    this.order.isFinished = 'No';
    this.order.client = this.clientObj;
    if (this.order.amountPaid > this.order.total)
      return this.alert.error(this.translate.instant('pendingNotMajorToTotal'));
    if (
      !this.order.deliveryDate ||
      !this.order.deliveryDate ||
      !this.order.amountPaid ||
      !this.order.amountPaid ||
      !this.clientObj
    )
      return this.alert.error(this.translate.instant('fillAllField'));
    this.orderService.post(this.order).subscribe(
      (response) => {
        this.updateClientOrders(this.order.client['_id']);
        this.alert.success(this.translate.instant('successCreation'));
        if (this.exit) this.goBack();
        this.order = new Order();
      },
      (error) => {
        typeof error.error.message == 'string'
          ? error.error.message
          : error.error.message.join('-');
      }
    );
  }
}
