/**
 * JAMAL & COMPANY LIMITED
 * Architectural Interiors & Spatial Design Studio
 * Est. Dhaka, 2018 · Reg: C-172356/2018
 * Interactive Application Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initDhakaClock();
  initCustomCursor();
  initCertificateModal();
  initPortfolioFilters();
  initProjectDrawer();
  initBeforeAfterSlider();
  initMaterialityArchive();
  initSpatialEstimator();
  initInquiryForm();
  initMobileMenu();
});

/* ==========================================================================
   1. Theme Management (Obsidian Dark / Gallery Light)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (!themeToggleBtn) return;

  const savedTheme = localStorage.getItem('jamal_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeButton(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('jamal_theme', next);
    updateThemeButton(next);
  });
}

function updateThemeButton(theme) {
  const btn = document.getElementById('themeToggleBtn');
  if (!btn) return;
  const label = btn.querySelector('.theme-label');
  if (label) {
    label.textContent = theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE';
  }
}

/* ==========================================================================
   2. Live Dhaka (GMT+6) Studio Clock & Ambient Status
   ========================================================================== */
function initDhakaClock() {
  const clockEl = document.getElementById('dhakaClock');
  if (!clockEl) return;

  function update() {
    const now = new Date();
    // Dhaka is UTC+6
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const dhakaTime = new Date(utc + (3600000 * 6));
    
    const hours = String(dhakaTime.getHours()).padStart(2, '0');
    const minutes = String(dhakaTime.getMinutes()).padStart(2, '0');
    const seconds = String(dhakaTime.getSeconds()).padStart(2, '0');
    
    const isStudioOpen = dhakaTime.getHours() >= 9 && dhakaTime.getHours() < 19;
    const statusText = isStudioOpen ? 'ATELIER ACTIVE' : 'STUDIO ARCHIVE';
    
    clockEl.innerHTML = `${hours}:${minutes}:${seconds} BST (UTC+6) &nbsp;·&nbsp; ${statusText}`;
  }
  
  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   3. Custom Magnetic Cursor
   ========================================================================== */
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const dot = document.querySelector('.custom-cursor-dot');
  if (!cursor || !dot || window.innerWidth < 1024) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function render() {
    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  const hoverTargets = document.querySelectorAll('a, button, .project-card, .swatch-item, input, select, textarea');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
  });
}

/* ==========================================================================
   4. Certificate of Incorporation Modal
   ========================================================================== */
function initCertificateModal() {
  const modal = document.getElementById('certModal');
  const openBtns = document.querySelectorAll('.open-cert-modal');
  const closeBtn = document.getElementById('closeCertModal');
  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. Portfolio Filtering
   ========================================================================== */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category.includes(filterVal)) {
          card.style.display = '';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   6. Detailed Project Inspection Drawer
   ========================================================================== */
const projectDatabase = {
  'monolith-penthouse': {
    title: 'The Monolith Penthouse',
    location: 'Gulshan 2, Dhaka, Bangladesh',
    year: '2023–2024',
    area: '7,450 sq ft',
    typology: 'Luxury Residential Duplex Penthouse',
    client: 'Private Art Collector',
    scope: 'Complete Turnkey Architecture & Spatial Interior Fit-Out',
    image: 'assets/images/hero.jpg',
    description: 'A monument to restraint and monolithic geometry overlooking the Gulshan skyline. Defined by continuous fluted concrete slabs, bespoke Nero Marquina marble hearths, and floor-to-ceiling acoustic glass partitions. Every joint, reveal, and recessed fixture was custom-cast in our Dhaka atelier.',
    materials: ['Honed Nero Marquina Marble', 'Poured Architectural Concrete', 'Smoked Danish White Oak', 'Fluted Low-Iron Glass', 'Brushed Raw Gunmetal'],
    timeline: '14 Months Turnkey'
  },
  'casa-minimalia': {
    title: 'Casa Minimalia Culinary Atelier',
    location: 'Baridhara Diplomatic Zone, Dhaka',
    year: '2023',
    area: '4,800 sq ft',
    typology: 'High-End Culinary & Dining Pavilion',
    client: 'Diplomatic Residence',
    scope: 'Architectural Kitchen, Dining Hall & Custom Millwork',
    image: 'assets/images/dining.jpg',
    description: 'Crafted as a tranquil sanctuary where monolithic basalt countertops meet hand-applied lime plaster walls. Features concealed motorized pantry systems, architectural track lighting calibrated to 2700K warm index, and hand-finished walnut dining joinery.',
    materials: ['Monolithic Basalt Stone', 'Textured Mineral Lime Plaster', 'Solid Walnut Joinery', 'Architectural Steel Glazing', 'Raw Belgian Linen'],
    timeline: '9 Months Turnkey'
  },
  'sylvan-suite': {
    title: 'Sylvan Master Suite & Sanctuary',
    location: 'Banani DOHS, Dhaka',
    year: '2022–2023',
    area: '3,200 sq ft',
    typology: 'Private Master Wing & Spa Bath',
    client: 'Private Family Residence',
    scope: 'Acoustic Wall Paneling, Walk-in Wardrobe & Suite',
    image: 'assets/images/bedroom.jpg',
    description: 'A deeply meditative master suite anchored by a full-height acoustic slatted oak feature wall and floating platform bed. Expansive private garden views dissolve the barrier between nature and the interior retreat.',
    materials: ['Acoustic Dark Oak Slats', 'Natural Slubbed Linen', 'Honed Travertine Romano', 'Concealed Shadow Line Skirting'],
    timeline: '7 Months Turnkey'
  },
  'nordic-capital': {
    title: 'Nordic Capital Executive Office',
    location: 'Tejgaon Commercial District, Dhaka',
    year: '2024',
    area: '12,500 sq ft',
    typology: 'Corporate Headquarters & Executive Suites',
    client: 'Private Equity & Venture Studio',
    scope: 'Full Structural Fit-Out, Boardrooms, Lounge & MEP',
    image: 'assets/images/office.jpg',
    description: 'Balancing rigorous Scandinavian minimalism with modern corporate prestige. A 16-seat monolithic black granite boardroom table anchors the executive floor, framed by sound-dampening acoustic glass partitions and custom linear lighting.',
    materials: ['Flamed Black Granite', 'Acoustic Double-Glazed Partitions', 'Cast Terrazzo Flooring', 'Ergonomic Leather Appointments'],
    timeline: '11 Months Turnkey'
  },
  'atelier-helix': {
    title: 'Atelier Helix Staircase & Gallery',
    location: 'Uttara Sector 4, Dhaka',
    year: '2023',
    area: '6,100 sq ft',
    typology: 'Private Art Foundation & Residence',
    client: 'Contemporary Art Foundation',
    scope: 'Sculptural Helical Staircase, Lighting & Gallery Fit-out',
    image: 'assets/images/staircase.jpg',
    description: 'A seamless cast-in-place spiral concrete staircase that functions as the central architectural sculpture of the gallery atrium. Natural sunlight cascades from a perimeter skylight, tracing shadows across micro-cement walls.',
    materials: ['Seamless Cast Concrete', 'Ultra-Clear Balustrade Glass', 'Recessed Floor Washes', 'Matte Black Handrail Details'],
    timeline: '10 Months Turnkey'
  },
  'materiality-archive': {
    title: 'Bespoke Millwork & Materiality Lab',
    location: 'Jamal & Co. Studio Atelier, Dhaka',
    year: 'Ongoing Collection',
    area: 'Custom Fabrication',
    typology: 'Bespoke Architectural Furniture & Joinery',
    client: 'Jamal & Co. Atelier Projects',
    scope: 'Custom Furniture Fabrication, Stone Curation & Testing',
    image: 'assets/images/atelier.jpg',
    description: 'Our in-house design laboratory where every project material is rigorously tested for light refraction, tactile texture, humidity resilience, and structural integrity. All millwork is handcrafted by our master cabinetmakers in Dhaka.',
    materials: ['Hand-Selected Natural Marbles', 'Kiln-Dried Hardwoods', 'Patinated Architectural Metals', 'Organic Mineral Paints'],
    timeline: 'Bespoke Production'
  }
};

function initProjectDrawer() {
  const drawer = document.getElementById('projectDrawer');
  const closeBtn = document.getElementById('closeDrawerBtn');
  const cards = document.querySelectorAll('.project-card');
  if (!drawer) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const pid = card.getAttribute('data-project-id');
      const data = projectDatabase[pid];
      if (!data) return;

      document.getElementById('drawerTitle').textContent = data.title;
      document.getElementById('drawerLocation').textContent = data.location;
      document.getElementById('drawerTypology').textContent = data.typology;
      document.getElementById('drawerArea').textContent = data.area;
      document.getElementById('drawerYear').textContent = data.year;
      document.getElementById('drawerTimeline').textContent = data.timeline;
      document.getElementById('drawerScope').textContent = data.scope;
      document.getElementById('drawerDesc').textContent = data.description;
      document.getElementById('drawerImage').src = data.image;

      const matContainer = document.getElementById('drawerMaterials');
      if (matContainer) {
        matContainer.innerHTML = data.materials.map(m => `<span class="meta-tag">${m}</span>`).join('');
      }

      drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeDrawer = () => {
    drawer.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });

  // Drawer action button: Jump to inquiry
  const drawerInquireBtn = document.getElementById('drawerInquireBtn');
  if (drawerInquireBtn) {
    drawerInquireBtn.addEventListener('click', () => {
      const title = document.getElementById('drawerTitle').textContent;
      closeDrawer();
      const briefField = document.getElementById('inquiryBrief');
      if (briefField) {
        briefField.value = `I am interested in commissioning a project with aesthetic and scope similar to: ${title}.`;
      }
      const inquirySection = document.getElementById('contact');
      if (inquirySection) {
        inquirySection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

/* ==========================================================================
   7. Interactive Before & After Transformation Slider
   ========================================================================== */
function initBeforeAfterSlider() {
  const container = document.getElementById('comparisonSlider');
  const afterWrap = document.getElementById('afterWrap');
  const handle = document.getElementById('sliderHandle');
  if (!container || !afterWrap || !handle) return;

  const innerWrap = afterWrap.querySelector('.inner-wrap');

  function syncInnerWidth() {
    if (innerWrap) {
      innerWrap.style.width = `${container.offsetWidth}px`;
    }
  }

  syncInnerWidth();
  window.addEventListener('resize', syncInnerWidth);

  let isDragging = false;

  function updateSlider(xPos) {
    const rect = container.getBoundingClientRect();
    let offsetX = xPos - rect.left;
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;

    const percentage = (offsetX / rect.width) * 100;
    afterWrap.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  }

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSlider(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch Support
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    updateSlider(e.touches[0].clientX);
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    updateSlider(e.touches[0].clientX);
  });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });
}

/* ==========================================================================
   8. Materiality Archive Swatch Selector
   ========================================================================== */
function initMaterialityArchive() {
  const swatches = document.querySelectorAll('.swatch-item');
  const calloutName = document.getElementById('materialCalloutName');
  const calloutDesc = document.getElementById('materialCalloutDesc');
  const calloutOrigin = document.getElementById('materialCalloutOrigin');
  if (!calloutName || !calloutDesc) return;

  const materialsData = {
    'marquina': {
      name: 'Nero Marquina Marble',
      origin: 'Sourced from Biscay quarries; calibrated & honed in Dhaka',
      desc: 'Deep black metamorphic stone with dramatic white calcite veining. Honed to a velvet satin finish that absorbs ambient glare while reflecting soft highlights.'
    },
    'limestone': {
      name: 'Roman Raw Limestone',
      origin: 'Hand-chiselled & fluted surface blocks',
      desc: 'Porous, organic tactile texture with warmth and natural striations. Ideal for monolithic bathroom vanities and monolithic fireplace mantels.'
    },
    'oak': {
      name: 'Smoked Belgian White Oak',
      origin: 'Kiln-dried sustainably managed European oak',
      desc: 'Double-fumed oak delivering rich graphite and umber undertones. Resistant to tropical Dhaka humidity through proprietary matte polyurethane sealers.'
    },
    'steel': {
      name: 'Brushed Raw Gunmetal & Brass',
      origin: 'Custom architectural metalwork from our Dhaka workshop',
      desc: 'Precision laser-cut, patinated, and hand-rubbed metal detailing for slimline glazing profiles, pivot doors, and bespoke cabinet hardware.'
    },
    'linen': {
      name: 'Raw Belgian Natural Flax Linen',
      origin: 'Artisanal weavers; acoustic wall & upholstery grade',
      desc: 'Heavyweight organic linen providing acoustic dampening and gentle light diffusion in bedrooms, salons, and executive listening rooms.'
    }
  };

  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');

      const matKey = swatch.getAttribute('data-mat');
      const data = materialsData[matKey];
      if (!data) return;

      calloutName.textContent = data.name;
      calloutDesc.textContent = data.desc;
      if (calloutOrigin) calloutOrigin.textContent = data.origin;
    });
  });
}

/* ==========================================================================
   9. Spatial Cost & Scope Estimator Engine
   ========================================================================== */
function initSpatialEstimator() {
  const segmentBtns = document.querySelectorAll('.segment-btn');
  const areaSlider = document.getElementById('areaSlider');
  const areaDisplay = document.getElementById('areaDisplay');
  const checkboxes = document.querySelectorAll('.est-checkbox');
  const priceDisplay = document.getElementById('estPriceDisplay');
  const timelineDisplay = document.getElementById('estTimelineDisplay');
  const rateDisplay = document.getElementById('estRateDisplay');
  const applyBtn = document.getElementById('applyEstimatorToForm');

  if (!areaSlider || !priceDisplay) return;

  let projectType = 'residential'; // residential, commercial, hospitality
  let baseRates = {
    residential: 4500, // BDT per sq ft turnkey
    commercial: 3800,
    hospitality: 5200
  };

  function calculate() {
    const area = parseInt(areaSlider.value, 10);
    areaDisplay.textContent = `${area.toLocaleString()} sq ft`;

    let baseRate = baseRates[projectType] || 4500;
    
    // Add-on checkboxes
    let addOnFactor = 1.0;
    checkboxes.forEach(cb => {
      if (cb.checked) {
        addOnFactor += parseFloat(cb.getAttribute('data-factor') || 0.05);
      }
    });

    const finalRate = Math.round(baseRate * addOnFactor);
    const totalPriceBDT = area * finalRate;
    
    // Format BDT in Lakhs / Crores
    let formattedPrice = '';
    if (totalPriceBDT >= 10000000) {
      const crore = (totalPriceBDT / 10000000).toFixed(2);
      formattedPrice = `৳ ${crore} Crore`;
    } else {
      const lakh = (totalPriceBDT / 100000).toFixed(1);
      formattedPrice = `৳ ${lakh} Lakh`;
    }

    // Timeline calculation based on area & complexity
    let months = Math.ceil(4 + (area / 1800));
    if (months > 18) months = 18;

    priceDisplay.textContent = formattedPrice;
    timelineDisplay.textContent = `Estimated Execution: ${months}–${months + 2} Months`;
    if (rateDisplay) {
      rateDisplay.textContent = `৳ ${finalRate.toLocaleString()} / sq ft (approx. $${Math.round(finalRate / 120)} USD)`;
    }
  }

  segmentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      segmentBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      projectType = btn.getAttribute('data-type');
      calculate();
    });
  });

  areaSlider.addEventListener('input', calculate);
  checkboxes.forEach(cb => cb.addEventListener('change', calculate));

  calculate();

  // Transfer estimated values to inquiry form
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const area = areaSlider.value;
      const typeSelect = document.getElementById('inquiryType');
      const areaInput = document.getElementById('inquiryArea');
      const briefField = document.getElementById('inquiryBrief');

      if (typeSelect) {
        if (projectType === 'residential') typeSelect.value = 'residential';
        else if (projectType === 'commercial') typeSelect.value = 'commercial';
        else typeSelect.value = 'hospitality';
      }
      if (areaInput) areaInput.value = area;
      if (briefField) {
        briefField.value = `Spatial Estimator Summary:\nProject Type: ${projectType.toUpperCase()}\nArea: ${area} sq ft\nTarget Budget Range: ${priceDisplay.textContent}\nTimeline: ${timelineDisplay.textContent}`;
      }

      showToast('Estimator configuration synced to Inquiry Form.');
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

/* ==========================================================================
   10. Consultation Inquiry Form Handling
   ========================================================================== */
function initInquiryForm() {
  const form = document.getElementById('consultationForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('inquiryName').value.trim();
    const phone = document.getElementById('inquiryPhone').value.trim();
    const email = document.getElementById('inquiryEmail').value.trim();
    const type = document.getElementById('inquiryType').value;

    if (!name || !phone) {
      showToast('Please provide your name and direct contact number.');
      return;
    }

    const refId = `JC-${Math.floor(100000 + Math.random() * 900000)}`;

    // Show confirmation modal
    const modal = document.getElementById('successModal');
    if (modal) {
      document.getElementById('successRefCode').textContent = refId;
      document.getElementById('successClientName').textContent = name;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      showToast(`Inquiry received. Reference #${refId}. Our lead architect will contact you.`);
    }

    form.reset();
  });

  const closeSuccessBtn = document.getElementById('closeSuccessModal');
  const successModal = document.getElementById('successModal');
  if (closeSuccessBtn && successModal) {
    closeSuccessBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
}

/* ==========================================================================
   11. Toast Notifications Utility
   ========================================================================== */
function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('visible');

  setTimeout(() => {
    toast.classList.remove('visible');
  }, 4000);
}

/* ==========================================================================
   12. Mobile Menu
   ========================================================================== */
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuToggle');
  const nav = document.querySelector('.nav-links');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const isShown = nav.style.display === 'flex';
    if (isShown) {
      nav.style.display = 'none';
      btn.innerHTML = '&#9776;';
    } else {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.top = '100%';
      nav.style.left = '0';
      nav.style.width = '100%';
      nav.style.background = 'var(--bg-main)';
      nav.style.padding = '2rem';
      nav.style.borderBottom = '1px solid var(--border-medium)';
      btn.innerHTML = '&times;';
    }
  });

  // Close when clicking nav link
  const links = nav.querySelectorAll('.nav-link');
  links.forEach(l => {
    l.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        nav.style.display = 'none';
        btn.innerHTML = '&#9776;';
      }
    });
  });
}
