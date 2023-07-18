import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Client } from 'src/app/model/client.model';
import { AlertService } from 'src/app/services/alert.service';
import { ClientService } from 'src/app/services/client.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './client.list.component.html',
})
export class ListClientComponent implements OnInit {
  public clients: Client[];
  client: Client = new Client();
  pageNumber = 1;
  pageData: any = {};
  filter = '';
  isModalOpen = false;
  isBlackList = 'No';
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(
    private translateService: TranslateService,
    private routeService: Router,
    private toke: TokenService,
    private clientService: ClientService,
    private alert: AlertService
  ) {}

  ionViewDidEnter() {
    this.refresh();
  }
  ngOnInit() {
  this.clients=[]

    // this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  openBlackList(isOpen: boolean, data: Client) {
    this.isModalOpen = isOpen;
    this.client = data;
  }
  setBlackList() {
    this.client.isBlackList = 'Yes';
    this.alert.confirmation(() => {
      this.clientService
        .put(this.client['id'], this.client)
        .subscribe((respon) => {
          this.alert.success(this.translateService.instant('successBlackList'));
          this.ionViewDidEnter();
          this.isModalOpen = false;
        });
    }, this.translateService.instant('sureBlackList'));
  }
  filterData(event) {
    this.filter = event.detail.value;
    this.refresh();
  }
  changePage(isNext) {
    let limit = Math.ceil(this.pageData.count / 10);
    if (isNext) {
      
      if(this.pageNumber>limit-1)
      return;
      ++this.pageNumber;
      this.refresh()
    }
    else{
      if(this.pageNumber == 1)
      return;
      --this.pageNumber;
      this.refresh()
    }
  }
  async refresh() {
    await this.clientService
      .getPaged(this.pageNumber, this.filter, this.isBlackList)
      .toPromise()
      .then(
        (response) => {
          this.pageData = response;
          this.clients = response['data'];
        },
        (error) => {
          this.alert.error(error.error.message);
        }
      );
  }
  createNew() {
    this.routeService.navigate(['/client/create/0']);
  }
  edit(id) {
    this.routeService.navigate(['/client/create/' + id]);
  }
  remove(id) {
    this.alert.confirmation(() => {
      this.clientService.delete(id).subscribe((response) => {
        this.alert.success('Cliente Removido');
        this.refresh();
      });
    }, this.translateService.instant('sureRemove'));
  }
  goHome() {
    this.routeService.navigate(['/']);
  }
  loadData(event, type) {
    setTimeout(() => {
      if (type == 'B') this.pageNumber++;
      else this.pageNumber--;
      this.refresh();
      event.target.complete();
      if (this.clients.length == 10) {
      }
    }, 500);
  }
  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
