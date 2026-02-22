(function () {
  // Submenu Planetas:
  // Desktop: abre por hover/focus (CSS).
  // Mobile/touch: 1º toque abre/fecha e mantém aberto; 2º toque no mesmo item navega.
  function isTouchDevice() {
    return (('ontouchstart' in window) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0));
  }

  function closeAll() {
    document.querySelectorAll('.has-submenu.is-open').forEach(function (li) {
      li.classList.remove('is-open');
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeAll();
      if (document.activeElement) document.activeElement.blur();
    }
  });

  if (isTouchDevice()) {
    var li = document.querySelector('nav.main-nav .has-submenu');
    var a = li ? li.querySelector(':scope > a') : null;

    if (li && a) {
      a.addEventListener('click', function (e) {
        var href = a.getAttribute('href');
        if (!li.classList.contains('is-open')) {
          e.preventDefault();
          li.classList.add('is-open');
          return;
        }
        // 2º toque navega
        if (href) {
          closeAll();
          // deixa seguir o link
          return;
        }
      });

      // tocar fora fecha
      document.addEventListener('click', function (e) {
        if (!li.contains(e.target)) closeAll();
      });
    }
  }
})();
