const pic=(k,alt,lazy)=>`<picture>
  <source type="image/webp" srcset="img/${k}-700.webp 700w, img/${k}-1400.webp 1400w" sizes="100vw">
  <img src="img/${k}-1400.jpg" srcset="img/${k}-700.jpg 700w, img/${k}-1400.jpg 1400w"
       sizes="100vw" alt="${alt}"${lazy?' loading="lazy"':''} decoding="async">
</picture>`;
const SLIDES = [["banregio","Banregio"],["goyn","GOYN CDMX"],["pilot","Pilot"],["ocho20","8020"],["laura","El Caso de Laura"]];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* hero carousel */
const wrap=document.getElementById('slides');
/* solo la primera diapositiva entra en la carga inicial; el resto tras `load`,
   porque todas caen dentro del viewport y `loading="lazy"` no las difiere */
wrap.innerHTML=`<div class="slide on">${pic(SLIDES[0][0],SLIDES[0][1],false)}</div>`;
let slides=[...wrap.children];
let si=0; const DUR=5000;
function setSlide(i){ slides[si].classList.remove('on'); si=i; slides[si].classList.add('on'); }
function startCarousel(){
  wrap.insertAdjacentHTML('beforeend',
    SLIDES.slice(1).map(([k,n])=>`<div class="slide">${pic(k,n,false)}</div>`).join(''));
  slides=[...wrap.children];
  setInterval(()=>setSlide((si+1)%slides.length), DUR);
}
if(!reduce) addEventListener('load', startCarousel);

/* rotating word — "crecer" se queda más tiempo */
const WORDS=[["crecer",3600],["decidir",1500],["conectar",1500],["crear",1500]];
const rot=document.getElementById('rot');
rot.innerHTML=WORDS.map(([w],i)=>`<span class="${i?'':'on'}">${w}</span>`).join('');
const ws=[...rot.children];
let wi=0;
function nextWord(){ ws[wi].classList.remove('on'); wi=(wi+1)%ws.length; ws[wi].classList.add('on');
  setTimeout(nextWord, WORDS[wi][1]); }
if(!reduce) setTimeout(nextWord, WORDS[0][1]);

/* statement: revelado línea por línea ligado al scroll */
const lns=[...document.querySelectorAll('#stmt .ln')];
function reveal(){
  const st=document.getElementById('stmt'); if(!st) return;
  const r=st.getBoundingClientRect(), vh=innerHeight;
  const p=(vh*0.86 - r.top)/(vh*0.5);
  lns.forEach((l,i)=>l.classList.toggle('on', p > i/lns.length));
}
if(!reduce){ addEventListener('scroll',reveal,{passive:true}); reveal(); }
else lns.forEach(l=>l.classList.add('on'));

/* header shrink */
const hd=document.getElementById('hd');
addEventListener('scroll',()=>hd.classList.toggle('shrunk', scrollY>40),{passive:true});

/* portafolio */
const W=[["banregio","Cursos Autodirigidos"],["ocho20","Casos de Estudio"],
         ["pilot","Series de Liderazgo"],["goyn","Productos Gamificados"]];
document.getElementById('work').innerHTML=W.map(([k,n])=>
 `<a class="w" href="#contacto">${pic(k,n,true)}
   <span class="tag">${n}</span></a>`).join('');
