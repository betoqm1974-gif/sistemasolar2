(function(){
  function basename(href){
    try{
      if(!href) return '';
      href = href.split('#')[0].split('?')[0];
      return href.split('/').pop();
    }catch(e){ return ''; }
  }

  function disableSelfLinksDesktop(){
    if(window.matchMedia && window.matchMedia('(max-width: 768px)').matches){
      return; // mobile: não mexer
    }
    var current = basename(window.location.pathname);
    if(!current) current = 'index.html';

    document.querySelectorAll('nav a[href]').forEach(function(a){
      var href = basename(a.getAttribute('href'));
      if(!href) return;

      // considerar home como index.html
      var isHome = (current === 'index.html' || current === '') && (href === 'index.html' || href === '' || href === './');
      var isSame = href.toLowerCase() === current.toLowerCase();

      if(isHome || isSame){
        a.setAttribute('data-href', a.getAttribute('href'));
        a.removeAttribute('href');
        a.setAttribute('aria-current','page');
        a.style.pointerEvents = 'none';
        a.style.cursor = 'default';
      }
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', disableSelfLinksDesktop);
  }else{
    disableSelfLinksDesktop();
  }
})();