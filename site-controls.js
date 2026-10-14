const themeButton=document.querySelector('#theme-toggle');
function applyTheme(theme){document.documentElement.dataset.theme=theme;themeButton.textContent=theme==='light'?'☾ Dark':'☀ Light';themeButton.setAttribute('aria-label',theme==='light'?'Switch to dark theme':'Switch to light theme');themeButton.setAttribute('aria-pressed',String(theme==='light'));}
let savedTheme;try{savedTheme=localStorage.getItem('tarxien-theme');}catch{}
applyTheme(savedTheme||'dark');
themeButton.addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='light'?'dark':'light';applyTheme(theme);try{localStorage.setItem('tarxien-theme',theme);}catch{}});
const language=document.querySelector('#site-language'),translate=document.querySelector('#translate-link'),status=document.querySelector('#translation-status');
// Google translates the entire published page, including its linked pages.
// Keep the language names intact so visitors can always select another language.
language.closest('.language-tools').classList.add('notranslate');
language.closest('.language-tools').setAttribute('translate','no');
const parameters=new URLSearchParams(location.search);
const translatedPage=location.hostname.endsWith('.translate.goog');
const activeLanguage=translatedPage?parameters.get('_x_tr_tl')||'en':'en';
language.value=[...language.options].some(option=>option.value===activeLanguage)?activeLanguage:'en';
translate.hidden=true;
status.textContent=translatedPage?'Automatic translation by Google.':'';
language.addEventListener('change',()=>{
  const original=new URL(location.pathname+location.hash,'https://www.marijaannunzjatatarxien.com');
  if(language.value==='en'){
    if(translatedPage)location.assign(original.href);
    return;
  }
  status.textContent='Translating…';
  const target=new URL('https://translate.google.com/translate');
  target.searchParams.set('sl','en');
  target.searchParams.set('tl',language.value);
  target.searchParams.set('u',original.href);
  location.assign(target.href);
});
