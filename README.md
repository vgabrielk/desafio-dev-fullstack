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
Utilizando o seu smartphone ou desktop, João deve ser capaz de realizar uma simulação para um plano de compensação energético. 
###
O processo é simples, João submete um formulário contendo o seu nome, email e telefone, junto a **uma ou mais** contas de energia (que será decodificada por nossa API interna).
###
Uma vez submetido o formulário, o backend tem que ser capaz de criar um novo ```lead``` contendo as informações cadastrais do author, juntamente aos dados decodificados da conta de energia.

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
      consumoFP: number
      consumoDate: Date
    }[]
}
```
