import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.less']
})
export class CarComponent implements OnInit {
  dataSet = {
    data: []
  };
  dateRange = [];
  search = {
    name: '',
  }
  constructor() { }

  ngOnInit() {
  }

}
