const themeButton=document.querySelector('#theme-toggle');
function applyTheme(theme){document.documentElement.dataset.theme=theme;themeButton.textContent=theme==='light'?'☾ Dark':'☀ Light';themeButton.setAttribute('aria-label',theme==='light'?'Switch to dark theme':'Switch to light theme');themeButton.setAttribute('aria-pressed',String(theme==='light'));}
let savedTheme;try{savedTheme=localStorage.getItem('tarxien-theme');}catch{}
applyTheme(savedTheme||'dark');
themeButton.addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='light'?'dark':'light';applyTheme(theme);try{localStorage.setItem('tarxien-theme',theme);}catch{}});
const language=document.querySelector('#site-language'),translate=document.querySelector('#translate-link'),status=document.querySelector('#translation-status');
translate.hidden=true;
const originalTitle=document.title,originalText=new Map(),originalAttributes=[];
const excluded='script,style,.language-tools,.translation-status,[translate="no"]';
const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
let node;while(node=walker.nextNode()){if(node.textContent.trim()&&!node.parentElement.closest(excluded))originalText.set(node,node.textContent);}
document.querySelectorAll('[alt],[aria-label],[title]').forEach(element=>{if(!element.closest(excluded))for(const attribute of ['alt','aria-label','title'])if(element.hasAttribute(attribute))originalAttributes.push([element,attribute,element.getAttribute(attribute)]);});
let currentDictionary={},request=0,selectedLanguage='en';const dictionaries=new Map();
function translated(text){const trimmed=text.trim(),value=currentDictionary[trimmed];return value?text.replace(trimmed,value):text;}
async function changeLanguage(code){const version=++request;status.textContent='';try{
  let dictionary={};if(code!=='en'){status.textContent='…';if(!dictionaries.has(code))dictionaries.set(code,fetch(''+code+'.json?v=20261016-australia').then(response=>{if(!response.ok)throw Error('Translation unavailable');return response.json();}));dictionary=await dictionaries.get(code);}
  if(version!==request)return;currentDictionary=dictionary;selectedLanguage=code;
  originalText.forEach((text,node)=>{node.textContent=translated(text);});
  originalAttributes.forEach(([element,attribute,text])=>element.setAttribute(attribute,translated(text)));
  document.title=translated(originalTitle);document.documentElement.lang=code;document.documentElement.dir=code==='ar'?'rtl':'ltr';
  status.textContent=code==='en'?'':'🌐 '+language.selectedOptions[0].textContent;
  try{localStorage.setItem('tarxien-language',code);}catch{}
}catch(error){if(version!==request)return;dictionaries.delete(code);language.value=selectedLanguage;status.textContent='Translation could not load. Please try again.';}}
language.addEventListener('change',()=>changeLanguage(language.value));
// Translate changing photo captions and theme controls while retaining their English originals.
new MutationObserver(records=>{if(selectedLanguage==='en')return;for(const record of records){const nodes=record.type==='characterData'?[record.target]:[...record.addedNodes];for(const node of nodes){if(node.nodeType===Node.TEXT_NODE&&node.parentElement&&!node.parentElement.closest(excluded)&&currentDictionary[node.textContent.trim()]){const value=translated(node.textContent);if(value!==node.textContent){originalText.set(node,node.textContent);node.textContent=value;}}}}}).observe(document.body,{subtree:true,characterData:true,childList:true});
let savedLanguage='en';try{savedLanguage=localStorage.getItem('tarxien-language')||'en';}catch{}
if([...language.options].some(option=>option.value===savedLanguage)){language.value=savedLanguage;changeLanguage(savedLanguage);}
