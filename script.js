const slideIndex = {};
const slideTimers = {};
function initSliders(){
  document.querySelectorAll('.slider-wrapper').forEach(slider=>{
    const id = slider.id;
    const slides = slider.querySelectorAll('.slides img');
    const dotsContainer = document.createElement('div'); dotsContainer.className='dots';
    slides.forEach((_,i)=>{ const dot=document.createElement('span'); dot.className='dot'; dot.onclick=()=>setSlide(id,i); dotsContainer.appendChild(dot); });
    slider.appendChild(dotsContainer);
    slideIndex[id]=0;
    updateSliderUI(id);
    startAutoPlay(id);
  });
}
function moveSlide(id,direction){ const slider=document.getElementById(id); if(!slider) return; const slides=slider.querySelectorAll('.slides img'); const count=slides.length; slideIndex[id]=(slideIndex[id]||0)+direction; if(slideIndex[id]>=count) slideIndex[id]=0; if(slideIndex[id]<0) slideIndex[id]=count-1; updateSliderUI(id); restartAutoPlay(id); }
function setSlide(id,index){ slideIndex[id]=index; updateSliderUI(id); restartAutoPlay(id); }
function updateSliderUI(id){ const slider=document.getElementById(id); const slides=slider.querySelector('.slides'); const dots=slider.querySelectorAll('.dot'); slides.style.transform=`translateX(-${slideIndex[id]*100}%)`; dots.forEach((dot,i)=>{ dot.classList.toggle('active',i===slideIndex[id]); }); }
function startAutoPlay(id){ stopAutoPlay(id); slideTimers[id]=setInterval(()=>{ moveSlide(id,1); },5000); }
function stopAutoPlay(id){ clearInterval(slideTimers[id]); }
function restartAutoPlay(id){ stopAutoPlay(id); startAutoPlay(id); }


const hamburger=document.getElementById('hamburger');
const mobileNav=document.getElementById('mobileNav');
function openMobileNav(){ mobileNav.classList.add('open'); mobileNav.setAttribute('aria-hidden','false'); hamburger.setAttribute('aria-expanded','true'); }
function closeMobileNav(){ mobileNav.classList.remove('open'); mobileNav.setAttribute('aria-hidden','true'); hamburger.setAttribute('aria-expanded','false'); }
hamburger.addEventListener('click',()=>{ const expanded=hamburger.getAttribute('aria-expanded')==='true'; expanded?closeMobileNav():openMobileNav(); });
document.addEventListener('click',(e)=>{ if(!mobileNav.classList.contains('open')) return; if(e.target===hamburger) return; if(!mobileNav.contains(e.target)&&!hamburger.contains(e.target)) closeMobileNav(); });
document.addEventListener('keydown',(e)=>{ if(e.key==='Escape') closeMobileNav(); });

window.addEventListener('DOMContentLoaded', initSliders);




 const hero = document.querySelector('.hero-intro, .slider-section');

    function createBubble() {
      const bubble = document.createElement('span');
      bubble.classList.add('bubble');
      const size = Math.random() * 60 + 20; 
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.animationDuration = `${Math.random() * 6 + 6}s`;
      hero.appendChild(bubble);

      setTimeout(() => {
        bubble.remove();
      }, 12000);
    }

    setInterval(createBubble, 600);


    document.addEventListener("DOMContentLoaded", () => {
      const elements = document.querySelectorAll('.scroll-anim');
    
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // animacija samo jednom
          }
        });
      }, { threshold: 0.2 });
    
      elements.forEach(el => observer.observe(el));
    });
    