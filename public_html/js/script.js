//Capturando elementos da DOM
var form = document.getElementById('form');
var times = document.getElementById('times');
var anos = document.getElementById('anos');
var locais = document.getElementById('locais');
var perguntas = document.getElementById('perguntas');
var painelDeResposta = document.getElementById('painelResposta');
var btnLimparRespostas = document.getElementById('btnLimparResultado');

//Array com perguntas
var querys = [
  "campeao(ANO, 'TIME').",
  "campeao(Y, 'TIME').",
  "campeao(_,'TIME').",
  "vice(Y, 'TIME').",
  "vice(_,'TIME').",
  "campeao(ANO, A).",
  "campeao(ANO, 'TIME').",
  "vice(ANO, A).",
  "vice(ANO, 'TIME').",
  "estadio(Y, 'ESTADIO').",
  "estadio(ANO, 'ESTADIO').",
  "timesQueFoiCampeao('TIME', _, X).",
  "timesQueFoiCampeao('TIME', Y, X).",
  "timesQueFoiCampeao(A, Y, X)."
];

//Criando conexao com a base de fatos
const session  = pl.create();
session.consult("campeonato.pl");

form.addEventListener('submit', function(e) {
  e.preventDefault();

  //Recuperando dados preenchidos no formulario
  var timeSelecionado = times.options[times.selectedIndex].text;
  var anoSelecionado = anos.options[anos.selectedIndex].text;
  var localSelecionado = locais.options[locais.selectedIndex].text;
  var perguntaSelecionada = perguntas.selectedIndex;

  var query = criarQuery(perguntaSelecionada, timeSelecionado, anoSelecionado, localSelecionado);
  session.query(query);
  
  var response = [];
  var count = 0;
  while(true) {
    session.answer( function(res) {
      response[count] = pl.format_answer(res);
    });
  
    if(response[count] == 'false.' && count > 0) {
      response.pop();
      break;
    }
    count++;
  }
  processarResposta(response);
});

btnLimparRespostas.addEventListener('click', function(e){
  e.preventDefault();
  limparPainel();
  painelDeResposta.innerHTML = "Faça uma busca";
});

function criarQuery(perguntaSelecionada, timeSelecionado, anoSelecionado, localSelecionado) {
  var query = "timesQueFoiCampeao(A, Y, X).";

  if(perguntaSelecionada) {
    query = querys[perguntaSelecionada - 1];
    query = query.replace('TIME', timeSelecionado);
    query = query.replace('ANO', anoSelecionado);
    query = query.replace('ESTADIO', localSelecionado);
  }
  console.log(query);
  return query;
}

function processarResposta(response) {
  limparPainel();
  var resposta = [];
  for(linha of response) {
    if(linha === 'true ;') {
      painelDeResposta.innerHTML = "Sim";
      continue;
    }
    else if(linha === 'false.') {
      painelDeResposta.innerHTML = "Não";
      continue;
    }else{
      var linhaFormatada = limparResposta(linha);
      linhaFormatada = convertStringParaArray(linhaFormatada);
      resposta.push(linhaFormatada);
    }
  }
  if(resposta.length) {
    criarTabela(resposta);
  }
}

function criarTabela(arrayResposta) {
  console.log(arrayResposta[0]);
  
  var novaTabela = document.createElement('table');
  var cabecalho = document.createElement('thead');
  var corpo = document.createElement('tbody');
  var linhaCabecalho = document.createElement('tr');

  //criando cabeçalho da tabela
  for(i = 0; i < arrayResposta[0].length; i++) {
    var colunaCabecalho = document.createElement('th');
    colunaCabecalho.innerHTML = arrayResposta[0][i][0];
    linhaCabecalho.appendChild(colunaCabecalho);
  }
  //criando conteudo da tabela
  for(linha of arrayResposta) {
    var novaLinha = document.createElement('tr');
    for(coluna of linha) {
      var novaColuna = document.createElement('td');
      novaColuna.innerHTML = coluna[1];
      novaLinha.appendChild(novaColuna);
    }
    corpo.appendChild(novaLinha);
  }
  //Adicionando elementos criados na tabela
  cabecalho.appendChild(linhaCabecalho);
  novaTabela.appendChild(cabecalho);
  novaTabela.appendChild(corpo);
  novaTabela.setAttribute('class', 'table table-striped table-hover table-borderless');
  
  painelDeResposta.appendChild(novaTabela);
}

function convertStringParaArray(linhaFormatada) {
  var respostaFinal = [];

  linhaFormatada = linhaFormatada.split('|');
  for(i = 0; i < linhaFormatada.length; i++) {
    respostaFinal[i] = linhaFormatada[i].split('=');
  }
  return respostaFinal;
}

function limparResposta(resposta) {
  resposta = resposta.toString();
  console.log(resposta);
  resposta = resposta.replace('A', 'Time');
  resposta = resposta.replace('Y', 'Ano');
  resposta = resposta.replace('X', 'Estádio');
  resposta = resposta.replace(/,/g, '|');
  resposta = resposta.replace(/'/g, '');
  resposta = resposta.replace(/;/g, '');
  console.log(resposta);
  return resposta;
}

function limparPainel() {
  painelDeResposta.innerHTML = "";
}