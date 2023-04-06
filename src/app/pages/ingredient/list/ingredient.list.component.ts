import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ingredient } from 'src/app/model/ingredient.model';
import { AlertService } from 'src/app/services/alert.service';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-list-ingredient',
  templateUrl: './ingredient.list.component.html'
})
export class ListIngredientComponent implements OnInit {
  public ingredient: ingredient[];
  pageNumber=1
  filter=''

  constructor(private activatedRoute: ActivatedRoute,private routeService: Router,
    private ingredientService: IngredientService,private alert:AlertService) { }
    ionViewDidEnter() {
      this.refresh()
    } 
  ngOnInit() {

   // this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  filterData(event){
    this.filter =event.detail.value
    this.refresh()
  }
  async refresh() {
    await this.ingredientService.getPaged(this.pageNumber,this.filter).toPromise().then(response=>{
      this.ingredient=response['ingredients']
     }) 
    }
    createNew(){
        this.routeService.navigate(['/ingredient/create/0'])
    }
    edit(id){
        this.routeService.navigate(['/ingredient/create/'+id])
    }
    remove(id){
       this.alert.confirmation(()=>{this.ingredientService.delete(id).subscribe(response=>{

        this.alert.success('Ingrediente Removido')
        this.refresh()
       })},'Seguro desea eliminar?')
    }
    goHome(){
      this.routeService.navigate(['/'])
  }
  loadData(event) {
    setTimeout(() => {
        this.pageNumber++;
        this.refresh();
        event.target.complete();
      
    }, 500);
}
}
