// Database Simulation Structure
const projectData = [
    { id: 1, title: "Skyline Tower Complex", sector: "Commercial", budget: "$120M", icon: "&#x1F3E2;", desc: "Structural design for a 45-story mixed-use commercial tower utilizing advanced post-tensioned concrete." },
    { id: 2, title: "Riverside Bridge Extension", sector: "Infrastructure", budget: "$45M", icon: "&#x1F309;", desc: "Seismic retrofitting and lane expansion for a critical municipal suspension bridge." },
    { id: 3, title: "Eco-Village Housing", sector: "Residential", budget: "$30M", icon: "&#x1F3E1;", desc: "Sustainable site planning and foundation design for a 200-unit green residential development." },
    { id: 4, title: "Metro Line 4 Extension", sector: "Infrastructure", budget: "$210M", icon: "&#x1F687;", desc: "Geotechnical surveying and tunnel lining structural design for urban rapid transit." },
    { id: 5, title: "Tech Hub Campus", sector: "Commercial", budget: "$85M", icon: "&#x1F3EC;", desc: "Comprehensive construction management and structural engineering for a 5-building corporate campus." },
    { id: 6, title: "Harbor View Estates", sector: "Residential", budget: "$15M", icon: "&#x1F3D8;", desc: "Coastal retaining wall design and high-end residential structural framework." }
];

let activeFilter = null;
let sectorChartInstance = null;

// Dynamic Dashboard Dom Generation with animations
function renderProjects(filter = null) {
    const container = document.getElementById('projectList');
    const label = document.getElementById('activeFilterLabel');
    container.innerHTML = '';

    const filteredData = filter ? projectData.filter(p => p.sector === filter) : projectData;
    
    if (filter) {
        label.innerText = `Viewing: ${filter} (Clear X)`;
        label.className = "text-xs font-bold px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 border border-amber-300/20 cursor-pointer hover:bg-amber-200 transition-colors";
    } else {
        label.innerText = "Viewing All Sectors";
        label.className = "text-xs font-bold px-3 py-1.5 rounded-full bg-stone-100 text-stone-600 cursor-default transition-all";
    }

    if(filteredData.length === 0) {
        container.innerHTML = '<p class="text-stone-500 col-span-2 text-center py-12">No projects found for this sector.</p>';
        return;
    }

    filteredData.forEach((p, index) => {
        const card = document.createElement('div');
        card.className = 'bg-white/40 backdrop-blur-sm p-6 rounded-xl border border-white/60 shadow-sm flex flex-col h-full transform transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) hover:-translate-y-1.5 hover:bg-white/80 hover:shadow-md animate-fade-in-up';
        // Staggered grid item presentation delays
        card.style.animationDelay = `${index * 75}ms`;
        
        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <div class="text-3xl filter drop-shadow-sm">${p.icon}</div>
                <span class="text-[10px] font-bold px-2 py-1 bg-stone-200/50 text-stone-700 rounded-md tracking-wider uppercase">${p.sector}</span>
            </div>
            <h4 class="text-lg font-bold text-stone-900 mb-2">${p.title}</h4>
            <p class="text-sm text-stone-600 mb-4 flex-grow leading-relaxed">${p.desc}</p>
            <div class="text-sm font-bold text-amber-700 pt-3 border-t border-stone-100/50 flex justify-between items-center">
                <span>Budget:</span> <span>${p.budget}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

// Global Visualization Systems Setup
function initCharts() {
    Chart.defaults.font.family = "'Inter', 'sans-serif'";
    Chart.defaults.color = '#78716c';

    const sectorCounts = projectData.reduce((acc, curr) => {
        acc[curr.sector] = (acc[curr.sector] || 0) + 1;
        return acc;
    }, {});

    // 1. Sector Doughnut Graph
    const ctxSector = document.getElementById('sectorChart').getContext('2d');
    sectorChartInstance = new Chart(ctxSector, {
        type: 'doughnut',
        data: {
            labels: Object.keys(sectorCounts),
            datasets: [{
                data: Object.values(sectorCounts),
                backgroundColor: ['rgba(217, 119, 6, 0.85)', 'rgba(3, 105, 161, 0.85)', 'rgba(21, 128, 61, 0.85)'],
                borderWidth: 2,
                borderColor: 'rgba(255, 255, 255, 0.4)',
                hoverOffset: 12
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { boxWidth: 12, padding: 15 } },
                tooltip: {
                    padding: 12,
                    backgroundColor: 'rgba(28, 25, 23, 0.85)',
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

    // 2. Software Proficiency Index Graph
    const ctxSoftware = document.getElementById('softwareChart').getContext('2d');
    new Chart(ctxSoftware, {
        type: 'bar',
        data: {
            labels: ['AutoCAD Civil 3D', 'Revit Structure', 'SAP2000', 'ETABS', 'Primavera P6', 'ArcGIS'],
            datasets: [{
                label: 'Proficiency Level (0-100)',
                data: [95, 88, 92, 85, 75, 70],
                backgroundColor: 'rgba(217, 119, 6, 0.8)',
                hoverBackgroundColor: 'rgba(217, 119, 6, 0.95)',
                borderRadius: 6,
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.1)'
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { beginAtZero: true, max: 100, grid: { color: 'rgba(68, 64, 60, 0.3)' }, ticks: { color: '#a8a29e' } },
                y: { grid: { display: false }, ticks: { color: '#e7e5e4' } }
            },
            plugins: { 
                legend: { display: false },
                tooltip: { backgroundColor: 'rgba(28, 25, 23, 0.85)', backdropFilter: 'blur(8px)' }
            }
        }
    });

    // 3. Core Competency Radar Graph
    const ctxCompetency = document.getElementById('competencyChart').getContext('2d');
    new Chart(ctxCompetency, {
        type: 'radar',
        data: {
            labels: ['Structural Analysis', 'Project Mgmt', 'Geotechnical', 'Sustainability', 'Cost Estimation', 'Regulatory Comp.'],
            datasets: [{
                label: 'Core Competency Score',
                data: [9.5, 8.5, 7.5, 8.0, 9.0, 8.5],
                backgroundColor: 'rgba(217, 119, 6, 0.15)',
                borderColor: 'rgba(217, 119, 6, 0.85)',
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
                    angleLines: { color: 'rgba(68, 64, 60, 0.4)' },
                    grid: { color: 'rgba(68, 64, 60, 0.3)' },
                    pointLabels: { color: '#e7e5e4', font: { size: 11, weight: '500' } },
                    ticks: { display: false, min: 0, max: 10 }
                }
            },
            plugins: { 
                legend: { display: false },
                tooltip: { backgroundColor: 'rgba(28, 25, 23, 0.85)', backdropFilter: 'blur(8px)' }
            }
        }
    });
}

// Fluid EaseOut Easing Dynamic Counters Implementation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'), 10);
                let start = 0;
                const duration = 2000; 
                let startTime = null;

                function step(timestamp) {
                    if (!startTime) startTime = timestamp;
                    const progress = Math.min((timestamp - startTime) / duration, 1);
                    // Deceleration easing formula
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

// Scrollspy Engine & Interface Intersection Revelations
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
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // Scrollspy structural highlighting integration
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

// Ignition
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    initCharts();
    animateCounters();
    initScrollEngine();

    // Clear filter directly from label bind click
    document.getElementById('activeFilterLabel').addEventListener('click', () => {
        if (activeFilter) {
            activeFilter = null;
            renderProjects(null);
        }
    });
});