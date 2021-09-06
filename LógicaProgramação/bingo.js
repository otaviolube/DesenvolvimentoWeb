function gerarNumeroAleatorio(inicioIntervalo, fimIntervalo){
  return Math.floor((fimIntervalo - inicioIntervalo)*Math.random()) + inicioIntervalo;
}

//quantidadeNumeros ====> PARAMETRO

function gerarCartela(quantidadeNumeros){
  let cartela = [];
  for(i = 0; i < quantidadeNumeros; i++){
    let numeroCartelaExiste = true;
    while(numeroCartelaExiste == true){
      let numeroAleatorio = gerarNumeroAleatorio(1,75);
      if(cartela.includes(numeroAleatorio) == true){
        numeroCartelaExiste = true;
      }else{
        numeroCartelaExiste = false;
        cartela.push(numeroAleatorio);
      }
    }
  }
  return cartela;
}

function verificaCartela(cartela, numerosSorteados, quantidadeNumeros){
  if(numerosSorteados.length < quantidadeNumeros){
    return false;
  }
  let numerosExistem = true; 
  cartela.forEach(function(numero){
    if(numerosSorteados.includes(numero) == true){
      numerosExistem = true;
    }else{
      numerosExistem = false;
      return false;
    }
  });
  if(numerosExistem == true){
    return true;
  }
}

function jogarBingo(vetorJogadores){
  let numerosSorteados = [];
  let intervalo = setInterval(function(){
    let numeroExiste = true;
    while(numeroExiste == true){
      let numeroAleatorio = gerarNumeroAleatorio(1,75);
      if(numerosSorteados.includes(numeroAleatorio) == true){
        numeroExiste = true;
      }else{
        numeroExiste = false;
        numerosSorteados.push(numeroAleatorio);
        console.log("Números sorteados:", numerosSorteados);
        vetorJogadores.forEach(function(jogador){
          if(verificaCartela(jogador.cartela, numerosSorteados, 25) == true){
            console.log(`${jogador.nome} ganhou o BINGO! Parabénnnsssssss!!!!!!`);
            clearInterval(intervalo);
          }
        });
      }
    }
    if(numerosSorteados.length >= 75){
      console.log("Sorteio Finalizado!");
      clearInterval(intervalo);
    }
  }, 1000);
}

function perguntarJogador(vetorJogadores){
  let readline = require("readline");
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("Qual o nome do jogador? Digite 'jogar' para iniciar o jogo.\n", function(nomeJogador){
    if(nomeJogador == "jogar"){
      console.log("Jogadores inscritos:", vetorJogadores);
      rl.close();
      jogarBingo(vetorJogadores);
    }else{
      let jogador = {
        nome: nomeJogador,
        cartela: gerarCartela(25)
      }
      rl.close();
      console.log("Jogador criado com sucesso. Seguem os seus dados:", jogador);
      vetorJogadores.push(jogador);
      perguntarJogador(vetorJogadores);
    }
  })
}
let vetorJogadores = [];
perguntarJogador(vetorJogadores);