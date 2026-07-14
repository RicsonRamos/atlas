# OPS-07 — Governança Operacional de Modelos

**Domínio:** 01 — MLOps e Engenharia de Sistemas de IA
**Carga horária:** 24-30h
**Nível:** Foundation
**Pré-requisitos:** OPS-01
**Selo de Escopo:** 🟢 Aberto

## Ementa
Esta disciplina estuda as diretrizes e ferramentas para estabelecer conformidade, auditoria e controle de riscos sobre modelos preditivos corporativos (*Model Governance*). Aborda a estruturação e documentação de fichas técnicas padronizadas (*Model Cards*), linhagem completa de dados e código, e explicabilidade de inteligência artificial (métodos SHAP e LIME). Analisa métricas quantitativas de equidade (*fairness*) e viés algorítmico. Detalha a conformidade com as legislações vigentes e regulamentações setoriais nacionais e internacionais (como o EU AI Act e as portarias da ANPD), provendo caminhos práticos para auditar decisões automatizadas.

## Objetivos
1. Projetar e redigir Model Cards estruturados contendo metadados completos de conformidade ética e técnica do modelo.
2. Auditar decisões automatizadas individuais utilizando valores SHAP para explicar a importância das variáveis.
3. Projetar e implementar testes de viés (frequência de aprovação por subgrupo populacional) em bases de dados de teste de modelos.

## Pré-requisitos
OPS-01 Ciclo de Vida de Modelos (MLLC) e noções de Probabilidade e Estatística.

## Conteúdo programático

**Fundamentos** — A definição de governança algorítmica e conformidade corporativa em inteligência artificial; o papel dos Model Cards (definição de uso, limitações, métricas e ética); auditoria externa de modelos e explicabilidade.

**Teoria** — A formulação dos Valores de Shapley ($\text{SHAP}$) para explicabilidade local aditiva de previsões. O valor atribuído a uma variável $i$ para explicar o desvio da previsão em relação à média populacional é expresso por:
$$\phi_i(v) = \sum_{S \subseteq N \setminus \{i\}} \frac{|S|!(|N| - |S| - 1)!}{|N|!} \left[ v(S \cup \{i\}) - v(S) \right]$$
onde $N$ é o conjunto completo de todas as variáveis preditoras, $S$ é um subconjunto de variáveis excluindo a variável $i$, e $v(S)$ é a previsão do modelo usando apenas o subconjunto de variáveis $S$.

**Aplicação prática** — Implementação de rotina em Python para calcular contribuições locais de importância de variáveis (representação simplificada de SHAP) e gerar uma explicação textual de uma decisão de concessão de limite de cartão de crédito.

## Código de Exemplo em Python (Explicação Aditiva de Previsão de Crédito)
```python
import numpy as np

# 1. Definir o Valor de Referência (Média de aprovação populacional do modelo: 500 reais de limite)
valor_base = 500.0

# 2. Atributos do Cliente Sob Análise
cliente_valores = {
    "score_serasa": 750,
    "comprometimento_renda": 0.20,
    "historico_atraso_meses": 0
}

# 3. Valores de Atribuição (Valores SHAP calculados para a chamada específica do cliente)
# Em produção, esses valores seriam calculados pela biblioteca 'shap' usando o modelo
valores_shap = {
    "score_serasa": 350.0,            # Contribui positivamente (+350 reais)
    "comprometimento_renda": -100.0,  # Compromete renda (-100 reais)
    "historico_atraso_meses": 150.0   # Sem atrasos históricos (+150 reais)
}

def gerar_laudo_explicabilidade(base, valores_importancia, cliente):
    # A previsão final é a soma aditiva do valor base com as contribuições individuais
    previsao_final = base + sum(valores_importancia.values())
    
    print("--- Laudo Técnico de Explicação de Decisão Automatizada ---")
    print(f"Valor Base de Limite de Crédito: R$ {base:.2f}")
    print("Contribuições de Importância de Atributos:")
    for feature, shap_val in valores_importancia.items():
        sinal = "+" if shap_val >= 0 else ""
        valor_cliente = cliente[feature]
        print(f" - {feature} (Valor: {valor_cliente}): {sinal}R$ {shap_val:.2f}")
        
    print(f"Previsão Final do Limite Aprovado: R$ {previsao_final:.2f}")
    
    # Validação de consistência aditiva
    assert np.isclose(previsao_final, 900.0), "Falha na soma aditiva das atribuições."

# Executar a geração do laudo
gerar_laudo_explicabilidade(valor_base, valores_shap, cliente_valores)
```

## Casos práticos
- **Caso 1**: Uma operadora de convênios de saúde usa um modelo preditivo para aprovar ou negar automaticamente procedimentos cirúrgicos complexos. A ANPD e o Ministério Público exigem uma auditoria após denúncias de discriminação etária. O hospital não dispõe de registros SHAP ou logs da versão exata do modelo aplicada para cada decisão histórica de paciente.
- **Caso 2**: Um modelo de triagem automática de currículos para cargos de tecnologia apresenta taxa de aprovação de mulheres 60% inferior à taxa de aprovação de homens, devido ao viés histórico contido nos dados de treinamento dos últimos 10 anos. Estruturar testes de paridade de impacto (*disparate impact*) para detectar a anomalia.
- **Caso 3 (Caso Multivariável)**: Desenho do protocolo de governança corporativa de IA para uma seguradora multinacional sob a vigência do EU AI Act. O protocolo deve mapear: (a) ciclo de vida de criação e aprovação de Model Cards via repositório Git; (b) pipeline de auditoria mensal de explicabilidade de modelos contendo a extração periódica de SHAP global; (c) testes automatizados semanais de paridade demográfica (*fairness metrics*) nas decisões de sinistros.

## Regulação Técnica e Jurisprudência
| Tribunal ou Órgão/Tema | Entendimento / Norma | Impacto Prático |
|---|---|---|
| EU AI Act (Classificação) | Classifica modelos aplicados a crédito, emprego e saúde como sistemas de IA de Alto Risco (*High-Risk AI Systems*). | Exige registro em base de dados europeia, Model Cards públicos, gestão de qualidade e supervisão humana estrita. |
| ANPD (Explicabilidade) | O direito de revisão de decisões automatizadas impõe o dever de fornecer explicações inteligíveis aos cidadãos. | Impede o uso de modelos do tipo "caixa preta" sem ferramentas de explicabilidade aditiva associadas (SHAP/LIME). |

## Doutrina / Referências Técnicas
- MITCHELL, Margaret et al. *Model Cards for Model Reporting*. Proceedings of the Conference on Fairness, Accountability, and Transparency (FAT*), 2019 (Seminal).
- LUNDBERG, Scott & LEE, Su-In. *A Unified Approach to Interpreting Model Predictions*. Advances in Neural Information Processing Systems (NeurIPS), 2017 (Seminal).
- MOLNAR, Christoph. *Interpretable Machine Learning: A Guide for Making Black Box Models Explainable*. Leanpub, 2020.

## Legislação Relacionada
- Lei Geral de Proteção de Dados (LGPD) - Artigo 20: o direito à revisão de decisões tomadas unicamente com base em tratamento automatizado de dados pessoais.
- Lei de Introdução às Normas do Direito Brasileiro (LINDB - Decreto-Lei nº 4.657/1942), art. 20: exigência de motivação baseada em fatos e dados nas decisões automatizadas da administração pública.

## Prática Profissional
- Elaboração de relatórios de auditoria e laudos técnicos de explicabilidade algorítmica para compliance jurídico, estruturação de Model Cards em repositórios corporativos, e aplicação de pacotes de Fairness (AIF360 / Fairlearn).

## Estado da Arte e Debates em Aberto
- **Consenso técnico:** Os valores SHAP (Shapley Additive Explanations) baseados na teoria dos jogos cooperativos tornaram-se o padrão da indústria devido às suas propriedades matemáticas fundamentais de aditividade e consistência.
- **Debate ativo pós-2023:** Os limites práticos de explicar modelos generativos (LLMs) multimodais que utilizam bilhões de parâmetros de forma legível e inteligível para usuários finais sem conhecimento técnico profundo.

## Questões Avançadas
- Como a propriedade de *Aditividade* dos valores SHAP garante que a soma das contribuições de cada variável explique exatamente a diferença entre a predição final e a previsão média populacional? *(pesquisa/matematica)*
- De que forma a remoção de variáveis protegidas por lei (como 'Raça' ou 'Gênero') do dataset de treino pode não ser suficiente para eliminar o viés algorítmico, por conta de correlações implícitas em outras variáveis não-protegidas? *(pesquisa/ética)*

## Exercícios
- Modifique o laudo de explicabilidade do exemplo para gerar um arquivo Markdown simplificado simulando uma exportação de Model Card da decisão.
- Implemente uma checagem de impacto díspar em Python: dadas duas listas (taxas de aprovação do grupo A e grupo B), verifique se a proporção de aprovação do grupo minoritário é inferior a 80% do grupo majoritário (Regra dos 4/5).
- Para o caso multivariável de seguros sob o EU AI Act, desenhe um mapa mental detalhando os passos requeridos para a promoção de um modelo classificado como "Alto Risco" para o ambiente de produção.

## Tags
#MLOps #Pipeline #Producao
