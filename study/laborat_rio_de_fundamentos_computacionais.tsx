import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  BookOpen, 
  Activity, 
  BarChart2, 
  Layers, 
  GitBranch, 
  HelpCircle, 
  Play, 
  Pause, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  BookOpenCheck,
  CheckCircle2,
  XCircle,
  HelpCircle as HelpIcon,
  Sparkles,
  Info
} from 'lucide-react';

// ==========================================
// DADOS DOS CONCEITOS (Do arquivo Markdown)
// ==========================================
const CONCEPT_SECTIONS = [
  {
    id: 'complexity',
    title: '1. Análise de Complexidade',
    icon: Activity,
    content: `Ao criar um algoritmo, precisamos saber o quanto ele consome de **tempo de execução** e de **memória** à medida que a quantidade de dados de entrada ($N$) cresce.`,
    subsections: [
      {
        title: 'Melhor, Médio e Pior Caso',
        text: '• **Melhor caso:** Menor número de operações necessárias.\n• **Pior caso:** Maior número de operações. Garante um "teto" de performance.\n• **Caso médio:** Performance esperada em situações cotidianas.'
      },
      {
        title: 'Notações Assintóticas',
        text: '• **Big O ($O$):** Limite superior (pior caso). É a métrica padrão do mercado.\n• **Big Omega ($\\Omega$):** Limite inferior (melhor caso).\n• **Big Theta ($\\Theta$):** Limite exato (melhor e pior caso crescem no mesmo ritmo).'
      }
    ]
  },
  {
    id: 'recursion',
    title: '2. Recursão',
    icon: Layers,
    content: `Abordagem em que um problema é quebrado em subproblemas menores de mesma natureza.`,
    subsections: [
      {
        title: 'Estrutura da Função',
        text: 'Obrigatoriamente precisa de um **Caso Base** (parada) e um **Caso Recursivo** (passo em direção à parada).'
      },
      {
        title: 'Call Stack & Stack Overflow',
        text: 'As funções ativas são empilhadas (Push/Pop). Sem caso base, a pilha enche infinitamente gerando estouro de memória (Stack Overflow).'
      }
    ]
  },
  {
    id: 'structures',
    title: '3. Estruturas Básicas',
    icon: Layers,
    content: `Formas estruturadas de organizar dados em memória RAM de acordo com o padrão de acesso necessário.`,
    subsections: [
      {
        title: 'Arrays vs Linked Lists',
        text: '• **Arrays:** Sequenciais. Acesso $O(1)$ por índice. Remoção/Inserção custosa $O(N)$.\n• **Listas Ligadas:** Nós com ponteiros. Inserção $O(1)$ nas pontas. Busca lenta $O(N)$.'
      },
      {
        title: 'Pilhas (LIFO) e Filas (FIFO)',
        text: '• **Pilhas:** Último a entrar, primeiro a sair (Histórico, Backtracking).\n• **Filas:** Primeiro a entrar, primeiro a sair (Servidores, Impressoras).'
      },
      {
        title: 'Tabelas Hash',
        text: 'Mapeia chaves para índices através de uma função hash. Acesso, inserção e deleção em espetacular $O(1)$ médio.'
      }
    ]
  },
  {
    id: 'algorithms',
    title: '4 & 5. Busca e Ordenação',
    icon: BarChart2,
    content: `Algoritmos estruturais para localizar ou ordenar coleções de elementos de maneira ótima.`,
    subsections: [
      {
        title: 'Algoritmos de Busca',
        text: '• **Busca Linear ($O(N)$):** Varre item por item. Útil para dados bagunçados.\n• **Busca Binária ($O(\\log N)$):** Requer dados **ordenados**. Divide o espaço de busca pela metade a cada passo.'
      },
      {
        title: 'Ordenação Quadrática ($O(N^2)$)',
        text: '• **Bubble Sort:** Flutua o maior valor comparando adjacentes.\n• **Selection Sort:** Seleciona o menor e posiciona no início.\n• **Insertion Sort:** Insere itens na posição correta incrementalmente.'
      },
      {
        title: 'Ordenação Eficiente ($O(N \\log N)$)',
        text: '• **Merge Sort:** Divisão e conquista (usa memória extra).\n• **Quick Sort:** Particiona em volta de um pivô (rápido na prática).\n• **Heap Sort:** Ordena usando árvore de prioridade compacta.'
      }
    ]
  },
  {
    id: 'graphs',
    title: '7. Grafos',
    icon: GitBranch,
    content: `Redes compostas por Vértices (nós) e Arestas (conexões). Podem ter pesos e direções.`,
    subsections: [
      {
        title: 'Buscas em Grafos',
        text: '• **BFS (Largura):** Explora por camadas usando Fila. Acha o caminho mais curto sem pesos.\n• **DFS (Profundidade):** Explora o mais fundo possível usando Pilha/Recursão. Detecta ciclos.'
      },
      {
        title: 'Caminho Mínimo',
        text: '• **Dijkstra:** Expande a lógica para encontrar rotas de menor custo em grafos com pesos.'
      }
    ]
  }
];

// ==========================================
// QUESTÕES DO QUIZ
// ==========================================
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Qual é a complexidade de tempo de pior caso para a Busca Binária?",
    options: ["O(1)", "O(N)", "O(log N)", "O(N log N)"],
    correct: 2,
    explanation: "A Busca Binária divide o tamanho da lista por 2 a cada etapa, o que gera uma curva de complexidade logarítmica, isto é, O(log N)."
  },
  {
    id: 2,
    question: "O que acontece se uma função recursiva não possuir um 'Caso Base'?",
    options: [
      "O código roda infinitamente sem consumir memória extra.",
      "Gera um erro de estouro de pilha (Stack Overflow).",
      "O compilador otimiza automaticamente convertendo em Loop For.",
      "Retorna null imediatamente."
    ],
    correct: 1,
    explanation: "Sem caso base, a função continuará empilhando chamadas infinitamente na Call Stack, estourando o limite físico de memória (Stack Overflow)."
  },
  {
    id: 3,
    question: "Qual estrutura de dados funciona sob a política LIFO (Last In, First Out)?",
    options: ["Fila (Queue)", "Lista Ligada (Linked List)", "Pilha (Stack)", "Tabela Hash (Hash Table)"],
    correct: 2,
    explanation: "Pilhas (Stacks) utilizam a regra LIFO, onde o último elemento inserido é obrigatoriamente o primeiro a ser removido."
  },
  {
    id: 4,
    question: "Qual algoritmo de ordenação divide recursivamente o array na metade e depois junta ordenando de volta?",
    options: ["Quick Sort", "Merge Sort", "Bubble Sort", "Insertion Sort"],
    correct: 1,
    explanation: "O Merge Sort baseia-se na técnica de Divisão e Conquista, fatiando recursivamente o array e aplicando uma fusão (merge) ordenada."
  },
  {
    id: 5,
    question: "Qual método de busca em grafos é ideal para encontrar o caminho com menos conexões (arestas) em um grafo não valorado?",
    options: ["DFS (Busca em Profundidade)", "BFS (Busca em Largura)", "Algoritmo de Dijkstra", "Busca Linear"],
    correct: 1,
    explanation: "A BFS (Largura) analisa o grafo em camadas radiais (vizinhos imediatos primeiro), garantindo que o primeiro caminho encontrado tenha o menor número possível de arestas."
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('reader'); // reader, bigo, sorting, stack-queue, graphs, quiz
  const [alertMsg, setAlertMsg] = useState(null);

  // Helper para exibir alertas customizados (evitando o alert browser)
  const showAlert = (msg, type = 'info') => {
    setAlertMsg({ text: msg, type });
    setTimeout(() => setAlertMsg(null), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Toast Alert */}
      {alertMsg && (
        <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-2xl transition-all duration-300 border ${
          alertMsg.type === 'error' ? 'bg-red-950/90 border-red-800 text-red-200' : 
          alertMsg.type === 'success' ? 'bg-emerald-950/90 border-emerald-800 text-emerald-200' : 
          'bg-slate-900 border-indigo-500/50 text-indigo-200'
        }`}>
          <Info size={18} className={alertMsg.type === 'error' ? 'text-red-400' : 'text-indigo-400'} />
          <span className="text-sm font-medium">{alertMsg.text}</span>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur sticky top-0 z-40 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-indigo-500 to-violet-600 p-2 rounded-xl text-white shadow-md shadow-indigo-500/10">
              <BookOpenCheck size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Lab de Fundamentos Computacionais
              </h1>
              <p className="text-xs text-slate-400 font-mono">Teoria & Simuladores Interativos</p>
            </div>
          </div>
          
          {/* Main Navigation */}
          <nav className="flex flex-wrap items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
            <button 
              onClick={() => setActiveTab('reader')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'reader' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen size={14} />
              Manual
            </button>
            <button 
              onClick={() => setActiveTab('bigo')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'bigo' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity size={14} />
              Big O
            </button>
            <button 
              onClick={() => setActiveTab('sorting')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'sorting' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart2 size={14} />
              Busca & Ordenação
            </button>
            <button 
              onClick={() => setActiveTab('stack-queue')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'stack-queue' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers size={14} />
              Pilhas & Recursão
            </button>
            <button 
              onClick={() => setActiveTab('graphs')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'graphs' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <GitBranch size={14} />
              Grafos
            </button>
            <button 
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'quiz' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <HelpCircle size={14} />
              Quiz
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 flex flex-col">
        {activeTab === 'reader' && <ReaderView onNavigate={setActiveTab} />}
        {activeTab === 'bigo' && <BigOView />}
        {activeTab === 'sorting' && <SortingView showAlert={showAlert} />}
        {activeTab === 'stack-queue' && <StackQueueRecursionView showAlert={showAlert} />}
        {activeTab === 'graphs' && <GraphsView />}
        {activeTab === 'quiz' && <QuizView showAlert={showAlert} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/20 py-4 px-4 text-center text-xs text-slate-500">
        <p>© 2026 Lab de Fundamentos Computacionais. Projetado para fins didáticos e desenvolvimento de dados.</p>
      </footer>
    </div>
  );
}

// ==========================================
// VIEW: LEITOR DO MANUAL / GUIA (READER)
// ==========================================
function ReaderView({ onNavigate }) {
  const [selectedSection, setSelectedSection] = useState(CONCEPT_SECTIONS[0].id);

  const activeSection = useMemo(() => {
    return CONCEPT_SECTIONS.find(s => s.id === selectedSection);
  }, [selectedSection]);

  const getSimulatedTabId = (sectionId) => {
    switch (sectionId) {
      case 'complexity': return 'bigo';
      case 'recursion': return 'stack-queue';
      case 'structures': return 'stack-queue';
      case 'algorithms': return 'sorting';
      case 'graphs': return 'graphs';
      default: return 'reader';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
      {/* Sidebar Navigation inside Manual */}
      <div className="lg:col-span-1 space-y-2">
        <div className="text-xs font-mono tracking-wider text-slate-400 uppercase px-3 py-1">Capítulos do Guia</div>
        <div className="space-y-1">
          {CONCEPT_SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setSelectedSection(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition text-left ${
                  selectedSection === section.id 
                    ? 'bg-indigo-950/50 text-indigo-300 border border-indigo-800/60' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border border-transparent'
                }`}
              >
                <Icon size={16} className={selectedSection === section.id ? 'text-indigo-400' : 'text-slate-500'} />
                {section.title}
              </button>
            );
          })}
        </div>

        <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl mt-6">
          <h4 className="text-xs font-bold font-mono text-indigo-400 mb-2">💡 Modo de Estudo Prático</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Selecione uma seção teórica para ler e, em seguida, clique no botão interativo abaixo dela para abrir o simulador prático correspondente!
          </p>
        </div>
      </div>

      {/* Main Reading Panel */}
      <div className="lg:col-span-3 flex flex-col bg-slate-900/30 border border-slate-800 rounded-2xl p-6 lg:p-8 shadow-sm">
        {activeSection ? (
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800/60 pb-4">
                <div className="bg-indigo-950 p-2.5 rounded-xl border border-indigo-800/50 text-indigo-400">
                  <activeSection.icon size={22} />
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-white">{activeSection.title}</h2>
              </div>

              <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-sm lg:text-base">
                <p className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/80 text-slate-300 font-medium">
                  {activeSection.content}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {activeSection.subsections.map((sub, idx) => (
                  <div key={idx} className="bg-slate-900/40 border border-slate-800/50 p-5 rounded-xl hover:border-slate-700/60 transition">
                    <h3 className="text-sm font-bold text-indigo-300 font-mono mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                      {sub.title}
                    </h3>
                    <p className="text-xs text-slate-400 whitespace-pre-line leading-relaxed">
                      {sub.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick action to related simulator */}
            <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Sparkles size={14} className="text-indigo-400" />
                <span>Pronto para testar este conceito na prática?</span>
              </div>
              <button
                onClick={() => onNavigate(getSimulatedTabId(activeSection.id))}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/10 transition"
              >
                Abrir Simulador Prático
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-slate-400">
            Selecione um capítulo na barra lateral para começar seu estudo.
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// VIEW: BIG O VISUALIZER
// ==========================================
function BigOView() {
  const [selectedComplexity, setSelectedComplexity] = useState('all');
  const [inputSize, setInputSize] = useState(20);

  // Fórmulas para calcular operações de acordo com o N
  const complexities = {
    'O(1)': { label: 'Constante - O(1)', fn: (n) => 1, color: '#10b981', desc: 'Sempre executa o mesmo número de passos, independentemente do volume de dados.' },
    'O(log N)': { label: 'Logarítmica - O(log N)', fn: (n) => Math.log2(n) || 1, color: '#3b82f6', desc: 'Altamente escalável. Reduz o espaço de busca pela metade a cada passo (ex: Busca Binária).' },
    'O(N)': { label: 'Linear - O(N)', fn: (n) => n, color: '#eab308', desc: 'Cresce na mesma proporção da entrada. Exige uma análise sequencial dos dados (ex: Busca Linear).' },
    'O(N log N)': { label: 'Linearítmica - O(N log N)', fn: (n) => n * (Math.log2(n) || 1), color: '#a855f7', desc: 'Melhor teto de desempenho prático para algoritmos gerais de ordenação (ex: Merge Sort, Quick Sort).' },
    'O(N²)': { label: 'Quadrática - O(N²)', fn: (n) => Math.pow(n, 2), color: '#f97316', desc: 'Crescimento perigoso. Típico de loops aninhados simples sobre a coleção (ex: Bubble Sort, Selection Sort).' },
    'O(2^N)': { label: 'Exponencial - O(2^N)', fn: (n) => Math.pow(2, Math.min(n, 30)), color: '#ef4444', desc: 'Crescimento desastroso. Adicionar apenas 1 elemento dobra o tempo de processamento total (ex: Fibonacci recursivo ingênuo).' }
  };

  // Gerar pontos para desenhar o gráfico SVG de crescimento
  const maxN = 50;
  const scaleX = 350 / maxN;
  const scaleY = 220 / Math.pow(maxN, 2); // Ajustado para escalabilidade visível

  const drawPoints = (key) => {
    const points = [];
    for (let x = 1; x <= maxN; x++) {
      let y = complexities[key].fn(x);
      // Limitar o y para que não quebre os limites superiores do SVG
      let clampedY = Math.min(y, Math.pow(maxN, 2)); 
      // Coordenadas SVG invertidas (0 no topo, maxY na base)
      const svgX = x * scaleX + 40;
      const svgY = 250 - (clampedY * scaleY);
      points.push(`${svgX},${svgY}`);
    }
    return points.join(' ');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
      {/* Sidebar de Seleção e Inputs */}
      <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-5 space-y-6">
        <div>
          <h3 className="text-sm font-mono text-indigo-400 font-bold mb-1">📐 Comparativo Big O</h3>
          <h2 className="text-lg font-bold text-white">Visualizador Assintótico</h2>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Selecione uma notação ou ajuste o tamanho de dados de entrada ($N$) para observar como a necessidade de operações de máquina escala.
          </p>
        </div>

        {/* Seletor */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-slate-400">Complexidades de Tempo</label>
          <div className="space-y-1">
            <button
              onClick={() => setSelectedComplexity('all')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold border ${
                selectedComplexity === 'all' 
                  ? 'bg-slate-800 text-white border-slate-700' 
                  : 'text-slate-400 border-transparent hover:bg-slate-900/50'
              }`}
            >
              <span>Mostrar Todas as Curvas</span>
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span>
            </button>
            {Object.keys(complexities).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedComplexity(key)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold border transition ${
                  selectedComplexity === key 
                    ? 'bg-indigo-950/40 text-indigo-200 border-indigo-800/80' 
                    : 'text-slate-400 border-transparent hover:bg-slate-900/50'
                }`}
              >
                <span>{complexities[key].label}</span>
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: complexities[key].color }}></span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Size Control */}
        <div className="space-y-2 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Entrada N:</span>
            <span className="text-indigo-400 font-bold bg-indigo-950/50 px-2 py-0.5 rounded-md border border-indigo-900/50">{inputSize} elementos</span>
          </div>
          <input
            type="range"
            min="2"
            max="100"
            value={inputSize}
            onChange={(e) => setInputSize(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>
      </div>

      {/* Graph Area & Stats */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        {/* SVG Graph Box */}
        <div className="bg-slate-900/20 border border-slate-800 rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-3 mb-4">
            <span className="text-xs font-mono text-slate-400">Gráfico Computacional (N versus Operações)</span>
            <span className="text-xs text-rose-400 font-mono flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              Pior Cenário (Teto de Desempenho)
            </span>
          </div>

          <div className="relative flex-1 min-h-[280px] flex items-center justify-center">
            {/* SVG Plot */}
            <svg viewBox="0 0 420 280" className="w-full max-w-lg h-auto select-none">
              {/* Grid Lines */}
              <line x1="40" y1="30" x2="40" y2="250" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="40" y1="250" x2="400" y2="250" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="40" y1="140" x2="400" y2="140" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="220" y1="30" x2="220" y2="250" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />

              {/* Labels de eixos */}
              <text x="390" y="265" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="end">N (Entrada)</text>
              <text x="25" y="40" fill="#64748b" fontSize="10" fontFamily="monospace" transform="rotate(-90 25 40)" textAnchor="end">Operações</text>

              {/* Draw Lines */}
              {Object.keys(complexities).map((key) => {
                const isSelected = selectedComplexity === 'all' || selectedComplexity === key;
                return (
                  <polyline
                    key={key}
                    fill="none"
                    stroke={complexities[key].color}
                    strokeWidth={selectedComplexity === key ? 4 : isSelected ? 2 : 1}
                    strokeOpacity={isSelected ? 1 : 0.15}
                    points={drawPoints(key)}
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* Input Size Marker Vertical Bar */}
              {inputSize <= maxN && (
                <g>
                  <line 
                    x1={inputSize * scaleX + 40} 
                    y1="30" 
                    x2={inputSize * scaleX + 40} 
                    y2="250" 
                    stroke="#4f46e5" 
                    strokeWidth="1.5" 
                    strokeDasharray="4 4"
                    opacity="0.6"
                  />
                  <circle cx={inputSize * scaleX + 40} cy="250" r="4" fill="#4f46e5" />
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Real Dynamic Computation Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.keys(complexities).map((key) => {
            const rawOps = complexities[key].fn(inputSize);
            const formattedOps = rawOps % 1 === 0 ? rawOps : rawOps.toFixed(1);
            const isSelected = selectedComplexity === 'all' || selectedComplexity === key;

            return (
              <div 
                key={key}
                style={{ opacity: isSelected ? 1 : 0.4 }} 
                className={`p-4 rounded-xl border transition ${
                  selectedComplexity === key 
                    ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-950/20' 
                    : 'bg-slate-900/50 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: complexities[key].color }}></span>
                  <span className="text-xs font-mono font-bold text-slate-200">{key}</span>
                </div>
                <div className="text-xl font-bold font-mono text-white">
                  {formattedOps >= 1000000 ? `${(formattedOps / 1000000).toFixed(1)}M` : formattedOps}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">Operações Estimadas</div>
              </div>
            );
          })}
        </div>

        {/* Explanation Card */}
        {selectedComplexity !== 'all' && (
          <div className="bg-indigo-950/20 border border-indigo-900/50 p-5 rounded-xl">
            <h4 className="text-xs font-mono text-indigo-400 font-bold flex items-center gap-2 mb-1.5">
              <Info size={14} />
              Sobre {complexities[selectedComplexity].label}
            </h4>
            <p className="text-xs text-indigo-200/90 leading-relaxed">
              {complexities[selectedComplexity].desc}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// VIEW: SIMULADOR DE BUSCA E ORDENAÇÃO
// ==========================================
function SortingView({ showAlert }) {
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState('bubble'); // bubble, selection, insertion, binary_search
  const [steps, setSteps] = useState([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(300); // ms delay
  const [targetSearch, setTargetSearch] = useState(25); // value to find

  // Ref de controle de animação
  const timerRef = useRef(null);

  // Inicializa array aleatório
  const generateNewArray = () => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
    
    let size = 15;
    let newArr = [];
    if (algorithm === 'binary_search') {
      // Para busca binária, precisamos que seja um array ordenado e com valores únicos
      for (let i = 0; i < size; i++) {
        newArr.push(5 + i * 6 + Math.floor(Math.random() * 4));
      }
      // Garante que o targetSearch exista em algum lugar arbitrário ou perto
      setTargetSearch(newArr[Math.floor(Math.random() * size)]);
    } else {
      for (let i = 0; i < size; i++) {
        newArr.push(Math.floor(Math.random() * 85) + 10);
      }
    }
    setArray(newArr);
    setSteps([]);
    setCurrentStepIdx(0);
  };

  useEffect(() => {
    generateNewArray();
  }, [algorithm]);

  // Executa os cálculos algoritmos e preenche o vetor de "steps" (passos de animação)
  const compileSteps = () => {
    const compiled = [];
    const arr = [...array];
    const n = arr.length;

    if (algorithm === 'bubble') {
      let tempArr = [...arr];
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          // Highlight comparados
          compiled.push({
            arr: [...tempArr],
            active: [j, j + 1],
            sorted: Array.from({ length: i }, (_, idx) => n - 1 - idx),
            desc: `Comparando valores nos índices ${j} e ${j+1}: ${tempArr[j]} > ${tempArr[j+1]}?`
          });

          if (tempArr[j] > tempArr[j + 1]) {
            let temp = tempArr[j];
            tempArr[j] = tempArr[j + 1];
            tempArr[j + 1] = temp;

            compiled.push({
              arr: [...tempArr],
              active: [j, j + 1],
              sorted: Array.from({ length: i }, (_, idx) => n - 1 - idx),
              desc: `Troca efetuada: ${tempArr[j+1]} flutua para a direita.`
            });
          }
        }
      }
      // Fim
      compiled.push({
        arr: [...tempArr],
        active: [],
        sorted: Array.from({ length: n }, (_, idx) => idx),
        desc: "Ordenação concluída com sucesso! Complexidade Pior Caso O(N²)."
      });
    }

    else if (algorithm === 'selection') {
      let tempArr = [...arr];
      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        compiled.push({
          arr: [...tempArr],
          active: [i],
          pivot: minIdx,
          sorted: Array.from({ length: i }, (_, idx) => idx),
          desc: `Nova rodada: definindo o elemento inicial no índice ${i} (${tempArr[i]}) como menor atual.`
        });

        for (let j = i + 1; j < n; j++) {
          compiled.push({
            arr: [...tempArr],
            active: [j],
            pivot: minIdx,
            sorted: Array.from({ length: i }, (_, idx) => idx),
            desc: `Analisando índice ${j} (${tempArr[j]}) para ver se é menor do que o mínimo atual (${tempArr[minIdx]}).`
          });

          if (tempArr[j] < tempArr[minIdx]) {
            minIdx = j;
            compiled.push({
              arr: [...tempArr],
              active: [j],
              pivot: minIdx,
              sorted: Array.from({ length: i }, (_, idx) => idx),
              desc: `Novo menor elemento temporário encontrado no índice ${j} (valor: ${tempArr[j]}).`
            });
          }
        }

        if (minIdx !== i) {
          let temp = tempArr[i];
          tempArr[i] = tempArr[minIdx];
          tempArr[minIdx] = temp;

          compiled.push({
            arr: [...tempArr],
            active: [i, minIdx],
            pivot: null,
            sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
            desc: `Permutando o menor encontrado (${tempArr[i]}) com a posição inicial da rodada (${temp}).`
          });
        }
      }
      compiled.push({
        arr: [...tempArr],
        active: [],
        sorted: Array.from({ length: n }, (_, idx) => idx),
        desc: "Vetor ordenado usando Selection Sort! Complexidade Pior Caso O(N²)."
      });
    }

    else if (algorithm === 'insertion') {
      let tempArr = [...arr];
      for (let i = 1; i < n; i++) {
        let key = tempArr[i];
        let j = i - 1;

        compiled.push({
          arr: [...tempArr],
          active: [i],
          pivot: i,
          sorted: Array.from({ length: i }, (_, idx) => idx),
          desc: `Selecionando chave (${key}) para reinserir ordenadamente na porção esquerda já verificada.`
        });

        while (j >= 0 && tempArr[j] > key) {
          tempArr[j + 1] = tempArr[j];
          compiled.push({
            arr: [...tempArr],
            active: [j, j + 1],
            pivot: j,
            sorted: Array.from({ length: i }, (_, idx) => idx),
            desc: `Empurrando o item ${tempArr[j]} para a direita pois é maior do que a chave selecionada.`
          });
          j = j - 1;
        }
        tempArr[j + 1] = key;
        compiled.push({
          arr: [...tempArr],
          active: [j + 1],
          pivot: null,
          sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
          desc: `Encaixando a chave na sua nova posição correta (índice ${j + 1}).`
        });
      }
      compiled.push({
        arr: [...tempArr],
        active: [],
        sorted: Array.from({ length: n }, (_, idx) => idx),
        desc: "Insertion Sort concluído! Ideal quando o vetor já está quase ordenado."
      });
    }

    else if (algorithm === 'binary_search') {
      let low = 0;
      let high = n - 1;
      let stepsArray = [...arr]; // já está em ordem crescente
      let found = false;

      while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        compiled.push({
          arr: [...stepsArray],
          active: [mid],
          searchBounds: [low, high],
          desc: `Avaliando índice central 'mid': ${mid} (valor ${stepsArray[mid]}). Espaço de busca atual: de índice ${low} a ${high}.`
        });

        if (stepsArray[mid] === targetSearch) {
          compiled.push({
            arr: [...stepsArray],
            active: [mid],
            searchBounds: [mid, mid],
            found: true,
            desc: `Sucesso! O valor procurado (${targetSearch}) foi localizado com precisão no índice ${mid}.`
          });
          found = true;
          break;
        } else if (stepsArray[mid] < targetSearch) {
          compiled.push({
            arr: [...stepsArray],
            active: [mid],
            searchBounds: [low, high],
            desc: `O elemento do meio (${stepsArray[mid]}) é menor do que o alvo (${targetSearch}). Descartando metade esquerda.`
          });
          low = mid + 1;
        } else {
          compiled.push({
            arr: [...stepsArray],
            active: [mid],
            searchBounds: [low, high],
            desc: `O elemento do meio (${stepsArray[mid]}) é maior do que o alvo (${targetSearch}). Descartando metade direita.`
          });
          high = mid - 1;
        }
      }

      if (!found) {
        compiled.push({
          arr: [...stepsArray],
          active: [],
          searchBounds: null,
          failed: true,
          desc: `Elemento procurado (${targetSearch}) não existe no vetor. Espaço de busca esgotado!`
        });
      }
    }

    setSteps(compiled);
    setCurrentStepIdx(0);
    return compiled;
  };

  // Efeito para disparar animação ao ativar o play
  useEffect(() => {
    if (isPlaying) {
      let localSteps = steps;
      if (steps.length === 0) {
        localSteps = compileSteps();
      }

      timerRef.current = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev >= localSteps.length - 1) {
            setIsPlaying(false);
            showAlert("Execução completa do simulador!", "success");
            clearInterval(timerRef.current);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps, speed]);

  const handleStepForward = () => {
    let localSteps = steps;
    if (steps.length === 0) {
      localSteps = compileSteps();
    }
    if (currentStepIdx < localSteps.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
    }
  };

  const handleStepBackward = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
    }
  };

  const currentStep = steps[currentStepIdx] || {
    arr: array,
    active: [],
    sorted: [],
    desc: "Aperte o Play ou Avançar para processar o algoritmo passo a passo."
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
      {/* Controles e Algoritmos */}
      <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-5 space-y-5">
        <div>
          <h3 className="text-sm font-mono text-indigo-400 font-bold mb-1">⚡ Playground Prático</h3>
          <h2 className="text-lg font-bold text-white">Ordenação e Busca</h2>
          <p className="text-xs text-slate-400 leading-relaxed mt-1">
            Veja em câmera lenta como os ponteiros de memória de máquina alteram e estruturam os dados.
          </p>
        </div>

        {/* Escolha do algoritmo */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-slate-400">Selecionar Algoritmo</label>
          <div className="grid grid-cols-1 gap-1">
            {[
              { id: 'bubble', name: 'Bubble Sort', comp: 'O(N²)' },
              { id: 'selection', name: 'Selection Sort', comp: 'O(N²)' },
              { id: 'insertion', name: 'Insertion Sort', comp: 'O(N²)' },
              { id: 'binary_search', name: 'Busca Binária', comp: 'O(log N)' }
            ].map((algo) => (
              <button
                key={algo.id}
                onClick={() => {
                  setAlgorithm(algo.id);
                  setIsPlaying(false);
                }}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold border transition text-left ${
                  algorithm === algo.id 
                    ? 'bg-indigo-950/40 text-indigo-200 border-indigo-800/80' 
                    : 'text-slate-400 border-transparent hover:bg-slate-900/50'
                }`}
              >
                <span>{algo.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-850 text-indigo-400 font-mono font-bold">{algo.comp}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Campo de pesquisa se for Busca Binária */}
        {algorithm === 'binary_search' && (
          <div className="space-y-1.5 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
            <label className="text-xs font-mono text-indigo-400">Buscar Elemento Específico</label>
            <div className="flex gap-2">
              <select 
                value={targetSearch}
                onChange={(e) => {
                  setTargetSearch(parseInt(e.target.value));
                  setIsPlaying(false);
                  setSteps([]);
                  setCurrentStepIdx(0);
                }}
                className="bg-slate-950 text-xs font-mono rounded border border-slate-800 text-indigo-300 p-1 flex-1 focus:outline-none"
              >
                {array.map((val, idx) => (
                  <option key={idx} value={val}>{val}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Controles de velocidade */}
        <div className="space-y-2 pt-3 border-t border-slate-800/80">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">Intervalo de Passo:</span>
            <span className="text-indigo-400 font-bold">{speed}ms</span>
          </div>
          <input
            type="range"
            min="50"
            max="1500"
            step="50"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        {/* Botões do simulador */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold shadow-sm transition ${
              isPlaying 
                ? 'bg-amber-600 hover:bg-amber-500 text-white' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            {isPlaying ? 'Pausar' : 'Play'}
          </button>
          <button
            onClick={generateNewArray}
            className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition"
          >
            <RotateCcw size={14} />
            Gerar Novo
          </button>
        </div>

        <div className="flex gap-1">
          <button
            onClick={handleStepBackward}
            disabled={currentStepIdx === 0}
            className="flex-1 flex items-center justify-center py-2 px-3 bg-slate-900 border border-slate-800 text-slate-300 rounded-lg text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-850"
          >
            <ArrowLeft size={14} className="mr-1" />
            Voltar
          </button>
          <button
            onClick={handleStepForward}
            disabled={steps.length > 0 && currentStepIdx >= steps.length - 1}
            className="flex-1 flex items-center justify-center py-2 px-3 bg-slate-900 border border-slate-800 text-slate-300 rounded-lg text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-850"
          >
            Avançar
            <ArrowRight size={14} className="ml-1" />
          </button>
        </div>
      </div>

      {/* Visualização de Barras / Array */}
      <div className="lg:col-span-3 flex flex-col gap-4">
        <div className="bg-slate-900/20 border border-slate-800 rounded-2xl p-6 flex-1 flex flex-col justify-between">
          
          {/* Top Info */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono border-b border-slate-850 pb-3">
            <span>Array Atual ({array.length} elementos)</span>
            <span className="bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-900">
              Passo {currentStepIdx + 1} / {steps.length || 1}
            </span>
          </div>

          {/* Renderização das Barras */}
          <div className="flex-1 flex items-end justify-center gap-2 py-8 min-h-[220px]">
            {currentStep.arr.map((val, idx) => {
              // Detecção de status de cor do elemento para visualização didática
              let isSorted = currentStep.sorted?.includes(idx);
              let isActive = currentStep.active?.includes(idx);
              let isPivot = currentStep.pivot === idx;
              
              // Se for Busca Binária
              let isOutOfBound = false;
              if (algorithm === 'binary_search' && currentStep.searchBounds) {
                const [low, high] = currentStep.searchBounds;
                isOutOfBound = idx < low || idx > high;
              }

              let barColor = 'bg-slate-700 border-slate-600 text-slate-400';
              if (isActive) {
                barColor = 'bg-indigo-500 border-indigo-400 text-white ring-2 ring-indigo-500/30 scale-105';
              } else if (isPivot) {
                barColor = 'bg-amber-500 border-amber-400 text-black font-bold scale-105';
              } else if (isSorted) {
                barColor = 'bg-emerald-600 border-emerald-500 text-emerald-100';
              } else if (isOutOfBound) {
                barColor = 'bg-slate-900/30 border-slate-900/50 text-slate-600 opacity-20';
              }

              return (
                <div key={idx} className="flex flex-col items-center flex-1 max-w-[40px] transition-all duration-200">
                  {/* Valor flutuante */}
                  <span className={`text-[10px] font-bold font-mono mb-1.5 ${isActive || isPivot ? 'text-white scale-110' : 'text-slate-400'}`}>
                    {val}
                  </span>
                  {/* Barra física */}
                  <div 
                    style={{ height: `${val * 2}px` }}
                    className={`w-full rounded-t-lg border transition-all duration-300 ${barColor}`}
                  ></div>
                  {/* Índice do array */}
                  <span className="text-[9px] font-mono text-slate-500 mt-2">
                    {idx}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Descrição em Linguagem Natural do que está ocorrendo */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-start gap-3">
            <div className="text-indigo-400 mt-0.5">
              <Info size={16} />
            </div>
            <div>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                {currentStep.desc}
              </p>
              {currentStep.found && (
                <span className="inline-block mt-2 text-[10px] bg-emerald-950 border border-emerald-800 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                  ✓ Alvo Encontrado no Índice {currentStep.active[0]}
                </span>
              )}
              {currentStep.failed && (
                <span className="inline-block mt-2 text-[10px] bg-red-950 border border-red-800 text-red-300 px-2 py-0.5 rounded font-mono font-bold">
                  ✗ Alvo Não Localizado
                </span>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ==========================================
// VIEW: STACK, QUEUE E RECURSÃO (VISUALIZER)
// ==========================================
function StackQueueRecursionView({ showAlert }) {
  const [visualMode, setVisualMode] = useState('stack'); // stack, queue, recursion
  
  // State Pilha (Stack)
  const [stackData, setStackData] = useState([12, 45, 78]);
  const [stackInput, setStackInput] = useState('');

  // State Fila (Queue)
  const [queueData, setQueueData] = useState([101, 102, 103]);
  const [queueInput, setQueueInput] = useState('');

  // State Recursão (Factorial Call Stack)
  const [factorialInput, setFactorialInput] = useState(5);
  const [recursionSteps, setRecursionSteps] = useState([]);
  const [recIdx, setRecIdx] = useState(0);
  const [recPlaying, setRecPlaying] = useState(false);

  // Pilha Funcionalidades
  const pushToStack = () => {
    const val = parseInt(stackInput) || Math.floor(Math.random() * 90) + 10;
    if (stackData.length >= 7) {
      showAlert("Pilha Cheia! (Limite pedagógico do visor atingido)", "error");
      return;
    }
    setStackData([val, ...stackData]);
    setStackInput('');
    showAlert(`Valor ${val} empilhado (Push).`, "success");
  };

  const popFromStack = () => {
    if (stackData.length === 0) {
      showAlert("Pilha vazia! Impossível remover (Stack Underflow).", "error");
      return;
    }
    const popped = stackData[0];
    setStackData(stackData.slice(1));
    showAlert(`Valor ${popped} desempilhado (Pop). Regra LIFO!`, "success");
  };

  // Fila Funcionalidades
  const enqueueToQueue = () => {
    const val = parseInt(queueInput) || Math.floor(Math.random() * 90) + 10;
    if (queueData.length >= 7) {
      showAlert("Fila Cheia! (Limite pedagógico atingido)", "error");
      return;
    }
    setQueueData([...queueData, val]);
    setQueueInput('');
    showAlert(`Valor ${val} inserido no fim da fila (Enqueue).`, "success");
  };

  const dequeueFromQueue = () => {
    if (queueData.length === 0) {
      showAlert("Fila vazia! Ninguém para atender.", "error");
      return;
    }
    const dequeued = queueData[0];
    setQueueData(queueData.slice(1));
    showAlert(`Valor ${dequeued} atendido e saiu da fila (Dequeue). Regra FIFO!`, "success");
  };

  // Recursão Fatorial Stepper Generator
  const generateRecursionSteps = () => {
    const steps = [];
    const n = factorialInput;
    
    // Fase 1: Empilhando (Pushing Frames)
    const frames = [];
    const computeFactorialSteps = (currentN) => {
      frames.push(currentN);
      steps.push({
        frames: [...frames],
        desc: `Chamando fatorial(${currentN}). Adicionando novo bloco de execução no topo da Call Stack.`,
        currentVal: null,
        n: currentN,
        phase: 'push'
      });

      if (currentN === 1) {
        steps.push({
          frames: [...frames],
          desc: `Caso Base alcançado! fatorial(1) retorna valor óbvio de 1. Próxima etapa: Desempilhar.`,
          currentVal: 1,
          n: 1,
          phase: 'base'
        });
        return 1;
      }

      let result = currentN * computeFactorialSteps(currentN - 1);
      frames.pop();
      steps.push({
        frames: [...frames],
        desc: `Retornando de fatorial(${currentN}): multiplicando o número ${currentN} pelo resultado da chamada anterior. Retorno: ${result}.`,
        currentVal: result,
        n: currentN,
        phase: 'pop'
      });
      return result;
    };

    computeFactorialSteps(n);
    setRecursionSteps(steps);
    setRecIdx(0);
  };

  useEffect(() => {
    if (visualMode === 'recursion') {
      generateRecursionSteps();
    }
  }, [visualMode, factorialInput]);

  // Recursion Player loop
  useEffect(() => {
    let interval = null;
    if (recPlaying) {
      interval = setInterval(() => {
        setRecIdx((prev) => {
          if (prev >= recursionSteps.length - 1) {
            setRecPlaying(false);
            showAlert("Fim da simulação de Recursão!", "success");
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 1400);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [recPlaying, recursionSteps]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
      {/* Controles Laterais */}
      <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-5 space-y-5">
        <div>
          <h3 className="text-sm font-mono text-indigo-400 font-bold mb-1">🥞 Alocação Dinâmica</h3>
          <h2 className="text-lg font-bold text-white">Memória & Chamadas</h2>
          <p className="text-xs text-slate-400 leading-relaxed mt-1">
            Veja como a Call Stack se comporta salvando frames locais em chamadas aninhadas ou na ordem LIFO/FIFO.
          </p>
        </div>

        {/* Seleção do modo */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-mono text-slate-400">Modo de Experimento</label>
          {[
            { id: 'stack', title: 'Pilha (LIFO)', icon: Layers, desc: 'Last-In First-Out' },
            { id: 'queue', title: 'Fila (FIFO)', icon: Layers, desc: 'First-In First-Out' },
            { id: 'recursion', title: 'Pilha de Chamada (Recursão)', icon: GitBranch, desc: 'Análise de Fatorial' }
          ].map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => setVisualMode(mode.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold border transition text-left ${
                  visualMode === mode.id 
                    ? 'bg-indigo-950/40 text-indigo-200 border-indigo-800/80' 
                    : 'text-slate-400 border-transparent hover:bg-slate-900/50'
                }`}
              >
                <Icon size={14} className="text-indigo-400" />
                <div>
                  <div className="font-bold">{mode.title}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{mode.desc}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Inputs Específicos por Modo */}
        {visualMode === 'stack' && (
          <div className="space-y-3 pt-3 border-t border-slate-800/80">
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-400">Valor para Empilhar (Push)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Aleatório se vazio"
                  value={stackInput}
                  onChange={(e) => setStackInput(e.target.value)}
                  className="bg-slate-950 text-xs rounded border border-slate-800 p-2 text-slate-200 focus:outline-none focus:border-indigo-500 flex-1 min-w-0"
                />
                <button
                  onClick={pushToStack}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-xl flex items-center justify-center transition"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <button
              onClick={popFromStack}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-red-950/20 border border-red-900/40 hover:bg-red-950/40 text-red-300 rounded-xl text-xs font-semibold transition"
            >
              <Trash2 size={14} />
              Desempilhar (Pop)
            </button>
          </div>
        )}

        {visualMode === 'queue' && (
          <div className="space-y-3 pt-3 border-t border-slate-800/80">
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-400">Valor para Enfileirar</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Aleatório se vazio"
                  value={queueInput}
                  onChange={(e) => setQueueInput(e.target.value)}
                  className="bg-slate-950 text-xs rounded border border-slate-800 p-2 text-slate-200 focus:outline-none focus:border-indigo-500 flex-1 min-w-0"
                />
                <button
                  onClick={enqueueToQueue}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-xl flex items-center justify-center transition"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <button
              onClick={dequeueFromQueue}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-950/20 border border-emerald-900/40 hover:bg-emerald-950/40 text-emerald-300 rounded-xl text-xs font-semibold transition"
            >
              Atender Primeiro (Dequeue)
            </button>
          </div>
        )}

        {visualMode === 'recursion' && (
          <div className="space-y-3 pt-3 border-t border-slate-800/80">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-indigo-400 font-bold">Fatorial de:</label>
              <select
                value={factorialInput}
                onChange={(e) => {
                  setFactorialInput(parseInt(e.target.value));
                  setRecPlaying(false);
                }}
                className="w-full bg-slate-950 text-xs font-mono border border-slate-800 text-slate-200 p-2 rounded-lg focus:outline-none"
              >
                {[3, 4, 5, 6, 7].map((num) => (
                  <option key={num} value={num}>Fatorial de {num} ({num}!)</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setRecPlaying(!recPlaying)}
                className="w-full py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-500 transition"
              >
                {recPlaying ? 'Pausar' : 'Rodar Recursão'}
              </button>
              <button
                onClick={() => {
                  setRecIdx(0);
                  setRecPlaying(false);
                }}
                className="w-full py-2 bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs rounded-xl hover:bg-slate-750 transition"
              >
                Reiniciar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Visor Principal do Experimento */}
      <div className="lg:col-span-3 flex flex-col">
        <div className="bg-slate-900/20 border border-slate-800 rounded-2xl p-6 flex-1 flex flex-col justify-between">
          
          {/* Header Visor */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono border-b border-slate-850 pb-3">
            <span>Visualização Física de Estrutura</span>
            <span className="text-indigo-400 font-bold uppercase">{visualMode}</span>
          </div>

          {/* Renderizador de Pilha */}
          {visualMode === 'stack' && (
            <div className="flex-1 flex flex-col items-center justify-center py-6 min-h-[250px]">
              <div className="w-56 border-x-4 border-b-4 border-slate-700 rounded-b-2xl p-3 flex flex-col-reverse gap-2 bg-slate-950/40 min-h-[200px]">
                {stackData.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-slate-600 text-xs font-mono text-center py-10">
                    Pilha Vazia.<br/>Faça um Push acima.
                  </div>
                ) : (
                  stackData.map((val, idx) => (
                    <div 
                      key={idx}
                      className={`py-3 px-4 rounded-xl border font-mono text-sm font-bold text-center transition-all duration-300 transform translate-y-0 ${
                        idx === 0 
                          ? 'bg-indigo-600/90 border-indigo-400 text-white shadow-md animate-pulse' 
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      {idx === 0 ? `👉 [${val}] - TOPO (LIFO)` : `[${val}]`}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Renderizador de Fila */}
          {visualMode === 'queue' && (
            <div className="flex-1 flex flex-col items-center justify-center py-6 min-h-[250px]">
              <div className="flex flex-col sm:flex-row items-center gap-1.5 w-full max-w-lg bg-slate-950/30 p-4 border border-slate-800 rounded-2xl">
                {queueData.length === 0 ? (
                  <div className="w-full text-center text-slate-600 text-xs font-mono py-8">
                    Fila Vazia. Sem elementos para processar.
                  </div>
                ) : (
                  queueData.map((val, idx) => (
                    <div 
                      key={idx}
                      className={`p-3 rounded-xl border font-mono text-xs font-bold flex-1 text-center min-w-[70px] ${
                        idx === 0 
                          ? 'bg-emerald-600/90 border-emerald-400 text-white shadow-lg' 
                          : idx === queueData.length - 1 
                          ? 'bg-indigo-950/80 border-indigo-800/80 text-indigo-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="text-[10px] text-slate-400 uppercase font-bold mb-1">
                        {idx === 0 ? 'FRENTE (FIFO)' : idx === queueData.length - 1 ? 'ÚLTIMO' : `POS ${idx + 1}`}
                      </div>
                      <div>{val}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Renderizador de Recursão (Call Stack) */}
          {visualMode === 'recursion' && (
            <div className="flex-1 flex flex-col justify-between py-4 min-h-[250px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Visual Representation of Stack Frames */}
                <div className="border-l-2 border-dashed border-indigo-900/60 pl-4 space-y-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Fases da Call Stack</span>
                  <div className="flex flex-col-reverse gap-1.5 min-h-[140px]">
                    {(recursionSteps[recIdx]?.frames || []).map((frameVal, idx) => (
                      <div 
                        key={idx} 
                        className={`p-2 rounded-lg border text-xs font-mono font-bold flex items-center justify-between transition-all ${
                          idx === (recursionSteps[recIdx]?.frames.length - 1)
                            ? 'bg-indigo-900/50 border-indigo-500 text-indigo-200'
                            : 'bg-slate-950 border-slate-900 text-slate-500'
                        }`}
                      >
                        <span>fatorial({frameVal})</span>
                        <span className="text-[10px] px-1 bg-slate-900 text-slate-400 rounded">N={frameVal}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Computational Steps Explanation */}
                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 uppercase">Acompanhamento Técnico</span>
                    <p className="text-xs text-slate-300 leading-relaxed mt-2">
                      {recursionSteps[recIdx]?.desc}
                    </p>
                  </div>
                  {recursionSteps[recIdx]?.currentVal && (
                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">Retorno Atual:</span>
                      <span className="text-emerald-400 font-bold bg-emerald-950/50 border border-emerald-900/50 px-2 py-0.5 rounded">
                        {recursionSteps[recIdx].currentVal}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Stepper Manual */}
              <div className="mt-4 flex items-center justify-between border-t border-slate-850 pt-3">
                <span className="text-[10px] font-mono text-slate-500">Passo {recIdx + 1} de {recursionSteps.length}</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setRecIdx(Math.max(0, recIdx - 1))}
                    disabled={recIdx === 0}
                    className="p-1 px-2.5 bg-slate-900 border border-slate-800 text-slate-300 rounded text-xs disabled:opacity-30"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => setRecIdx(Math.min(recursionSteps.length - 1, recIdx + 1))}
                    disabled={recIdx >= recursionSteps.length - 1}
                    className="p-1 px-2.5 bg-slate-900 border border-slate-800 text-slate-300 rounded text-xs disabled:opacity-30"
                  >
                    Avançar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Dica do Rodapé sobre Aplicação Prática */}
          <div className="mt-4 bg-slate-900/40 p-3 rounded-xl border border-slate-800/60 flex items-center gap-2.5 text-xs text-slate-400">
            <Info size={14} className="text-indigo-400" />
            <span>
              {visualMode === 'stack' && 'Pilhas são usadas para histórico de navegação, botões Desfazer (Undo) e controle de Threads.'}
              {visualMode === 'queue' && 'Filas são fundamentais em redes de dados, buffers de impressão e agendadores de tarefas (Scheduler).'}
              {visualMode === 'recursion' && 'Recursões oferecem códigos elegantes, porém demandam cuidado rigoroso para evitar estouros de Stack.'}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}

// ==========================================
// VIEW: GRAFOS (BFS & DFS VISUALIZER)
// ==========================================
function GraphsView() {
  const [algo, setAlgo] = useState('bfs'); // bfs, dfs
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Definição estrutural de um grafo fixo ótimo para demonstração
  // Nós: A, B, C, D, E, F
  const graphNodes = {
    'A': { x: 70, y: 120 },
    'B': { x: 170, y: 60 },
    'C': { x: 170, y: 180 },
    'D': { x: 270, y: 60 },
    'E': { x: 270, y: 180 },
    'F': { x: 370, y: 120 }
  };

  const graphEdges = [
    { from: 'A', to: 'B' },
    { from: 'A', to: 'C' },
    { from: 'B', to: 'D' },
    { from: 'B', to: 'E' },
    { from: 'C', to: 'E' },
    { from: 'D', to: 'F' },
    { from: 'E', to: 'F' }
  ];

  // Passos gerados para animação BFS (Fila) e DFS (Pilha)
  const bfsSteps = [
    { visited: ['A'], active: 'A', queue: ['B', 'C'], desc: "Iniciando busca em Largura (BFS). Adicionando nó inicial 'A' na fila de visitas." },
    { visited: ['A', 'B'], active: 'B', queue: ['C', 'D', 'E'], desc: "Retirando 'A'. Visitando vizinho radial 'B' e adicionando suas saídas na Fila." },
    { visited: ['A', 'B', 'C'], active: 'C', queue: ['D', 'E'], desc: "Visitando vizinho radial 'C' no mesmo nível de profundidade." },
    { visited: ['A', 'B', 'C', 'D'], active: 'D', queue: ['E', 'F'], desc: "Avançando para a camada seguinte. Visitando 'D' e colocando o nó de saída 'F' na Fila." },
    { visited: ['A', 'B', 'C', 'D', 'E'], active: 'E', queue: ['F'], desc: "Explorando 'E'. Suas saídas apontam para 'F' que já está agendado na fila." },
    { visited: ['A', 'B', 'C', 'D', 'E', 'F'], active: 'F', queue: [], desc: "Alcançando o destino final 'F'. Todo o grafo foi mapeado em largura camada por camada!" }
  ];

  const dfsSteps = [
    { visited: ['A'], active: 'A', stack: ['A'], desc: "Iniciando busca em Profundidade (DFS). Entrando na raiz 'A'." },
    { visited: ['A', 'B'], active: 'B', stack: ['A', 'B'], desc: "Mergulhando em profundidade pelo ramo superior esquerdo. Visitando 'B'." },
    { visited: ['A', 'B', 'D'], active: 'D', stack: ['A', 'B', 'D'], desc: "Continuando mergulho vertical cegamente até as folhas. Visitando 'D'." },
    { visited: ['A', 'B', 'D', 'F'], active: 'F', stack: ['A', 'B', 'D', 'F'], desc: "Mergulho profundo completo! Alcançamos 'F' vindo do caminho superior." },
    { visited: ['A', 'B', 'D', 'F', 'E'], active: 'E', stack: ['A', 'B', 'E'], desc: "Retornando (Backtracking) para encontrar ramos restantes. Visitando nó 'E'." },
    { visited: ['A', 'B', 'D', 'F', 'E', 'C'], active: 'C', stack: ['A', 'C'], desc: "Finalizando o backtracking e localizando o nó 'C'. Todos os caminhos explorados!" }
  ];

  const steps = algo === 'bfs' ? bfsSteps : dfsSteps;

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setStepIdx((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 1800);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps]);

  const currentStep = steps[stepIdx] || steps[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
      {/* Controles Laterais Grafos */}
      <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-5 space-y-5">
        <div>
          <h3 className="text-sm font-mono text-indigo-400 font-bold mb-1">🕸️ Algoritmos de Varredura</h3>
          <h2 className="text-lg font-bold text-white">Navegação em Grafos</h2>
          <p className="text-xs text-slate-400 leading-relaxed mt-1">
            Observe em tempo real como dados interconectados por redes são varridos por estratégias de Largura (BFS) ou Profundidade (DFS).
          </p>
        </div>

        {/* Escolha do algoritmo */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-slate-400">Algoritmo de Varredura</label>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => {
                setAlgo('bfs');
                setStepIdx(0);
                setIsPlaying(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold border transition text-left ${
                algo === 'bfs' 
                  ? 'bg-indigo-950/40 text-indigo-200 border-indigo-800/80' 
                  : 'text-slate-400 border-transparent hover:bg-slate-900/50'
              }`}
            >
              <span>BFS (Busca em Largura)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-850 text-indigo-400 font-mono font-bold">Fila</span>
            </button>
            <button
              onClick={() => {
                setAlgo('dfs');
                setStepIdx(0);
                setIsPlaying(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold border transition text-left ${
                algo === 'dfs' 
                  ? 'bg-indigo-950/40 text-indigo-200 border-indigo-800/80' 
                  : 'text-slate-400 border-transparent hover:bg-slate-900/50'
              }`}
            >
              <span>DFS (Busca em Profundidade)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-850 text-indigo-400 font-mono font-bold">Pilha</span>
            </button>
          </div>
        </div>

        {/* Controles do Playback */}
        <div className="space-y-2 pt-3 border-t border-slate-800">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1"
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
              {isPlaying ? 'Pausar' : 'Rodar Algoritmo'}
            </button>
            <button
              onClick={() => {
                setStepIdx(0);
                setIsPlaying(false);
              }}
              className="py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-semibold text-xs rounded-xl transition"
            >
              Reiniciar
            </button>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setStepIdx(Math.max(0, stepIdx - 1))}
              disabled={stepIdx === 0}
              className="flex-1 py-1.5 bg-slate-950 border border-slate-850 text-slate-400 hover:text-white rounded-lg text-xs disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            <button
              onClick={() => setStepIdx(Math.min(steps.length - 1, stepIdx + 1))}
              disabled={stepIdx >= steps.length - 1}
              className="flex-1 py-1.5 bg-slate-950 border border-slate-850 text-slate-400 hover:text-white rounded-lg text-xs disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Avançar
            </button>
          </div>
        </div>

        {/* Detalhes de Complexidade do Método */}
        <div className="bg-indigo-950/20 border border-indigo-900/40 p-4 rounded-xl text-xs">
          <h4 className="font-bold text-indigo-300 font-mono mb-1">Dica de Complexidade</h4>
          <p className="text-slate-400 leading-relaxed">
            Ambos BFS e DFS possuem complexidade temporal de <strong className="text-indigo-400 font-mono">O(V + E)</strong>, onde V representa o número de Vértices e E representa as Arestas do Grafo.
          </p>
        </div>
      </div>

      {/* Renderização Interativa do Grafo SVG */}
      <div className="lg:col-span-3 flex flex-col gap-4">
        <div className="bg-slate-900/20 border border-slate-800 rounded-2xl p-6 flex-1 flex flex-col justify-between">
          
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono border-b border-slate-850 pb-3">
            <span>Visualização Vetorial de Rede</span>
            <span className="text-indigo-400 font-bold uppercase">Passo {stepIdx + 1} de {steps.length}</span>
          </div>

          {/* SVG Principal do Grafo */}
          <div className="flex-1 flex items-center justify-center py-6 min-h-[260px]">
            <svg viewBox="0 0 450 240" className="w-full max-w-lg h-auto select-none">
              
              {/* Conexões (Arestas) */}
              {graphEdges.map((edge, idx) => {
                const nodeFrom = graphNodes[edge.from];
                const nodeTo = graphNodes[edge.to];
                // Checa se a aresta liga nós visitados ou se está "ativa"
                const fromVisited = currentStep.visited?.includes(edge.from);
                const toVisited = currentStep.visited?.includes(edge.to);
                const isEdgeUsed = fromVisited && toVisited;

                return (
                  <line
                    key={idx}
                    x1={nodeFrom.x}
                    y1={nodeFrom.y}
                    x2={nodeTo.x}
                    y2={nodeTo.y}
                    stroke={isEdgeUsed ? '#818cf8' : '#334155'}
                    strokeWidth={isEdgeUsed ? 3 : 1.5}
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* Nós (Vértices) */}
              {Object.keys(graphNodes).map((nodeName) => {
                const node = graphNodes[nodeName];
                const isVisited = currentStep.visited?.includes(nodeName);
                const isActive = currentStep.active === nodeName;

                let nodeBg = 'fill-slate-950 stroke-slate-700';
                let textColor = 'fill-slate-400';
                
                if (isActive) {
                  nodeBg = 'fill-indigo-600 stroke-indigo-400 ring-4';
                  textColor = 'fill-white font-bold';
                } else if (isVisited) {
                  nodeBg = 'fill-emerald-950 stroke-emerald-500';
                  textColor = 'fill-emerald-200';
                }

                return (
                  <g key={nodeName} className="cursor-pointer transition-all duration-300">
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={18}
                      className={`${nodeBg} transition-all duration-300`}
                      strokeWidth={2}
                    />
                    <text
                      x={node.x}
                      y={node.y + 4}
                      textAnchor="middle"
                      className={`text-xs font-mono font-bold ${textColor}`}
                    >
                      {nodeName}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Linguagem Natural Step-by-Step */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex gap-3 items-start">
            <Info className="text-indigo-400 mt-0.5 shrink-0" size={16} />
            <div className="space-y-2">
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {currentStep.desc}
              </p>
              
              {/* Visualizador de Estrutura de Apoio Usada */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-900 text-xs font-mono">
                <span className="text-slate-500">
                  {algo === 'bfs' ? 'Estrutura Fila (FIFO):' : 'Estrutura Pilha/Recursiva:'}
                </span>
                <div className="flex gap-1 items-center">
                  {(algo === 'bfs' ? currentStep.queue : currentStep.stack || []).length === 0 ? (
                    <span className="text-[10px] text-slate-600">vazia</span>
                  ) : (
                    (algo === 'bfs' ? currentStep.queue : currentStep.stack || []).map((v, i) => (
                      <span key={i} className="bg-indigo-950/80 border border-indigo-900/60 text-indigo-300 text-[9px] px-1.5 py-0.5 rounded font-bold">
                        {v}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ==========================================
// VIEW: QUIZ DE CONHECIMENTO
// ==========================================
function QuizView({ showAlert }) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const question = QUIZ_QUESTIONS[currentQuestionIdx];

  const handleNext = () => {
    setSelectedOption(null);
    setHasSubmitted(false);
    if (currentQuestionIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleSubmit = () => {
    if (selectedOption === null) {
      showAlert("Por favor, selecione uma alternativa!", "info");
      return;
    }
    setHasSubmitted(true);
    if (selectedOption === question.correct) {
      setScore(score + 1);
      showAlert("Alternativa correta! Muito bem.", "success");
    } else {
      showAlert("Alternativa incorreta. Veja a explicação detalhada.", "error");
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setHasSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="max-w-3xl w-full mx-auto bg-slate-900/30 border border-slate-800 rounded-2xl p-6 lg:p-8 flex flex-col justify-between shadow-sm flex-1">
      
      {!quizFinished ? (
        <div className="space-y-6">
          {/* Progress Quiz */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <HelpIcon size={18} className="text-indigo-400" />
              <h2 className="text-md font-bold text-white font-mono">Quiz de Fixação</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Questão {currentQuestionIdx + 1} de {QUIZ_QUESTIONS.length}
            </span>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h3 className="text-base lg:text-lg font-bold text-slate-100 leading-relaxed">
              {question.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-2">
            {question.options.map((option, idx) => {
              let btnStyle = 'border-slate-800 bg-slate-950/40 text-slate-300 hover:bg-slate-900 hover:border-slate-700';
              
              if (hasSubmitted) {
                if (idx === question.correct) {
                  btnStyle = 'border-emerald-600 bg-emerald-950/40 text-emerald-200';
                } else if (selectedOption === idx) {
                  btnStyle = 'border-red-600 bg-red-950/40 text-red-200';
                } else {
                  btnStyle = 'border-slate-900 bg-slate-950/20 text-slate-600 opacity-60';
                }
              } else if (selectedOption === idx) {
                btnStyle = 'border-indigo-500 bg-indigo-950/30 text-indigo-200';
              }

              return (
                <button
                  key={idx}
                  disabled={hasSubmitted}
                  onClick={() => setSelectedOption(idx)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl text-xs sm:text-sm font-semibold border text-left transition-all ${btnStyle}`}
                >
                  <span>{option}</span>
                  {hasSubmitted && idx === question.correct && (
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 ml-2" />
                  )}
                  {hasSubmitted && selectedOption === idx && idx !== question.correct && (
                    <XCircle size={16} className="text-red-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Text */}
          {hasSubmitted && (
            <div className="bg-indigo-950/20 border border-indigo-900/40 p-4 rounded-xl text-xs leading-relaxed text-indigo-200">
              <strong className="block text-indigo-400 mb-1">📚 Explicação Científica:</strong>
              {question.explanation}
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-800 pt-5 mt-4">
            {!hasSubmitted ? (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/10 transition"
              >
                Confirmar Resposta
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2"
              >
                {currentQuestionIdx < QUIZ_QUESTIONS.length - 1 ? 'Próxima Questão' : 'Ver Resultados'}
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      ) : (
        // Results Screen
        <div className="flex flex-col items-center justify-center text-center py-10 space-y-6">
          <div className="bg-indigo-950 p-4 rounded-2xl border border-indigo-800 text-indigo-400">
            <CheckCircle2 size={44} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Quiz Concluído!</h2>
            <p className="text-xs text-slate-400 font-mono mt-1">Veja seu nível de maturidade computacional</p>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl w-full max-w-sm">
            <div className="text-4xl font-extrabold font-mono text-indigo-400">
              {score} / {QUIZ_QUESTIONS.length}
            </div>
            <div className="text-xs text-slate-400 mt-2 font-semibold">
              {score === QUIZ_QUESTIONS.length ? "👑 Excelente! Domínio absoluto dos conceitos!" : 
               score >= 3 ? "👍 Bom rendimento! Continue praticando nos simuladores." : 
               "📖 Recomendamos revisar o material didático teórico."}
            </div>
          </div>

          <button
            onClick={restartQuiz}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition"
          >
            Refazer Quiz
          </button>
        </div>
      )}
    </div>
  );
}