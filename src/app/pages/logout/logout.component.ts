import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ChildActivationStart, Router } from '@angular/router';

import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-logout',
  template: '',
})
export class LogOutComponent implements OnInit {
 

  constructor( private token:TokenService,private _router: Router) {}

  ngOnInit() {
  
  }

 
}
