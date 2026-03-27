(function () {
    // Controla o carrossel da home.
    var root = document.querySelector(".hero-carousel");
    if (!root) return; // Sai se não existir carrossel.

    // Elementos principais do carrossel.
    var slides = root.querySelectorAll(".hero-slide");
    var dotsContainer = root.querySelector(".hero-dots");
    var prevBtn = root.querySelector(".hero-prev");
    var nextBtn = root.querySelector(".hero-next");
    var index = 0;
    var timer;
    var intervalMs = 5500;

    function show(i) {
        // Mostra o slide selecionado.
        index = (i + slides.length) % slides.length;
        slides.forEach(function (slide, j) {
            slide.classList.toggle("active", j === index);
        });
        var dots = dotsContainer ? dotsContainer.querySelectorAll("button") : [];
        dots.forEach(function (dot, j) {
            var on = j === index;
            dot.classList.toggle("active", on);
            dot.setAttribute("aria-selected", on ? "true" : "false");
        });
    }

    function next() {
        // Vai para o próximo slide.
        show(index + 1);
    }

    function prev() {
        // Vai para o slide anterior.
        show(index - 1);
    }

    function resetTimer() {
        // Reinicia o tempo do auto-play.
        clearInterval(timer);
        timer = setInterval(next, intervalMs);
    }

    if (dotsContainer && slides.length) {
        // Cria os botões de navegação.
        slides.forEach(function (_, j) {
            var b = document.createElement("button");
            b.type = "button";
            b.className = "hero-dot";
            b.setAttribute("aria-label", "Ir para imagem " + (j + 1));
            b.addEventListener("click", function () {
                // Vai direto para o slide clicado.
                show(j);
                resetTimer();
            });
            dotsContainer.appendChild(b);
        });
    }

    if (prevBtn) {
        // Botão: anterior.
        prevBtn.addEventListener("click", function () {
            prev();
            resetTimer();
        });
    }
    if (nextBtn) {
        // Botão: próximo.
        nextBtn.addEventListener("click", function () {
            next();
            resetTimer();
        });
    }

    document.addEventListener("visibilitychange", function () {
        // Pausa o auto-play quando a aba não está visível.
        if (document.hidden) {
            clearInterval(timer);
        } else {
            resetTimer();
        }
    });

    // Inicializa o carrossel.
    show(0);
    resetTimer();
})();
