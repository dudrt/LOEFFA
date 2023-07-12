function Cancelar(){
    window.location.replace('index.html')
  }

RequestEstacoes()

function RequestEstacoes() {
    return new Promise((resolve, reject) => {
      fetch('http://127.0.0.1:8000/estacoes/')
        .then(response => response.json())
        .then(data => {
          resolve(data); 
        })
        .catch(error => {
            
          reject(error); 
        });
    });
  }
  
  RequestEstacoes()
    .then(resposta => {
      ProcessarResposta(resposta); 
    })
    .catch(error => {
        ProcessarResposta("erro");
    });


    
function ProcessarResposta(resposta) {
    var texto ='<label for="estacoes">Estações disponíveis:</label><br><select id="estacoes" name="estacoes" size="1" style="font-family: '+'gotham'+'">'
    if(resposta=="erro"){
        alert("O servidor está apresentando problemas, avise a equipe de suporte!")
        Cancelar()
    }
    for(var i=0;i<resposta.length;i++){
        texto+=`<option value="${resposta[i].id}">${resposta[i].nome}</option>`
    }
    document.getElementById("estacoes_mostrar").innerHTML=texto+"</select>"
  }



function CadastrarReserva(){
    var nome =document.getElementById("nome").value
    var date =document.getElementById("data").value
    try{
      var periodo =document.querySelector('input[name="periodo"]:checked').value;
    }catch{}
    var estacao = document.getElementById("estacoes").value

    if(nome=="" || date=="" || periodo==undefined){
      document.getElementById("faltou").innerHTML="Verifique todos os campos!"
      return
    }


    const url = 'http://127.0.0.1:8000/cadastro/'; 

    const data = {
        nome_pessoa: nome,
        data: date,
        periodo: periodo,
        estacao: estacao

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
        
        alert("Reserva feita com sucesso!\nVocê será redirecionado para a página anterior.\nAnote o número '"+data.id+"' para caso você queira cancelar a reserva!")
        Cancelar()
    })
        .catch(error => {
        console.error('Ocorreu um erro:', error);
    });
}
