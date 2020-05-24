import { DaysModel } from './../shared/days.model';
import { DetailsModel } from './../shared/details.model';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  details: DetailsModel;
  days: DaysModel;

  today: string;

  constructor() { }

  ngOnInit(): void {
    //// getting the actual date string
    const todayNumberInWeek = new Date().getDay();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.today = days[todayNumberInWeek];
    console.log(this.today);
  }

}
