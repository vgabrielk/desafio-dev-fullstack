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

# Resumo
### Duas telas no frontend, uma com o formulário, outra com a listagem das simulações registradas (filtros, etc).
### No backend, 3 endpoints: registrar uma nova simulação, consumir em lista, consumir por id.


# O Desafio:
Utilizando o seu smartphone ou desktop, João deve ser capaz de realizar uma simulação para um plano de compensação energética. <br/>
O processo é simples, João submete um formulário contendo o seu nome, email e telefone, junto a **uma ou mais** contas de energia (que será decodificada por nossa API interna).<br/><br/>
Uma vez submetido o formulário, o backend tem que ser capaz de criar um novo ```lead``` contendo as informações cadastrais do author, juntamente aos dados decodificados da conta de energia.
#
# Link para contas de energia [aqui](https://github.com/newsunenergy/desafio-dev-fullstack-12-2023/tree/main/contas-de-energia)

> [!TIP]
> A escolha de tecnologia é livre. O único requisito é que seja feito em Typescript e que o frontend seja feito em ReactJS ou NextJS. Pode adicionar frameworks ou bibliotecas da sua escolha!<br/>

>[!NOTE]
>Endpoint utilizado para decodificação da conta de energia. <br/>
>Sem autenticação, apenas realizar um POST com `multipart/form-data`<br/> o body deve ter o campo `"file"` contendo a conta de energia <br/>
>POST https://magic-pdf.solarium.newsun.energy/v1/magic-pdf <br/><br/>
>Content-Type: multipart/form-data <br />
![image](https://github.com/newsunenergy/desafio-dev-fullstack-12-2023/assets/30875229/c2d784b6-d4f3-4009-b9c1-cbea7feac17d)


>[!CAUTION]
> Não há necessidade de salvar o arquivo da conta de energia. Não será utilizado como critério de avaliação

# Link para contas de energia [aqui](https://github.com/newsunenergy/desafio-dev-fullstack-12-2023/tree/main/contas-de-energia)

### Frontend
- [ ] Página para submissão do formulário ```/simular```
- [ ] Página de consulta ```/listagem```

### Backend
- [ ] Endpoint para registrar uma nova simulação
- [ ] Endpoint para listar todas as simulações (com opção de filtro por nome, email, codigo da unidade consumidora etc)
- [ ] Endpoint para listar uma simulação baseado no id do lead, etc...
- [ ] Modelar domínio com os agregados a seguir:

### Diferencial
- [ ] Fazer validação dos dados transitados na API.
- [ ] Configurar ambiente docker para rodar a aplicação.


      
```ts
export interface Lead {
  id: string
  nomeCompleto: string
  email: string 
  telefone: string
  unidades: Unidade[]
}

export interface Unidade {
  id: string
  codigoDaUnidadeConsumidora: string
  modeloFasico: 'monofasico' | 'bifasico' | 'trifasico'
  enquadramento: 'AX' | 'B1' | 'B2' | 'B3'
  historicoDeConsumoEmKWH: Consumo[]
}

export interface Consumo {
  consumoForaPontaEmKWH: number
  mesDoConsumo: Date
}

```
>[!NOTE]
> DICA<br/>
> ![image](https://github.com/newsunenergy/desafio-dev-fullstack-12-2023/assets/30875229/1601b2e4-f1b9-4b40-a2ae-020e342c7796)<br/>
> `unit_key` representa `codigoDaUnidadeConsumidora` no nosso domínio<br/>
> `chargingModel` representa `unit.enquadramento` no nosso domínio<br/>
> `phaseModel` representa  `unit.modeloFasico` no nosso domínio<br/>
> `consumo_fp` representa `unit.historicoDeConsumoEmKWH.consumoForaPontaEmKWH`<br/>
> `consumo_date` representa `mesDoConsumo` <br/><br/>

#

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

# Resumo
### Duas telas no frontend, uma com o formulário, outra com a listagem das simulações registradas (filtros, etc).
### No backend, 3 endpoints: registrar uma nova simulação, consumir em lista, consumir por id.

#

# Comece
O processo do desafio deve ser: <br />

+ Faça o fork do desafio.
+ Crie um PROJECT.md com a explicação de como devemos executar o projeto e com o máximo de detalhes possível do que foi feito.
+ Após concluir faça um pull request

Qualquer dúvida entre em contato por email.
paulo.santana@newsun.energy