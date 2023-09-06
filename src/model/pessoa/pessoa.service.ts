import { Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';

import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class PessoaService {
  constructor(private prisma: PrismaService) {}

  create(createPessoaDto: CreatePessoaDto) {
    return this.prisma.pessoa.create({
      data: {
        nome: createPessoaDto.nome,
        cpf: createPessoaDto.cpf,
        data_de_nascimento: createPessoaDto.data_de_nascimento,
        telefone: createPessoaDto.telefone,
        email: createPessoaDto.email,
        cliente: createPessoaDto.cliente
          ? {
              connect: createPessoaDto.cliente.map((cliente) => ({
                cnpj: cliente.cnpj,
              })),
            }
          : undefined,
      },
      include: {
        cliente: {
          select: {
            id: true,
            cnpj: true,
            nome: true,
            email: true,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.pessoa.findMany({
      select: {
        id: true,
        nome: true,
        cpf: true,
        email: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.pessoa.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        nome: true,
        cpf: true,
        data_de_nascimento: true,
        email: true,
        telefone: true,
        cliente: {
          select: {
            id: true,
            cnpj: true,
            nome: true,
            email: true,
          },
        },
      },
    });
  }

  update(id: string, updatePessoaDto: UpdatePessoaDto) {
    return this.prisma.pessoa.update({
      where: {
        id,
      },
      data: {
        nome: updatePessoaDto.nome,
        cpf: updatePessoaDto.cpf,
        data_de_nascimento: updatePessoaDto.data_de_nascimento,
        telefone: updatePessoaDto.telefone,
        email: updatePessoaDto.email,
        cliente: updatePessoaDto.cliente
          ? {
              set: updatePessoaDto.cliente.map((cliente) => {
                return { cnpj: cliente.cnpj };
              }),
            }
          : undefined,
      },
    });
  }

  remove(id: string) {
    return this.prisma.pessoa.delete({
      where: {
        id,
      },
    });
  }
}
