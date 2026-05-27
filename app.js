// Enhanced Project Database containing structural blueprint graphics
const projectData = [
    { 
        id: 1, 
        title: "Skyline Tower Complex", 
        sector: "Commercial", 
        budget: "$120M", 
        icon: "&#x1F3E2;", 
        desc: "Structural design for a 45-story mixed-use commercial tower utilizing advanced post-tensioned concrete.",
        media: [
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400' style='background:%23e2e8f0;'><text x='50%2s' y='50%2s' font-family='sans-serif' font-size='24' fill='%2364748b' text-anchor='middle'>Skyline Tower: Post-Tensioned Framing Profile</text><path d='M100 350 L700 350 M200 350 L200 100 L300 100 L300 350 M400 350 L400 50 L500 50 L500 350' stroke='%23d97706' stroke-width='2' fill='none'/></svg>",
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400' style='background:%23cbd5e1;'><text x='50%2s' y='50%2s' font-family='sans-serif' font-size='24' fill='%23475569' text-anchor='middle'>Stress Strain Deflection Map</text><circle cx='400' cy='200' r='80' stroke='%23b45309' stroke-width='3' fill='none'/></svg>"
        ]
    },
    { 
        id: 2, 
        title: "Riverside Bridge Extension", 
        sector: "Infrastructure", 
        budget: "$45M", 
        icon: "&#x1F309;", 
        desc: "Seismic retrofitting and lane expansion for a critical municipal suspension bridge.",
        media: [
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400' style='background:%23e2e8f0;'><text x='50%2s' y='50%2s' font-family='sans-serif' font-size='24' fill='%2364748b' text-anchor='middle'>Bridge Suspension Truss Vectors</text><path d='M50 250 Q 400 50 750 250 M50 250 L750 250' stroke='%230284c7' stroke-width='3' fill='none'/></svg>"
        ]
    },
    { 
        id: 3, 
        title: "Eco-Village Housing", 
        sector: "Residential", 
        budget: "$30M", 
        icon: "&#x1F3E1;", 
        desc: "Sustainable site planning and foundation design for a 200-unit green residential development.",
        media: [
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400' style='background:%23e2e8f0;'><text x='50%2s' y='50%2s' font-family='sans-serif' font-size='24' fill='%2364748b' text-anchor='middle'>Eco-Village Topographic Layout Grid</text><path d='M100 100 C 200 150, 400 50, 700 200' stroke='%2316a34a' stroke-width='2' fill='none'/></svg>"
        ]
    },
    { 
        id: 4, 
        title: "Metro Line 4 Extension", 
        sector: "Infrastructure", 
        budget: "$210M", 
        icon: "&#x1F687;", 
        desc: "Geotechnical surveying and tunnel lining structural design for urban rapid transit.",
        media: [
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400' style='background:%23cbd5e1;'><text x='50%2s' y='50%2s' font-family='sans-serif' font-size='24' fill='%23475569' text-anchor='middle'>Tunnel Excavation Cross-Section</text><circle cx='400' cy='200' r='100' stroke='%230284c7' stroke-width='4' fill='none'/></svg>"
        ]
    },
    { 
        id: 5, 
        title: "Tech Hub Campus", 
        sector: "Commercial", 
        budget: "$85M", 
        icon: "&#x1F3EC;", 
        desc: "Comprehensive construction management and structural engineering for a 5-building corporate campus.",
        media: [
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400' style='background:%23e2e8f0;'><text x='50%2s' y='50%2s' font-family='sans-serif' font-size='24' fill='%2364748b' text-anchor='middle'>Corporate Campus Spatial Distribution</text><rect x='150' y='120' width='120' height='150' fill='%23d97706' opacity='0.5'/><rect x='450' y='100' width='200' height='180' fill='%2364748b' opacity='0.5'/></svg>"
        ]
    },
    { 
        id: 6, 
        title: "Harbor View Estates", 
        sector: "Residential", 
        budget: "$15M", 
        icon: "&#x1F3D8;", 
        desc: "Coastal retaining wall design and high-end residential structural framework.",
        media: [
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400' style='background:%23cbd5e1;'><text x='50%2s' y='50%2s' font-family='sans-serif' font-size='24' fill='%23475569' text-anchor='middle'>Coastal Cantilever Wall Spec Sheeting</text><path d='M200 50 L200 300 L500 300' stroke='%2316a34a' stroke-width='5' fill='none'/></svg>"
        ]
    }
];

// Testimonials Data Matrix Array
const testimonialData = [
    { name: "Evelyn Sterling", company: "Apex Urban Development", text: "Marcus Vance's calculation models optimized our foundation concrete requirements by 14% while retaining full structural redundancy margins. A masterclass structural strategist." },
    { name: "Devon Vance", company: "Municipal Transit Authority", text: "The seismic retrofitting schematics delivered for the Metro Extension cleared civil review boards on the first pass. Absolute elite professional documentation quality." },
    { name: "Aris Thorne", company: "EcoBuild Cooperatives", text: "Precision topography routing combined with creative green water retention paths turned our site hazards into high-performing sustainability assets." }
];

let activeFilter = null;
let sectorChartInstance = null;
let currentSlideIndex = 0;
let currentProjectMedia = [];

// Initialize Dashboard & Render Cards
function renderProjects(filter = null) {
    const container = document.getElementById('projectList');
    const label = document.getElementById('activeFilterLabel');
    container.innerHTML = '';

    const filteredData = filter ? projectData.filter(p => p.sector === filter) : projectData;
    
    if (filter) {
        label.innerText = `Viewing: ${filter} (Clear X)`;
        label.className = "text-xs font-bold px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200/50 cursor-pointer hover:bg-amber-200/80 transition-colors shadow-sm";
    } else {
        label.innerText = "Viewing All Sectors";
        label.className = "text-xs font-bold px-3 py-1.5 rounded-full bg-white/90 text-stone-600 cursor-default border border-stone-200/60 shadow-sm transition-all";
    }

    filteredData.forEach((p, index) => {
        const card = document.createElement('div');
        card.className = 'glass-card-interactive p-6 rounded-xl flex flex-col h-full animate-fade-in-up cursor-pointer';
        card.style.animationDelay = `${index * 60}ms`;
        card.setAttribute('onclick', `openGalleryModal(${p.id})`);
        
        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <div class="text-3xl filter drop-shadow-sm">${p.icon}</div>
                <span class="text-[10px] font-bold px-2 py-1 bg-white/60 text-stone-600 rounded-md tracking-wider uppercase border border-stone-200/40">${p.sector}</span>
            </div>
            <h4 class="text-lg font-bold text-stone-900 mb-2">${p.title}</h4>
            <p class="text-sm text-stone-600 mb-4 flex-grow leading-relaxed">${p.desc}</p>
            <div class="text-sm font-bold text-amber-700 pt-3 border-t border-stone-200/40 flex justify-between items-center">
                <span>Budget:</span> <span>${p.budget}</span>
            </div>
            <div class="text-[11px] font-bold text-amber-600 mt-2 flex items-center gap-1 opacity-80 group-hover:opacity-100">
                <span>🔍 View Output Media Blueprints</span>
            </div>
        `;
        container.appendChild(card);
    });
}

// Modal Presentation Gallery Management
function openGalleryModal(projectId) {
    const project = projectData.find(p => p.id === projectId);
    if (!project) return;

    currentProjectMedia = project.media || [];
    currentSlideIndex = 0;

    document.getElementById('modalTitle').innerText = project.title;
    document.getElementById('modalSector').innerText = project.sector;
    document.getElementById('modalDesc').innerText = project.desc;
    document.getElementById('modalBudget').innerText = `Allocated Budget: ${project.budget}`;

    buildCarouselSlides();
    updateCarouselDisplay();

    const modal = document.getElementById('galleryModal');
    modal.classList.remove('pointer-events-none', 'opacity-0');
    modal.classList.add('opacity-100');
    modal.firstElementChild.classList.remove('scale-95');
    modal.firstElementChild.classList.add('scale-100');
}

function closeModal() {
    const modal = document.getElementById('galleryModal');
    modal.classList.add('pointer-events-none', 'opacity-0');
    modal.classList.remove('opacity-100');
    modal.firstElementChild.classList.remove('scale-100');
    modal.firstElementChild.classList.add('scale-95');
}

function buildCarouselSlides() {
    const track = document.getElementById('carouselTrack');
    track.innerHTML = '';
    
    currentProjectMedia.forEach(mediaUrl => {
        const slide = document.createElement('div');
        slide.className = 'w-full h-full flex-shrink-0 flex items-center justify-center p-2';
        const img = document.createElement('img');
        img.src = mediaUrl;
        img.className = 'max-w-full max-h-full object-contain rounded-lg shadow-sm';
        slide.appendChild(img);
        track.appendChild(slide);
    });
}

function updateCarouselDisplay() {
    const track = document.getElementById('carouselTrack');
    track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    
    const indicator = document.getElementById('carouselIndicator');
    indicator.innerText = `Blueprint Asset ${currentSlideIndex + 1} of ${currentProjectMedia.length}`;
}

// Testimonials Slider Initialization
function initTestimonials() {
    const track = document.getElementById('testimonialTrack');
    const dotsContainer = document.getElementById('testimonialDots');
    track.innerHTML = '';
    dotsContainer.innerHTML = '';

    testimonialData.forEach((t, i) => {
        // Build Card Element
        const card = document.createElement('div');
        card.className = 'w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0 glass-panel p-6 rounded-2xl flex flex-col justify-between space-y-4';
        card.innerHTML = `
            <div class="text-amber-500 text-3xl font-serif">“</div>
            <p class="text-stone-700 italic text-sm leading-relaxed flex-grow">${t.text}</p>
            <div class="pt-2 border-t border-stone-200/40">
                <h5 class="font-bold text-stone-950 text-sm">${t.name}</h5>
                <p class="text-xs text-stone-500 font-medium">${t.company}</p>
            </div>
        `;
        track.appendChild(card);

        // Build Dot Indicators
        const dot = document.createElement('button');
        dot.className = `w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === 0 ? 'bg-amber-600 w-6' : 'bg-stone-300'}`;
        dot.setAttribute('aria-label', `Go to testimonial slide ${i + 1}`);
        dot.addEventListener('click', () => scrollTestimonials(i));
        dotsContainer.appendChild(dot);
    });
}

function scrollTestimonials(index) {
    const track = document.getElementById('testimonialTrack');
    const dots = document.getElementById('testimonialDots').children;
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    let stepPercent = 33.333;
    if (isMobile) stepPercent = 100;
    else if (isTablet) stepPercent = 50;

    track.style.transform = `translateX(-${index * (stepPercent + 2)}%)`;
    
    Array.from(dots).forEach((dot, idx) => {
        if(idx === index) {
            dot.classList.add('bg-amber-600', 'w-6');
            dot.classList.remove('bg-stone-300');
        } else {
            dot.classList.remove('bg-amber-600', 'w-6');
            dot.classList.add('bg-stone-300');
        }
    });
}

// Intake Form Submission System
function initFormHandling() {
    const form = document.getElementById('intakeForm');
    const alertBox = document.getElementById('submissionAlert');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Form field data structured for effortless backend mapping
        const formData = {
            name: document.getElementById('clientName').value,
            email: document.getElementById('clientEmail').value,
            phone: document.getElementById('clientPhone').value,
            sector: document.getElementById('projectSector').value,
            message: document.getElementById('projectMessage').value,
            timestamp: new Date().toISOString()
        };

        console.log("Transmission Pipeline Logged Parameter Data Matrix:", formData);

        // Display Success Interaction Alert Layout State
        alertBox.classList.remove('hidden');
        form.reset();

        setTimeout(() => {
            alertBox.classList.add('hidden');
        }, 5000);
    });
}

// Chart.js Analytical Visualizations Setup
function initCharts() {
    Chart.defaults.font.family = "'Inter', 'sans-serif'";
    Chart.defaults.color = '#57534e';

    const sectorCounts = projectData.reduce((acc, curr) => {
        acc[curr.sector] = (acc[curr.sector] || 0) + 1;
        return acc;
    }, {});

    const ctxSector = document.getElementById('sectorChart').getContext('2d');
    sectorChartInstance = new Chart(ctxSector, {
        type: 'doughnut',
        data: {
            labels: Object.keys(sectorCounts),
            datasets: [{
                data: Object.values(sectorCounts),
                backgroundColor: ['rgba(217, 119, 6, 0.8)', 'rgba(2, 132, 199, 0.8)', 'rgba(22, 163, 74, 0.8)'],
                borderWidth: 2,
                borderColor: 'rgba(255, 255, 255, 0.8)',
                hoverOffset: 12
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { boxWidth: 12, padding: 15, color: '#44403c' } },
                tooltip: {
                    padding: 12,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)',
                    titleColor: '#1c1917',
                    bodyColor: '#44403c',
                    borderColor: 'rgba(0, 0, 0, 0.05)',
                    borderWidth: 1,
                    backdropFilter: 'blur(8px)'
                }
            },
            onClick: (event, elements) => {
                if (elements.length > 0) {
                    const clickedIndex = elements[0].index;
                    const sector = sectorChartInstance.data.labels[clickedIndex];
                    activeFilter = (activeFilter === sector) ? null : sector;
                    renderProjects(activeFilter);
                } else {
                    activeFilter = null;
                    renderProjects(null);
                }
            }
        }
    });

    const ctxSoftware = document.getElementById('softwareChart').getContext('2d');
    new Chart(ctxSoftware, {
        type: 'bar',
        data: {
            labels: ['AutoCAD Civil 3D', 'Revit Structure', 'SAP2000', 'ETABS', 'Primavera P6', 'ArcGIS'],
            datasets: [{
                label: 'Proficiency Level (0-100)',
                data: [95, 88, 92, 85, 75, 70],
                backgroundColor: 'rgba(217, 119, 6, 0.75)',
                hoverBackgroundColor: 'rgba(217, 119, 6, 0.95)',
                borderRadius: 6,
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.5)'
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { beginAtZero: true, max: 100, grid: { color: 'rgba(0, 0, 0, 0.05)' }, ticks: { color: '#57534e' } },
                y: { grid: { display: false }, ticks: { color: '#1c1917', font: { weight: '500' } } }
            },
            plugins: { 
                legend: { display: false },
                tooltip: { backgroundColor: 'rgba(255, 255, 255, 0.92)', titleColor: '#1c1917', bodyColor: '#44403c', borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.05)', backdropFilter: 'blur(8px)' }
            }
        }
    });

    const ctxCompetency = document.getElementById('competencyChart').getContext('2d');
    new Chart(ctxCompetency, {
        type: 'radar',
        data: {
            labels: ['Structural Analysis', 'Project Mgmt', 'Geotechnical', 'Sustainability', 'Cost Estimation', 'Regulatory Comp.'],
            datasets: [{
                label: 'Core Competency Score',
                data: [9.5, 8.5, 7.5, 8.0, 9.0, 8.5],
                backgroundColor: 'rgba(217, 119, 6, 0.12)',
                borderColor: 'rgba(217, 119, 6, 0.8)',
                pointBackgroundColor: '#d97706',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#d97706',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: 'rgba(0, 0, 0, 0.06)' },
                    grid: { color: 'rgba(0, 0, 0, 0.05)' },
                    pointLabels: { color: '#27272a', font: { size: 11, weight: '600' } },
                    ticks: { display: false, min: 0, max: 10 }
                }
            },
            plugins: { 
                legend: { display: false },
                tooltip: { backgroundColor: 'rgba(255, 255, 255, 0.92)', titleColor: '#1c1917', bodyColor: '#44403c', borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.05)', backdropFilter: 'blur(8px)' }
            }
        }
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'), 10);
                const duration = 1800; 
                let startTime = null;

                function step(timestamp) {
                    if (!startTime) startTime = timestamp;
                    const progress = Math.min((timestamp - startTime) / duration, 1);
                    const easeProgress = progress * (2 - progress);
                    
                    counter.innerText = Math.floor(easeProgress * target);
                    
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    } else {
                        counter.innerText = target;
                    }
                }
                window.requestAnimationFrame(step);
                countObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.2 });

    counters.forEach(counter => countObserver.observe(counter));
}

function initScrollEngine() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });

    revealElements.forEach(el => revealObserver.observe(el));

    window.addEventListener('scroll', () => {
        let currentSectionId = "home";
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSectionId) {
                link.classList.add('active');
            }
        });
    });
}

// Document Operational Ignition Controls Bindings
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    initCharts();
    animateCounters();
    initScrollEngine();
    initTestimonials();
    initFormHandling();

    // Reset Dashboard Filter Action Click Function bind handler
    document.getElementById('activeFilterLabel').addEventListener('click', () => {
        if (activeFilter) {
            activeFilter = null;
            renderProjects(null);
        }
    });

    // Close Modal Events Action Targets
    document.getElementById('closeModalBtn').addEventListener('click', closeModal);
    document.getElementById('galleryModal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('galleryModal')) closeModal();
    });

    // Modal Gallery Media Carousel Pagination Triggers
    document.getElementById('prevSlide').addEventListener('click', () => {
        if (currentProjectMedia.length === 0) return;
        currentSlideIndex = (currentSlideIndex === 0) ? currentProjectMedia.length - 1 : currentSlideIndex - 1;
        updateCarouselDisplay();
    });

    document.getElementById('nextSlide').addEventListener('click', () => {
        if (currentProjectMedia.length === 0) return;
        currentSlideIndex = (currentSlideIndex === currentProjectMedia.length - 1) ? 0 : currentSlideIndex + 1;
        updateCarouselDisplay();
    });
});