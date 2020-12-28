const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const courses = require("./data") // a variavel courses foi dada por caursa das pagina dos cursos e chama a ./data

server.use(express.static('public')) //configura tudo que ta dentro da pasta public

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server
})

// criar rotas
server.get("/", function(req, res) {
    const about = {
        avatar_url: "imagem/logo.png",
        escola: "Rocketseat",
        description: "As mesmas Tecnologias utilizadas por empresas como:",        
        technology: "Nubank, Netflix, Uber, Instagram", 
        linguagens: [
                        { curso: "HTML"},
                        { curso: "CSS"},
                        { curso: "Javascript"},
                    ],                 
            links:  [
                        { name: "Github", url: "https://github.com/Rocketseat" },
                        { name: "Instagram", url: "https://www.instagram.com/rocketseat_oficial" },
                        { name: "Facebook", url: "https://pt-br.facebook.com/rocketseat/" }
                    ]
    }

    return res.render("about", { about })
})


server.get("/courses", function(req, res) {
    return res.render("courses", { items: courses })  // items é um objeto e dentro dele tem o course
})

/* ROTA DOS CURSOS */

server.get("/courses/:id", function(req, res) {
    const id = req.params.id;
    const course = courses.find(function(course){
        return course.id == id
    })

    if (!course) return res.render("not-found");

    return res.render("course", {course})
})

server.use(function (req, res) {
    res.status(404).render("not-found");
});





server.listen(5000, function(){ //porta do servidor 5000
    console.log("server is running")
})