import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.less']
})
export class BidsComponent implements OnInit {

  allChecked = false;
  disabledButton = true;
  checkedNumber = 0;
  displayData: Array<{ name: string; age: number; address: string; checked: boolean }> = [];
  operating = false;
  dataSet = [];
  indeterminate = false;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    for (let i = 0; i < 46; i++) {
      this.dataSet.push({
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
        checked: false
      });
    }
  }

  currentPageDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean }>): void {
    this.displayData = $event;
  }

  refreshStatus(): void {
    const allChecked = this.displayData.every(value => value.checked === true);
    const allUnChecked = this.displayData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.disabledButton = !this.dataSet.some(value => value.checked);
    this.checkedNumber = this.dataSet.filter(value => value.checked).length;
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => data.checked = value);
    this.refreshStatus();
  }

  operateData(): void {
    this.operating = true;
    setTimeout(_ => {
      this.dataSet.forEach(value => value.checked = false);
      this.refreshStatus();
      this.operating = false;
    }, 1000);
  }

  goto(add, id) {
    this.router.navigate(['admin/' + add + '/' + id]);
  }

}
