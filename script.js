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

