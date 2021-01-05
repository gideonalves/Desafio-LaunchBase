const modalOverlay = document.querySelector('.modal-overlay') //document.querySelector siguinifica que ta pegando o .modal-Overlay do CSS
const cards = document.querySelectorAll('.card') //document.querySelectorAll aqui ele vai selecionar todos os 6 card

for (let card of cards){
    card.addEventListener("click", function(){
        const videoId = card.getAttribute("id")
        window.location.href = `/video?id=${videoId}`
    })
}


