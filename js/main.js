let inputNovaTarefa = document.querySelector('#inputNovaTarefa');
let btnAddTarefa = document.querySelector('#btnAddTarefa');
let listaTarefas = document.querySelector('#listaTarefas');
let janelaEdicaoFundo = document.querySelector('#janelaEdicaoFundo');
let janelaEdicaoBtnFechar = document.querySelector('#janelaEdicaoBtnFechar');
let btnAtualizarTarefa = document.querySelector('#btnAtualizarTarefa');
let idTarefaEdicao = document.querySelector('#idTarefaEdicao');
let inputTarefaNomeEdicao = document.querySelector('#inputTarefaNomeEdicao');


inputNovaTarefa.addEventListener('keypress', (e) =>{
    if(e.keyCode == 13){
        let tarefa = {
            nome: inputNovaTarefa.value,
            id: gerarId(),
        }
        addTarefa(tarefa);
    }
});

janelaEdicaoBtnFechar.addEventListener('click', (e) => {
    alternarJanelaEdicao();
});

btnAddTarefa.addEventListener('click', (e) =>{
        let tarefa = {
            nome: inputNovaTarefa.value,
            id: gerarId(),
        }
        addTarefa(tarefa);
});

btnSublinhar.addEventListener("click", (e) => {
    sublinhar();
});  

btnAtualizarTarefa.addEventListener('click', (e)=>{
    e.preventDefault();

    let idTarefa = idTarefaEdicao.innerHTML.replace('#', '');

    let tarefa = {
        nome: inputTarefaNomeEdicao.value,
        id: idTarefa
    }

    let tarefaAtual = document.getElementById('' +idTarefa+'');

    if(tarefaAtual){
        let li = criarTagLi(tarefa);
        listaTarefas.replaceChild(li, tarefaAtual);
        alternarJanelaEdicao();
    }else{
        alert('Elemento HTML não encontrado.');
    }

    /*if (!tarefaAtual.classList.contains("sublinhado")) {
        tarefaAtual.classList.add("sublinhado");
    } else {
        tarefaAtual.classList.remove("sublinhado");
    } */

});

function gerarId(){
    return Math.floor(Math.random() * 3000);
}

function addTarefa(tarefa){
    let li = criarTagLi(tarefa);
    listaTarefas.appendChild(li);
    inputNovaTarefa.value = '';
}

function criarTagLi(tarefa){
    let li = document.createElement('li');
    li.id = tarefa.id;

    let span = document.createElement('span');
    span.classList.add('textoTarefa');
    span.innerHTML = tarefa.nome;

    let div = document.createElement('div');

    let btnEditar = document.createElement('button');
    btnEditar.classList.add('btnAcao');
    btnEditar.innerHTML = '<i class="fa fa-pencil">w</i>';
    btnEditar.setAttribute('onclick', 'editar('+tarefa.id+')');

    let btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btnAcao');
    btnExcluir.innerHTML = '<i class="fa fa-trash">d</i>';
    btnExcluir.setAttribute('onclick', 'excluir('+tarefa.id+')');

    let btnSublinhar = document.createElement('button');
    btnSublinhar.classList.add('btnAcao');
    btnSublinhar.innerHTML = '<i class="fa fa-trash">s</i>';
    btnSublinhar.setAttribute('onclick', 'sublinhar('+tarefa.id+')');
    

    div.appendChild(btnEditar);
    div.appendChild(btnExcluir);
    div.appendChild(btnSublinhar);

    li.appendChild(span);
    li.appendChild(div);

    return li;
}

function editar(idTarefa){
    let li = document.getElementById(''+ idTarefa + '');
    if(li){
        idTarefaEdicao.innerHTML = '#' + idTarefa;
        inputTarefaNomeEdicao.value = li.innerText;
        alternarJanelaEdicao();
    }else{
        alert('Elemento HTML não encontrado.');
    }
}

function excluir(idTarefa){
    let confirmacao = window.confirm('Tem certeza que deseja excluir?');
    if(confirmacao){
        let li = document.getElementById('' + idTarefa + '');
        if(li){
            listaTarefas.removeChild(li);
        }
    }else{
        alert('Elemento HTML não encontrado.');
    }
}

function sublinhar(idTarefa){
    let subs = document.getElementById(idTarefa);
        if (!subs.classList.contains('sublinhado')) {
            subs.classList.add('sublinhado');
        } else {
            subs.classList.remove('sublinhado');
        }
}

/*itemTarefa.addEventListener("click", () => {
    if (!itemTarefa.classList.contains("completa")) {
      itemTarefa.classList.add("completa");
    } else {
      itemTarefa.classList.remove("completa");
    }
  });*/

function alternarJanelaEdicao(){
    janelaEdicao.classList.toggle('abrir');
    janelaEdicaoFundo.classList.toggle('abrir');
}