function CalcularRota() {
    // Capturando os valores selecionados
    const ponto1 = document.getElementById('ponto1').value;
    const ponto2 = document.getElementById('ponto2').value;
    const ponto3 = document.getElementById('ponto3').value;
    const ponto4 = document.getElementById('ponto4').value;

    // Exibindo uma mensagem com a rota escolhida
    alert(`Rota escolhida: ${ponto1} -> ${ponto2} -> ${ponto3} -> ${ponto4}`);
}
