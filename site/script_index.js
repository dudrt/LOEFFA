



function FazerReserva(){
  window.location.replace('reservar.html')
}
function CancelarReserva(){
  window.location.replace('cancelar.html')
}





function RequestEstacoes() {
  return fetch('http://127.0.0.1:8000/estacoes/')
    .then(response => response.json());
}

function RequestCadastro() {
  return fetch('http://127.0.0.1:8000/cadastro/') 
    .then(response => response.json());
}

Promise.all([RequestCadastro(), RequestEstacoes()])
  .then(respostas => {
    const resposta1 = respostas[0]; 
    const resposta2 = respostas[1]; 
    

    ProcessarRespostas(resposta1, resposta2);   

  })
  .catch(error => {
    console.log(error)
    Erro()
  });

  function Erro(){
    document.getElementById("estacoes").innerHTML="Ocorreu um erro, reporte ao suporte"
    document.getElementById("reservas").innerHTML="Ocorreu um erro, reporte ao suporte"
    
  }


  function ProcessarRespostas(cadastro, estacoes) {

    var tabela="<br><center><table><thead><tr><th>Pessoa</th><th>Data</th><th>Período</th><th>Reservado</th></tr></thead><tbody>"
    console.log(cadastro)
    console.log(estacoes)
    
    for(var i=0;i<cadastro.length;i++){
      tabela+=`<tr><td>${cadastro[i].nome_pessoa}</td><td>${cadastro[i].data}</td><td>${cadastro[i].periodo}</td>`
      for(var j =0;j<estacoes.length;j++){
        if(parseInt(estacoes[j].id)==parseInt(cadastro[i].estacao)){
          
          tabela+=`<td>${estacoes[j].nome}</td></tr>`
        }
      }
    }
    document.getElementById("reservas").innerHTML+=tabela+"</tbody></table></center>"

  }