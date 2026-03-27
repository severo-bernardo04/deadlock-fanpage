(function () {
  // Lista de mecânicas.
  var MECHANICS = [
    {
      id: "movement",
      title: "Movement",
      eyebrow: "Movement in combat",
      description:
        "Movement lets you reposition quickly during fights—either to close distance, escape pressure, or dodge incoming threats. Timing and spacing are everything.",
      clipFile: "movement.mp4",
      bullets: [
        "Use Movement to avoid damage windows and enemy aim.",
        "Plan your next action before committing (dash → follow-up).",
        "Many dashes have cooldown/ammo—avoid wasting them early."
      ]
    },
    {
      id: "item-purchase",
      title: "Item Purchase",
      eyebrow: "Economy & power spikes",
      description:
        "Buy items between waves/fights to adapt your build. Items can change your damage type, survivability, range, and utility.",
      clipFile: "buyitems.mp4",
      bullets: [
        "Prioritize what your current role needs (damage, defense, or utility).",
        "Upgrade paths matter—small improvements can compound fast.",
        "Don’t overbuy: stay flexible for the next fight."
      ]
    },
    {
      id: "deny",
      title: "Deny",
      eyebrow: "Deny enemy money",
      description:
        'Deny is when you "farm" the minion’s soul to deny money to the enemy. To do it, you must shoot that soul — this denies the opponent’s farm.',
      clipFile: "Deny.mp4",
      bullets: [
        'When a minion dies, watch for the "soul" that appears.',
        "Shoot the soul before the enemy does to secure the deny.",
        "Denying farm slows enemy progression and helps you control the lane."
      ]
    }
  ];

  // Elementos do DOM usados pela página.
  var navEl = document.getElementById("mechanics-nav");
  var eyebrowEl = document.getElementById("mechanics-detail-eyebrow");
  var titleEl = document.getElementById("mechanics-detail-title");
  var descEl = document.getElementById("mechanics-detail-description");
  var bulletsEl = document.getElementById("mechanics-detail-bullets");
  var videoEl = document.getElementById("mechanics-detail-video");
  var videoPlaceholderEl = document.getElementById("mechanics-video-placeholder");

  // Pasta padrão dos clipes.
  var CLIPS_DIR = "Videos/";

  function findMechanic(id) {
    // Encontra a mecânica pelo id.
    for (var i = 0; i < MECHANICS.length; i++) {
      if (MECHANICS[i].id === id) return MECHANICS[i];
    }
    return null;
  }

  function normalizeClipFile(file) {
    // Ajusta o caminho do vídeo.
    if (!file) return "";
    var value = String(file).trim();
    if (!value) return "";
    // Normaliza barras para funcionar no navegador.
    var normalized = value.replace(/\\/g, "/");
    // Se vier só o nome, assume a pasta padrão.
    if (normalized.indexOf("/") === -1) return CLIPS_DIR + normalized;
    return normalized;
  }

  function setClipVideo(m) {
    // Troca o vídeo mostrado no painel.
    if (!videoEl) return;

    var src = normalizeClipFile(m.clipFile);

    // Para o vídeo anterior antes de trocar.
    try {
      videoEl.pause();
      videoEl.currentTime = 0;
    } catch (e) {
    }

    if (src) {
      // Mostra o vídeo.
      if (videoPlaceholderEl) videoPlaceholderEl.setAttribute("hidden", "");
      videoEl.removeAttribute("hidden");
      videoEl.src = src;
      if (videoEl.load) videoEl.load();
    } else {
      // Mostra o placeholder.
      if (videoPlaceholderEl) videoPlaceholderEl.removeAttribute("hidden");
      videoEl.setAttribute("hidden", "");
      videoEl.removeAttribute("src");
    }
  }

  function renderBullets(bullets) {
    // Atualiza a lista de pontos no painel.
    bulletsEl.innerHTML = "";
    bullets.forEach(function (b) {
      var li = document.createElement("li");
      li.textContent = b;
      bulletsEl.appendChild(li);
    });
  }

  function selectMechanic(id, pushHash) {
    // Atualiza o painel com a mecânica selecionada.
    var m = findMechanic(id);
    if (!m) m = MECHANICS[0];

    eyebrowEl.textContent = m.eyebrow;
    titleEl.textContent = m.title;
    descEl.textContent = m.description;
    renderBullets(m.bullets);
    setClipVideo(m);

    // Marca o botão selecionado.
    var buttons = navEl.querySelectorAll(".mechanic-nav-btn");
    buttons.forEach(function (btn) {
      var on = btn.getAttribute("data-id") === m.id;
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });

    if (pushHash !== false && window.location.hash.replace(/^#/, "") !== m.id) {
      if (history.replaceState) history.replaceState(null, "", "#" + m.id);
      else window.location.hash = m.id;
    }
  }

  function renderNav() {
    // Monta o menu de mecânicas.
    MECHANICS.forEach(function (m) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "mechanic-nav-btn";
      btn.setAttribute("data-id", m.id);
      btn.setAttribute("aria-pressed", "false");
      btn.setAttribute("aria-label", "Select mechanic: " + m.title);

      var ic = document.createElement("span");
      ic.className = "mechanic-nav-ic";
      ic.textContent = m.title.split(" ")[0].slice(0, 1).toUpperCase();

      var txt = document.createElement("span");
      txt.textContent = m.title;

      btn.appendChild(ic);
      btn.appendChild(txt);

      btn.addEventListener("click", function () {
        selectMechanic(m.id, true);
      });

      navEl.appendChild(btn);
    });
  }

  function idFromHash() {
    // Lê o id atual pela URL.
    var h = window.location.hash.replace(/^#/, "");
    if (!h) return null;
    return findMechanic(h) ? h : null;
  }

  // Inicializa o menu e o painel.
  renderNav();
  var initialId = idFromHash() || MECHANICS[0].id;
  selectMechanic(initialId, false);

  window.addEventListener("hashchange", function () {
    var id = idFromHash();
    if (id) selectMechanic(id, false);
  });
})();

