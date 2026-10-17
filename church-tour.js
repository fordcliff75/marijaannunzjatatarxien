(()=>{
 const start=document.querySelector('#church-tour-start'),dialog=document.querySelector('#church-tour-dialog'),host=document.querySelector('#church-tour-frame'),viewer=document.querySelector('#church-tour-viewer'),close=document.querySelector('#church-tour-close'),fullscreen=document.querySelector('#church-tour-fullscreen'),status=document.querySelector('#church-tour-status');
 if(!start||!dialog||typeof dialog.showModal!=='function')return;
 const loadingText=status.textContent;let frame=null,slowTimer;
 if(!viewer.requestFullscreen&&!viewer.webkitRequestFullscreen)fullscreen.hidden=true;
 start.addEventListener('click',event=>{
  event.preventDefault();if(dialog.open)return;
  dialog.showModal();document.body.classList.add('tour-viewer-open');status.textContent=loadingText;
  frame=document.createElement('iframe');frame.title='Interactive 360° tour of Tarxien parish church';frame.allow='autoplay; fullscreen';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';
  frame.addEventListener('load',()=>{clearTimeout(slowTimer);status.textContent='';});
  frame.addEventListener('error',()=>{clearTimeout(slowTimer);status.textContent='The embedded tour could not load. Open the original tour in a new tab using the link above.';});
  frame.src=start.href;host.replaceChildren(frame);
  slowTimer=setTimeout(()=>{status.textContent='Taking longer than expected? You can open the original tour using the link above.';},20000);
 });
 close.addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>{clearTimeout(slowTimer);host.replaceChildren();frame=null;document.body.classList.remove('tour-viewer-open');if(document.fullscreenElement===viewer)document.exitFullscreen().catch(()=>{});start.focus();});
 fullscreen.addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(viewer.requestFullscreen)await viewer.requestFullscreen();else if(viewer.webkitRequestFullscreen)viewer.webkitRequestFullscreen();}catch{status.textContent='Full screen is unavailable in this browser. You can open the original tour instead.';}});
})();
