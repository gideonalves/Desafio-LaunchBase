/ * ------------------------------------------------ Desafio 1-4: Aplicação: Operações bancárias ----------------------------------------- ----- * /

const  user  =  {
    nome : "Mariana" ,
    transações : [ ] ,
    saldo : 0
}

// Adicionar transação
function  createTransaction ( transaction ) {
    usuário . transações . push ( transação )

    if  ( transação . tipo  ===  "crédito" ) {
        usuário . saldo  =  usuário . saldo  +  transação . valor
    }  else  {
        usuário . saldo  =  usuário . saldo  -  transação . valor
    }
}

// Relatórios
function  getHigherTransactionByTye ( type ) {
    deixe  higherTransaction
    deixe  highValue  =  0

    para ( permitir a  transação  do  usuário . transações ) {
        if ( transação . tipo  ==  tipo  &&  transação . valor  >  altoValor ) {
            highValue  =  transação . valor
            higherTransaction  =  transaction
        }
    }

    return  higherTransaction
}

function  getAvarageTransacrionValue ( ) {
    deixe  soma  =  0

    para ( permitir a  transação  do  usuário . transações ) {
        soma  + =  transação . valor
    }

    retorno  soma / usuário . transações . comprimento
}

function  getTransactionsCount ( )  {
    deixe  contar  =  {
        crédito : 0 ,
        débito : 0 ,
    }
    para  ( permitir a  transação  do  usuário . transações )  {
        if  ( transação . tipo  ===  'crédito' )
            contar . crédito ++
        outro
            contar . débito ++
    }

     contagem de retorno
}

createTransaction ( { tipo : "crédito" ,  valor : 50 } )
createTransaction ( { type : "credit" ,  value : 120 } )
createTransaction ( { tipo : "débito" ,  valor : 80 } )
createTransaction ( { type : " debit " ,  value : 30 } )

console . log ( usuário . saldo )

console . log ( getHigherTransactionByTye ( "credit" ) )
console . log ( getHigherTransactionByTye ( " debit " ) )

console . log ( getAvarageTransacrionValue ( ) )

console . log ( getTransactionsCount ( ) )