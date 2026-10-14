const themeButton=document.querySelector('#theme-toggle');
function applyTheme(theme){document.documentElement.dataset.theme=theme;themeButton.textContent=theme==='light'?'☾ Dark':'☀ Light';themeButton.setAttribute('aria-label',theme==='light'?'Switch to dark theme':'Switch to light theme');themeButton.setAttribute('aria-pressed',String(theme==='light'));}
let savedTheme;try{savedTheme=localStorage.getItem('tarxien-theme');}catch{}
applyTheme(savedTheme||'dark');
themeButton.addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='light'?'dark':'light';applyTheme(theme);try{localStorage.setItem('tarxien-theme',theme);}catch{}});
const language=document.querySelector('#site-language'),translate=document.querySelector('#translate-link'),status=document.querySelector('#translation-status');
const localPreview=['localhost','127.0.0.1'].includes(location.hostname);
function translationLink(){const target=new URL(location.pathname+location.hash,localPreview?'https://marijaannunzjatatarxien.com':location.origin);translate.href='https://translate.google.com/translate?sl=en&tl='+encodeURIComponent(language.value)+'&u='+encodeURIComponent(target.href);translate.hidden=language.value==='en';status.textContent=language.value==='en'?'':localPreview?'Full-page translation will be available once the website is published.':'Automatic translation opens with Google Translate.';}
language.addEventListener('change',translationLink);
translate.addEventListener('click',event=>{if(localPreview){event.preventDefault();status.textContent='This is a local preview. Publish the website first to use full-page Google translation.';}});
translationLink();
