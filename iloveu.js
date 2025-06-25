document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.book .page');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    const heartBackground = document.querySelector('.heart-background');
    const backgroundMusic = document.getElementById('background-music');

    // Mantenha o seletor para o botão de aventura
    const nextAdventureButton = document.getElementById('nextAdventureButton');

    let currentPageIndex = 0;
    const totalPages = pages.length; // Agora totalPages será 8 (se antes era 7)

    // --- Funções para o Livrinho ---

    function updateBook() {
        pages.forEach((page, index) => {
            page.classList.remove('active', 'turn-left', 'turn-right');
            
            if (index !== currentPageIndex) {
                page.style.transform = '';
                page.style.zIndex = '';
            }

            if (index === currentPageIndex) {
                page.classList.add('active');
                page.style.zIndex = totalPages + 1;
            } else if (index < currentPageIndex) {
                page.classList.add('turn-left');
                page.style.zIndex = totalPages - index;
            } else {
                page.style.zIndex = totalPages - index;
            }
        });

        // Garantir o estado correto da primeira página quando está ativa
        if (currentPageIndex === 0) {
            pages[0].style.zIndex = totalPages + 1;
            pages[0].classList.add('active');
            pages[0].classList.remove('turn-left');
            pages[0].style.transform = 'rotateY(0deg)';
        }

        // A lógica para a ÚLTIMA PÁGINA (a nova página com o botão)
        // Não precisa mais de um if especial para mostrar o botão aqui,
        // pois ele já está dentro da página e será visível quando a página for ativa.
        if (currentPageIndex === totalPages - 1) {
             pages[totalPages - 1].style.zIndex = totalPages + 1;
             pages[totalPages - 1].classList.add('active');
             pages[totalPages - 1].classList.remove('turn-left');
             pages[totalPages - 1].style.transform = 'rotateY(0deg)';
        }

        // Desativa botões (setas) se estiver nas extremidades
        prevBtn.style.visibility = currentPageIndex === 0 ? 'hidden' : 'visible'; 
        // O botão 'nextBtn' agora deve ficar "hidden" apenas na *nova* última página
        nextBtn.style.visibility = currentPageIndex === totalPages - 1 ? 'hidden' : 'visible';
    }

    function turnPage(direction) {
        if (direction === 'next' && currentPageIndex < totalPages - 1) {
            const pageToTurn = pages[currentPageIndex];
            pageToTurn.classList.add('turn-left');
            pageToTurn.style.zIndex = totalPages + 10;

            setTimeout(() => {
                currentPageIndex++;
                updateBook();
            }, 800);
        } else if (direction === 'prev' && currentPageIndex > 0) {
            const pageToReturn = pages[currentPageIndex - 1];
            const currentPage = pages[currentPageIndex];

            currentPage.style.zIndex = totalPages - currentPageIndex;

            pageToReturn.classList.remove('turn-left');
            pageToReturn.classList.add('turn-right');
            pageToReturn.style.zIndex = totalPages + 10;

            setTimeout(() => {
                currentPageIndex--;
                updateBook();
            }, 800);
        }
    }

    // Event listeners para as setas
    prevBtn.addEventListener('click', () => turnPage('prev'));
    nextBtn.addEventListener('click', () => turnPage('next'));

    // NOVO: Event listener para o botão de aventura (Continua o mesmo!)
    // O botão só será clicável quando a página for ativa e ele estiver visível no HTML/CSS
    nextAdventureButton.addEventListener('click', () => {
        window.location.href = 'flor_especial.html'; // Redireciona para a nova página
    });

    // Inicializa o livro na primeira página
    updateBook();


    // --- Funções para os Corações Animados ---
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        const size = Math.random() * 20 + 10;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 5 + 5}s`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heartBackground.appendChild(heart);

        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }
    for (let i = 0; i < 10; i++) {
        setTimeout(createHeart, i * 500);
    }
    setInterval(createHeart, 1000);


    // --- Controle de Áudio ---
    backgroundMusic.volume = 0.4;
    document.body.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play().catch(e => console.log("Autoplay bloqueado:", e));
        }
    }, { once: true });
});