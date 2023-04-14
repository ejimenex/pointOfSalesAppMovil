import { Component, OnInit, Provider, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { ingredient } from 'src/app/model/ingredient.model';
import { AlertService } from 'src/app/services/alert.service';
import { ClientService } from 'src/app/services/client.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { ProviderService } from 'src/app/services/provider.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-list-provider',
  templateUrl: './provider.page.html'
})
export class ListProviderComponent implements OnInit {
  public providers: Provider[];
  pageNumber=1
  filter=''
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(private activatedRoute: ActivatedRoute,private routeService: Router,private toke:TokenService,
    private providerService: ProviderService,private alert:AlertService) { }

    ionViewDidEnter() {
      this.refresh()
    } 
  ngOnInit() {
    let user=this.toke.getUserToken();
   this.providers=[]
   // this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  filterData(event){
    this.filter =event.detail.value
    this.refresh()
  }
  async refresh() {
    await this.providerService.getPaged(this.pageNumber,this.filter).toPromise().then(response=>{
      this.providers=response['data']
     },error=>{
      this.alert.error(error.error.message)
     }) 
    }
    createNew(){
        this.routeService.navigate(['/provider/create/0'])
    }
    edit(id){
        this.routeService.navigate(['/provider/create/'+id])
    }
    remove(id){
       this.alert.confirmation(()=>{this.providerService.delete(id).subscribe(response=>{

        this.alert.success('Provider Removido')
        this.refresh()
       })},'Seguro desea eliminar?')
    }
    goHome(){
      this.routeService.navigate(['/'])
  }
  loadData(event,type) {
    setTimeout(() => {
      if(type=='B')
        this.pageNumber++;
        else this.pageNumber --;
        this.refresh();
        event.target.complete();
        
      
    }, 500);
}
toggleInfiniteScroll() {
  this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
}
}
