# OPS-03 — Serving e Inferência

**Domínio:** 01 — MLOps e Engenharia de Sistemas de IA
**Carga horária:** 24-30h
**Nível:** Foundation
**Pré-requisitos:** OPS-01
**Selo de Escopo:** 🟢 Aberto

## Ementa
Esta disciplina estuda as técnicas e arquiteturas para implantação de modelos de Machine Learning (*model serving*). Aborda a distinção operacional entre inferência em lote (*batch inference*), inferência sob demanda (*online inference*) e inferência na borda (*edge*). Analisa o equilíbrio entre latência e vazão (*throughput*). Cobre a otimização de modelos através de quantização de pesos, poda (*pruning*) e compilação de grafos (TensorRT, ONNX). Ensina a construir APIs robustas e escaláveis usando servidores de inferência especializados (como Triton, FastAPI ou TorchServe) acoplados a repositórios centralizados de modelos (*Model Registries*).

## Objetivos
1. Projetar e expor uma API de inferência de tempo real resiliente e de baixíssima latência.
2. Converter e compilar modelos de frameworks variados (TensorFlow, PyTorch) para o formato interoperável ONNX.
3. Projetar a infraestrutura de model serving suportando auto-scaling de réplicas de inferência.

## Pré-requisitos
OPS-01 Ciclo de Vida de Modelos (MLLC) e noções de APIs RESTful.

## Conteúdo programático

**Fundamentos** — A transição do modelo estático (arquivo serializado) para o serviço ativo; a diferença entre pipelines em lote (offline, focado em throughput) e chamadas síncronas sob demanda (online, focado em latência); o papel de um Model Registry.

**Teoria** — A formulação de latência do sistema de inferência sob filas:
$$T_{\text{resposta}} = T_{\text{transmissão}} + T_{\text{fila}} + T_{\text{inferência}}$$
onde $T_{\text{fila}}$ é determinado pela taxa de chegada de requisições sob a Lei de Little em sistemas de fila. A base matemática da quantização pós-treinamento (PTQ), reduzindo a precisão dos pesos de ponto flutuante de 32 bits ($\text{FP32}$) para inteiros de 8 bits ($\text{INT8}$) via mapeamento de escala linear:
$$q = \text{round}\left(\frac{r}{S}\right) + Z$$
onde $r$ é o valor real, $S$ é o fator de escala e $Z$ é o ponto zero.

**Aplicação prática** — Implementação de uma API de inferência mínima usando FastAPI em Python, registrando tratamento de erros, processamento assíncrono e formatação de saída para um estimador previamente carregado.

## Código de Exemplo em Python (Servidor de Inferência com FastAPI)
```python
import os
import pickle
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, conlist

# 1. Definir estrutura da API usando Pydantic para validação automática
class RequisicaoInferência(BaseModel):
    # Aceita uma lista de 10 atributos flutuantes
    features: conlist(float, min_length=10, max_length=10)

app = FastAPI(title="Servidor de Inferência MLOps - OPS-03")

# Simulando o carregamento de pesos de um modelo serializado (ex: Regressão Linear)
# Em produção, este modelo seria carregado de um Model Registry (ex: MLflow)
class ModeloMock:
    def __init__(self):
        # Pesos sintéticos para 10 variáveis e bias
        self.pesos = np.array([0.5, -0.2, 0.1, 0.8, -0.5, 0.3, 0.4, -0.1, 0.2, 0.7])
        self.bias = 0.1
        
    def predict(self, x):
        return float(np.dot(x, self.pesos) + self.bias)

# Instanciar modelo globalmente para evitar reload a cada chamada (cold start)
modelo = ModeloMock()

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/predict")
def predizer(dados: RequisicaoInferência):
    try:
        # Converter dados de entrada para vetor numpy
        vetor_entrada = np.array(dados.features)
        
        # Executar cálculo do modelo preditivo
        score = modelo.predict(vetor_entrada)
        
        # Retornar a inferência formatada com metadados básicos
        return {
            "prediction": score,
            "decision": 1 if score > 0.5 else 0
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno de inferência: {str(e)}")

# Executável local (se executado diretamente)
if __name__ == "__main__":
    import uvicorn
    # Inicia uvicorn na porta 8000
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

## Casos práticos
- **Caso 1**: Uma empresa de entrega de comida ativa um modelo de precificação dinâmica durante horários de pico. Devido ao acoplamento direto do modelo no código da API principal, o tempo de resposta do checkout salta de 200ms para 3 segundos, causando abandono de carrinho. Projetar o isolamento do modelo em um microsserviço de inferência.
- **Caso 2**: Um modelo de diagnóstico de imagem médica com 2GB de peso precisa rodar em dispositivos móveis de socorristas offline. O modelo exauri a memória RAM e falha no boot. Solucionar o problema aplicando compilação ONNX e quantização INT8 de modo a reduzir o peso para 250MB.
- **Caso 3 (Caso Multivariável)**: Desenhar a arquitetura de inferência corporativa para aprovação de Pix em tempo real em um banco digital (SLAs de resposta estritos de 50ms). A arquitetura deve incluir uma fila de mensagens para inferência paralela, Triton Inference Server com dynamic batching e fallback para análise manual no caso de timeouts ou erros do servidor de inferência.

## Regulação Técnica e Jurisprudência
| Tribunal ou Órgão/Tema | Entendimento / Norma | Impacto Prático |
|---|---|---|
| ISO/IEC 24029-1:2021 | Trata da avaliação da robustez de redes neurais, detalhando critérios para validar saídas de inferência. | Exige protocolos rígidos de testes de estresse em chamadas e entradas corrompidas de modelos em produção. |
| ANPD (Explicabilidade) | Decisões geradas por sistemas automatizados devem fornecer logs detalhados do exato estado dos pesos no momento do cálculo. | Exige versionamento estrito associado a cada ID de inferência (linhagem de predição). |

## Doutrina / Referências Técnicas
- KIPF, Thomas. *Design Patterns for Model Serving*. O'Reilly Media, 2021.
- TRITON (Documentation). *Dynamic Batching, Model Analyzer and Execution Providers*. Nvidia Triton Server.
- WARDEN, Pete & SITUNAYAKE, Daniel. *TinyML: Machine Learning with TensorFlow Lite on Arduino and Ultra-Low-Power Microcontrollers*. O'Reilly Media, 2019.

## Legislação Relacionada
- Código de Defesa do Consumidor (Lei nº 8.078/1990), art. 39: veda práticas comerciais abusivas associadas a sistemas discriminatórios automatizados de preços sob inferência obscura.

## Prática Profissional
- Desenvolvimento de Dockerfiles otimizados para servidores de inferência, configuração de Kubernetes Ingress para distribuir carga entre réplicas e instrumentação de monitoramento Prometheus/Grafana para latência de requisições.

## Estado da Arte e Debates em Aberto
- **Consenso técnico:** O formato aberto ONNX (Open Neural Network Exchange) consolidou-se como o padrão de mercado para transferir modelos de frameworks de pesquisa para engines de inferência de alta performance em produção.
- **Debate ativo pós-2023:** Inferência sem servidor (Serverless Serving, como AWS Lambda) vs. instâncias dedicadas (Kubernetes), ponderando-se os tempos de boot frio (*cold starts*) contra os custos financeiros de servidores ativos 24/7.

## Questões Avançadas
- Explique o conceito de *dynamic batching* em servidores Triton e como ele otimiza o throughput do hardware da GPU ao custo de um acréscimo controlado na latência de requisições individuais. *(pesquisa/sistemas)*
- Por que a quantização de pesos (de FP32 para INT8) pode introduzir perda de acurácia em modelos de aprendizado profundo altamente não-lineares? *(pesquisa)*

## Exercícios
- Escreva um script de teste de carga em Python (usando bibliotecas como `locust` ou simplesmente `asyncio`) para disparar 100 requisições simultâneas ao servidor FastAPI de exemplo e meça a latência média.
- Configure o pipeline de conversão de um modelo simples do PyTorch para o formato `.onnx` usando a biblioteca nativa do PyTorch.
- Para o caso multivariável de validação de Pix, esquematize o diagrama de blocos mostrando os caminhos de chamada síncrona e persistência assíncrona dos metadados de inferência.

## Tags
#ModelServing #FastAPI #Triton #ONNX #Quantizacao #Latencia #Throughput
