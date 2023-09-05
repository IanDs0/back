import { Cliente } from 'src/model/cliente/entities/cliente.entity';

export class Pessoa {
  // id?: string;
  nome: string;
  cpf: string;
  data_de_nascimento: Date | string;
  telefone: string;
  email: string;
  cliente?: Cliente[];
  // cliente?: Prisma.ClienteUncheckedCreateNestedManyWithoutPessoaInput;
}
