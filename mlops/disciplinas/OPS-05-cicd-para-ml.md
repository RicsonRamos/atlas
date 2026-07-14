# OPS-05 — CI/CD para ML

**Domínio:** 01 — MLOps e Engenharia de Sistemas de IA
**Carga horária:** 24-30h
**Nível:** Foundation
**Pré-requisitos:** OPS-01
**Selo de Escopo:** 🟢 Aberto

## Ementa
Esta disciplina estuda as práticas de Integração Contínua (CI) e Entrega Contínua (CD) aplicadas especificamente aos ciclos de vida de Inteligência Artificial e Machine Learning. Explora a orquestração de pipelines de ponta a ponta que englobam a ingestão, validação de dados, treinamento automatizado, avaliação de performance e implantação de modelos (*Continuous Training* - CT). Detalha testes unitários para dados (frameworks como Great Expectations) e testes comportamentais para modelos (direcionamento, invariância). Aborda infraestrutura declarativa (Terraform) e técnicas avançadas de deploy progressivo (Canary e Blue-Green Deployments).

## Objetivos
1. Projetar e implementar uma esteira de CI/CD completa automatizando a promoção de modelos de ML.
2. Implementar testes unitários para validar a integridade estrutural e estatística de dados brutos de entrada.
3. Desenhar estratégias de deploy contínuo com estratégias de rollback automático baseadas em thresholds de falha.

## Pré-requisitos
OPS-01 Ciclo de Vida de Modelos (MLLC) e noções de Git/Docker.

## Conteúdo programático

**Fundamentos** — O conceito de CI/CD convencional (código estático) versus CI/CD em ML (dados dinâmicos + código); a tríade de artefatos (código, dados de treino e parâmetros do modelo); o conceito de Treinamento Contínuo (*Continuous Training*).

**Teoria** — A formulação lógica do ciclo de validação de dados sob constraints. O teste de integridade estrutural expressa que, para um conjunto de dados recebido $D$, as constraints estruturais $C(D)$ devem retornar valor lógico verdadeiro:
$$C(D) = \bigwedge_{i=1}^n c_i(D) = \text{True}$$
onde cada cláusula $c_i(D)$ representa uma asserção sobre a nulidade de colunas, limites de valores, tipos de dados ou integridade referencial antes da etapa de retreinamento do modelo.

**Aplicação prática** — Implementação de rotina de teste de dados usando PyTest e asserções em Python para simular a validação de integridade estrutural de um dataset de treino de MLOps.

## Código de Exemplo em Python (Validação Unitária de Dados para Pipeline)
```python
import pandas as pd
import pytest

# 1. Dataset mock de entrada (Simulando novos dados coletados para retreinamento)
dados_brutos = pd.DataFrame([
    {"id_transacao": 1, "valor": 150.0, "categoria": "eletronicos", "email_valido": True},
    {"id_transacao": 2, "valor": 2300.5, "categoria": "viagem", "email_valido": True},
    {"id_transacao": 3, "valor": -5.0, "categoria": "vestuario", "email_valido": False}, # Erro: Valor negativo!
    {"id_transacao": 4, "valor": 80.0, "categoria": None, "email_valido": True}        # Erro: Categoria nula!
])

# 2. Definição das regras de validação estrutural (Simulando asserções do Great Expectations)
def validar_dataset(df):
    erros = []
    
    # Regra 1: id_transacao deve ser único e não-nulo
    if df["id_transacao"].isnull().any() or df["id_transacao"].duplicated().any():
        erros.append("Falha na constraint de chave primária 'id_transacao'.")
        
    # Regra 2: Todos os valores monetários devem ser estritamente positivos (> 0)
    if (df["valor"] < 0).any():
        erros.append("Falha: Valores negativos encontrados na coluna 'valor'.")
        
    # Regra 3: A coluna categoria não deve conter registros nulos (NaN)
    if df["categoria"].isnull().any():
        erros.append("Falha: Valores nulos encontrados na coluna 'categoria'.")
        
    return erros

# 3. Teste Unitário (Executado no pipeline de Integração Contínua)
def test_validacao_dados():
    erros_detectados = validar_dataset(dados_brutos)
    
    # Se existirem erros, o teste falha, interrompendo o pipeline de build/deploy
    assert len(erros_detectados) == 0, f"Erros de integridade detectados: {erros_detectados}"

# Bloco executável para demonstração
if __name__ == "__main__":
    print("--- Executando Validação de Integridade de Dados ---")
    erros = validar_dataset(dados_brutos)
    if erros:
        print("⚠️ PIPELINE INTERROMPIDO: Os dados falharam na validação automática!")
        for e in erros:
            print(" -", e)
    else:
        print("✅ Dados aprovados. Prosseguindo para o treinamento do modelo.")
```

## Casos práticos
- **Caso 1**: Uma operadora de telecomunicações automatizou o deploy de modelos de churn. Um script de ingestão atualizou a base de treinamento alterando o tipo de dado da coluna "tempo de adesão" de inteiro para string ("12 meses"). O pipeline rodou sem testes unitários de dados, gerando um modelo inválido que quebrou em produção no dia seguinte.
- **Caso 2**: Um banco implanta um modelo de concessão de empréstimos em produção via substituição direta de instâncias. O novo modelo continha um bug de importação interna de biblioteca e causou interrupção total (100% de erros) nas requisições do app. Resolver o cenário estruturando uma estratégia de implantação Blue-Green com rollback automático.
- **Caso 3 (Caso Multivariável)**: Desenhar a esteira de CI/CD para o modelo de análise de risco de crédito de um banco digital. A esteira deve ser disparada automaticamente por commit de código no GitHub. Deve incluir: (a) verificação lint e testes unitários de código; (b) execução de testes de qualidade de dados (Great Expectations); (c) execução de testes comportamentais de modelo (testes de viés e de robustez); (d) build de imagem Docker e deploy progressivo (Canary) no Kubernetes com monitoramento ativo de erros de requisição.

## Regulação Técnica e Jurisprudência
| Tribunal ou Órgão/Tema | Entendimento / Norma | Impacto Prático |
|---|---|---|
| ISO/IEC 27001:2022 | Diretrizes de segurança da informação, aplicáveis ao controle de versões e esteiras produtivas automatizadas. | Exige registros de logs de auditoria detalhados e controle de acesso a pipelines produtivos. |
| ANPD (Segurança) | O controlador deve adotar medidas de segurança e controle técnico adequados desde a fase de concepção de sistemas (Privacy by Design). | Obriga a inserção de checagens automáticas de integridade de dados e mascaramento em esteiras de teste de ML. |

## Doutrina / Referências Técnicas
- GREAT EXPECTATIONS (Documentation). *Core Concepts: Expectations, Data Context, Checkpoints*. docs.greatexpectations.io.
- HUMBLE, Jez & FARLEY, David. *Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation*. Addison-Wesley, 2010.
- SATO, Danilo et al. *Continuous Delivery for Machine Learning: Practical Guide to MLOps*. ThoughtWorks, 2019.

## Legislação Relacionada
- Código Civil Brasileiro (Lei nº 10.406/2002), art. 927: responsabilidade civil objetiva por danos materiais decorrentes de falhas técnicas sistêmicas automatizadas não-validadas de forma diligente.

## Prática Profissional
- Escrita de workflows do GitHub Actions / GitLab CI, configuração de jobs do Terraform para provisionamento de servidores Kubernetes de inferência, e definição de asserções declarativas com Great Expectations.

## Estado da Arte e Debates em Aberto
- **Consenso técnico:** A automação completa da esteira de ML (Continuous Training) é o estado de maturidade máxima de MLOps (Nível 2 do Google Cloud MLOps Maturity Model), onde a intervenção humana pós-codificação inicial é mínima.
- **Debate ativo pós-2023:** Validação centralizada e rígida de schemas de dados vs. flexibilidade técnica de data lakes semi-estruturados para acelerar a inovação e o time-to-market de novos modelos.

## Questões Avançadas
- Como a implantação progressiva do tipo *Canary* (direcionar inicialmente apenas 5% do tráfego real para o novo modelo) reduz a exposição do negócio a falhas catastróficas em comparação com deploys de substituição instantânea? *(pesquisa/sistemas)*
- Explique de que forma os testes unitários de modelo do tipo *Invariance Tests* (garantir que a alteração de atributos irrelevantes como 'Gênero' não altere a predição final de aprovação de crédito) ajudam a auditar a equidade ética algorítmica. *(pesquisa)*

## Exercícios
- Modifique o teste unitário de exemplo para verificar se a coluna "email_valido" contém apenas valores booleanos (`True` ou `False`).
- Configure um pipeline mock de GitHub Actions (em formato YAML comentado) descrevendo os passos de testes unitários, build de container Docker e deploy em ambiente de validação.
- Para o caso multivariável de risco de crédito, esquematize o fluxograma detalhado da esteira mostrando as condições de aprovação ou rejeição de cada estágio (gateways de qualidade).

## Tags
#MLOps #Pipeline #Producao
