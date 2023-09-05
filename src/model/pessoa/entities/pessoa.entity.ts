import { Prisma } from '@prisma/client';

export class Pessoa implements Prisma.PessoaUncheckedCreateInput {
  id?: string;
  nome: string;
  cpf: string;
  data_de_nascimento?: Date | string;
  telefone: string;
  email: string;
  cliente?: Prisma.ClienteUncheckedCreateNestedManyWithoutPessoaInput;
}
