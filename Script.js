// Atualização das posições dos pontos para o novo tamanho do canvas
const posicoes = {
  Distribuidora: { x: 100, y: 100 }, // Ponto principal destacado
  Mercado1: { x: 150, y: 500 },
  Mercado2: { x: 650, y: 400 },
  Mercado3: { x: 700, y: 150 },
  Mercado4: { x: 450, y: 100 },
  Mercado5: { x: 300, y: 250 },
  A: { x: 200, y: 100 },
  B: { x: 200, y: 200 },
  C: { x: 100, y: 200 },
  D: { x: 100, y: 300 },
  E: { x: 200, y: 300 },
  F: { x: 200, y: 400 },
  G: { x: 100, y: 400 },
  H: { x: 300, y: 400 },
  I: { x: 300, y: 500 },
  J: { x: 200, y: 500 },
  K: { x: 400, y: 500 },
  L: { x: 300, y: 300 },
  M: { x: 300, y: 200 },
  N: { x: 300, y: 100 },
  O: { x: 400, y: 400 },
  P: { x: 400, y: 300 },
  Q: { x: 400, y: 200 },
  R: { x: 400, y: 100 },
  S: { x: 500, y: 400 },
  T: { x: 500, y: 300 },
  U: { x: 500, y: 200 },
  V: { x: 500, y: 100 },
  W: { x: 600, y: 200 },
  X: { x: 600, y: 300 },
  Y: { x: 600, y: 400 },
  Z: { x: 600, y: 500 },

};

// Grafo atualizado com os novos pontos
const grafo = {
  Distribuidora: { A: 5 },
  Mercado1: { J: 3 },
  Mercado2: { },
  Mercado3: {  },
  Mercado4: { R: 3, V: 5 },
  Mercado5: { L: 3, M: 3 },
  A: { B: 5, N: 5 },
  B: { A: 5, C: 5, E: 5, M: 5 },
  C: { B: 5, D: 5 },
  D: { C: 5, G: 5, E: 5 },
  E: { B: 5, F: 6, },
  F: { B: 5, E: 5, G: 5, J: 5 },
  G: { D: 5, F: 5 },
  H: { F: 5, I: 5 },
  I: { J: 5, H: 5 },
  J: { I: 5, F: 5, Mercado1: 3},
  K: { I: 5, O: 5 },
  L: { E: 5, M: 5, P:5},
  M: { B: 5, N: 4, Mercado5: 3},
  N: { A: 5, M: 5, R: 5},
  O: { H: 5, K: 5, S: 5},
  P: { L: 5, O: 5, T: 5},
  Q: { R: 5, U: 5},
  R: { Mercado4: 3, N: 5, Q: 5},
  S: { O: 5, T: 5, Y: 5}
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



// Função para desenhar o mapa ampliado
function desenharMapaCidade(ctx) {
  // Desenhar ruas principais (linhas horizontais e verticais)
  ctx.strokeStyle = "#ccc";
  ctx.lineWidth = 2;

// Linhas horizontais
for (let y = 100; y <= 500; y += 100) {
  ctx.beginPath();
  ctx.moveTo(50, y);
  ctx.lineTo(750, y);
  ctx.stroke();
}

// Linhas verticais
for (let x = 100; x <= 700; x += 100) {
  ctx.beginPath();
  ctx.moveTo(x, 50);
  ctx.lineTo(x, 550);
  ctx.stroke();
}

  // pontos de comércio
  {
    ctx.fillStyle = "#ffcc00";  
    ctx.fillRect(50, 70, 60, 20); // Distribuidora
    ctx.fillRect(170, 50, 20, 40);
    ctx.fillRect(110, 70, 70, 20);                                 
    ctx.fillRect(160, 110, 30, 30);
    ctx.fillRect(50, 110, 50, 80); 
    ctx.fillRect(170, 140, 20, 50); 
    ctx.fillRect(100, 170, 70, 20); 
    }

    // Mercados
    {
      ctx.fillStyle = "#00ff00";
      ctx.fillRect(310, 210, 50, 80);
      ctx.fillRect(110, 510, 80, 50);
    }

    // Parques
    {
      ctx.fillStyle = "#008000"
      ctx.fillRect(110, 210, 80, 80);
      ctx.fillRect(410, 110, 180, 80);
      ctx.fillRect(440, 410, 120, 90)
    }

    // Prédios
    {
    ctx.fillStyle = "#aaa";
    ctx.fillRect(60, 240, 30, 50); // Bloco 1
    ctx.fillRect(70, 200, 20, 30); 
    ctx.fillRect(70, 300, 20, 30); 
    ctx.fillRect(60, 340, 30, 30);
    ctx.fillRect(70, 380, 20, 40);
    ctx.fillRect(70, 430, 35, 60);
    ctx.fillRect(70, 510, 35, 40);
    
    {
    ctx.fillRect(110, 310, 10, 20); // Bloco 2
    ctx.fillRect(110, 340, 20, 20); 
    ctx.fillRect(110, 370, 20, 20); 
    ctx.fillRect(140, 370, 50, 20); 
    ctx.fillRect(130, 310, 30, 20);
    ctx.fillRect(170, 310, 20, 20); 
    ctx.fillRect(170, 340, 20, 20); 
    ctx.fillRect(110, 410, 50, 50); 
    ctx.fillRect(110, 470, 20, 20); 
    ctx.fillRect(140, 470, 50, 20); 
    ctx.fillRect(170, 410, 20, 50); 
    }

    {
    ctx.fillRect(210, 210, 60, 20); // Bloco 3
    ctx.fillRect(260, 210, 25, 80);
    ctx.fillRect(210, 270, 60, 20); 
    ctx.fillRect(210, 110, 35, 35); 
    ctx.fillRect(255, 110, 35, 35); 
    ctx.fillRect(210, 155, 35, 35); 
    ctx.fillRect(255, 155, 35, 35);
    }

    {
    ctx.fillRect(210, 370, 60, 20); // Bloco 4
    ctx.fillRect(210, 340, 20, 20); 
    ctx.fillRect(210, 320, 50, 40); 
    ctx.fillRect(290, 370, 50, 20); 
    ctx.fillRect(210, 510, 80, 20);
    ctx.fillRect(270, 310, 20, 20); 
    ctx.fillRect(300, 310, 50, 40);
    ctx.fillRect(360, 310, 30, 80);
    ctx.fillRect(210, 410, 10, 20); 
    ctx.fillRect(210, 440, 20, 20); 
    ctx.fillRect(210, 470, 20, 20); 
    ctx.fillRect(240, 440, 50, 50); 
    ctx.fillRect(230, 410, 30, 20);
    ctx.fillRect(270, 410, 20, 20); 
    }

    {
    ctx.fillRect(310, 410, 80, 80); // Bloco 5
    ctx.fillRect(310, 510, 20, 20); 
    ctx.fillRect(340, 510, 50, 30); 
    ctx.fillRect(310, 110, 50, 40); 
    ctx.fillRect(310, 160, 30, 40);
    ctx.fillRect(370, 110, 20, 60);
    ctx.fillRect(370, 180, 20, 60);
    ctx.fillRect(370, 250, 60, 40);
    ctx.fillRect(410, 210, 50, 30);
    ctx.fillRect(470, 210, 20, 80);
    ctx.fillRect(310, 70, 80, 20);
    ctx.fillRect(210, 70, 80, 20);
    }

    {                                         
    ctx.fillRect(410, 410, 25, 50); // Bloco 6
    ctx.fillRect(410, 470, 25, 70); 
    ctx.fillRect(410, 505, 180, 45); 
    ctx.fillRect(565, 410, 25, 50);
    ctx.fillRect(565, 470, 25, 70);
    }

    
     }

  // Desenhar ponto da distribuidora
  ctx.fillStyle = "#ff0000";
  ctx.beginPath();
  ctx.arc(posicoes.Distribuidora.x, posicoes.Distribuidora.y, 15, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle = "#000";
  ctx.fillText("Distribuidora", posicoes.Distribuidora.x - 40, posicoes.Distribuidora.y - 20);

  // Desenhar mercados
  ctx.fillStyle = "#00ff00";
  for (let mercado in posicoes) {
    if (mercado !== "Distribuidora") {
      ctx.beginPath();
      ctx.arc(posicoes[mercado].x, posicoes[mercado].y, 10, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = "#000";
      ctx.fillText(mercado, posicoes[mercado].x - 30, posicoes[mercado].y - 15);
    }
  }
}

// Atualização da função desenharMapa
function desenharMapa() {
  const canvas = document.getElementById('mapaCanvas');
  const ctx = canvas.getContext('2d');

  // Limpar o canvas antes de redesenhar
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenhar o mapa da cidade
  desenharMapaCidade(ctx);

  // Desenhar o grafo
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
      console.log(`Caminho não encontrado entre ${pontos[i]} e ${pontos[i + 1]}.`);
      return;
    }
    if (rotaCompleta.length > 0) caminho.shift();
    rotaCompleta = rotaCompleta.concat(caminho);

    for (let j = 0; j < caminho.length - 1; j++) {
      distanciaTotal += grafo[caminho[j]][caminho[j + 1]];
    }
  }

  console.log(`Rota: ${rotaCompleta.join(' -> ')} | Distância Total: ${distanciaTotal}`);
  desenharRota(rotaCompleta);
}

// Desenha a rota calculada no canvas
function desenharRota(caminho) {
  const canvas = document.getElementById('mapaCanvas');
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
