document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.book .page');
    // ATUALIZADO: Seletores para as novas setas
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    const heartBackground = document.querySelector('.heart-background');
    const backgroundMusic = document.getElementById('background-music');

    let currentPageIndex = 0;
    const totalPages = pages.length;

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

        if (currentPageIndex === 0) {
            pages[0].style.zIndex = totalPages + 1;
            pages[0].classList.add('active');
            pages[0].classList.remove('turn-left');
            pages[0].style.transform = 'rotateY(0deg)';
        }

        if (currentPageIndex === totalPages - 1) {
            pages[totalPages - 1].style.zIndex = totalPages + 1;
            pages[totalPages - 1].classList.add('active');
            pages[totalPages - 1].classList.remove('turn-left');
            pages[totalPages - 1].style.transform = 'rotateY(0deg)';
        }

        // Desativa botões (setas) se estiver nas extremidades
        // Usar visibility para não remover do fluxo e manter a animação
        prevBtn.style.visibility = currentPageIndex === 0 ? 'hidden' : 'visible'; 
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
    setInterval(createHeart, 500);

    // --- Controle de Áudio ---
    backgroundMusic.volume = 0.4;
    document.body.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play().catch(e => console.log("Autoplay bloqueado:", e));
        }
    }, { once: true });
});