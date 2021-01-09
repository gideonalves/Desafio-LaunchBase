const express = require('express')
const routes = express.Router() // 01 routes sera responsavel por todas as rotas
const teacher = require('./teacher')

// Rotas
routes.get('/', function(req, res) {  // 02
    // nessa rota oque muda é o "redirect"
    return res.redirect("teachers") 
})

// rota da index
routes.get('/teachers', function(req, res) {  
    return res.render("teachers/index")
})

// rota pagina create
routes.get('/teachers/create', function(req, res) {  
    return res.render("teachers/create")
})

// rota id
routes.get('/teachers/:id', teacher.show) 

// rota pagina formulario POST
routes.post("/teachers", teacher.post)

// roda pagina students
routes.get('/students', function(req, res) {  
    return res.send("students")
})

// aqui o module exporta as routes
module.exports = routes