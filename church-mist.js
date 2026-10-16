(()=>{
 const video=document.querySelector('.church-mist'),button=document.querySelector('.mist-toggle');
 if(!video||!button)return;
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 let pausedByVisitor=false,inView=true;
 const pauseIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>';
 const playIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v18l15-9z"/></svg>';
 function updateButton(){button.setAttribute('aria-label',video.paused?'Play mist animation':'Pause mist animation');button.innerHTML=video.paused?playIcon:pauseIcon;}
 function sync(){
  if(preference.matches){video.pause();button.hidden=true;return;}
  if(!video.getAttribute('src')){video.src=video.dataset.src;video.muted=true;}
  if(pausedByVisitor||document.hidden||!inView)video.pause();
  else video.play().catch(()=>{button.hidden=false;updateButton();});
 }
 video.addEventListener('playing',()=>{button.hidden=false;updateButton();});
 video.addEventListener('pause',updateButton);
 video.addEventListener('error',()=>{button.hidden=true;});
 button.addEventListener('click',()=>{pausedByVisitor=!pausedByVisitor;sync();updateButton();});
 preference.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
 if('IntersectionObserver'in window)new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;sync();}).observe(video);
 sync();
})();
