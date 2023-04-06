import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/model/client.model';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/services/alert.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-client',
  templateUrl: './client.create.component.html',
})
export class CreateClientComponent implements OnInit {
  client: Client = new Client();
  id: string;
  exit = true;
  isModalOpen = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    private alert: AlertService,
    private routeService: Router,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.client.isBlackList='No'
    this.client.notifyWhenInvoice = false;
    this.client.commentary = '';
    this.getData();
  }

  getData() {
    if (this.id != '0') {
      this.clientService.getById(this.id).subscribe((c) => {
        this.client = c['existingClient'];
      });
    }
  }
  goBack() {
    this.routeService.navigateByUrl('/client');
  }
  goHome() {
    this.routeService.navigate(['/']);
  }
  edit() {
    this.clientService.put(this.id, this.client).subscribe(
      (response) => {
        this.alert.success(this.translate.instant('successEdit'));
        if (this.exit) this.goBack();
      },
      (error) => {
        typeof error.error.message == 'string'
        ? error.error.message
        : error.error.message.join('-')
      }
    );
  }
  openHelp(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  addOrUpdate() {
    this.client.invoiceQuantity = 0;
    this.client.ordersQuantity = 0;
    if (
      !this.client.address ||
      !this.client.city ||
      !this.client.name ||
      !this.client.phone
    )
      return this.alert.error(this.translate.instant('fillAllField'));
    if (this.id != '0') this.edit();
    else this.add();
  }
  add() {
    this.clientService.post(this.client).subscribe(
      (response) => {
        this.alert.success(this.translate.instant('successCreation'));
        if (this.exit) this.goBack();
        this.client = new Client();
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
