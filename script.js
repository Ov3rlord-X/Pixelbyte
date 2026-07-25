// ── Cursor
const cursor = document.getElementById('cursor');
const dot = cursor.querySelector('.cursor-dot');
const ring = cursor.querySelector('.cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX; my=e.clientY;
  dot.style.left=mx+'px'; dot.style.top=my+'px';
});
(function animRing(){
  rx+=(mx-rx)*.12; ry+=(my-ry)*.12;
  ring.style.left=rx+'px'; ring.style.top=ry+'px';
  requestAnimationFrame(animRing);
})();

// ── Scroll progress
const bar = document.getElementById('scrollBar');
window.addEventListener('scroll',()=>{
  const p = window.scrollY/(document.body.scrollHeight-window.innerHeight);
  bar.style.transform='scaleX('+p+')';
});

// ── Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:.12}).observe ? reveals.forEach(r=>
  new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
  },{threshold:.12}).observe(r)
) : null;

// ── Theme Toggle
const html = document.documentElement;
const toggle = document.getElementById('themeToggle');
toggle.addEventListener('click',()=>{
  const isDark = html.getAttribute('data-theme')==='dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
});

// ── Respect system preference on load
if(window.matchMedia('(prefers-color-scheme: light)').matches){
  html.setAttribute('data-theme','light');
}
