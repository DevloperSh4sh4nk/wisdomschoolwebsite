// Utility: build side navigation per tab
const sideMap = {
  home: [],
  about: [
    { id: 'about-school', label: 'About School' },
    { id: 'mission', label: 'Mission' },
    { id: 'vision', label: 'Vision' },
    { id: 'director-message', label: "Director's Message" },
    { id: 'principal-message', label: "Principal's Message" },
  ],
  facilities: [
    { id: 'campus-tour', label: 'Campus Tour' },
    { id: 'classrooms-labs', label: 'Classrooms & Labs' },
    { id: 'library', label: 'Library' },
    { id: 'sports-complex', label: 'Sports Complex' },
    { id: 'transport', label: 'Transport Services' },
  ],
  academics: [
    { id: 'curriculum', label: 'Curriculum Overview' },
    { id: 'subjects', label: 'Subjects Offered' },
    { id: 'exams', label: 'Examination Policy' },
    { id: 'co-curricular', label: 'Co-Curricular Activities' },
    { id: 'lib-labs', label: 'Library & Laboratories' },
  ],
  admissions: [
    { id: 'process', label: 'Admission Process' },
    { id: 'eligibility', label: 'Eligibility Criteria' },
    { id: 'fees', label: 'Fee Structure' },
  ],
  studentlife: [
    { id: 'clubs', label: 'Clubs & Societies' },
    { id: 'sports-activities', label: 'Sports Activities' },
    { id: 'events', label: 'Events & Competitions' },
    { id: 'community-service', label: 'Community Service' },
    { id: 'students-council', label: 'Students Council' },
  ],
  alumni: [
    { id: 'alumni-registration', label: 'Registration' },
    { id: 'success-stories', label: 'Success Stories' },
    { id: 'alumni-events', label: 'Events' },
  ],
  contact: []
};

const panels = [...document.querySelectorAll('.panel')];
const mainMenu = document.getElementById('mainMenu');
const sideNav = document.getElementById('sideNav');

function setActiveTab(tab){
  // top nav
  [...mainMenu.querySelectorAll('a')].forEach(a=>a.classList.toggle('active', a.dataset.tab===tab));
  // panels
  panels.forEach(p=>p.classList.toggle('active', p.id===tab));
  // side nav
  renderSide(tab);
  // persist hash
  if(location.hash.replace('#','')!==tab) location.hash = tab;
  // scroll to top of main content
  window.scrollTo({top: document.querySelector('header').offsetHeight + 10, behavior:'smooth'});
}

function renderSide(tab){
  const items = sideMap[tab]||[];
  if(!items.length){ sideNav.innerHTML = `<div class="muted">No subsections</div>`; return; }
  sideNav.innerHTML = `
    <div class="group"><h3>${tab.charAt(0).toUpperCase()+tab.slice(1)}</h3></div>
    ${items.map(it=>`<a href="#${it.id}" data-jump="${it.id}">${it.label}</a>`).join('')}
  `;
  sideNav.querySelectorAll('a[data-jump]').forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      const target = document.getElementById(a.dataset.jump);
      if(target){ target.scrollIntoView({behavior:'smooth', block:'start'}); }
      sideNav.querySelectorAll('a').forEach(x=>x.classList.remove('current'));
      a.classList.add('current');
    });
  });
}

// Initial tab from hash or default
const initial = (location.hash||'#home').replace('#','');
setActiveTab(initial);

// Top menu routing
mainMenu.querySelectorAll('a').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    setActiveTab(a.dataset.tab);
  });
});

// Hero CTA buttons also carry data-tab
document.querySelectorAll('[data-tab]').forEach(el=>{
  if(!mainMenu.contains(el)){
    el.addEventListener('click', e=>{
      // only intercept if href is an internal anchor
      const tab = el.dataset.tab;
      if(tab){ e.preventDefault(); setActiveTab(tab); }
    });
  }
});

// Forms (demo only)
const $ = s=>document.querySelector(s);
$('#applyForm')?.addEventListener('submit', e=>{
  e.preventDefault();
  $('#applyNote').textContent = 'Thank you! Your application has been received. Our team will contact you soon.';
  e.target.reset('shashank@jfknowledge.com');
});
$('#alumniForm')?.addEventListener('submit', e=>{
  e.preventDefault();
  $('#alumniNote').textContent = 'Welcome to the Alumni Network! We will reach out with upcoming events.';
  e.target.reset('shashank@jfknowledge.com');
});
$('#contactForm')?.addEventListener('submit', e=>{
  e.preventDefault();
  $('#contactNote').textContent = 'Thanks for reaching out. We will respond within 2 business days.';
  e.target.reset('shashank@jfknowledge.com');
});

// Back to top
const toTop = document.getElementById('toTop');

window.addEventListener('scroll', () => {
  toTop.style.display = window.scrollY > 400 ? 'inline-block' : 'none';
});

toTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const mainMenu = document.getElementById('mainMenu');

  menuToggle.addEventListener('click', function() {
    const expanded = this.getAttribute('aria-expanded') === 'true' || false;
    this.setAttribute('aria-expanded', !expanded);
    mainMenu.classList.toggle('show');
  });

  // Close menu when clicking a link (mobile)
  mainMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        mainMenu.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (window.innerWidth <= 768) {
      const isClickInside = menuToggle.contains(event.target) || mainMenu.contains(event.target);
      if (!isClickInside && mainMenu.classList.contains('show')) {
        mainMenu.classList.remove('show');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});
// Gallery filtering functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.gallery-filter');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      // Show/hide gallery items based on filter
      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});
