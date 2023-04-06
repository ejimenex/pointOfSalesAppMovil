import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ingredient } from 'src/app/model/ingredient.model';
import { Service } from 'src/app/model/services.model';
import { AlertService } from 'src/app/services/alert.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-list-service',
  templateUrl: './service.list.component.html'
})
export class ListServiceComponent implements OnInit {
  public service: Service[];
  pageNumber=1
  filter=''

  constructor(private activatedRoute: ActivatedRoute,private routeService: Router,
    private serviceService: ServicesService,private alert:AlertService) { }
    ionViewDidEnter() {
      this.refresh()
    } 
  ngOnInit() {
  }
  filterData(event){
    this.filter =event.detail.value
    this.refresh()
  }
  async refresh() {
    await this.serviceService.getPaged(this.pageNumber,this.filter).toPromise().then(response=>{
      this.service=response['service']
     }) 
    }
    createNew(){
        this.routeService.navigate(['/services/create/0'])
    }
    edit(id){
        this.routeService.navigate(['/services/create/'+id])
    }
    goHome(){
      this.routeService.navigate(['/'])
  }
    remove(id){
       this.alert.confirmation(()=>{this.serviceService.delete(id).subscribe(response=>{

        this.alert.success('Servicio Removido')
        this.refresh()
       })},'Seguro desea eliminar?')
    }
  loadData(event) {
    setTimeout(() => {
        this.pageNumber++;
        this.refresh();
        event.target.complete();
      
    }, 500);
}
}
