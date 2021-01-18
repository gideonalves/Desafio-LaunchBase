module.exports = {
    age: function (timestamp) {

        const today = new Date() // data de hoje
        const birthData = new Date(timestamp) // nascimento
    
        // 2021 - 1981 = 40 ano
        let age = today.getFullYear() - birthData.getFullYear()      
        const month = today.getMonth() - birthData.getMonth()
    
        if (month < 0 || month == 0 && today.getDate() <= birthData.getDate()) {

            age = age -1
        }
        return age
    },

    graduation: function (graduation) {
           if(graduation == "EM") {
               return "Ensino Médio Completo"
           }if(graduation == "ES") {
               return "Ensino Superior Completo"
           }if(graduation == "M") {
               return "Mestrado"
           }if(graduation == "D") {
               return "Doutorado"
           }
    },
    date: function(timestamp) {
        const date = new Date(timestamp)

        //yyyy
        const year = date.getUTCFullYear()

        //mm
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)

        //dd
        const day = `0${date.getUTCDate()}`.slice(-2) //slice pega menos 2 zeros

        //return yyyy-mm-dd
        return `${year}-${month}-${day}`
    }

}

// switch (graduation) {
//     case ("EM"): return "Ensino médio Completo";
//     case ("ES"): return "Ensino Superior Completo";
//     case ("M"): return "Mestrado";
//     case ("D"): return "Doutorado"