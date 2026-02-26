const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const megaParent = document.querySelector(".mega-parent");

// Mobile menu toggle
toggle.addEventListener("click", function(e){
  e.stopPropagation();
  navLinks.classList.toggle("show");
});

// Mega toggle (mobile only)
megaParent.addEventListener("click", function(e){
  if(window.innerWidth <= 1000){
    e.preventDefault();
    this.classList.toggle("active");
  }
});

// Close when clicking outside
document.addEventListener("click", function(e){
  if(window.innerWidth <= 1000 &&
     !navLinks.contains(e.target) &&
     !toggle.contains(e.target)){
      navLinks.classList.remove("show");
      megaParent.classList.remove("active");
  }
});

// Reset on resize
window.addEventListener("resize", function(){
  if(window.innerWidth > 1000){
    navLinks.classList.remove("show");
    megaParent.classList.remove("active");
  }
});

// Scroll to top
function scrollToTop(){
  window.scrollTo({ top:0, behavior:'smooth' });
}

document.addEventListener("DOMContentLoaded", function () {

  const megaItems = document.querySelectorAll(".mega-item");
  const timelineItems = document.querySelectorAll(".timeline-item");
  const moduleContents = document.querySelectorAll(".module-content");
  const modulesSection = document.getElementById("modulesSection");

  function activateModule(moduleId) {

    // Remove active from all timeline items
    timelineItems.forEach(item => item.classList.remove("active"));

    // Remove active from all module contents
    moduleContents.forEach(content => content.classList.remove("active"));

    // Activate correct timeline item
    const activeTimeline = document.querySelector(`.timeline-item[data-target="${moduleId}"]`);
    if (activeTimeline) activeTimeline.classList.add("active");

    // Activate correct content section
    const activeContent = document.getElementById(moduleId);
    if (activeContent) activeContent.classList.add("active");
  }

  // 🔹 When clicking Mega Menu
  megaItems.forEach(item => {
    item.addEventListener("click", function () {

      const moduleId = this.getAttribute("data-module");

      // Scroll to timeline section
      modulesSection.scrollIntoView({ behavior: "smooth" });

      // Activate correct module
      activateModule(moduleId);
    });
  });

  // 🔹 When clicking Timeline Navigation
  timelineItems.forEach(item => {
    item.addEventListener("click", function () {

      const moduleId = this.getAttribute("data-target");

      activateModule(moduleId);
    });
  });

});

// Floating icons scroll interaction
window.addEventListener('scroll', function() {
  const scrollY = window.scrollY;
  document.querySelectorAll('.float-icon').forEach((icon, idx)=>{
    const speed = (idx+1)*0.3;
    icon.style.transform =
      `translateY(${Math.sin(scrollY*0.01*speed)*15}px)
       rotate(${Math.sin(scrollY*0.01*speed)*15}deg)`;
  });
});

// Card 3D Tilt
const cards = document.querySelectorAll('.feature-card');
cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / 10);
    const rotateY = ((centerX - x) / 10);
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
  });
});

// Logo Parallax on Mouse Move
const logo = document.querySelector('.logo-watermark');
document.querySelector('.features-section').addEventListener('mousemove', e => {
  const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
  const offsetX = (e.clientX - left - width/2) / 50; // small factor for subtle movement
  const offsetY = (e.clientY - top - height/2) / 50;
  logo.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) rotate(5deg) scale(1.05)`;
});
document.querySelector('.features-section').addEventListener('mouseleave', () => {
  logo.style.transform = `translate(-50%, -50%) rotate(0deg) scale(1)`;
});

// tsParticles Network Background
tsParticles.load("particles", {
  fpsLimit: 60,
  interactivity: {
    events: { onHover: { enable: true, mode: "repulse" } },
    modes: { repulse: { distance: 100, duration: 0.4 } }
  },
  particles: {
    color: { value: "#0066ff" },
    links: { enable: true, color: "#0066ff", distance: 120 },
    move: { enable: true, speed: 1 },
    number: { value: 40 },
    opacity: { value: 0.08 },
    shape: { type: "circle" },
    size: { value: 4 }
  },
  detectRetina: true,
});
// ===============================
// TIMELINE SWITCH
// ===============================

const timelineItems = document.querySelectorAll('.timeline-item');
const moduleContents = document.querySelectorAll('.module-content');

function activateModule(moduleId){

  timelineItems.forEach(i => i.classList.remove('active'));
  moduleContents.forEach(c => c.classList.remove('active'));

  const targetNav = document.querySelector(`.timeline-item[data-target="${moduleId}"]`);
  const targetContent = document.getElementById(moduleId);

  if(targetNav && targetContent){

    targetNav.classList.add('active');
    targetContent.classList.add('active');

    // reset scroll
    const left = targetContent.querySelector('.module-left');
    const right = targetContent.querySelector('.module-right');

    if(left) left.scrollTop = 0;
    if(right) right.scrollTop = 0;
  }
}

timelineItems.forEach(item=>{
  item.addEventListener('click',()=>{
    activateModule(item.dataset.target);
  });
});

// ===============================
// IMAGE LIGHTBOX
// ===============================

const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const zoomImages = document.querySelectorAll('.zoomable-image');
const closeModal = document.querySelector('.close-modal');

zoomImages.forEach(img => {
  img.addEventListener('click', () => {
    modal.style.display = 'flex';
    modalImg.src = img.src;
  });
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', e => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

 const mandatoryPrice = 0.5;
  const userSlider = document.getElementById("userCount");
  const userLabel = document.getElementById("userCountLabel");
  const modules = document.querySelectorAll(".module");
  const totalPriceEl = document.getElementById("totalPrice");

  function animateValue(start, end, duration) {
    let startTime = null;

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;
      let progress = Math.min((currentTime - startTime) / duration, 1);
      let value = progress * (end - start) + start;
      totalPriceEl.textContent = value.toFixed(2);
      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }

  function calculateTotal() {
    let users = parseInt(userSlider.value);
    userLabel.textContent = users;

    let totalPerUser = mandatoryPrice;

    modules.forEach(module => {
      if (module.checked) {
        totalPerUser += parseFloat(module.dataset.price);
      }
    });

    let finalTotal = users * totalPerUser;
    let current = parseFloat(totalPriceEl.textContent) || 0;

    animateValue(current, finalTotal, 400);
  }

  modules.forEach(module => {
    module.addEventListener("change", calculateTotal);
  });

  userSlider.addEventListener("input", calculateTotal);

  calculateTotal();

  
  const clientSwiper = new Swiper('.clients-carousel', {
  slidesPerView:4,
  spaceBetween:30,
  loop:true,
  autoplay:{ delay:2500 },
  breakpoints:{
    320:{slidesPerView:1, spaceBetween:15},
    640:{slidesPerView:2, spaceBetween:20},
    768:{slidesPerView:3, spaceBetween:25},
    1024:{slidesPerView:4, spaceBetween:30}
  }
});

// Testimonials carousel
const testimonialSwiper = new Swiper('.testimonials-wrapper', {
  slidesPerView:1,
  spaceBetween:30,
  loop:true,
  autoplay:{ delay:4000 },
  navigation:{ nextEl:'.swiper-button-next', prevEl:'.swiper-button-prev' }
});

// Counters
function animateCounter(id,endValue,duration=2000){
  let start=0, increment=endValue/(duration/20);
  const el=document.getElementById(id);
  const counter=setInterval(()=>{
    start+=increment;
    if(start>=endValue){ start=endValue; clearInterval(counter); }
    el.innerText=Math.floor(start);
  },20);
}
animateCounter("clientsCount",100);
animateCounter("projectsCount",250);
animateCounter("countriesCount",10);

// Fade-in on scroll
const slides = document.querySelectorAll('.swiper-slide');
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add('fade-in'); });
},{threshold:0.2});
slides.forEach(slide=>observer.observe(slide));

// Filters
const filterButtons=document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelector('.filter-btn.active').classList.remove('active');
  btn.classList.add('active');
  const filter=btn.dataset.filter;
  slides.forEach(slide=>{
    slide.style.display=(filter==='all'||slide.dataset.category===filter)?'flex':'none';
  });
}));

// Fade-in animation on scroll
const fadeElements = document.querySelectorAll('.pre-fade');
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('fade-in');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold:0.2 });
fadeElements.forEach(el=>fadeObserver.observe(el));

// Optional form submit demo
document.getElementById('demoForm').addEventListener('submit', e=>{
  e.preventDefault();
  alert('Thank you! Our team will contact you shortly.');
  e.target.reset();
});


// Contact particles animation
const canvas = document.getElementById('contact-particles');
const ctx = canvas.getContext('2d');
let particlesArray;

function initParticles() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particlesArray = [];
  const numberOfParticles = Math.floor(canvas.width / 20);

  for(let i=0; i<numberOfParticles; i++){
    particlesArray.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: Math.random() * 1 - 0.5,
      speedY: Math.random() * 1 - 0.5
    });
  }
}

function animateParticles() {
  ctx.clearRect(0,0,canvas.width, canvas.height);

  particlesArray.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
    ctx.fillStyle = "rgba(37,99,235,0.4)";
    ctx.fill();

    p.x += p.speedX;
    p.y += p.speedY;

    // wrap around edges
    if(p.x < 0) p.x = canvas.width;
    if(p.x > canvas.width) p.x = 0;
    if(p.y < 0) p.y = canvas.height;
    if(p.y > canvas.height) p.y = 0;
  });

  requestAnimationFrame(animateParticles);
}

// Initialize
initParticles();
animateParticles();

// Resize
window.addEventListener('resize', () => {
  initParticles();
});