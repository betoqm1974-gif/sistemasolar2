(function () {
  // Submenu Planetas:
  // - Desktop: abre por hover/focus (CSS)
  // - Mobile/touch: 1º toque em "PLANETAS" navega logo para planetas.html (sem exigir 2º toque)

  function isTouchDevice() {
    return (('ontouchstart' in window) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0));
  }

  // ESC fecha foco (boa prática)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (document.activeElement) document.activeElement.blur();
      document.querySelectorAll('.has-submenu.is-open').forEach(function (li) {
        li.classList.remove('is-open');
      });
    }
  });

  if (isTouchDevice()) {
    // Em alguns mobile browsers, o 1º toque "ativa hover" e só o 2º faz click.
    // Forçamos navegação no 1º toque.
    var planetasLink = document.querySelector('nav.main-nav .has-submenu > a');
    if (planetasLink) {
      var href = planetasLink.getAttribute('href');
      planetasLink.addEventListener('touchend', function (e) {
        // evita o comportamento "primeiro hover, depois click"
        e.preventDefault();
        e.stopPropagation();
        if (href) window.location.href = href;
      }, { passive: false });
    }
  }
})();
