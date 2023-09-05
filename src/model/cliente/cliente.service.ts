import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ClienteService {
  constructor(private prisma: PrismaService) {}

  create(createClienteDto: CreateClienteDto) {
    if (createClienteDto.pessoa.length < 1) {
      return 'Tem que ter 1 ou mais Pessoas relacionadas';
    }
    return this.prisma.cliente.create({
      data: {
        cnpj: createClienteDto.cnpj,
        nome: createClienteDto.nome,
        data_de_fundacao: createClienteDto.data_de_fundacao,
        tipo: createClienteDto.tipo,
        telefone: createClienteDto.telefone,
        email: createClienteDto.email,
        enderecoId: createClienteDto.enderecoId,
        pessoa: {
          connectOrCreate: createClienteDto.pessoa.map((pessoa) => {
            return {
              where: {
                cpf: pessoa.cpf,
              },
              create: {
                nome: pessoa.nome,
                cpf: pessoa.cpf,
                data_de_nascimento:
                  typeof pessoa.data_de_nascimento === 'string'
                    ? new Date(pessoa.data_de_nascimento)
                    : pessoa.data_de_nascimento,
                telefone: pessoa.telefone,
                email: pessoa.email,
              },
            };
          }),
        },
      },
      include: {
        pessoa: {
          select: {
            id: true,
            nome: true,
            cpf: true,
            email: true,
            telefone: true,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.cliente.findMany({
      select: {
        id: true,
        cnpj: true,
        nome: true,
        email: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.cliente.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        cnpj: true,
        nome: true,
        email: true,
        endereco: {
          select: {
            cep: true,
            logradouro: true,
            numero: true,
            bairro: true,
            cidade: true,
            estado: true,
          },
        },
        pessoa: {
          select: {
            id: true,
            nome: true,
            cpf: true,
            email: true,
          },
        },
      },
    });
  }

  update(id: string, updateClienteDto: UpdateClienteDto) {
    return this.prisma.cliente.update({
      where: {
        id,
      },
      data: {
        cnpj: updateClienteDto.cnpj,
        nome: updateClienteDto.nome,
        data_de_fundacao: updateClienteDto.data_de_fundacao,
        tipo: updateClienteDto.tipo,
        telefone: updateClienteDto.telefone,
        email: updateClienteDto.email,
        enderecoId: updateClienteDto.enderecoId,
        pessoa: {
          set: updateClienteDto.pessoa.map((pessoa) => {
            return { cpf: pessoa.cpf };
          }),
        },
      },
    });
  }

  remove(id: string) {
    return this.prisma.cliente.delete({
      where: {
        id,
      },
    });
  }
}
