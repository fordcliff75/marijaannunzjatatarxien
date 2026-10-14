const links=[...document.querySelectorAll('[data-photo]')];
const viewer=document.querySelector('#photo-viewer');
let current=0,opener,album=[];
function display(index){current=(index+album.length)%album.length;const link=album[current],photo=link.querySelector('img');document.querySelector('#viewer-image').src=link.href;document.querySelector('#viewer-image').alt=photo.alt;document.querySelector('#viewer-caption').textContent=photo.alt;document.querySelector('#photo-count').textContent=`Photo ${current+1} of ${album.length}`;document.querySelector('#photo-original').href=link.href;}
links.forEach(link=>link.addEventListener('click',event=>{event.preventDefault();opener=link;album=[...link.closest('.photo-gallery').querySelectorAll('[data-photo]')];display(album.indexOf(link));viewer.showModal();document.body.classList.add('viewer-open');}));
document.querySelector('#photo-close').addEventListener('click',()=>viewer.close());
document.querySelector('#photo-prev').addEventListener('click',()=>display(current-1));
document.querySelector('#photo-next').addEventListener('click',()=>display(current+1));
viewer.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();display(current+1);}if(event.key==='ArrowLeft'){event.preventDefault();display(current-1);}});
viewer.addEventListener('close',()=>{document.body.classList.remove('viewer-open');opener?.focus();});
