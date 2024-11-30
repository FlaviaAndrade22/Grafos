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
