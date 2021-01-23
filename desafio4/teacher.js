const fs = require('fs') /* fs  significa fire sisten */
const data = require('./data.json')
const { age, graduation, date } = require('./utils')
const Intl = require('intl')

exports.index = function(req, res) {  // aqui pega a rota da pagina index (01)
    return res.render("teachers/index", { teacher: data.teacher }) // { teacher: data } esse comando manda todas as informaçoes da pagina data.json para o index.njk
}




// ---------------------- SOHW -------------------------------------
exports.show = function (req, res) {
    // req.params

    const { id } = req.params
    const foundTeachers = data.teacher.find(function (teacher) { // o "find" so receber se for verdadeiro ou falso
        return teacher.id == id
    })    
    if (!foundTeachers) return res.send("Professor não encontrado!")
    const teacher = {
        ...foundTeachers,
        age: age(foundTeachers.birth),    
        education_level:graduation(foundTeachers.education_level),                      
        subjects_taught: foundTeachers.subjects_taught.split(","), //split em portugues "dividido"  
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeachers.created_at),
    }
    return res.render("teachers/show", { teacher })
    //teachers é a pasta ta pegando o arquivo show             
}

// ---------------------- CREATE -----------------------------------
exports.post = function (req, res) {

    const keys = Object.keys(req.body) /* Object.keys ele cria um arrey de objeto pega todos os campo do formulario */
    /*+++++++++ esse comando ver se todos os campo esta prenxido se não estiver ele aparece uma mensagem "Please, fill all fields!" */
    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Please, fill all fields!')
        }
        /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

    }

    let { avatar_url, name, birth, subjects_taught, class_type, education_level } = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.teacher.length + 1) // esse comando cria um id no data.json

    data.teacher.push({
        id,
        avatar_url,
        name,
        birth,
        class_type,
        education_level,
        created_at,
        subjects_taught
    })


    // aqui ele pega todos os arquivos do formulario e guarda dentro do data.json
    /* escreva o arquivo            registrar           2 é o espaço ele indenta o data.json */
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write file error!") // se o arquivo foi escrito errado ele aparece essa mensagem de erro

        return res.redirect("/teachers")
    })

    // return res.send(req.body)
}

// ---------------------- EDIT -------------------------------------
exports.edit = function(req, res) {   
    // req.params

    const { id } = req.params
    const foundTeachers = data.teacher.find(function (teacher) { // o "find" so receber se for verdadeiro ou falso
        return teacher.id == id
    })    
    if (!foundTeachers) return res.send("Professor não encontrado!")
   
    const teacher = {
        ...foundTeachers,
        birth: date(foundTeachers.birth)
    }

    return res.render('teachers/edit', { teacher })
}

// ---------------------- put  -------------------------------------
exports.put = function (req, res) {
    const { id } = req.body
    let index = 0

    const foundTeachers = data.teacher.find(function (teacher, foudIndex) { // o "find" so receber se for verdadeiro ou falso
        if( id == teacher.id) {
            index =  foudIndex
            return true
        }
    })    
    if (!foundTeachers) return res.send("Professor não encontrado!")

    const teacher = {
        ...foundTeachers,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.teacher[index] = teacher

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write erro!")

        return res.redirect(`/teachers/${id}`)
    })
}

// ---------------------- Deletar  ---------------------------------
exports.delete = function(req, res ) {
    const { id } = req.body

    const filteredTeacher = data.teacher.filter(function(teacher) {
        return teacher.id != id
    })
    data.teacher = filteredTeacher

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error!") 

        return res.redirect("/teachers")
    })
}
