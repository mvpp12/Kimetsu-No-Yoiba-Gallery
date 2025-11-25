const DATA = [
  {
    id: 'tanjiro',
    name: 'Tanjiro Kamado',
    img: 'pictures/tanjiro.jpg',
    desc: 'A kind-hearted Demon Slayer who uses Water Breathing and Sun Breathing while seeking to cure his sister Nezuko.'
  },
  {
    id: 'nezuko',
    name: 'Nezuko Kamado',
    img: 'pictures/nezuko.jpg',
    desc: 'Tanjiro’s demon sister with unique abilities, known for her strength, innocence, and resistance to consuming humans.'
  },
  {
    id: 'zenitsu',
    name: 'Zenitsu Agatsuma',
    img: 'pictures/zenitsu.jpg',
    desc: 'A fearful but powerful Demon Slayer who becomes incredibly strong when unconscious, mastering Thunder Breathing.'
  },
  {
    id: 'inosuke',
    name: 'Inosuke Hashibira',
    img: 'pictures/Inosuke.jpg',
    desc: 'A wild and fearless fighter who uses Beast Breathing, known for his boar mask and unpredictable combat style.'
  },
  {
    id: 'kokushibo',
    name: 'Kokushibo',
    img: 'pictures/kokushibo.jpg',
    desc: 'A powerful Upper Rank demon and former Demon Slayer swordsman who uses Moon Breathing; relentless and bound by centuries of regret.'
  },
  {
    id: 'giyu',
    name: 'Giyu Tomioka',
    img: 'pictures/Giyu.jpg',
    desc: 'The Water Hashira, stoic and powerful, the first to spare Nezuko and support Tanjiro.'
  },
  {
    id: 'shinobu',
    name: 'Shinobu Kocho',
    img: 'pictures/shinobu.jpg',
    desc: 'The Insect Hashira who uses poison-based combat and maintains a deceptively calm, cheerful demeanor.'
  },
  {
    id: 'rengoku',
    name: 'Kyojuro Rengoku',
    img: 'pictures/Rengoku.jpg',
    desc: 'The Flame Hashira known for his burning spirit, kindness, and strong sense of duty.'
  },
  {
    id: 'tengen',
    name: 'Tengen Uzui',
    img: 'pictures/tengen.jpg',
    desc: 'The Sound Hashira with a flashy personality and combat style, excelling in high-speed swordplay and tactics.'
  },
  {
    id: 'muzan',
    name: 'Muzan Kibutsuji',
    img: 'pictures/muzan.jpeg',
    desc: 'The main antagonist and progenitor of all demons, cold, manipulative, and possessing overwhelming power.'
  },
  {
    id: 'akaza',
    name: 'Akaza',
    img: 'pictures/akaza.jpg',
    desc: 'An Upper Rank Three demon with immense combat abilities and a tragic past, known for his martial arts prowess and red marking.'
  },
  {
    id: 'gyomei',
    name: 'Gyomei Himejima',
    img: 'pictures/gyomei.jpg',
    desc: 'The Stone Hashira, a blind swordsman with exceptional strength and unwavering resolve, known for his compassion and spiritual depth.'
  }
];

const gallery = document.getElementById('gallery');
const controls = document.getElementById('controls');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalName = document.getElementById('modalName');
const modalDesc = document.getElementById('modalDesc');
const modalClose = document.getElementById('modalClose');
const search = document.getElementById('search');

function createCard(item, index){
  const el = document.createElement('article');
  el.className = 'card';
  el.style.animationDelay = `${index * 150}ms`;
  el.innerHTML = `
    <div class="media" role="img" aria-label="${item.name}">
      <img class="media-img loading" src="${item.img}" alt="${item.name}" />
    </div>
    <div class="info">
      <h3>${item.name}</h3>
      <p>${item.desc}</p>
    </div>
  `;
  el.addEventListener('click', ()=> openModal(item));
  const img = el.querySelector('.media-img');
  img.addEventListener('load', ()=>{
    img.classList.remove('loading');
    img.classList.add('is-loaded');
  }, {once:true});
  img.addEventListener('error', ()=>{
    img.classList.remove('loading');
    img.classList.add('load-failed');
  }, {once:true});
  return el;
}

function render(list){
  gallery.innerHTML = '';
  list.forEach((it, idx)=> gallery.appendChild(createCard(it, idx)));
  attachInteractions();
}

function openModal(item){
  modalImage.src = item.img;
  modalImage.alt = item.name;
  modalName.textContent = item.name;
  modalDesc.textContent = item.desc;
  modal.setAttribute('aria-hidden','false');
}

function closeModal(){
  modal.setAttribute('aria-hidden','true');
  modalImage.src = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });

search.addEventListener('input', (e)=>{
  const q = e.target.value.trim().toLowerCase();
  if(!q) return render(DATA);
  render(DATA.filter(d=> d.name.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q)));
});

render(DATA);

function attachInteractions(){
  const cards = Array.from(document.querySelectorAll('.card'));
  cards.forEach(card=>{
    const media = card.querySelector('.media');
    let prev = {rx:0, ry:0};
    function onMove(e){
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const ry = (px - 0.5) * 18;
      const rx = (0.5 - py) * 12;
      prev.rx = rx; prev.ry = ry;
      card.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0) scale(1.03)`;
      const bx = 50 + (px - 0.5) * 10;
      const by = 50 + (py - 0.5) * 8;
      const img = media.querySelector('.media-img');
      if(img){
        img.style.objectPosition = `${bx}% ${by}%`;
        img.style.transform = `translateZ(30px) scale(1.08)`;
      } else {
        media.style.backgroundPosition = `${bx}% ${by}%`;
        media.style.transform = `translateZ(30px) scale(1.08)`;
      }
    }
    function onLeave(){
      card.style.transform = '';
      const img = media.querySelector('.media-img');
      if(img){ img.style.objectPosition = ''; img.style.transform = ''; }
      media.style.backgroundPosition = '';
      media.style.transform = '';
    }
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
  });

  let rafId = null;
  document.addEventListener('mousemove', (e)=>{
    if(rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(()=>{
      const w = window.innerWidth;
      const h = window.innerHeight;
      const ox = (e.clientX / w - 0.5) * 2;
      const oy = (e.clientY / h - 0.5) * 2;
      const px = 50 + ox * 1.6;
      const py = 50 + oy * 1.2;
      document.body.style.backgroundPosition = `${px}% ${py}%`;
    });
  });
}

function showGallery(){
  if(!gallery.classList.contains('visible')){
    gallery.classList.add('visible');
    controls.classList.add('visible');
  }
}

const viewBtn = document.getElementById('viewGallery');
if(viewBtn){
  viewBtn.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      e.preventDefault();
      showGallery();
      target.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
}

function revealGallery(){
  const imgs = Array.from(document.querySelectorAll('.media-img'));
  imgs.forEach(img=>{
    const src = img.getAttribute('data-src');
    if(!src) return;
    if(img.src && img.src.length>0) return;
    img.src = src;
    img.addEventListener('load', ()=>{
      img.classList.remove('loading');
      img.classList.add('is-loaded');
    }, {once:true});
    img.addEventListener('error', ()=>{
      img.classList.remove('loading');
      img.classList.add('load-failed');
    }, {once:true});
  });
}

if('IntersectionObserver' in window){
  const heroEl = document.querySelector('.hero');
  if(heroEl){
    const io = new IntersectionObserver((entries, obs)=>{
      entries.forEach(ent=>{
        if(!ent.isIntersecting){
          showGallery();
          obs.disconnect();
        }
      });
    }, {root: null, threshold: 0.5});
    io.observe(heroEl);
  }
}

let hasScrolled = false;
window.addEventListener('scroll', ()=>{
  if(!hasScrolled && window.scrollY > window.innerHeight * 0.3){
    showGallery();
    hasScrolled = true;
  }
}, {passive: true});

