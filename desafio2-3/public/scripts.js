const cards = document.querySelectorAll('.card') /* aqui ele seleciona um grupo no caso sera o a Tag card */


for (let card of cards) {
    card.addEventListener("click", function () {
      const courseId = card.getAttribute("id")
      window.location.href = `/courses/${courseId}`

    })

}


