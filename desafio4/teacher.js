const fs = require('fs') /* fs  significa fire sisten */
const data = require('./data.json') 


// show
exports.show = function(req, res) {
    // req.params
   const { id } = req.params
   const foundTeachers = data.teacher.find(function(teacher) { // o "find" so receber se for verdadeiro ou falso
          return teacher.id == id
    })
    if (!foundTeachers) return res.send("Professor não encontrado!")

    const thacher = {
        ...foundTeachers,
        age: "",
        gender: "",                                   //split em portugues "dividido"  
        subjects_taught: foundTeachers.subjects_taught.split(","),
        created_at: "",
    }   
            return res.render("teachers/show", { thacher })
                    //teachers é a pasta ta pegando o arquivo show             
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

        let { avatar_url, name, birth,  select, gender, education_level } = req.body


           birth = Date.parse(birth)
           const created_at = Date.now()
           const id = Number(data.teacher.length + 1) // esse comando cria um id no data.json


        data.teacher.push({
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

            return res.redirect("/teachers")
        })

    // return res.send(req.body)
}