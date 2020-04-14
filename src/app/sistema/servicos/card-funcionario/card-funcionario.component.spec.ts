import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFuncionarioComponent } from './card-funcionario.component';

describe('CardFuncionarioComponent', () => {
  let component: CardFuncionarioComponent;
  let fixture: ComponentFixture<CardFuncionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFuncionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
