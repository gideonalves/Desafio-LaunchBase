const express = require('express')
const routes = express.Router() // 01 routes sera responsavel por todas as rotas

// Rotas
routes.get('/', function(req, res) {  // 02
    // nessa rota oque muda é o "redirect"
    return res.redirect("instructors") 
})

routes.get('/instructors', function(req, res) {  
    return res.render("instructors/teachers")
})

routes.get('/instructors/register', function(req, res) {  
    return res.render("instructors/register")
})

routes.post('/instructors', function(req, res) {  
    return res.send("recebido")
})

routes.get('/students', function(req, res) {  
    return res.send("students")
})

// aqui o module exporta as routes
module.exports = routes