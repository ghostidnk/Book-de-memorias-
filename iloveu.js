document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.book .page');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const heartBackground = document.querySelector('.heart-background');
    const backgroundMusic = document.getElementById('background-music');

    let currentPageIndex = 0;
    const totalPages = pages.length; // Isso será 7 no seu caso (0 a 6)

    // --- Funções para o Livrinho ---

    function updateBook() {
        pages.forEach((page, index) => {
            // Remove todas as classes de estado e transição para um estado limpo
            page.classList.remove('active', 'turn-left', 'turn-right');
            
            // IMPORTANTE: Reseta transform e z-index APENAS para páginas NÃO ATIVAS.
            // A página ATIVA terá seu transform e z-index definidos especificamente abaixo.
            if (index !== currentPageIndex) {
                page.style.transform = ''; // Limpa qualquer transformação direta via JS
                page.style.zIndex = '';    // Limpa qualquer z-index direto via JS
            }

            if (index === currentPageIndex) {
                page.classList.add('active');
                page.style.zIndex = totalPages + 1; // Página ativa sempre no topo
                // O transform para a página ativa é definido mais especificamente abaixo
                // (especialmente para a capa traseira) ou pelo CSS base.
            } else if (index < currentPageIndex) {
                // Páginas anteriores que já foram passadas
                page.classList.add('turn-left'); // Mantém viradas para trás
                page.style.zIndex = totalPages - index; // Z-index menor para "por baixo"
            } else {
                // Páginas futuras que ainda não foram acessadas
                page.style.zIndex = totalPages - index; // Z-index maior que as anteriores, mas menor que a ativa
                // Elas permanecem com rotateY(0deg) do CSS base
            }
        });

        // Lógica específica para a capa frontal (página 0)
        // Quando estamos na primeira página, a capa frontal deve estar visível e não virada
        if (currentPageIndex === 0) {
            pages[0].style.zIndex = totalPages + 1;
            pages[0].classList.add('active');
            pages[0].classList.remove('turn-left'); // Garante que não está virada
            pages[0].style.transform = 'rotateY(0deg)'; // Garante que a capa frontal esteja visada para frente
        }

        // Lógica específica para a capa traseira (última página)
        // Quando estamos na última página, a capa traseira deve estar visível e não virada
        if (currentPageIndex === totalPages - 1) { // totalPages - 1 é o índice da última página
            pages[totalPages - 1].style.zIndex = totalPages + 1; // Garante que a capa traseira esteja no topo
            pages[totalPages - 1].classList.add('active'); // Garante que a capa traseira esteja ativa
            pages[totalPages - 1].classList.remove('turn-left'); // Remove qualquer classe de virar
            pages[totalPages - 1].style.transform = 'rotateY(0deg)'; // CRÍTICO: FORÇA A CAPA TRASEIRA A APARECER PARA FRENTE
        }


        // Desativa botões se estiver nas extremidades
        prevBtn.disabled = currentPageIndex === 0;
        nextBtn.disabled = currentPageIndex === totalPages - 1;
    }

    // Função de Animação de Virar Página
    function turnPage(direction) {
        if (direction === 'next' && currentPageIndex < totalPages - 1) {
            const pageToTurn = pages[currentPageIndex];

            // 1. Prepara a página atual para virar
            pageToTurn.classList.add('turn-left');
            pageToTurn.style.zIndex = totalPages + 10; // Alto z-index para a página virando

            // 2. Atraso para a animação virar, então atualiza o índice e o livro
            setTimeout(() => {
                currentPageIndex++;
                updateBook(); // Chama updateBook para configurar a nova página ativa
            }, 800); // O tempo da transição no CSS é 0.8s, então esperamos isso
                      // (800ms = 0.8s)

        } else if (direction === 'prev' && currentPageIndex > 0) {
            const pageToReturn = pages[currentPageIndex - 1]; // A página que vai "desvirar"
            const currentPage = pages[currentPageIndex]; // A página que está ativa e irá para trás

            // 1. Ajusta o z-index da página atual temporariamente para ela ir para trás
            // Isso evita que ela fique por cima da página que está "desvirando"
            currentPage.style.zIndex = totalPages - currentPageIndex;

            // 2. Prepara a página anterior para "desvirar"
            pageToReturn.classList.remove('turn-left'); // Remove a classe que a mantinha virada
            pageToReturn.classList.add('turn-right');   // Adiciona classe para a animação de retorno
            pageToReturn.style.zIndex = totalPages + 10; // Z-index alto para a página desvirando

            // 3. Atraso para a animação de retorno, então atualiza o índice e o livro
            setTimeout(() => {
                currentPageIndex--;
                updateBook(); // Chama updateBook para configurar a nova página ativa
                // A classe 'turn-right' será removida pela função updateBook
            }, 800); // Tempo da transição no CSS (0.8s)
        }
    }

    // Event listeners para os botões de navegação
    prevBtn.addEventListener('click', () => turnPage('prev'));
    nextBtn.addEventListener('click', () => turnPage('next'));

    // Inicializa o livro na primeira página
    updateBook();


    // --- Funções para os Corações Animados ---

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        const size = Math.random() * 20 + 10; // Tamanho entre 10px e 30px
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${Math.random() * 100}vw`; // Posição X aleatória
        heart.style.animationDuration = `${Math.random() * 5 + 5}s`; // Duração entre 5s e 10s
        heart.style.animationDelay = `${Math.random() * 5}s`; // Atraso aleatório
        heartBackground.appendChild(heart);

        // Remove o coração após a animação para não sobrecarregar o DOM
        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

    // Gera um novo coração a cada X milissegundos
    setInterval(createHeart, 500); // Cria um coração a cada 0.5 segundos

    // --- Controle de Áudio ---
    backgroundMusic.volume = 0.4;

    document.body.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play().catch(e => console.log("Autoplay bloqueado:", e));
        }
    }, { once: true });
});