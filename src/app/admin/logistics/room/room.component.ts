import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.less']
})
export class RoomComponent implements OnInit {
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
