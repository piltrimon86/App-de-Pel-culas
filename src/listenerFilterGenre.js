const container = document.getElementById('filtro-generos')
container.addEventListener('click', (e) => {
    e.preventDefault()

    if (e.target.closest('button')) {
        container.querySelector('.btn--active')?.classList.remove('btn--active')

        // Agregamos la clase active, para que el botón se marque al pulsar sobre él
        e.target.classList.add('btn--active')
    }
})
