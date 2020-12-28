/*======================================================================

Crie um programa que armazena um array de usuários (objetos), cada usuário tem um nome e suas tecnologias 
(novo array), por exemplo:
======================================================================*/
const usuarios = [
  { nome: "Carlos", tecnologias:  ["HTML", "CSS"] },
  { nome: "Jasmine", tecnologias: ["JavaScript", "CSS"] },
  { nome: "Tuane", tecnologias:   ["HTML", "Node.js"] }
];

//Percorra a lista de usuários com uma estrutura de repetição imprimindo em tela as informações dos usuários:


//Carlos trabalha com HTML, CSS
//Jarmine trabalha com JavaScript, CSS
//Tuane trabalha com HTML, Node.js

// todo array [] recebe funções e propriedades nativas, eu posso usar a propriedade
// length para saber quantos elementos eu tenho no meu array
// [].length


for ( usuario of usuarios){
        console.log(`${usuario.nome} trabalha com ${usuario.tecnologias.join(", ")}`)
}
