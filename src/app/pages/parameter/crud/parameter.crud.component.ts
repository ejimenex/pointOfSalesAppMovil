import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { ParameterService } from 'src/app/services/parameter.service';
import { Parameter } from 'src/app/model/parameter.model';

@Component({
  selector: 'app-create-parameter',
  templateUrl: './parameter.crud.component.html',
})
export class ParameterComponent implements OnInit {
  parameter: Parameter = new Parameter();
  id: string;
  exit = true;
  currency = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private parameterService: ParameterService,
    private alert: AlertService,
    private routeService: Router,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.parameter.invoiceSecuence = 1;
    this.parameter.orderSecuence = 1;
    this.currency = [
      { label: this.translate.instant('dop'), value: 'DOP' },
      { label: this.translate.instant('usd'), value: 'USD' },
      { label: this.translate.instant('realBrazil'), value: 'R$' },
    ];
    this.getData();
  }

  getData() {
    this.parameterService.getOneEmail().subscribe(response => {
      if(response)
      this.parameter = response as any;
    });
  }
  goBack() {
    window.history.back();
  }
  goHome() {
    this.routeService.navigate(['/']);
  }
  edit() {
    this.parameterService.put(this.id, this.parameter).subscribe(
      (response) => {
        this.alert.success(this.translate.instant('successEdit'));
        if (this.exit) this.goBack();
      },
      (error) => {
        this.alert.error(error.error)
      }
    );
  }

  addOrUpdate() {
    if (
      !this.parameter.companyName ||
      !this.parameter.currency ||
      !this.parameter.orderPrefix ||
      !this.parameter.invoicePrefix
    )
      return this.alert.error(this.translate.instant('fillAllField'));
    if (this.parameter['id']) this.edit();
    else this.add();
  }
  add() {
    debugger
    this.parameterService.post(this.parameter).subscribe(
      (response) => {
        this.alert.success(this.translate.instant('successCreation'));
      },
      (error) => {
        this.alert.error( error.error )
      }
    );
  }
}
