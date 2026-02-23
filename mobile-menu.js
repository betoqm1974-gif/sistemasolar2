(function(){
  function ready(fn){ if(document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function(){
    var nav = document.querySelector('nav.main-nav');
    if(!nav) return;

    // A11Y/AccessMonitor: evitar aria-label em elementos sem papel ARIA suportado
    // (ex.: <div class="brand brand-link" aria-label="...">)
    try {
      var brandCandidate = nav.querySelector('.brand-link');
      if (brandCandidate && brandCandidate.tagName && brandCandidate.tagName.toLowerCase() !== 'a') {
        if (brandCandidate.hasAttribute('aria-label')) brandCandidate.removeAttribute('aria-label');
        // Se for clicável, garantir navegação por teclado
        if (!brandCandidate.hasAttribute('role')) brandCandidate.setAttribute('role', 'link');
        if (!brandCandidate.hasAttribute('tabindex')) brandCandidate.setAttribute('tabindex', '0');
        if (!brandCandidate._brandKeyHandler) {
          brandCandidate.addEventListener('keydown', function (ev) {
            if (ev.key === 'Enter' || ev.key === ' ') {
              ev.preventDefault();
              window.location.href = 'index.html';
            }
          });
          brandCandidate._brandKeyHandler = true;
        }
      }
    } catch (e) {}
    var btn = nav.querySelector('.nav-toggle');
    var links = nav.querySelector('.nav-links');
    if(!btn || !links) return;

    function markActiveLinks(){
      var path = (window.location.pathname || '').split('/').pop();
      if(!path) path = 'index.html';
      // normalizar (sem parâmetros)
      path = path.split('?')[0].split('#')[0];
      var as = nav.querySelectorAll('.nav-links a[href]');
      as.forEach(function(a){
        var href = (a.getAttribute('href') || '').split('/').pop();
        href = href.split('?')[0].split('#')[0];
        // considerar home
        if((path === 'index.html' || path === '') && (href === 'index.html' || href === '' || href === './')){
          a.classList.add('active');
          a.setAttribute('aria-current','page');
        }else if(href && href === path){
          a.classList.add('active');
          a.setAttribute('aria-current','page');
        }else{
          a.classList.remove('active');
          if(a.getAttribute('aria-current') === 'page') a.removeAttribute('aria-current');
        }
      });
    }


    // Mobile: garantir item "Início" (link para index) como primeiro elemento no menu
    try{
      if(window.innerWidth <= 768){
        // remover qualquer home antiga (ícone/texto) para não duplicar
        nav.querySelectorAll('.nav-links a.nav-home, .nav-links a.home-link').forEach(function(a){
          var li = a.closest('li') || a;
          if(li && li.parentNode) li.parentNode.removeChild(li);
        });

        // se já existir um link explícito "Início", não criar de novo
        var exists = Array.from(nav.querySelectorAll('.nav-links a')).some(function(a){
          return (a.textContent || '').trim().toLowerCase() === 'início' || (a.textContent || '').trim().toLowerCase() === 'inicio';
        });

        if(!exists){
          var li = document.createElement('li');
          var a = document.createElement('a');
          a.href = 'index.html';
          a.textContent = 'Início';
          li.appendChild(a);
          // inserir no topo da lista/links
          if(links.firstChild){
            links.insertBefore(li, links.firstChild);
          }else{
            links.appendChild(li);
          }
        }
      }
    }catch(e){}


    function setOpen(open){
      nav.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      if(!open) btn.blur();
    }

    btn.addEventListener('click', function(e){
      e.preventDefault();
      setOpen(!nav.classList.contains('is-open'));
    });

    // fechar ao clicar num link (mobile)
    nav.addEventListener('click', function(e){
      var a = e.target.closest('a');
      if(a && nav.classList.contains('is-open')){
        setOpen(false);
      }
    });

    // fechar ao clicar fora
    document.addEventListener('click', function(e){
      if(!nav.classList.contains('is-open')) return;
      if(!nav.contains(e.target)) setOpen(false);
    });

    // ESC fecha
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && nav.classList.contains('is-open')){
        setOpen(false);
      }
    });

    // ao mudar para desktop, garantir aberto (CSS trata), mas removemos estado
    markActiveLinks();

    window.addEventListener('resize', function(){
      if(window.innerWidth > 768 && nav.classList.contains('is-open')){
        setOpen(false);
      }
    });
  });
})();
