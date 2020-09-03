import {Municipio} from './municipio.module';

export class MunicipioPrestador {
  id: number;
  ativo: boolean;
  municipio: Municipio;

  constructor(municipio) {
    this.municipio = municipio;
  }
}
