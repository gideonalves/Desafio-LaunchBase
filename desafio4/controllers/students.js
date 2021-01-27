const fs = require('fs') /* fs  significa fire sisten */
const data = require('../data.json')
const { age, graduation, date } = require('../utils')
const Intl = require('intl')

exports.index = function(req, res) {  // aqui pega a rota da pagina index (01)
    return res.render("students/index", { student: data.student }) // { student: data } esse comando manda todas as informaçoes da pagina data.json para o index.njk
}

// ---------------------- SOHW -------------------------------------
exports.show = function (req, res) {
    // req.params

    const { id } = req.params
    const foundStudents = data.student.find(function (student) { // o "find" so receber se for verdadeiro ou falso
        return student.id == id
    })    
    if (!foundStudents) return res.send("Professor não encontrado!")
    const student = {
        ...foundStudents,
        age: age(foundStudents.birth),    
        education_level:graduation(foundStudents.education_level),                      
        subjects_taught: foundStudents.subjects_taught.split(","), //split em portugues "dividido"  
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundStudents.created_at),
    }
    return res.render("students/show", { student })
    //students é a pasta ta pegando o arquivo show             
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
    const id = Number(data.student.length + 1) // esse comando cria um id no data.json

    data.student.push({
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

        return res.redirect("/students")
    })

    // return res.send(req.body)
}

exports.create = function(req, res) {  
    return res.render("students/create")
}

// ----------------------EDIT -------------------------------------
exports.edit = function(req, res) {   
    // req.params

    const { id } = req.params
    const foundStudents = data.student.find(function (student) { // o "find" so receber se for verdadeiro ou falso
        return student.id == id
    })    
    if (!foundStudents) return res.send("Professor não encontrado!")
   
    const student = {
        ...foundStudents,
        birth: date(foundStudents.birth)
    }

    return res.render('students/edit', { student })
}

// ----------------------put  -------------------------------------
exports.put = function (req, res) {
    const { id } = req.body
    let index = 0

    const foundStudents = data.student.find(function (student, foudIndex) { // o "find" so receber se for verdadeiro ou falso
        if( id == student.id) {
            index =  foudIndex
            return true
        }
    })    
    if (!foundStudents) return res.send("Professor não encontrado!")

    const student = {
        ...foundStudents,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.student[index] = student

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write erro!")

        return res.redirect(`/students/${id}`)
    })
}

// ----------------------- Deletar  ---------------------------------
exports.delete = function(req, res ) {
    const { id } = req.body

    const filteredTeacher = data.student.filter(function(student) {
        return student.id != id
    })
    data.student = filteredTeacher

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error!") 

        return res.redirect("/students")
    })
}
