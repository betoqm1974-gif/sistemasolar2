(function () {
  function closeAll(except) {
    document.querySelectorAll('.has-submenu.is-open').forEach(function (el) {
      if (except && el === except) return;
      el.classList.remove('is-open');
      var a = el.querySelector(':scope > a');
      if (a) a.setAttribute('aria-expanded', 'false');
    });
  }

  document.addEventListener('click', function (e) {
    var toggle = e.target.closest('.has-submenu > a');
    if (!toggle) {
      closeAll();
      return;
    }

    var wrapper = toggle.parentElement;
    if (!wrapper.classList.contains('has-submenu')) return;

    // Se o submenu estiver fechado, abre e NÃO navega.
    // Se já estiver aberto, permite navegar para a página "planetas.html".
    var isOpen = wrapper.classList.contains('is-open');
    var href = toggle.getAttribute('href') || '#';

    if (!isOpen) {
      e.preventDefault();
      closeAll(wrapper);
      wrapper.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      // focar primeiro item ao abrir via teclado (Enter/Space)
      if (e.detail === 0) {
        var first = wrapper.querySelector('.submenu a');
        if (first) first.focus();
      }
    } else {
      // já aberto: fecha e navega
      closeAll();
      // deixa o browser navegar normalmente
      // (não fazer preventDefault)
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeAll();
    }
  });

  // Inicializar aria-expanded
  document.querySelectorAll('.has-submenu > a').forEach(function (a) {
    a.setAttribute('aria-expanded', 'false');
  });
})();
