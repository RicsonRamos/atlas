# PSI-01 — Perfilação Criminal (Criminal Profiling)

**Domínio:** 01 — Psicologia Criminal e Análise Comportamental
**Carga horária:** 24-30h
**Nível:** Foundation
**Pré-requisitos:** Nenhum
**Selo de Escopo:** 🟢 Aberto

## Ementa
Esta disciplina cobre o histórico, a metodologia e os limites científicos da Perfilação Criminal (*Criminal Profiling*). Estuda as abordagens indutiva (baseada em estatísticas e populações de infratores) e dedutiva (focada na análise física e comportamental da cena de crime). Aborda a distinção crítica entre *Modus Operandi* (dinâmico e adaptativo) e Assinatura comportamental (estática e motivada por necessidades psicológicas). Analisa as teorias de comportamento geográfico e a análise de consistência e ligação criminal (*case linkage*) para imputação de crimes em série.

## Objetivos
1. Diferenciar as metodologias de perfilação indutiva e dedutiva, identificando suas premissas e limitações epistemológicas.
2. Analisar evidências comportamentais em cenas de crime, discriminando elementos de modus operandi, assinatura e encenação (*staging*).
3. Implementar algoritmos de agrupamento baseados em similaridade comportamental para análise de ligação entre crimes em série (*case linkage*).

## Pré-requisitos
Nenhum (disciplina de entrada da trilha).

## Conteúdo programático

**Fundamentos** — A definição de perfilação criminal como técnica de suporte investigativo; a evolução histórica (do FBI Behavioral Science Unit ao modelo de Psicologia Investigativa de David Canter); mitos midiáticos versus realidade empírica.

**Teoria** — A análise de consistência comportamental e a teoria de ligação de casos (*case linkage*). A consistência de comportamento de um mesmo agressor em diferentes cenas de crime pode ser quantificada utilizando o Índice de Similaridade de Jaccard ($J$) entre os conjuntos de comportamentos observados $A$ e $B$ em dois crimes distintos:
$$J(A, B) = \frac{|A \cap B|}{|A \cup B|}$$
onde $A \cap B$ é o conjunto de comportamentos (ex.: amarração, uso de capuz, roubo de celular) presentes em ambos os crimes, e $A \cup B$ é a união de todos os comportamentos identificados nas duas cenas. Um índice $J(A, B) \ge 0.60$ serve como threshold estatístico clássico de consistência comportamental para sugerir autoria comum.
A dinâmica adaptativa do Modus Operandi (que muda com a experiência ou fatores situacionais) em contraposição à rigidez psicológica da Assinatura (expressão simbólica de fantasia).

**Aplicação prática** — Implementação em Python de um script para calcular o índice de Jaccard e agrupar cenas de crime com base em vetores binários de comportamentos criminosos observados para fins de análise de autoria em série.

## Código de Exemplo em Python (Análise de Ligação Criminal - Case Linkage)
```python
import numpy as np

def calcular_similaridade_jaccard(vetor_crime_a, vetor_crime_b):
    """
    Calcula o índice de Jaccard entre dois vetores binários de comportamento (0 ou 1).
    Cada posição do vetor representa a presença ou ausência de uma assinatura comportamental específica.
    """
    a = np.array(vetor_crime_a)
    b = np.array(vetor_crime_b)
    
    interseccao = np.sum((a == 1) & (b == 1))
    uniao = np.sum((a == 1) | (b == 1))
    
    if uniao == 0:
        return 0.0
    return interseccao / uniao

# 1. Definir a matriz de comportamentos observados (1 = Presente, 0 = Ausente)
# Linhas: Crimes (Cena 1, Cena 2, Cena 3)
# Colunas (Comportamentos): [Uso de braçadeiras, Cobertura do rosto da vítima, Roubo de troféu, Encenação de roubo, Perfume na vítima]
cena_1 = [1, 1, 1, 0, 0]
cena_2 = [1, 1, 0, 0, 0]
cena_3 = [0, 0, 0, 1, 1]

# 2. Calcular a matriz de similaridade Jaccard
sim_1_2 = calcular_similaridade_jaccard(cena_1, cena_2)
sim_1_3 = calcular_similaridade_jaccard(cena_1, cena_3)

print("--- Análise de Consistência Behaviórica (Jaccard Linkage) ---")
print(f"Similaridade comportamental entre Cena 1 e Cena 2: {sim_1_2:.2f} ({sim_1_2*100:.1f}%)")
print(f"Similaridade comportamental entre Cena 1 e Cena 3: {sim_1_3:.2f} ({sim_1_3*100:.1f}%)")

if sim_1_2 >= 0.60:
    print("\n[Veredito Estatístico] Alta consistência comportamental entre Cena 1 e Cena 2. Forte indicativo de autoria comum!")
else:
    print("\n[Veredito Estatístico] Baixa consistência. Provavelmente autores diferentes ou M.O. severamente modificado.")
```

## Casos práticos
- **Caso 1**: Uma sequência de três roubos a bancos residenciais exibe comportamento idêntico de entrada forçada por janelas traseiras, mas o terceiro roubo apresenta agressão física severa contra a vítima. Analisar se a agressão representa evolução de modus operandi ou uma assinatura de sadismo latente.
- **Caso 2**: Um assassino em série posiciona as mãos das vítimas de forma orante após o óbito (comportamento de assinatura) e limpa a cena com alvejante (comportamento de precaução/M.O.). O perito deve discernir ambos os traços no laudo.
- **Caso 3 (Caso Multivariável)**: Investigação de série de estupros urbanos sob suspeita de autoria única. Dispõe-se de dados comportamentais de 4 ocorrências. Mapear o protocolo de análise contendo: (a) levantamento do inventário de comportamentos de controle, coação e violência de cada cena; (b) cálculo matricial de similaridade de Jaccard entre as 4 ocorrências; (c) identificação de possíveis encenações (*staging*) destinadas a simular crime oportunista desorganizado para despistar a polícia.

## Regulação Técnica e Jurisprudência
| Tribunal ou Órgão/Tema | Entendimento / Norma | Impacto Prático |
|---|---|---|
| FBI Quality Standards for Profiling | Diretrizes de qualidade técnica estabelecidas pela Unidade de Ciência Comportamental do FBI para elaboração de perfis criminosos. | Limita o uso de perfis como mera ferramenta de direcionamento de inquérito, impedindo seu uso como prova única. |
| STJ / Admissibilidade da Prova | Laudos de perfilamento comportamental não possuem caráter de prova material plena, atuando como indício ou peça de inteligência policial. | Exige que o perfil seja corroborado por provas físicas (DNA, impressões papilares) no processo. |

## Doutrina / Referências Técnicas
- DOUGLAS, John E. et al. *Crime Classification Manual: A Standard System for Investigating and Classifying Violent Crimes*. 3ª Edição. Wiley, 2013 (Referência do FBI).
- CANTER, David. *Investigative Psychology: Offender Profiling and the Analysis of Criminal Action*. Wiley, 2009 (Referência da abordagem estatística/indutiva).
- TURVEY, Brent E. *Criminal Profiling: An Introduction to Behavioral Evidence Analysis*. 4ª Edição. Academic Press, 2011 (Referência da abordagem dedutiva).

## Legislação Relacionada
- Código de Processo Penal (CPP), art. 6º: dever da autoridade policial de colher todas as provas que servirem para o esclarecimento do fato e de suas circunstâncias (base legal para a investigação comportamental).
- Constituição Federal de 1988, art. 5º, LVI: inadmissibilidade de provas obtidas por meios ilícitos (limites éticos na obtenção de informações comportamentais).

## Prática Profissional
- Atuação como analista de inteligência criminal ou analista comportamental em departamentos de homicídios e repressão a crimes em série de polícias civis ou federais, mapeando o perfil geográfico e comportamental de agressores desconhecidos.

## Estado da Arte e Debates em Aberto
- **Consenso técnico:** O perfilamento dedutivo baseado estritamente nas evidências físicas da cena do crime (Behavioral Evidence Analysis) é mais robusto juridicamente do que o perfilamento intuitivo-indutivo que tenta adivinhar dados demográficos por generalizações populacionais.
- **Debate ativo pós-2023:** Os riscos éticos e viéses de confirmação introduzidos pelo uso de modelos de processamento de linguagem natural (LLMs) treinados em relatórios policiais para gerar esboços automáticos de perfis de suspeitos em investigações em andamento.

## Questões Avançadas
- Como o fenômeno de "vulnerabilidade situacional" da vítima afeta a expressão do Modus Operandi do agressor na cena do crime? *(pesquisa/criminologia)*
- Por que a consistência comportamental de um criminoso pode variar significativamente entre o primeiro e o terceiro crime de uma série? *(pesquisa/psicologia)*

## Exercícios
- Calcule o índice de Jaccard entre um crime com vetor comportamental [1, 0, 1, 1, 0] e outro com [1, 1, 0, 1, 0].
- Explique a diferença teórica entre *Staging* (encenação da cena do crime) e *Undoing* (desfazimento simbólico motivado por culpa).
- Para o caso multivariável de estupros urbanos, elabore a planilha matricial de Jaccard comparando os 4 casos fictícios e definindo o agrupamento de autoria mais provável.

## Tags
#PsicologiaCriminal #CriminalProfiling #AssinaturaComportamental #ModusOperandi #CaseLinkage #Staging
