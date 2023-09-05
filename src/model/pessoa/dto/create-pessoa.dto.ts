import { Prisma } from '@prisma/client';
import { Pessoa } from '../entities/pessoa.entity';

export class CreatePessoaDto extends Pessoa {
  nome: string;

  cpf: string;

  data_de_nascimento: string | Date;

  telefone: string;

  email: string;

  cliente?: Prisma.ClienteCreateNestedManyWithoutPessoaInput;
}
