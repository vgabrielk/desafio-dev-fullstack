# NewSun Energy Brazil
## Processo de recrutamento

Olá dev, bem vindo ao nosso processo de recrutamento para desenvolvedor Full Stack!

### Sobre a vaga
* 100% Remoto
* Flexibilidade no horário de trabalho

### Requisitos para a vaga
Conhecimentos sólidos em:

* Typescript (com nodejs)
* ReactJS/NextJS
* Estilização com tailwindCSS ou @chakra-ui
* MySQL (utilizando algum ORM: prisma, typeORM, etc...)
* Consumir e Servir aplicações RESTful

Desejável:
* NestJS
* Docker
* Noções de Clean Architeture
* Noções de SOLID.
* Noções de Domain Driven Design (DDD).


## O desafio:
Utilizando o seu smartphone ou desktop, João deve ser capaz de realizar uma simulação para um plano de compensação energética. 
###
O processo é simples, João submete um formulário contendo o seu nome, email e telefone, junto a **uma ou mais** contas de energia (que será decodificada por nossa API interna).
###
Uma vez submetido o formulário, o backend tem que ser capaz de criar um novo ```lead``` contendo as informações cadastrais do author, juntamente aos dados decodificados da conta de energia.

### Frontend
- [ ] Página para submissão do formulário ```/simular```
- [ ] Página de consulta ```/listagem```

### Backend
- [ ] Endpoint para registrar uma nova simulação
- [ ] Endpoint para listar todas as simulações (com opção de filtro por nome, email, codigo da unidade consumidora etc)
- [ ] Endpoint para listar uma simulação baseado no id do lead, etc...
- [ ] Modelar domínio com os agregados a seguir:
##### A fim de facilitar, vamos reduzir a complexidade dos agregados apenas pra informações pertinentes
```ts
export abstract class Lead {
  id: string
  nomeCompleto: string
  email: string 
  telefone: string
  unidades: Unidade[]
}

export abstract class Unidade {
  id: string
  codigoDaUnidadeConsumidora: string
  modeloFasico: 'monofasico' | 'bifasico' | 'trifasico'
  enquadramento: 'AX' | 'B1' | 'B2' | 'B3'
  historicoDeConsumoEmKWH: Consumo[]
}

export abstract class Consumo {
  consumoForaPontaEmKWH: number
  mesDoConsumo: Date
}

```
# Regras
* O email deverá ser único por `lead`
* O codigoDaUnidadeConsumidora deve ser único.
* Um lead deve ter no mínimo 1 `unidade`.
* Uma `unidade` deve ter exatamente o `historicoDeConsumoEmKWH` do `Consumo` dos últimos 12 meses. Em outras palavras, `${unit.historicoDeConsumoEmKWH}` length tem que ser 12.

```ts
export interface SolicitarSimulacaoDeCompensacaoEnergeticaInput {
  nomeCompleto: string
  email: string
  telefone: string
  faturasDeEnergia: (Buffer | File)[]
  informacoesDaFatura: InformacaoDaFatura[]
}

export interface InformacaoDaFatura {
    codigoDaUnidadeConsumidora: string
    modeloFasico: string
    enquadramento: string
    mesDeReferencia: Date
    consumoEmReais: number
    historicoDeConsumoEmKWH: {
      consumoForaPontaEmKWH: number
      mesDoConsumo: Date
    }[]
}
```
