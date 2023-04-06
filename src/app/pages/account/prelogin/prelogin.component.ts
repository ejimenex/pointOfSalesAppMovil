import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-prelogin',
  templateUrl: './prelogin.component.html',
})
export class PreLoginComponent implements OnInit {


  constructor(
    private activatedRoute: ActivatedRoute,
    private alert: AlertService,
    private routeService: Router
  ) {}

  ngOnInit() {

  }

 

}
