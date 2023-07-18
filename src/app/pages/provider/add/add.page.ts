import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { Provider } from 'src/app/model/providers';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-create-providers',
  templateUrl: './add.page.html',
})
export class CreateProviderComponent implements OnInit {
  provider: Provider = new Provider();
  id: string;
  exit = true;
  isModalOpen = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private providerService: ProviderService,
    private alert: AlertService,
    private routeService: Router,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.provider.commentary = '';
    this.getData();
  }

  getData() {
    if (this.id != '0') {
      this.providerService.getById(this.id).subscribe((c) => {
        this.provider = c;
      });
    }
  }
  goBack() {
    this.routeService.navigateByUrl('/provider');
  }
  goHome() {
    this.routeService.navigate(['/']);
  }
  edit() {
    this.providerService.put(this.id, this.provider).subscribe(
      (response) => {
        this.alert.success(this.translate.instant('successEdit'));
        if (this.exit) this.goBack();
      },
      (error) => { this.alert.error(error.error)
       
      }
    );
  }
  openHelp(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  addOrUpdate() {
    if (
      !this.provider.name ||
      !this.provider.phone
    )
      return this.alert.error(this.translate.instant('fillAllField'));
    if (this.id != '0') this.edit();
    else this.add();
  }
  add() {
    this.providerService.post(this.provider).subscribe(
      (response) => {
        this.alert.success(this.translate.instant('successCreation'));
        if (this.exit) this.goBack();
        this.provider = new Provider();
      },
      (error) => {
        this.alert.error(error.error);
      }
    );
  }
}
