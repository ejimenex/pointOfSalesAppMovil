import { Component, OnInit, Provider, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Bill } from 'src/app/model/bill.model';
import { ingredient } from 'src/app/model/ingredient.model';
import { AlertService } from 'src/app/services/alert.service';
import { BillService } from 'src/app/services/bill.service';
import { TokenService } from 'src/app/services/token.service';
import * as moment from 'moment';

@Component({
  selector: 'app-list-bill',
  templateUrl: './bill.list.component.html',
})
export class ListBillComponent implements OnInit {
  public bills: Bill[];
  pageNumber = 1;
  filter :any={};
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(
    
    private translate: TranslateService,
    private routeService: Router,
    private toke: TokenService,
    private billService: BillService,
    private alert: AlertService
  ) {}

  ionViewDidEnter() {
    this.refresh();
  }
  ngOnInit() {
    let user = this.toke.getUserToken();
  this.filter.dateFrom= moment(new Date()).subtract(1,'M').format('YYYY-MM-DD')
  this.filter.dateTo= moment(new Date()).format('YYYY-MM-DD')
    // this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async refresh() {
    if(this.filter.dateFrom.length!=10 || this.filter.dateTo.length!=10)
    return this.alert.error(this.translate.instant('dateFormatBad'))
    const dateTo=new Date(this.filter.dateTo).toISOString()
    const dateFrom=new Date(this.filter.dateFrom).toISOString()
    await this.billService
      .getPaged(this.pageNumber, dateTo,dateFrom)
      .toPromise()
      .then(
        (response) => {
          this.bills = response['bill'];
        },
        (error) => {
          this.alert.error(error.error.message);
        }
      );
  }
  createNew() {
    this.routeService.navigate(['/bill/create/0']);
  }
  edit(id) {
    this.routeService.navigate(['/bill/create/' + id]);
  }
  remove(id) {
    this.alert.confirmation(() => {
      this.billService.delete(id).subscribe((response) => {
        this.alert.success('Cliente Removido');
        this.refresh();
      });
    }, this.translate.instant('sureDelete'));
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
    }, 500);
  }
  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
