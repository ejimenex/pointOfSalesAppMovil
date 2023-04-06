import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Order } from 'src/app/model/order.model';
import { AlertService } from 'src/app/services/alert.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-list-invoice',
  templateUrl: './invoice.list.component.html'
})
export class ListInvoiceComponent implements OnInit {
  public orders: Order[];
  pageNumber=1
  filter=''
   finished:boolean=false
  constructor(private translateService: TranslateService,private routeService: Router,
    private alert:AlertService,private invoiceService:InvoiceService) { }

  ngOnInit() {
    this.refresh()
  }
  ionViewDidEnter() {
    this.refresh()
  } 
  filterData(event){
    this.filter =event.detail.value
    this.refresh()
  }
  async refresh() {
    await this.invoiceService.getPaged(this.pageNumber,this.filter,this.finished).toPromise().then(response=>{
      this.orders=response['data']
     }) 
    }
   
    view(id){
        this.routeService.navigate(['/invoice/view/'+id])
    }
    goHome(){
      this.routeService.navigate(['/'])
  }

    remove(id){
       this.alert.confirmation(()=>{this.invoiceService.delete(id).subscribe(response=>{

        this.alert.success('Servicio Removido')
        this.refresh()
       })},this.translateService.instant('sureDelete'))
    }
  loadData(event,type) {
    setTimeout(() => {
      if(type=='B')
      this.pageNumber++;
      else this.pageNumber --;
      if(this.pageNumber<1)this.pageNumber=1
        this.refresh();
        event.target.complete();
      
    }, 500);
}
}
