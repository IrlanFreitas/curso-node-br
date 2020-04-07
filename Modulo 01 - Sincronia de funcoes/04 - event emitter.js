/* 
* EVENT EMITTER
* Usado para ações contínuas
* Node.js usa para quase tudo em seu ecossitema
* Bastante usado também nos browsers (onClick)
* Trabalha sobre o Design Patter Observer/PubSub
*/

const EventEmitter = require('events')

class MeuEmissor extends EventEmitter {


}

const meuEmissor = new MeuEmissor()
const nomeEvento = 'usuario:click'

meuEmissor.on(nomeEvento, function(click) {
    console.log('um usuario clicou', click);  
})

// meuEmissor.emit(nomeEvento, 'na barra de rolagem')
// meuEmissor.emit(nomeEvento, 'no ok')

// let count = 0
// setInterval(() => {
//     meuEmissor.emit(nomeEvento, 'no ok -' + (count++))
// }, 1000);

//* Usando o process, que é uma variável interna do node
//* openStdin() - Qualquer evento ou texto digitado na pasta será escutado
//! não é para ser usado como Promise, pois ela é executada uma só vez
const stdin = process.openStdin()
stdin.addListener('data', function (value) {
    console.log(`Você digitou: ${value.toString().trim()}`);
    
})