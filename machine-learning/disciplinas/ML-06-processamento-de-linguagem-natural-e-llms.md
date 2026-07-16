# ML-06 — Processamento de Linguagem Natural e LLMs

**Domínio:** 01 — Machine Learning e IA Aplicada
**Carga horária:** 24-30h
**Nível:** Intermediate
**Pré-requisitos:** ML-04
**Selo de Escopo:** 🟢 Aberto

## Ementa
Esta disciplina cobre a representação computacional da linguagem e os modelos de linguagem de grande porte (LLMs). Estuda tokenização (BPE/WordPiece), representações vetoriais estáticas (word2vec, GloVe) e contextuais. Aprofunda o mecanismo de atenção e a arquitetura Transformer (atenção multi-cabeça, codificação posicional, blocos encoder/decoder), base de BERT e da família GPT. Cobre os paradigmas de adaptação: *fine-tuning* supervisionado versus *prompting* (zero-shot, few-shot), e a arquitetura RAG (Retrieval-Augmented Generation) em nível conceitual — recuperação vetorial acoplada à geração. Aborda a avaliação de LLMs: benchmarks, avaliação humana, métricas de tarefas e o problema das alucinações. Discute aplicações analíticas e forenses de PLN em ligação com a trilha de Inteligência Analítica (mineração de textos investigativos).

## Objetivos
1. Explicar a atenção escalonada por produto interno e o papel de cada componente do Transformer na modelagem de dependências de longo alcance.
2. Selecionar a estratégia de adaptação adequada (fine-tuning, prompting ou RAG) segundo custo, volume de dados, atualidade da informação e requisitos de rastreabilidade.
3. Projetar protocolos de avaliação de sistemas de linguagem que quantifiquem alucinação, viés e robustez, distinguindo desempenho de benchmark de desempenho operacional.

## Pré-requisitos
ML-04 (redes neurais, treino por gradiente e regularização).

## Conteúdo programático

**Fundamentos** — Texto como sequência de tokens discretos; a hipótese distribucional ("uma palavra é conhecida pela companhia que mantém"); limites de n-gramas e RNNs para dependências longas; o gargalo sequencial que a atenção elimina.

**Teoria** — A atenção escalonada por produto interno:
$$\text{Attention}(Q, K, V) = \text{softmax}\!\left(\frac{QK^{T}}{\sqrt{d_k}}\right)V$$
onde consultas $Q$, chaves $K$ e valores $V$ são projeções lineares da mesma sequência (auto-atenção); o fator $\sqrt{d_k}$ evita saturação do softmax. Atenção multi-cabeça como subespaços de representação paralelos. Codificação posicional senoidal para injetar ordem. O objetivo de pré-treino autorregressivo $\max \sum_t \log p(x_t \mid x_{<t})$ (GPT) versus mascarado (BERT). *Embeddings* como geometria semântica: similaridade de cosseno $\cos(\theta) = \frac{u \cdot v}{\|u\|\|v\|}$. RAG: dado um índice vetorial de documentos, recuperar os $k$ mais próximos da consulta e condicionar a geração ao contexto recuperado — trocando memorização paramétrica por evidência rastreável. Avaliação: exatidão em tarefas fechadas, sobreposição (F1/ROUGE) em extração, e o uso controverso de LLM-como-juiz.

**Aplicação prática** — Implementação em NumPy da atenção escalonada sobre uma micro-sequência e de um buscador semântico TF-IDF/cosseno como esqueleto conceitual de um RAG.

## Código de Exemplo em Python (Atenção e Recuperação Semântica)
```python
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

rng = np.random.RandomState(42)

# 1. Auto-atencao escalonada em NumPy (1 cabeca, d_k = 4)
seq_len, d_k = 5, 4
X = rng.normal(size=(seq_len, d_k))          # embeddings de 5 tokens
Wq, Wk, Wv = (rng.normal(size=(d_k, d_k)) for _ in range(3))
Q, K, V = X @ Wq, X @ Wk, X @ Wv

escores = Q @ K.T / np.sqrt(d_k)
pesos = np.exp(escores) / np.exp(escores).sum(axis=1, keepdims=True)  # softmax
saida = pesos @ V
print("Matriz de atenção (linhas somam 1):")
print(np.round(pesos, 3))
print("Soma por linha:", np.round(pesos.sum(axis=1), 6))

# 2. Esqueleto de RAG: recuperação por similaridade de cosseno
corpus = [
    "O laudo pericial constatou adulteração no chassi do veículo.",
    "A vítima reconheceu o suspeito na delegacia por meio de fotos.",
    "O contrato previa cláusula de rescisão com multa de dez por cento.",
    "O exame de DNA confirmou o vínculo genético entre as amostras.",
]
consulta = ["Qual exame confirmou o vínculo genético?"]
vetorizador = TfidfVectorizer()
M = vetorizador.fit_transform(corpus + consulta)
similaridades = cosine_similarity(M[-1], M[:-1]).ravel()
melhor = int(np.argmax(similaridades))
print("\nDocumento recuperado para condicionar a geração:")
print(f"[score={similaridades[melhor]:.3f}] {corpus[melhor]}")
```

## Casos práticos
- **Caso 1**: Um chatbot jurídico responde com número de processo inexistente e ementa fabricada. Diagnosticar alucinação de modelo autorregressivo e propor arquitetura RAG com citação obrigatória da fonte recuperada.
- **Caso 2**: Um classificador BERT de denúncias, ajustado com 300 exemplos, degrada em produção com gírias regionais. Discutir deslocamento de vocabulário, aumento de dados textuais e monitoramento de deriva (ligação com OPS-04).
- **Caso 3**: A equipe compara fine-tuning de um modelo aberto contra prompting de API proprietária para sumarização de inquéritos. Estruturar a decisão por custo total, privacidade dos dados (LGPD) e reprodutibilidade do laudo.
- **Caso 4 (Caso Multivariável)**: Projeto de mineração de comunicações apreendidas (trilha de Inteligência Analítica) com NER, sumarização e busca semântica. Desenhar: (a) pipeline com anonimização prévia e trilha de auditoria; (b) avaliação com conjunto de teste rotulado por peritos e taxa de alucinação medida por verificação de fonte; (c) política de revisão humana obrigatória antes de qualquer peça processual; (d) registro de versão de modelo e prompts para reprodutibilidade pericial.

## Regulação Técnica e Jurisprudência
| Tribunal ou Órgão/Tema | Entendimento / Norma | Impacto Prático |
|---|---|---|
| Regulamento (UE) 2024/1689 (EU AI Act), Cap. V | Modelos de IA de propósito geral (GPAI) sujeitos a obrigações de transparência, documentação e avaliação de risco sistêmico. | Provedores e integradores de LLMs devem manter documentação técnica e política de direitos autorais de dados de treino. |
| CNJ, Resolução nº 332/2020 | Diretrizes de ética e transparência para IA no Poder Judiciário brasileiro. | Sistemas de PLN aplicados a processos exigem supervisão humana, auditabilidade e não substituição da decisão judicial. |
| ISO/IEC 42001:2023 | Sistema de gestão de IA (AIMS), incluindo controles para modelos generativos. | Estrutura o ciclo de governança de aplicações com LLMs em organizações certificáveis. |

## Doutrina / Referências Técnicas
- VASWANI, Ashish et al. *Attention Is All You Need*. NeurIPS, 2017 (Transformer — paper seminal).
- DEVLIN, Jacob et al. *BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding*. NAACL, 2019.
- LEWIS, Patrick et al. *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks*. NeurIPS, 2020 (RAG).
- JURAFSKY, Daniel & MARTIN, James H. *Speech and Language Processing*. 3ª Edição (rascunho aberto), Stanford, 2024.
- MIKOLOV, Tomas et al. *Efficient Estimation of Word Representations in Vector Space*. ICLR Workshop, 2013 (word2vec).

## Legislação Relacionada
- Lei nº 13.709/2018 (LGPD), arts. 7º e 11: base legal para tratamento de textos com dados pessoais em treino e inferência.
- Lei nº 9.610/1998 (Direitos Autorais): uso de obras protegidas em corpora de treinamento — objeto de litígio e do PL 2338/2023.
- Regulamento (UE) 2024/1689 (EU AI Act), art. 50: dever de informar que o conteúdo foi gerado por IA (transparência de sistemas generativos).

## Prática Profissional
- Atuação como ML Engineer / Engenheiro de IA em sistemas de busca semântica, classificação documental e assistentes RAG corporativos, entregando pipelines com avaliação de alucinação, guardrails e documentação de conformidade (ligação com OPS-06 e GOV).

## Estado da Arte e Debates em Aberto
- **Consenso técnico:** Para domínios com base documental própria e exigência de rastreabilidade, RAG com citação de fonte supera fine-tuning puro em atualidade e auditabilidade.
- **Debate ativo pós-2023:** A confiabilidade do paradigma "LLM-como-juiz" para avaliar outros modelos — vieses de posição, autopreferência e inflação de notas documentados em estudos de 2023-2025 questionam benchmarks automatizados.
- **Debate ativo pós-2023:** Se alucinações são eliminável por escala e alinhamento ou são propriedade estrutural de modelos autorregressivos probabilísticos — com implicações diretas para uso em contextos jurídicos e periciais.

## Questões Avançadas
- Por que o fator $\sqrt{d_k}$ é necessário na atenção escalonada, e o que ocorre com os gradientes do softmax sem ele em dimensões altas? *(pesquisa/matemática)*
- Em que condições o fine-tuning supervisionado degrada capacidades gerais do modelo (esquecimento catastrófico), e como adaptadores (LoRA) mitigam o problema? *(pesquisa)*
- Que requisitos mínimos de cadeia de custódia e reprodutibilidade um laudo baseado em sumarização por LLM deve atender para ter valor probatório? *(pesquisa/jurídico)*

## Exercícios
- Calcule manualmente a matriz de atenção para uma sequência de 3 tokens com $d_k = 2$ e valores dados, verificando a normalização do softmax.
- Estenda o script de RAG para retornar os 2 documentos mais similares e um escore de confiança normalizado, discutindo um limiar de "não sei responder".
- Compare, em um mesmo conjunto de 20 frases, a similaridade de cosseno TF-IDF contra a similaridade de embeddings médios de word2vec pré-treinado, e explique as divergências.
- Para o caso multivariável de comunicações apreendidas, redija o protocolo de medição de taxa de alucinação com verificação de fonte por amostragem estratificada.

## Tags
#NLP #Transformers #LLM #RAG #Tokenizacao
