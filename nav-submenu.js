(function () {
  // Mantém o submenu a abrir por hover/focus (CSS).
  // Clique em "PLANETAS" navega imediatamente (sem segundo clique).
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (document.activeElement) document.activeElement.blur();
    }
  });
})();
