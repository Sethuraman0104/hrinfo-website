const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const megaParent = document.querySelector(".mega-parent");

toggle.addEventListener("click", function(e){
  e.stopPropagation();
  navLinks.classList.toggle("show");
});

megaParent.addEventListener("click", function(e){
  if(window.innerWidth <= 900){
    e.preventDefault();
    this.classList.toggle("active");
  }
});

document.addEventListener("click", function(e){
  if(window.innerWidth <= 900 &&
     !navLinks.contains(e.target) &&
     !toggle.contains(e.target)){
      navLinks.classList.remove("show");
      megaParent.classList.remove("active");
  }
});

window.addEventListener("resize", function(){
  if(window.innerWidth > 900){
    navLinks.classList.remove("show");
    megaParent.classList.remove("active");
  }
});

function scrollToTop(){
  window.scrollTo({ top:0, behavior:'smooth' });
}