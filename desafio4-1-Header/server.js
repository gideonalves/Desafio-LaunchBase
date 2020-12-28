/* ================ Esse bloco chama as outros aquivos ===================== */
                                                                            //
const express = require('express')                                          //
const nunjucks = require('nunjucks') //chama o nunjucks                     //
const routes = require('./routes') // 03 chama o nunjucks                   //
                                                                            //
const server = express()                                                    //
                                                                             //
/* ========================================================================== */

/* todos os arquvos use ou os miduer */
server.use(express.static('public'))
server.use(routes) // 04



server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

// aqui configura a porta http://localhost:5000/
server.listen(5000, function() {
    console.log("server is running")
})