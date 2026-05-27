import React, { useEffect, useState, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

export default function EngineeringPortfolio() {
  // --- State Management ---
  const [activeFilter, setActiveFilter] = useState(null);
  const [activeNav, setActiveNav] = useState('home');

  // --- Refs for Charts and Counters ---
  const sectorChartRef = useRef(null);
  const softwareChartRef = useRef(null);
  const competencyChartRef = useRef(null);

  const sectorChartInstance = useRef(null);
  const softwareChartInstance = useRef(null);
  const competencyChartInstance = useRef(null);

  const counterDeliveredRef = useRef(null);
  const counterExperienceRef = useRef(null);
  const counterBudgetRef = useRef(null);
  const counterRetentionRef = useRef(null);

  // --- Mock Data ---
  const projectData = [
    { id: 1, title: "Skyline Tower Complex", sector: "Commercial", budget: "$120M", icon: "🏢", desc: "Structural design for a 45-story mixed-use commercial tower utilizing advanced post-tensioned concrete." },
    { id: 2, title: "Riverside Bridge Extension", sector: "Infrastructure", budget: "$45M", icon: "🌉", desc: "Seismic retrofitting and lane expansion for a critical municipal suspension bridge." },
    { id: 3, title: "Eco-Village Housing", sector: "Residential", budget: "$30M", icon: "🏡", desc: "Sustainable site planning and foundation design for a 200-unit green residential development." },
    { id: 4, title: "Metro Line 4 Extension", sector: "Infrastructure", budget: "$210M", icon: "🚇", desc: "Geotechnical surveying and tunnel lining structural design for urban rapid transit." },
    { id: 5, title: "Tech Hub Campus", sector: "Commercial", budget: "$85M", icon: "🏬", desc: "Comprehensive construction management and structural engineering for a 5-building corporate campus." },
    { id: 6, title: "Harbor View Estates", sector: "Residential", budget: "$15M", icon: "🏘️", desc: "Coastal retaining wall design and high-end residential structural framework." }
  ];

  // --- Scroll & Reveal Logic ---
  useEffect(() => {
    // Scrollspy handling
    const handleScroll = () => {
      const sections = ['home', 'services', 'portfolio', 'expertise', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
          setActiveNav(section);
          break;
        }
      }
    };

    // Intersection Observer for scroll-driven animations
    const revealCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          observer.unobserve(entry.target);
        }
      });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
      root: null,
      threshold: 0.1
    });

    const hiddenElements = document.querySelectorAll('.scroll-reveal');
    hiddenElements.forEach(el => revealObserver.observe(el));
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealObserver.disconnect();
    };
  }, []);

  // --- Count-Up Animation Logic ---
  useEffect(() => {
    const animateCounter = (element, target) => {
      let start = 0;
      const duration = 2000; // 2 seconds
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Cubic-bezier-like easeOutQuad curve for smooth deceleration
        const easeProgress = progress * (2 - progress);
        
        const currentCount = Math.floor(easeProgress * target);
        if (element) {
          element.innerText = currentCount;
        }

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else if (element) {
          element.innerText = target;
        }
      };

      requestAnimationFrame(updateCounter);
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === counterDeliveredRef.current) animateCounter(counterDeliveredRef.current, 42);
          if (entry.target === counterExperienceRef.current) animateCounter(counterExperienceRef.current, 15);
          if (entry.target === counterBudgetRef.current) animateCounter(counterBudgetRef.current, 250);
          if (entry.target === counterRetentionRef.current) animateCounter(counterRetentionRef.current, 98);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    if (counterDeliveredRef.current) counterObserver.observe(counterDeliveredRef.current);
    if (counterExperienceRef.current) counterObserver.observe(counterExperienceRef.current);
    if (counterBudgetRef.current) counterObserver.observe(counterBudgetRef.current);
    if (counterRetentionRef.current) counterObserver.observe(counterRetentionRef.current);

    return () => counterObserver.disconnect();
  }, []);

  // --- Charts Initialization & Dynamic Updates ---
  useEffect(() => {
    Chart.defaults.font.family = "'Inter', 'sans-serif'";
    Chart.defaults.color = '#78716c';

    // 1. Sector Doughnut Chart
    if (sectorChartRef.current) {
      const sectorCounts = projectData.reduce((acc, curr) => {
        acc[curr.sector] = (acc[curr.sector] || 0) + 1;
        return acc;
      }, {});

      const ctxSector = sectorChartRef.current.getContext('2d');
      sectorChartInstance.current = new Chart(ctxSector, {
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
              backdropFilter: 'blur(8px)',
              callbacks: {
                label: (context) => ` ${context.label}: ${context.raw} Projects`
              }
            }
          },
          onClick: (event, elements) => {
            if (elements.length > 0) {
              const clickedIndex = elements[0].index;
              const sector = sectorChartInstance.current.data.labels[clickedIndex];
              setActiveFilter(prev => prev === sector ? null : sector);
            } else {
              setActiveFilter(null);
            }
          }
        }
      });
    }

    // 2. Software Proficiency Horizontal Bar Chart
    if (softwareChartRef.current) {
      const ctxSoftware = softwareChartRef.current.getContext('2d');
      softwareChartInstance.current = new Chart(ctxSoftware, {
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
    }

    // 3. Core Competencies Radar Chart
    if (competencyChartRef.current) {
      const ctxCompetency = competencyChartRef.current.getContext('2d');
      competencyChartInstance.current = new Chart(ctxCompetency, {
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

    // Cleanup chart resources on unmount
    return () => {
      if (sectorChartInstance.current) sectorChartInstance.current.destroy();
      if (softwareChartInstance.current) softwareChartInstance.current.destroy();
      if (competencyChartInstance.current) competencyChartInstance.current.destroy();
    };
  }, []);

  // Filter projects list array based on state context
  const filteredProjects = activeFilter 
    ? projectData.filter(p => p.sector === activeFilter) 
    : projectData;

  return (
    <div className="bg-stone-50 text-stone-800 font-sans antialiased selection:bg-amber-500/30 scroll-smooth min-h-screen">
      
      {/* Dynamic Ambient Background Elements */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-amber-600/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-sky-600/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* --- Sticky Glassmorphic Navigation Bar --- */}
      <nav className="fixed w-full bg-white/70 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)] z-50 border-b border-white/40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center font-bold text-xl tracking-tighter text-stone-900 motion-safe:transition-transform hover:scale-105 duration-300 cursor-pointer">
              <span className="text-amber-600 mr-2">⛳</span> STRUCTURA
            </div>
            <div className="hidden md:flex space-x-8 font-medium text-sm text-stone-600 items-center">
              {['home', 'services', 'portfolio', 'expertise'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item}`} 
                  className={`capitalize transition-colors duration-300 relative py-1 hover:text-amber-600 ${activeNav === item ? 'text-amber-600 font-semibold' : ''}`}
                >
                  {item === 'home' ? 'Overview' : item === 'expertise' ? 'Analytics' : item}
                  {activeNav === item && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-amber-600 rounded-full animate-[pulse_1.5s_infinite]" />
                  )}
                </a>
              ))}
              <a 
                href="#contact" 
                className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 active:scale-95 transition-all duration-300 shadow-md hover:shadow-amber-600/20"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Hero & Overview Section --- */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
        <div className="md:w-1/2 space-y-6 transform transition-all duration-1000 ease-out opacity-100 translate-y-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-stone-900 leading-tight">
            Engineering <span className="text-amber-600 inline-block hover:scale-105 transition-transform duration-300 cursor-default">Resilient</span> Infrastructure for Tomorrow.
          </h1>
          <p className="text-lg text-stone-600 leading-relaxed">
            Welcome to the interactive professional overview of an industry-leading Civil Engineering consultant. This dashboard provides a comprehensive analysis of project impacts, technical competencies, and service offerings, translating years of field experience into actionable data insights.
          </p>
          <div className="pt-4 flex space-x-4">
            <a href="#portfolio" className="px-6 py-3 bg-stone-900 text-white font-medium rounded-lg hover:bg-stone-800 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-stone-900/20">Explore Projects</a>
            <a href="#expertise" className="px-6 py-3 bg-white/60 backdrop-blur-md text-stone-900 font-medium rounded-lg border border-white/60 hover:bg-white/90 active:scale-95 transition-all duration-300 shadow-sm">View Analytics</a>
          </div>
        </div>
        
        {/* Animated Key Metrics Dash-Grid */}
        <div className="md:w-1/2 w-full grid grid-cols-2 gap-4">
          {[
            { ref: counterDeliveredRef, target: "42", label: "Projects Delivered", icon: "🏗️" },
            { ref: counterExperienceRef, target: "15", label: "Years Experience", icon: "⏱️" },
            { ref: counterBudgetRef, target: "250", label: "Budget Managed", icon: "💰", suffix: "M+" },
            { ref: counterRetentionRef, target: "98", label: "Client Retention", icon: "🤝", suffix: "%" }
          ].map((metric, i) => (
            <div 
              key={i} 
              className="bg-white/40 backdrop-blur-md p-6 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.04)] border border-white/60 flex flex-col items-center justify-center text-center h-40 transform transition-all duration-500 hover:-translate-y-2 hover:bg-white/70 hover:shadow-md hover:border-amber-400/30 group"
            >
              <div className="text-4xl mb-2 filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">{metric.icon}</div>
              <div className="text-3xl font-bold text-stone-900 flex items-center justify-center">
                <span ref={metric.ref}>0</span>{metric.suffix}
              </div>
              <div className="text-xs font-medium text-stone-500 uppercase tracking-wide mt-1">{metric.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Core Engineering Services Section --- */}
      <section id="services" className="py-20 bg-white/40 backdrop-blur-md border-y border-stone-200/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-reveal opacity-0 translate-y-8 transition-all duration-1000 ease-out">
          <div className="mb-12 max-w-3xl">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Core Engineering Services</h2>
            <p className="text-lg text-stone-600">
              This section outlines the primary domains of expertise. Each service area is backed by rigorous methodologies and a proven track record of delivering structurally sound, cost-effective, and sustainable solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "🏗️", title: "Structural Design", desc: "Comprehensive analysis and design of steel, concrete, and timber structures ensuring safety and compliance with international codes." },
              { icon: "🚧", title: "Construction Management", desc: "End-to-end project oversight, budget control, scheduling, and on-site contractor coordination to ensure timely delivery." },
              { icon: "📐", title: "Site Surveying & GIS", desc: "Precision topographic mapping, geographic information systems integration, and feasibility studies for preliminary planning." },
              { icon: "🌏", title: "Urban Infrastructure", desc: "Design of sustainable water supply systems, drainage networks, and roadway alignments for expanding urban environments." }
            ].map((srv, idx) => (
              <div 
                key={idx} 
                className="p-6 bg-white/30 backdrop-blur-sm rounded-xl border border-white/50 hover:border-amber-500/40 hover:bg-white/70 transition-all duration-500 cubic-bezier(0.4,0,0.2,1) group shadow-sm hover:shadow-md hover:-translate-y-1 flex flex-col h-full"
              >
                <div className="text-4xl mb-4 text-amber-600 group-hover:scale-110 transition-transform duration-300 origin-left">{srv.icon}</div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">{srv.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed flex-grow">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Interactive Portfolio Dashboard Section --- */}
      <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="mb-12 max-w-3xl scroll-reveal opacity-0 translate-y-8 transition-all duration-1000 ease-out">
          <h2 className="text-3xl font-bold text-stone-900 mb-4">Interactive Portfolio Dashboard</h2>
          <p className="text-lg text-stone-600">
            Explore historical project data. The chart below illustrates the distribution of completed projects across various sectors. <strong className="text-stone-800">Interact with the Doughnut chart by clicking on segments to dynamically filter the detailed project list.</strong>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start scroll-reveal opacity-0 translate-y-8 transition-all duration-1000 ease-out">
          {/* Chart Wrapper with Glass Effect */}
          <div className="w-full lg:w-1/3 flex flex-col items-center bg-white/40 backdrop-blur-md p-6 rounded-2xl border border-white/60 shadow-sm">
            <h3 className="text-xl font-semibold text-stone-800 mb-6 text-center">Project Distribution by Sector</h3>
            <div className="chart-container relative w-full h-[300px]">
              <canvas ref={sectorChartRef} id="sectorChart"></canvas>
            </div>
            <p className="text-xs text-stone-500 mt-4 text-center italic">Click a segment to filter projects. Click the same segment or outer canvas space to reset.</p>
          </div>

          {/* Dynamic Filter Projects Grid Output */}
          <div className="w-full lg:w-2/3">
            <div className="flex justify-between items-end mb-6 border-b border-stone-200/60 pb-3">
              <h3 className="text-xl font-semibold text-stone-800">Project Highlights</h3>
              <button 
                onClick={() => setActiveFilter(null)}
                className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-300 ${activeFilter ? 'bg-amber-100 text-amber-700 border border-amber-300/30 hover:bg-amber-200' : 'bg-stone-100 text-stone-600 cursor-default'}`}
              >
                {activeFilter ? `Viewing: ${activeFilter} (Clear X)` : "Viewing All Sectors"}
              </button>
            </div>
            
            <div id="projectList" className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[350px]">
              {filteredProjects.map((p) => (
                <div 
                  key={p.id} 
                  className="project-card bg-white/40 backdrop-blur-sm p-6 rounded-xl border border-white/60 shadow-sm flex flex-col h-full transform transition-all duration-500 cubic-bezier(0.4,0,0.2,1) hover:-translate-y-1.5 hover:bg-white/80 hover:shadow-md animate-[fadeIn_0.5s_ease-out_forwards]"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-3xl filter drop-shadow-sm">{p.icon}</div>
                    <span className="text-[10px] font-bold px-2 py-1 bg-stone-200/50 text-stone-700 rounded-md tracking-wider uppercase">{p.sector}</span>
                  </div>
                  <h4 className="text-lg font-bold text-stone-900 mb-2">{p.title}</h4>
                  <p className="text-sm text-stone-600 mb-4 flex-grow leading-relaxed">{p.desc}</p>
                  <div className="text-sm font-bold text-amber-700 pt-3 border-t border-stone-100/50 flex justify-between items-center">
                    <span>Budget:</span> <span>{p.budget}</span>
                  </div>
                </div>
              ))}
              {filteredProjects.length === 0 && (
                <p className="text-stone-500 col-span-2 text-center py-12 bg-white/20 rounded-xl border border-dashed border-stone-300">No projects found for this sector.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- Expertise Analytics Deep-Dive Section --- */}
      <section id="expertise" className="py-20 bg-stone-900 text-stone-50 border-t border-stone-800 relative z-10 shadow-[inner_0_4px_30px_rgba(0,0,0,0.2)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-reveal opacity-0 translate-y-8 transition-all duration-1000 ease-out">
          <div className="mb-12 max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-4">Expertise & Analytics</h2>
            <p className="text-lg text-stone-400">
              This section quantifies technical capabilities and core competencies. The visualizations below provide a data-driven breakdown of proficiency in industry-standard software tools and a holistic view of multifaceted engineering skills, allowing for an objective assessment of capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Horizontal Bar Glass Card */}
            <div className="bg-stone-800/40 backdrop-blur-md p-6 rounded-2xl border border-stone-700/50 shadow-2xl hover:border-amber-500/30 transition-all duration-500">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">Software Proficiency Index</h3>
              <div className="chart-container relative w-full h-[320px]">
                <canvas ref={softwareChartRef} id="softwareChart"></canvas>
              </div>
            </div>

            {/* Radar Chart Glass Card */}
            <div className="bg-stone-800/40 backdrop-blur-md p-6 rounded-2xl border border-stone-700/50 shadow-2xl hover:border-amber-500/30 transition-all duration-500">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">Core Competencies Radar</h3>
              <div className="chart-container relative w-full h-[320px]">
                <canvas ref={competencyChartRef} id="competencyChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Call-To-Action Consultation Section --- */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center relative z-10 scroll-reveal opacity-0 translate-y-8 transition-all duration-1000 ease-out">
        <h2 className="text-3xl font-bold text-stone-900 mb-6">Initiate a Consultation</h2>
        <p className="text-lg text-stone-600 mb-8">
          Ready to discuss structural requirements, project feasibility, or require expert oversight for your next development? Access direct communication channels below.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="mailto:consultant@structura.com" className="px-8 py-4 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-600/20 group">
            <span className="group-hover:rotate-12 transition-transform duration-300">✉️</span> Email Consultant
          </a>
          <a href="#callback" className="px-8 py-4 bg-stone-900 text-white font-bold rounded-lg hover:bg-stone-800 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-stone-900/20 group">
            <span className="group-hover:translate-x-1 transition-transform duration-300">📞</span> Request Call Back
          </a>
        </div>
      </section>

      {/* --- Structural Footer --- */}
      <footer className="bg-stone-950 py-8 text-center text-stone-500 text-sm border-t border-stone-900/60 relative z-10">
        <p>&copy; 2026 Structura Engineering Consulting. Interactive Portfolio Report.</p>
      </footer>
    </div>
  );
}