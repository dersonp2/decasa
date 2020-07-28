import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-page-test',
  templateUrl: './page-test.component.html',
  styleUrls: ['./page-test.component.css']
})
export class PageTestComponent {
  date;

  config = {
    locale: 'pt-br',
    min: '10-10-2020',
    enableMonthSelector: false,
    showGoToCurrent: true
  };

  teste() {
    alert('Teste');
  }
}
