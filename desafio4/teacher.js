const fs = require('fs') /* fs  significa fire sisten */
const data = require('./data.json') 


// show
exports.show = function(req, res) {
    // req.params
    const { id } = req.params
    const foundInstructor = data.instructors.find(function(instructor) { // o "find" so receber se for verdadeiro ou falso
           return instructor.id == id
    })
    if (!foundInstructor) return res.send("Professor não encontrado!")
    return res.render("instructors/show", { instructor: foundInstructor })
}


// create
exports.post = function(req, res) {  
    
    const keys = Object.keys(req.body) /* Object.keys ele cria um arrey de objeto pega todos os campo do formulario */
    /*+++++++++ esse comando ver se todos os campo esta prenxido se não estiver ele aparece uma mensagem "Please, fill all fields!" */
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
    /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */    
    
        }

        let { avatar_url, birth, name, select, gender, education_level } = req.body


        birth = Date.parse(birth)
        const created_at = Date.now()
        const id = Number(data.instructors.length +1) // esse comando cria um id no data.json


        data.instructors.push({
            id,
            avatar_url,
            name,
            birth,
            gender,
            education_level,
            created_at,
            select
        })




        // aqui ele pega todos os arquivos do formulario e guarda dentro do data.json
        /* escreva o arquivo            registrar           2 é o espaço ele indenta o data.json */   
        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
            if (err) return res.send("Write file error!") // se o arquivo foi escrito errado ele aparece essa mensagem de erro

            return res.redirect("/instructors")
        })

    // return res.send(req.body)
}