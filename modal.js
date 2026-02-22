(function(){
  function qs(sel, el=document){ return el.querySelector(sel); }
  function qsa(sel, el=document){ return Array.from(el.querySelectorAll(sel)); }

  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop";
  backdrop.id = "modal";
  backdrop.setAttribute("aria-hidden","true");
  backdrop.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle" aria-describedby="modalDesc">
      <div class="modal-header">
        <h2 id="modalTitle">Conteúdo</h2>
        <div class="modal-tools">
          <button type="button" class="btn" id="modalClose" aria-label="Fechar popup">Fechar</button>
        </div>
      </div>
      <p id="modalDesc" class="small"></p>
      <div class="modal-body" id="modalBody"></div>
    </div>
  `;
  document.body.appendChild(backdrop);

  const panel   = qs(".modal", backdrop);
  const titleEl = qs("#modalTitle", backdrop);
  const descEl  = qs("#modalDesc", backdrop);
  const bodyEl  = qs("#modalBody", backdrop);
  const btnClose= qs("#modalClose", backdrop);

  let lastFocus = null;

  function closeModal(){
    backdrop.setAttribute("aria-hidden","true");
    panel.classList.remove("modal-xl");
    bodyEl.innerHTML = "";
    try{ if(document.activeElement && document.activeElement.blur) document.activeElement.blur(); }catch(_){ }
    lastFocus = null;
  }

  function openModal({type, src, title, desc, alt, size}){
    lastFocus = document.activeElement;
    backdrop.setAttribute("aria-hidden","false");
    panel.classList.toggle("modal-xl", size === "xl");

    titleEl.textContent = title || "Conteúdo";
    descEl.textContent = desc || "";

    bodyEl.innerHTML = "";

    if(type === "image"){
      const img = document.createElement("img");
      img.src = src;
      img.alt = alt || title || "Imagem";
      img.className = "modal-media";
      bodyEl.appendChild(img);
    } else if(type === "video"){
      const iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.title = title || "Vídeo";
      iframe.loading = "lazy";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      iframe.className = "modal-media";
      bodyEl.appendChild(iframe);
    }

    // Focus close for keyboard users
    setTimeout(()=>{ try{ btnClose.focus(); }catch(_){} }, 60);
  }

  function getTriggerData(btn){
    return {
      type: btn.dataset.modalType || "image",
      src: btn.dataset.modalSrc || "",
      title: btn.dataset.modalTitle || "",
      desc: btn.dataset.modalDesc || "",
      alt: btn.dataset.modalAlt || "",
      size: btn.dataset.modalSize || ""
    };
  }

  document.addEventListener("click", (e)=>{
    const btn = e.target.closest("[data-modal-type]");
    if(btn){
      e.preventDefault();
      openModal(getTriggerData(btn));
      return;
    }
    if(e.target === backdrop){
      closeModal();
    }
  });

  btnClose.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e)=>{
    if(backdrop.getAttribute("aria-hidden") === "true") return;
    if(e.key === "Escape"){
      e.preventDefault();
      closeModal();
    }
    // basic focus trap
    if(e.key === "Tab"){
      const focusables = qsa('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', panel)
        .filter(el => !el.hasAttribute("disabled"));
      if(!focusables.length) return;
      const first = focusables[0];
      const last  = focusables[focusables.length-1];
      if(e.shiftKey && document.activeElement === first){
        e.preventDefault(); last.focus();
      } else if(!e.shiftKey && document.activeElement === last){
        e.preventDefault(); first.focus();
      }
    }
  });

})();