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
    
    // ===== REVIEWS DATA =====
const reviews = [
  { name: "Edin", role: "Srbija", rating: 5, text: "Topla preporuka za svakog ..i mladje i porodice …" },
  { name: "Mario", role: "Crna Gora", rating: 5, text: "Domacin je pravi, ugostili su nas u najboljem redu i nacinu, osjecali smo se kao kod svoje kuce!" },
  { name: "Khalid", role: "Italija", rating: 4, text: "Great stay at Apartment Zaneva The apartment was clean, Great location,the kitchen well furnished, The owner Amel and his mother were very kind, gentle,responsive and welcoming Ready to satisfy all my requests Change towels and sheets every 3 days The bed was really good,high quality, I slept really well The apartment was calm The owner Amel waited for me at the airport, despite my plane had a large delay and took me to the airport at the end of my stay with a large discount Really Great Value for money." },
  { name: "Cherlot", role: "Austrija", rating: 5, text: "Predivan boravak! Apartman je bio savršen, domaćini ljubazni i uvijek dostupni. Imali smo sve što nam treba i osjećali smo se kao da smo kod kuće.Apartman je bio izuzetno udoban, a domaćini gostoljubivi i uvijek na raspolaganju osjećali smo se kao kod kuće." },
  { name: "Danijela", role: "Crna Gorar", rating: 5, text: "Objekat je na odlicnoj lokaciji, domacin jako predusretljiv i srdacan. Soba je cista... Terasa je polu sredjena u mini kuhinju ali cini mi se da nije bas funkcionalna u koliko neko boravi tu duže ili zeli da sam za sebe priprema hranu... Za kratkotrajan boravak svaka preporuka..." },
  { name: "Zoran", role: "Srbija", rating: 4, text: "Profesionalno... sve pohvale" },
  { name: "Stozinic", role: "Crna Gora", rating: 4, text: "Zadovoljavajuće, već drugi godinu smo koristili smještaj. -Parking. Parkirali smo auto preko puta kod komšije, što nije problem, ali ne znam kako to funkcioniše kad je veća gužva u sezoni. -Kablovska. Na TV su samo neki njemački satelitski programi, nema programa sa balkana." },
  { name: "Michael", role: "Njemačka", rating: 5, text: "Alles war so, wie wir es erwartet haben" },
  { name: "Dino Alić", role: "QA Tester", rating: 4, text: "Lijepa animacija pri promjeni, djeluje profesionalno." },
];

// ===== SETTINGS =====
const PER_PAGE = 3; // 3 recenzije u koloni

let page = 0;

const panel = document.getElementById("reviewsPanel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsWrap = document.getElementById("dots");

function makeInitials(fullName) {
  const parts = fullName.trim().split(/\s+/);
  const a = parts[0]?.[0] ?? "?";
  const b = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (a + b).toUpperCase();
}

function starsHTML(rating) {
  const total = 5;
  let html = "";
  for (let i = 1; i <= total; i++) {
    html += `<span class="star ${i <= rating ? "" : "is-empty"}">★</span>`;
  }
  return html;
}

function pagesCount() {
  return Math.ceil(reviews.length / PER_PAGE);
}

function renderDots() {
  const count = pagesCount();
  dotsWrap.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const d = document.createElement("button");
    d.className = "dot" + (i === page ? " is-active" : "");
    d.setAttribute("aria-label", `Idi na stranicu ${i + 1}`);
    d.addEventListener("click", () => {
      page = i;
      render();
    });
    dotsWrap.appendChild(d);
  }
}

function render() {
  const count = pagesCount();
  page = (page + count) % count;

  const start = page * PER_PAGE;
  const slice = reviews.slice(start, start + PER_PAGE);

  panel.classList.add("is-switching");

  setTimeout(() => {
    panel.innerHTML = slice.map(r => `
      <article class="review-card">
        <div class="review-top">
          <div class="avatar">${makeInitials(r.name)}</div>

          <div class="meta">
            <h3>${r.name}</h3>
            <span>${r.role}</span>
          </div>

          <div class="rating" aria-label="Ocjena ${r.rating} od 5">
            ${starsHTML(r.rating)}
          </div>
        </div>

        <p class="quote">“${r.text}”</p>
      </article>
    `).join("");

    renderDots();
    panel.classList.remove("is-switching");
  }, 140);
}

// Events
prevBtn.addEventListener("click", () => {
  page -= 1;
  render();
});

nextBtn.addEventListener("click", () => {
  page += 1;
  render();
});

// Keyboard support (optional)
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") prevBtn.click();
  if (e.key === "ArrowRight") nextBtn.click();
});

// Init
render();

    
