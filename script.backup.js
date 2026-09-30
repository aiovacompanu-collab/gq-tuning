const pages=[...document.querySelectorAll('.page')];
const dots=[...document.querySelectorAll('.dot')];
const pageLinks=[...document.querySelectorAll('[data-page]')];
let current='home';

function showPage(id, push=true){
  const target=pages.find(p=>p.dataset.pageId===id)||pages[0];
  current=target.dataset.pageId;
  pages.forEach(p=>p.classList.toggle('active',p===target));
  dots.forEach(d=>d.classList.toggle('active',d.dataset.page===current));
  document.querySelectorAll('.nav a[data-page]').forEach(a=>a.classList.toggle('active',a.dataset.page===current));
  if(push) history.pushState(null,'','#'+current); else if(location.hash!== '#'+current) history.replaceState(null,'','#'+current);
}
pageLinks.forEach(link=>link.addEventListener('click',e=>{const id=link.dataset.page;if(!id)return;e.preventDefault();showPage(id)}));
window.addEventListener('popstate',()=>showPage(location.hash.slice(1)||'home',false));
window.addEventListener('hashchange',()=>{const id=location.hash.slice(1);if(pages.some(p=>p.dataset.pageId===id))showPage(id,false)});
function movePage(dir){const i=pages.findIndex(p=>p.dataset.pageId===current);showPage(pages[(i+dir+pages.length)%pages.length].dataset.pageId)}
window.addEventListener('keydown',e=>{if(['INPUT','TEXTAREA'].includes(document.activeElement.tagName))return;if(e.key==='ArrowRight'||e.key==='ArrowDown')movePage(1);if(e.key==='ArrowLeft'||e.key==='ArrowUp')movePage(-1);if(e.key==='Escape')closeModal()});
let touchX=0,touchY=0;window.addEventListener('touchstart',e=>{touchX=e.changedTouches[0].clientX;touchY=e.changedTouches[0].clientY},{passive:true});window.addEventListener('touchend',e=>{const dx=touchX-e.changedTouches[0].clientX,dy=touchY-e.changedTouches[0].clientY;if(Math.max(Math.abs(dx),Math.abs(dy))<55)return;if(Math.abs(dx)>Math.abs(dy))movePage(dx>0?1:-1);else movePage(dy>0?1:-1)},{passive:true});

const works=[
 ['images/works-1.jpg','MERCEDES GLE','Внешний стайлинг','Акценты кузова и собранный визуальный образ.'],
 ['images/works-2.jpg','BMW X5','Индивидуальный проект','Баланс деталей, цвета и характера автомобиля.'],
 ['images/works-3.jpg','VOYAH FREE','Комплексный тюнинг','Работа с внешним образом и финальным финишем.']
];let workIndex=0;
function renderWork(){const [img,label,title,desc]=works[workIndex];const image=document.querySelector('#workImage');image.style.opacity='.25';setTimeout(()=>{image.src=img;image.onload=()=>image.style.opacity='1'},120);document.querySelector('#workLabel').textContent=label;document.querySelector('#workTitle').textContent=title;document.querySelector('#workDesc').textContent=desc;document.querySelector('#workNum').textContent=String(workIndex+1).padStart(2,'0');document.querySelector('#workProgress').style.height=((workIndex+1)/works.length*100)+'%'}
document.querySelector('#prevWork').addEventListener('click',()=>{workIndex=(workIndex+works.length-1)%works.length;renderWork()});document.querySelector('#nextWork').addEventListener('click',()=>{workIndex=(workIndex+1)%works.length;renderWork()});

document.querySelectorAll('.service-card').forEach(card=>card.addEventListener('click',()=>{document.querySelectorAll('.service-card').forEach(c=>c.classList.remove('active'));card.classList.add('active')}));

const modal=document.querySelector('#bookingModal');
function openModal(){modal.classList.add('open');modal.setAttribute('aria-hidden','false');setTimeout(()=>modal.querySelector('input')?.focus(),50)}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}
document.querySelector('#openBooking').addEventListener('click',openModal);document.querySelector('#openBooking2').addEventListener('click',openModal);document.querySelectorAll('[data-close-modal]').forEach(x=>x.addEventListener('click',closeModal));
document.querySelector('#bookingForm').addEventListener('submit',e=>{e.preventDefault();e.currentTarget.reset();document.querySelector('#formSuccess').classList.add('show')});
showPage(location.hash.slice(1)||'home',false);renderWork();
