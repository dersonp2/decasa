import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-nav-horizontal',
  templateUrl: './nav-horizontal.component.html',
  styleUrls: ['./nav-horizontal.component.css']
})
export class NavHorizontalComponent implements OnInit {
  isLinear = false;
  btnContratar = true;
  isDisplay = true;
  href = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.href = this.router.url;
    console.log(this.href);
    this.displayBtnContratar();
  }

  displayBtnContratar() {
    if (this.href === '/pagamento') {
      this.btnContratar = false;
    } else {
      this.btnContratar = true;
    }
  }

  // Ir para próxima tela
  goTo() {
    switch (this.href) {
      case '/orcamento':
        this.router.navigate(['/quantidade']);
        break;
      case '/quantidade':
        this.router.navigate(['/proposta']);
        break;
      case '/proposta':
        this.router.navigate(['/pagamento']);
        break;
    }
  }

  toggleDisplay() {
    this.isDisplay = !this.isDisplay;
  }

}
