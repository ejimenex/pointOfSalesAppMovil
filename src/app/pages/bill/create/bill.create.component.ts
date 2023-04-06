import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { Provider } from 'src/app/model/providers';
import { ProviderService } from 'src/app/services/provider.service';
import { BillService } from 'src/app/services/bill.service';
import { Bill } from 'src/app/model/bill.model';
import * as moment from 'moment'; 

@Component({
  selector: 'app-create-bill',
  templateUrl: './bill.create.component.html',
})
export class CreateBillComponent implements OnInit {
  bill: Bill = new Bill();
  id: string;
  providers = [];
  exit = true;
  isModalOpen = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private providerService: ProviderService,
    private billService: BillService,
    private alert: AlertService,
    private routeService: Router,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.bill.concept = '';
    this.getProviders();
   
  }

  getData() {
    if (this.id != '0') {
      this.billService.getById(this.id).subscribe((c) => {
        this.bill = c['data'];
        this.bill.date=moment(this.bill.date).format('YYYY-MM-DD')
      });
    }
  }
  getProviders() {
    this.providerService.getAll().subscribe((response) => {
      this.providers = response['data'];
      this.getData()
    });
  }
  goBack() {
    this.routeService.navigateByUrl('/bill');
  }
  goHome() {
    this.routeService.navigate(['/']);
  }
  edit() {
    this.billService.put(this.id, this.bill).subscribe(
      (response) => {
        this.alert.success(this.translate.instant('successEdit'));
        if (this.exit) this.goBack();
      },
      (error) => {
        typeof error.error.message == 'string'
          ? this.alert.error(error.error.message)
          : this.alert.error(error.error.message.join('-'));
      }
    );
  }
  openHelp(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  addOrUpdate() {
    if (!this.bill.date || !this.bill.amount || !this.bill.paidAmount|| !this.bill.invoiceNumber)
      {return this.alert.error(this.translate.instant('fillAllField'));}
      if(this.bill.paidAmount>this.bill.amount)
      return this.alert.error(this.translate.instant('paidNotMajorThanAmount'))
      this.bill.pendingAmount=this.bill.amount-this.bill.paidAmount;
    if (this.id != '0') this.edit();
    else this.add();
  }
  add() {
    this.bill.date=new Date(this.bill.date).toISOString();
    this.billService.post(this.bill).subscribe(
      (response) => {
        this.alert.success(this.translate.instant('successCreation'));
        if (this.exit) this.goBack();
        this.bill = new Bill();
      },
      (error) => {
        this.alert.error(
          typeof error.error.message == 'string'
            ? error.error.message
            : error.error.message.join('-')
        );
      }
    );
  }
}
