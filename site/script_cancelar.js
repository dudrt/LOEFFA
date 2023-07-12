function Cancelar(){
    window.location.replace('index.html')
  }

var nome,id
function CancelarReserva(){
    nome=document.getElementById("nome").value
    id = document.getElementById("id").value

    if(nome=="" || id==""){
        document.getElementById("faltou").innerHTML="Verifique todos os campos!"
        return
    }

    FazerRequests()
}




function RequestPontuacao() {
    return fetch('http://127.0.0.1:8000/pontuacao/')
      .then(response => response.json());
  }
  
  function RequestCadastro() {
    return fetch('http://127.0.0.1:8000/cadastro/') 
      .then(response => response.json());
  }
  
 function FazerRequests(){
    Promise.all([RequestCadastro(), RequestPontuacao()])
    .then(respostas => {
      const resposta1 = respostas[0]; 
      const resposta2 = respostas[1]; 
      
        console.log(resposta1)
        console.log(resposta2)


  
      ProcessarRespostas(resposta1, resposta2);   
  
    })
    .catch(error => {
      console.log(error)
    
    });
 }
  
  
    function ProcessarRespostas(cadastro, pontuacoes) {
        
        var existe = false
        var posicao_pontuacao
        for(var i =0;i<cadastro.length;i++){
            if(id==cadastro[i].id && nome==cadastro[i].nome_pessoa){
                for(var j =0;j<pontuacoes.length;j++){
                    if(cadastro[i].nome_pessoa == pontuacoes[j].nome_pessoa){
                        existe=true
                        posicao_pontuacao = j
                    }
                }

                if(existe){
                    console.log(pontuacoes[posicao_pontuacao].id,pontuacoes[posicao_pontuacao].nome_pessoa,parseInt(pontuacoes[posicao_pontuacao].pontuacao)-10)
                    ModificarPontuacao(pontuacoes[posicao_pontuacao].id,pontuacoes[posicao_pontuacao].nome_pessoa,pontuacoes[posicao_pontuacao].pontuacao)
                    ExcluirCadastro(cadastro[i].id)
                }else{
                    AdicionarPontuacao(cadastro[i])
                    ExcluirCadastro(cadastro[i].id)
                }

                alert("Reserva cancelada com sucesso!\nVocê será reedirecionado para a página anterior!")
                Cancelar()
                return
                
            }
        }
    
        alert("Nenhum resultado coincide!")
        
      
    }
function AdicionarPontuacao(cadastro){
    const url = 'http://127.0.0.1:8000/pontuacao/'; // substitua pelo URL da sua API

    const data = {
        nome_pessoa: cadastro.nome_pessoa,
        pontuacao:-10

    };

    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
};

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
        
        Cancelar()
    })
        .catch(error => {
        console.error('Ocorreu um erro:', error);
    });
}


function ExcluirCadastro(id){
    const url = 'http://127.0.0.1:8000/cadastrodel/'+id;

    // Dados que serão enviados no corpo da solicitação PUT
    const dados = {
      
    };
    
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erro na solicitação PUT');
        }
      })
      .then(data => {
        console.log('Resposta:', data);
      })
      .catch(error => {
        console.error('Erro:', error);
      });
}

function ModificarPontuacao(id,nome,pontuacao){
    const url = 'http://127.0.0.1:8000/pontuacaomod/'+id;

// Dados que serão enviados no corpo da solicitação PUT
const dados = {
  id: id,
  nome_pessoa: nome,
  pontuacao: pontuacao
};

fetch(url, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(dados)
})
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Erro na solicitação PUT');
    }
  })
  .then(data => {
    console.log('Resposta:', data);
  })
  .catch(error => {
    console.error('Erro:', error);
  });
}