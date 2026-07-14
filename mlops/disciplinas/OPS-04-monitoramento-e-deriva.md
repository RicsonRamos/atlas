# OPS-04 — Monitoramento e Deriva (Drift)

**Domínio:** 01 — MLOps e Engenharia de Sistemas de IA
**Carga horária:** 24-30h
**Nível:** Foundation
**Pré-requisitos:** OPS-01
**Selo de Escopo:** 🟢 Aberto

## Ementa
Esta disciplina estuda as metodologias de observabilidade e monitoramento de modelos de Machine Learning em ambientes produtivos. Analisa a degradação de performance de software (latência, taxas de erro) e algorítmica (acurácia, calibração). Explora conceitualmente os fenômenos de deriva de dados (*data drift*), deriva de conceito (*concept drift*) e desvio de covariáveis. Detalha os testes matemáticos e estatísticos utilizados para identificar mudanças populacionais (como o teste Kolmogorov-Smirnov, a Divergência de Kullback-Leibler e o Índice de Estabilidade Populacional - PSI). Aborda arquiteturas de shadow deployment e a implementação de alarmes automáticos.

## Objetivos
1. Projetar um sistema de observabilidade automatizado que compare em tempo real a distribuição de dados de inferência com a distribuição de treino.
2. Calcular e interpretar testes estatísticos clássicos (KS e PSI) para diagnosticar drifts algorítmicos.
3. Desenhar estratégias deShadow Deployment e testes A/B integradas a pipelines de retreinamento automático.

## Pré-requisitos
OPS-01 Ciclo de Vida de Modelos (MLLC) e noções de Estatística Geral.

## Conteúdo programático

**Fundamentos** — A deterioração natural de modelos preditivos por mudanças no ambiente físico; a diferença entre monitoramento de software convencional (Uso de CPU, RAM, Latência) e monitoramento de Machine Learning (Integridade de dados, qualidade preditiva); taxonomia dos desvios populacionais.

**Teoria** — A formulação matemática do Índice de Estabilidade Populacional ($\text{PSI}$):
$$\text{PSI} = \sum_{i=1}^k \left( P_i - Q_i \right) \times \ln\left(\frac{P_i}{Q_i}\right)$$
onde $P_i$ é a porcentagem observada no balde estatístico $i$ na população de referência (treino) e $Q_i$ é a porcentagem equivalente na população sob teste (produção). O teste estatístico não-paramétrico de Kolmogorov-Smirnov ($\text{KS}$) para comparar se duas amostras contínuas são provenientes da mesma distribuição de probabilidade através da distância suprema das funções de distribuição acumulada:
$$D = \sup_{x} |F_1(x) - F_2(x)|$$

**Aplicação prática** — Implementação de rotina em Python para calcular o teste Kolmogorov-Smirnov entre duas amostras de atributos, simulando a detecção de data drift em produção.

## Código de Exemplo em Python (Detecção de Data Drift via Teste KS)
```python
import numpy as np
from scipy import stats

# 1. População de Referência (Dados de Treinamento - Distribuição Normal Padrão)
np.random.seed(42)
dados_treino = np.random.normal(loc=0.0, scale=1.0, size=1000)

# 2. População de Produção - Cenário A: Sem Drift (Mesma distribuição de treino)
dados_producao_estaveis = np.random.normal(loc=0.05, scale=1.0, size=1000)

# 3. População de Produção - Cenário B: Com Drift (Média deslocada por alteração de perfil)
dados_producao_deriva = np.random.normal(loc=0.4, scale=1.0, size=1000)

def avaliar_drift(dados_ref, dados_prod, alpha=0.05):
    # Executa o teste KS de duas amostras
    d_estatistica, p_valor = stats.ks_2samp(dados_ref, dados_prod)
    
    # Se p-valor for menor que alpha, rejeita a hipótese nula de que as distribuições são iguais
    drift_detectado = p_valor < alpha
    
    return {
        "ks_stat": round(d_estatistica, 4),
        "p_value": round(p_valor, 6),
        "drift_detected": drift_detectado
    }

# Analisar os cenários
resultado_a = avaliar_drift(dados_treino, dados_producao_estaveis)
resultado_b = avaliar_drift(dados_treino, dados_producao_deriva)

print("--- Monitoramento de Data Drift (Teste Kolmogorov-Smirnov) ---")
print("Cenário A (Distribuição Estável):", resultado_a)
print("Cenário B (Distribuição sob Deriva):", resultado_b)
```

## Casos práticos
- **Caso 1**: Um modelo de recomendação de moda e vestuário de e-commerce apresenta queda repentina de conversão em 40% durante o mês de novembro. Ao auditar o sistema, identificou-se a introdução de compras sazonais da Black Friday, desconfigurando a distribuição usual de busca dos usuários (data drift clássico).
- **Caso 2**: Um modelo de concessão de limite de cartão de crédito bancário apresenta aumento exponencial de inadimplência de novos cartões, sem alteração de perfil dos clientes aprovados. A análise detectou uma mudança macroeconômica nacional de taxa de juros (concept drift, onde a relação entre a feature renda e o label inadimplência mudou estruturalmente).
- **Caso 3 (Caso Multivariável)**: Desenho do pipeline de monitoramento de risco para um modelo de fraude transacional de alta velocidade. O pipeline deve capturar amostras diárias de dados, executar testes automáticos de PSI e KS nas principais variáveis e, caso o PSI ultrapasse o limite de 0.25 em mais de 3 variáveis essenciais, disparar um alerta crítico no Slack e inicializar assincronamente o pipeline de retreinamento do modelo.

## Regulação Técnica e Jurisprudência
| Tribunal ou Órgão/Tema | Entendimento / Norma | Impacto Prático |
|---|---|---|
| NIST AI 100-1 | Framework de Gestão de Riscos em IA, enfatizando a necessidade de monitoramento contínuo de confiabilidade operacional. | Requer auditoria periódica de erros e desvios estatísticos de modelos em sistemas regulados. |
| ANPD (Laudo de Impacto) | O agente de tratamento deve comprovar mecanismos preventivos para identificar viés algorítmico emergente em produção. | Exige documentação técnica das metodologias e limiares adotados para detectar desvios de distribuição de dados. |

## Doutrina / Referências Técnicas
- EVIDENTLY AI (Documentation). *How to detect Data Drift and Concept Drift*. evidentlyai.com.
- YAVERBY, S. et al. *Evaluating Machine Learning Models under Covariate Shift*. Journal of Machine Learning Research (JMLR), 2020.
- WHYLOGS (Documentation). *Open source data logging library for ML profiling*. whylabs.ai.

## Legislação Relacionada
- Lei de Liberdade Econômica (Lei nº 13.874/2019), art. 3º: incentivo à inovação algorítmica associada à mitigação de danos sob parâmetros claros de auditoria técnica.

## Prática Profissional
- Instrumentação de bibliotecas de profiling como o whylogs para gerar assinaturas estatísticas de dados leves (*profiles*), integração com dashboards do Grafana via Prometheus, e escrita de regras de alertas estatísticos.

## Estado da Arte e Debates em Aberto
- **Consenso técnico:** O Índice de Estabilidade Populacional (PSI) consolidou-se como o threshold estatístico mais prático em finanças corporativas, sendo adotado internacionalmente por órgãos reguladores bancários (Basileia III).
- **Debate ativo pós-2023:** Como diferenciar ruídos de variação amostral diária de desvios reais estruturais sem gerar falsos alertas excessivos em bases corporativas gigantescas de dados.

## Questões Avançadas
- Discorra sobre como o *shadow deployment* (executar o modelo concorrentemente registrando previsões, mas sem aplicar as decisões em tempo real) ajuda a validar a integridade operacional antes de expor usuários reais ao modelo. *(pesquisa/sistemas)*
- De que maneira a Divergência de Kullback-Leibler (KL) pode ser usada para medir a perda de informação estatística ao longo do tempo e quais suas limitações em variáveis de alta dimensionalidade? *(pesquisa)*

## Exercícios
- Modifique o script de exemplo para implementar o cálculo do teste de Qui-Quadrado para detecção de drift em variáveis categóricas (como 'Gênero' ou 'Região').
- Crie uma função em Python para calcular o PSI manual entre duas listas com base em 10 intervalos uniformes (decis).
- Desenhe um grafo mostrando a jornada de um dado de entrada no pipeline: desde a inferência síncrona, salvamento do payload assíncrono em broker (Kafka), processamento estatístico diário (Spark) e visualização no Grafana.

## Tags
#MonitoramentoML #DataDrift #ConceptDrift #PSI #TesteKS #Observabilidade #Evidently
