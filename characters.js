(function () {
    // Lista de personagens.
    var CHARACTERS = [
        {
            id: "apollo",
            name: "Apollo",
            image: "images/heroes/apollo.png",
            cardImage: "images/heroes/Apollo_card.png",
            traits: [
                { label: "Finesse"},
                { label: "Mobility"},
                { label: "A Cut Above"}
            ],
            youtubeId: "https://www.youtube.com/watch?v=XwVyy6ZCAHk"
        },
        {
            id: "billy",
            name: "Billy",
            image: "images/heroes/billy.png",
            cardImage: "images/heroes/Billy_card.png",
            traits: [
                { label: "Punk"},
                { label: "Chaotic"},
                { label: "G.O.A.T"}
            ],
            youtubeId: "https://www.youtube.com/watch?v=M8Eq_1rgC2A"
        },
        {
            id: "celeste",
            name: "Celeste",
            image: "images/heroes/celeste.png",
            cardImage: "images/heroes/Celeste_card.png",
            traits: [
                { label: "Performer"},
                { label: "Disruptive"},
                { label: "Dazzling"}
            ],
            youtubeId: "https://www.youtube.com/watch?v=TuMtt6sZEFU"
        },
        {
            id: "doorman",
            name: "The Doorman",
            image: "images/heroes/thedoorman.png",
            cardImage: "images/heroes/The_Doorman_card.png",
            traits: [
                { label: "Disorienting"},
                { label: "Map Control"},
                { label: "Mind Games"}
            ],
            youtubeId: "https://www.youtube.com/watch?v=7nA16mfl46g"
        },
        {
            id: "drifter",
            name: "Drifter",
            image: "images/heroes/drifter.png",
            cardImage: "images/heroes/Drifter_card.png",
            traits: [
                { label: "Stalker"},
                { label: "Bloodthirsty"},
                { label: "Cruel"}
            ],
            youtubeId: "https://www.youtube.com/watch?v=xM0KUWX5w7Q"
        },
        {
            id: "graves",
            name: "Graves",
            image: "images/heroes/graves.png",
            cardImage: "images/heroes/Graves_card.png",
            traits: [
                { label: "Morbid"},
                { label: "Area Denial"},
                { label: "Necromancer"}
            ],
            youtubeId: "https://www.youtube.com/watch?v=JNDxrr6Xa18"
        },
        {
            id: "mina",
            name: "Mina",
            image: "images/heroes/mina.png",
            cardImage: "images/heroes/Mina_card.png",
            traits: [
                { label: "Harasser"},
                { label: "Nimble"},
                { label: "Vexing"}
            ],
            youtubeId: "https://www.youtube.com/watch?v=bYgs0u_lCws"
        },
        {
            id: "paige",
            name: "Paige",
            image: "images/heroes/paige.png",
            cardImage: "images/heroes/Paige_card.png",
            traits: [
                { label: "Helpful"},
                { label: "Protector"},
                { label: "Booksmart"}
            ],
            youtubeId: "https://www.youtube.com/watch?v=PmS8KhxMBHI"
        },
        {
            id: "rem",
            name: "Rem",
            image: "images/heroes/rem.png",
            cardImage: "images/heroes/Rem_card.png",
            traits: [
                { label: "Helpful"},
                { label: "Tiny"},
                { label: "zZzzZ"}
            ],
            youtubeId: "https://www.youtube.com/watch?v=klc2hWBzfFs"
        },
        {
            id: "silver",
            name: "Silver",
            image: "images/heroes/silver.png",
            cardImage: "images/heroes/Silver_card.png",
            traits: [
                { label: "Feral"},
                { label: "Hot Mess"},
                { label: "Transformation"}
            ],
            youtubeId: "https://www.youtube.com/watch?v=bq4mc810uGc"
        },
        {
            id: "venator",
            name: "Venator",
            image: "images/heroes/venator.png",
            cardImage: "images/heroes/Venator_card.png",
            traits: [
                { label: "Devout"},
                { label: "Arms Expert"},
                { label: "Tactical"}
            ],
            youtubeId: "https://www.youtube.com/watch?v=0jmzs4IKlfo"
        },
        {
            id: "victor",
            name: "Victor",
            image: "images/heroes/victor.png",
            cardImage: "images/heroes/Victor_card.png",
            traits: [
                { label: "You"},
                { label: "Can't"},
                { label: "Kill Me"}
            ],
            youtubeId: "https://www.youtube.com/watch?v=lDQwAuQ5-Ws"
        }
    ];

    // Elementos do DOM usados pela página.
    var navEl = document.getElementById("character-nav");
    var pageBg = document.getElementById("page-bg");
    var detailName = document.getElementById("detail-name");
    var detailTraits = document.getElementById("detail-traits");
    var detailVideo = document.getElementById("detail-video");
    var videoPlaceholder = document.getElementById("video-placeholder");

    function findById(id) {
        // Encontra a personagem pelo id.
        for (var i = 0; i < CHARACTERS.length; i++) {
            if (CHARACTERS[i].id === id) return CHARACTERS[i];
        }
        return null;
    }

    function renderTraits(traits) {
        // Mostra as traits no painel.
        detailTraits.innerHTML = "";
        traits.forEach(function (t) {
            var pill = document.createElement("span");
            pill.className = "trait-pill";
            pill.textContent = t.label;
            detailTraits.appendChild(pill);
        });
    }

    function setVideo(c) {
        // Define o vídeo do personagem.
        var searchUrl =
            "https://www.youtube.com/results?search_query=" +
            encodeURIComponent("Deadlock " + c.name + " abilities gameplay");

        function getYouTubeEmbedId(input) {
            // Extrai o id do vídeo a partir do valor informado.
            if (!input) return "";
            var value = String(input).trim();
            if (!value) return "";

            // caso seja somente o ID (11 chars típico)
            if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return value;

            // watch?v=...
            var m = value.match(/[?&]v=([^&]+)/);
            if (m && m[1]) return m[1];

            // youtu.be/...
            m = value.match(/youtu\.be\/([^?&/]+)/);
            if (m && m[1]) return m[1];

            // /embed/...
            m = value.match(/\/embed\/([^?&/]+)/);
            if (m && m[1]) return m[1];

            return "";
        }

        var embedId = getYouTubeEmbedId(c.youtubeId);

        if (embedId) {
            // Mostra o iframe com o vídeo.
            detailVideo.removeAttribute("hidden");
            videoPlaceholder.setAttribute("hidden", "");
            detailVideo.src = "https://www.youtube.com/embed/" + embedId + "?rel=0";
        } else {
            // Mostra um aviso quando não há vídeo configurado.
            detailVideo.setAttribute("hidden", "");
            detailVideo.removeAttribute("src");
            videoPlaceholder.removeAttribute("hidden");
            videoPlaceholder.innerHTML =
                "<span>Define the YouTube video ID/URL in <code>characters.js</code> (<code>youtubeId</code>).</span>" +
                '<a href="' +
                searchUrl +
                '" target="_blank" rel="noopener noreferrer">Search YouTube videos</a>';
        }
    }

    function selectCharacter(id, pushHash) {
        // Atualiza o painel com a personagem selecionada.
        var c = findById(id);
        if (!c) c = CHARACTERS[0];

        if (pageBg) {
            // Troca o fundo da página para a imagem do personagem.
            var bgUrl = c.image.replace(/\\/g, "/");
            pageBg.style.backgroundImage = 'url("' + bgUrl + '")';
        }
        detailName.textContent = c.name;
        renderTraits(c.traits);
        setVideo(c);

        // Marca o botão selecionado no grid.
        var buttons = navEl.querySelectorAll(".character-grid-btn");
        buttons.forEach(function (btn) {
            var on = btn.getAttribute("data-id") === c.id;
            btn.setAttribute("aria-pressed", on ? "true" : "false");
        });

        if (pushHash !== false) {
            if (history.replaceState) {
                history.replaceState(null, "", "#" + c.id);
            } else {
                window.location.hash = c.id;
            }
        }
    }

    function initNav() {
        // Monta o grid de botões dos personagens.
        CHARACTERS.forEach(function (c) {
            var btn = document.createElement("button");
            btn.type = "button";
            btn.className = "character-grid-btn";
            btn.setAttribute("data-id", c.id);
            btn.setAttribute("aria-pressed", "false");
            btn.setAttribute("aria-label", "Select " + c.name);

            var thumb = document.createElement("img");
            thumb.src = c.cardImage || c.image;
            thumb.alt = "";
            thumb.decoding = "async";
            thumb.setAttribute("aria-hidden", "true");

            btn.appendChild(thumb);
            btn.addEventListener("click", function () {
                selectCharacter(c.id);
            });

            navEl.appendChild(btn);
        });
    }

    function idFromHash() {
        // Lê a seleção atual pela URL.
        var h = window.location.hash.replace(/^#/, "");
        if (!h) return null;
        return findById(h) ? h : null;
    }

    initNav();

    var rawHash = window.location.hash.replace(/^#/, "");
    var initialId = idFromHash() || CHARACTERS[0].id;
    if (rawHash && !findById(rawHash) && history.replaceState) {
        history.replaceState(null, "", "#" + initialId);
    } else if (!rawHash && history.replaceState) {
        history.replaceState(null, "", "#" + initialId);
    }
    selectCharacter(initialId, false);

    window.addEventListener("hashchange", function () {
        // Atualiza a seleção quando a URL muda.
        var id = idFromHash();
        if (id) selectCharacter(id, false);
    });
})();