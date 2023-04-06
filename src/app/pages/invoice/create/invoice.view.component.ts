import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ingredient } from 'src/app/model/ingredient.model';
import { Service } from 'src/app/model/services.model';
import { ServicesService } from 'src/app/services/services.service';
import { AlertService } from 'src/app/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/model/client.model';
import { Order } from 'src/app/model/order.model';
import { OrderService } from 'src/app/services/order.service';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './invoice.view.component.html',
})
export class CreateInvoiceComponent implements OnInit {
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
    private orderService: InvoiceService,
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

 
  
  goBack() {
    this.routeService.navigate(['/invoice']);
  }
  goHome() {
    this.routeService.navigate(['/']);
  }

  openHelp(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  viewService(isOpen: boolean) {
    this.isServiceOpen = isOpen;
  }
 
  async updateClientOrders(id) {
    await this.clientService.getById(id).subscribe((response) => {
      const client = response['existingClient'];
      client.ordersQuantity = +1;
      this.clientService.put(id, client).subscribe((respone) => {});
    });
  }
 
}
