// Grafo representado por um objeto de adjacência
class Grafo {
    constructor() {
        this.grafo = {};
    }

    adicionarVertice(v) {
        if (!this.grafo[v]) {
            this.grafo[v] = [];
        }
    }

    adicionarAresta(v1, v2, peso) {
        this.adicionarVertice(v1);
        this.adicionarVertice(v2);
        this.grafo[v1].push({ vertice: v2, peso: peso });
        this.grafo[v2].push({ vertice: v1, peso: peso }); // Para grafos não direcionados
    }

    // Algoritmo de Dijkstra
    dijkstra(origem, destino) {
        const distancias = {};
        const prev = {};
        const pq = new PriorityQueue();

        // Inicializando as distâncias com infinito
        for (let vertice in this.grafo) {
            distancias[vertice] = Infinity;
            prev[vertice] = null;
        }

        // Grafo de exemplo com distâncias entre os pontos
const grafo = {
  A: { B: 5, C: 10, E: 8 },
  B: { A: 5, C: 3, D: 9, F: 7 },
  C: { A: 10, B: 3, D: 2, G: 6 },
  D: { B: 9, C: 2, G: 4, H: 8 },
  E: { A: 8, F: 6, I: 10 },
  F: { B: 7, E: 6, G: 5, J: 9 },
  G: { C: 6, D: 4, F: 5, H: 3 },
  H: { D: 8, G: 3, K: 6 },
  I: { E: 10, J: 7 },
  J: { F: 9, I: 7, K: 4 },
  K: { H: 6, J: 4 }
};

// Coordenadas dos nós para o canvas
const posicoes = {
  A: { x: 100, y: 100 },
  B: { x: 200, y: 200 },
  C: { x: 400, y: 150 },
  D: { x: 600, y: 300 },
  E: { x: 150, y: 350 },
  F: { x: 300, y: 400 },
  G: { x: 500, y: 400 },
  H: { x: 700, y: 500 },
  I: { x: 50, y: 500 },
  J: { x: 250, y: 550 },
  K: { x: 600, y: 600 }
};

// Preenche os menus suspensos com os nós do grafo
function inicializarSelects() {
  const pontos = Object.keys(grafo);
  const selects = ['ponto1', 'ponto2', 'ponto3', 'ponto4'];

  selects.forEach(selectId => {
    const select = document.getElementById(selectId);
    pontos.forEach(no => {
      const option = document.createElement('option');
      option.value = no;
      option.text = no;
      select.appendChild(option);
    });
  });
}

// Desenha o grafo no canvas
function desenharMapa() {
  const canvas = document.getElementById('mapCanvas');
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenhar as conexões
  for (let no in grafo) {
    for (let vizinho in grafo[no]) {
      ctx.beginPath();
      ctx.moveTo(posicoes[no].x, posicoes[no].y);
      ctx.lineTo(posicoes[vizinho].x, posicoes[vizinho].y);
      ctx.strokeStyle = "#888";
      ctx.stroke();
      ctx.fillStyle = "#000";
      const midX = (posicoes[no].x + posicoes[vizinho].x) / 2;
      const midY = (posicoes[no].y + posicoes[vizinho].y) / 2;
      ctx.fillText(grafo[no][vizinho], midX, midY);
    }
  }

  // Desenhar os pontos
  for (let no in posicoes) {
    ctx.beginPath();
    ctx.arc(posicoes[no].x, posicoes[no].y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.fillText(no, posicoes[no].x - 5, posicoes[no].y - 15);
  }
}

// Algoritmo de Dijkstra para encontrar a menor rota entre dois nós
function menorRota(grafo, inicio, fim) {
  const distancias = {};
  const predecessores = {};
  const visitados = new Set();
  const fila = [inicio];

  for (let no in grafo) distancias[no] = Infinity;
  distancias[inicio] = 0;

  while (fila.length) {
    const atual = fila.shift();
    visitados.add(atual);

    for (let vizinho in grafo[atual]) {
      if (!visitados.has(vizinho)) {
        const novaDistancia = distancias[atual] + grafo[atual][vizinho];
        if (novaDistancia < distancias[vizinho]) {
          distancias[vizinho] = novaDistancia;
          predecessores[vizinho] = atual;
          fila.push(vizinho);
        }
      }
    }
  }

  const caminho = [];
  for (let no = fim; no; no = predecessores[no]) caminho.unshift(no);
  return caminho[0] === inicio ? caminho : null;
}

// Calcula a rota passando pelos quatro pontos selecionados
function calcularRotaSelecionada() {
  const pontos = [
    document.getElementById('ponto1').value,
    document.getElementById('ponto2').value,
    document.getElementById('ponto3').value,
    document.getElementById('ponto4').value
  ];

  let rotaCompleta = [];
  let distanciaTotal = 0;

  for (let i = 0; i < pontos.length - 1; i++) {
    const caminho = menorRota(grafo, pontos[i], pontos[i + 1]);
    if (!caminho) {
      console.log(Caminho não encontrado entre ${pontos[i]} e ${pontos[i + 1]}.);
      return;
    }
    if (rotaCompleta.length > 0) caminho.shift();
    rotaCompleta = rotaCompleta.concat(caminho);

    for (let j = 0; j < caminho.length - 1; j++) {
      distanciaTotal += grafo[caminho[j]][caminho[j + 1]];
    }
  }

  console.log(Rota: ${rotaCompleta.join(' -> ')} | Distância Total: ${distanciaTotal});
  desenharRota(rotaCompleta);
}

// Desenha a rota calculada no canvas
function desenharRota(caminho) {
  const canvas = document.getElementById('mapCanvas');
  const ctx = canvas.getContext('2d');
  desenharMapa();

  ctx.strokeStyle = "#00f";
  ctx.lineWidth = 3;

  for (let i = 0; i < caminho.length - 1; i++) {
    ctx.beginPath();
    ctx.moveTo(posicoes[caminho[i]].x, posicoes[caminho[i]].y);
    ctx.lineTo(posicoes[caminho[i + 1]].x, posicoes[caminho[i + 1]].y);
    ctx.stroke();
  }
}

// Inicialização
window.onload = () => {
  inicializarSelects();
  desenharMapa();
};

        distancias[origem] = 0;
        pq.enfileirar({ vertice: origem, prioridade: 0 });

        while (!pq.estaVazia()) {
            const { vertice } = pq.desenfileirar();
            if (vertice === destino) {
                break;
            }

            for (let vizinho of this.grafo[vertice]) {
                const novaDistancia = distancias[vertice] + vizinho.peso;
                if (novaDistancia < distancias[vizinho.vertice]) {
                    distancias[vizinho.vertice] = novaDistancia;
                    prev[vizinho.vertice] = vertice;
                    pq.enfileirar({ vertice: vizinho.vertice, prioridade: novaDistancia });
                }
            }
        }

        // Reconstrução do caminho mais curto
        const caminho = [];
        let atual = destino;
        while (atual) {
            caminho.unshift(atual);
            atual = prev[atual];
        }

        return { caminho, distancia: distancias[destino] };
    }
}

// Fila de Prioridade para gerenciar os vértices a serem explorados
class PriorityQueue {
    constructor() {
        this.itens = [];
    }

    enfileirar(item) {
        this.itens.push(item);
        this.itens.sort((a, b) => a.prioridade - b.prioridade);
    }

    desenfileirar() {
        return this.itens.shift();
    }

    estaVazia() {
        return this.itens.length === 0;
    }
}

// Exemplo de uso
const grafo = new Grafo();
grafo.adicionarAresta('A', 'B', 1);
grafo.adicionarAresta('A', 'C', 4);
grafo.adicionarAresta('B', 'C', 2);
grafo.adicionarAresta('B', 'D', 5);
grafo.adicionarAresta('C', 'D', 1);

const origem = 'A';
const destino = 'D';

const resultado = grafo.dijkstra(origem, destino);

console.log(Caminho mais curto de ${origem} a ${destino}: ${resultado.caminho.join(' -> ')});
console.log(Distância: ${resultado.distancia});
