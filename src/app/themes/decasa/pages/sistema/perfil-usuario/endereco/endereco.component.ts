import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ViaCepService} from '../../../../../../services/via-cep.service';
import {EnderecoCliente} from '../../../../../../model/endereco-cliente.module';
import {AuthService} from '../../../../../../services/auth.service';
import {EnderecoService} from '../../../../../../services/endereco.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogLoginComponent} from '../../../../blocos/dialog/dialog-login/dialog-login.component';
import {ListaEnderecosComponent} from './lista-enderecos/lista-enderecos.component';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {

  displayForm = false;
  enderecoForm: FormGroup;
  public cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  endereco: EnderecoCliente = new EnderecoCliente();
  @ViewChild(ListaEnderecosComponent) listaEndereco: ListaEnderecosComponent;


  constructor(private formBuilder: FormBuilder, private cepService: ViaCepService, public dialog: MatDialog, private authService: AuthService, private enderecoService: EnderecoService) {
    this.enderecoForm = this.formBuilder.group({
      cep: ['', [Validators.required, Validators.minLength(9)]],
      logradouro: ['', [Validators.required]],
      numero: [''],
      bairro: ['', [Validators.required]],
      cidade: [{values: '', disabled: true}, [Validators.required]],
      uf: [{values: '', disabled: true}, [Validators.required]],
      complemento: [''],
      pais: [{values: '', disabled: true}, [Validators.required]],
      check: [''],
    });
  }


  ngOnInit(): void {
    if (!this.authService.check()) {
      this.openModal();
    }
  }

  // Abre a dialog de login
  openModal() {
    const dialogRef = this.dialog.open(DialogLoginComponent, {
      disableClose: true
    });
  }


  display() {
    this.displayForm = !this.displayForm;
    this.endereco.id = null;
  }


  // Busca o cep
  onBlurCep() {
    if (this.enderecoForm.controls.cep.valid) {
      console.log('valido');
      const cep = this.enderecoForm.get('cep').value.replace('-', '');
      this.cepService.getEndereco(cep).subscribe(
        (data) => {
          console.log(data);
          this.enderecoForm.patchValue({
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            uf: data.uf
          });
        }
      );
    }
  }

  // TODO: alterar para enderecoForm.valeu
  saveAddress() {
    this.endereco.clienteId = this.authService.getUser().id;
    this.endereco.cep = this.enderecoForm.get('cep').value.replace('-', '');
    this.endereco.logradouro = this.enderecoForm.get('logradouro').value;
    this.endereco.bairro = this.enderecoForm.get('bairro').value;
    this.endereco.municipio.nome = this.removeAcento(this.enderecoForm.get('cidade').value);
    this.endereco.municipio.uf.sigla = this.enderecoForm.get('uf').value;
    this.endereco.complemento = this.enderecoForm.get('complemento').value;
    this.endereco.numero = this.enderecoForm.get('numero').value;
    this.endereco.domicilio = this.enderecoForm.get('check').value;
    console.log(this.endereco);
    this.enderecoService.saveAddress(this.endereco).subscribe(
      (data) => {
        console.log(data);
        this.displayForm = false;
        this.listaEndereco.getAllAddress();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  teste(e: EnderecoCliente) {
    this.displayForm = true;
    this.endereco.id = e.id;
    this.enderecoForm.get('cep').setValue(e.cep);
    this.enderecoForm.get('logradouro').setValue(e.logradouro);
    this.enderecoForm.get('bairro').setValue(e.bairro);
    this.enderecoForm.get('cidade').setValue(e.municipio.nome);
    this.enderecoForm.get('uf').setValue(e.municipio.uf.sigla);
    this.enderecoForm.get('complemento').setValue(e.complemento);
    this.enderecoForm.get('numero').setValue(e.numero);
    this.enderecoForm.get('check').setValue(e.domicilio);
  }

  removeAcento(text) {
    text = text.toUpperCase();
    text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'A');
    text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'E');
    text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'I');
    text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'O');
    text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'U');
    text = text.replace(new RegExp('[Ç]', 'gi'), 'C');
    return text;
  }
}
