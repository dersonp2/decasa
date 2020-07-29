import { PerfilUsuario } from './perfil-usuario.module';
import { OrigemCadastro } from './origem-cadastro.module';
import { MotivoBloqueio } from './motivo-bloqueio.module';

export class Usuario {
  id: number;
  nome: string;
  cpf: string;
  senha: any;
  email: string;
  dataCadastro: Date;
  ultimoAcesso: Date;
  resetarSenha: boolean;
  bloqueado: boolean;
  dataBloqueio: Date;
  token: string;
  motivoBloqueio: MotivoBloqueio;
  usuario: Usuario;
  origemCadastro: OrigemCadastro;
  perfisUsuario: PerfilUsuario[];
  platformEnum: number;

}
