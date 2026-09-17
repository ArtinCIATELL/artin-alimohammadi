// ============================================================
// ARTIN DAVARANI — Portfolio 2026
// Modern ES module entry • Three.js background • i18n • Form validation
// ============================================================

import * as THREE from 'three';

const PortfolioApp = (() => {
    /* ---------------------------------------------------- State */
    const state = {
        currentLang: localStorage.getItem('lang') || 'fa',
        theme: localStorage.getItem('theme') || 'light',
        skills: [
            { id: 1, name: { fa: 'برنامه‌نویسی C/C++',   en: 'C / C++' },         level: 92, icon: '⚙️' },
            { id: 2, name: { fa: 'Arduino & ESP32',      en: 'Arduino & ESP32' }, level: 95, icon: '🤖' },
            { id: 3, name: { fa: 'Python',               en: 'Python' },          level: 85, icon: '🐍' },
            { id: 4, name: { fa: 'IoT & Smart Home',     en: 'IoT & Smart Home' },level: 90, icon: '🏠' },
            { id: 5, name: { fa: 'JavaScript / Web',     en: 'JavaScript / Web' },level: 80, icon: '🌐' },
            { id: 6, name: { fa: 'طراحی الکترونیک',     en: 'Electronics Design' }, level: 78, icon: '🔌' },
        ],
        messages: JSON.parse(localStorage.getItem('messages') || '[]'),
        visits: parseInt(localStorage.getItem('visits') || '0', 10),
    };

    /* -------------------------------------------------- i18n */
    const translations = {
        fa: {
            home: 'خانه', about: 'درباره من', skills: 'مهارت‌ها', experience: 'تجربیات',
            achievements: 'دستاوردها', contact: 'تماس',
            heroEyebrow: 'قهرمان بین‌المللی روباتیک',
            heroTitleLine1: 'آرتین علی محمدی',
            heroTitleLine2: 'داورانی',
            heroSubtitle: 'طراح و توسعه‌دهنده‌ی سامانه‌های هوشمند خانگی و روبات‌های مسابقه‌ای — برنده‌ی مدال‌های بین‌المللی در FIRA و Z-Tech.',
            medals: 'مدال قهرمانی', competitions: 'مسابقه بین‌المللی', yearsExperience: 'سال تجربه',
            viewAchievements: 'مشاهده دستاوردها', getInTouch: 'تماس با من',

            aboutMe: 'درباره من',
            aboutDescription: 'آرتین علی محمدی داورانی هستم؛ علاقه‌مند به روباتیک، خانه‌ی هوشمند و توسعه‌ی نرم‌افزار. در طول مسیرم، در سه مسابقه‌ی بین‌المللی موفق به کسب مدال شده‌ام و در ساخت سامانه‌های Smart Home و روبات‌های مسابقه‌ای Air تخصص دارم.',
            highlight1: 'طراحی روبات‌های مسابقه‌ای',
            highlight2: 'سامانه‌های خانه هوشمند',
            highlight3: 'برنامه‌نویسی Embedded',
            highlight4: 'رابط کاربری مدرن',
            techStackTitle: 'جعبه‌ابزار من',
            bentoCta: 'بیا با هم بسازیم',

            mySkills: 'مهارت‌های من',
            workExperience: 'تجربیات و فعالیت‌ها',
            exp1Title: 'عضو تیم ملی روباتیک', exp1Org: 'مسابقات FIRA',
            expDesc1: 'طراحی، ساخت و برنامه‌نویسی روبات‌های مسابقه‌ای در رشته‌های Smart Home و Air با تمرکز بر بهینه‌سازی الگوریتم‌های کنترلی.',
            exp2Title: 'توسعه‌دهنده سامانه هوشمند', exp2Org: 'پروژه‌های شخصی',
            expDesc2: 'طراحی سامانه‌های خانه هوشمند مبتنی بر ESP32 و Raspberry Pi با رابط کاربری وب و ادغام پروتکل‌های MQTT و Zigbee.',
            exp3Title: 'آغاز فعالیت در روباتیک', exp3Org: 'دوره‌های آموزشی',
            expDesc3: 'شروع یادگیری مفاهیم پایه‌ی الکترونیک، مکانیک و برنامه‌نویسی میکروکنترلرها به همراه شرکت در مسابقات داخلی.',

            myAchievements: 'دستاوردهای من',
            achievementsSubtitle: 'برترین افتخارات کسب‌شده در مسابقات بین‌المللی روباتیک',
            rankFirst: 'مقام اول', rankSecond: 'مقام دوم', rankThird: 'مقام سوم',
            ach1Title: 'رشته‌ی Smart Home',
            ach1Desc:  'کسب مقام اول در رشته‌ی خانه‌ی هوشمند در مسابقات بین‌المللی Z-Tech کانادا ۲۰۲۴.',
            ach2Title: 'رشته‌ی Smart Home',
            ach2Desc:  'کسب مقام اول در رشته‌ی خانه‌ی هوشمند در مسابقات FIRA ایران ۲۰۲۵.',
            ach3Title: 'رشته‌ی Air',
            ach3Desc:  'کسب مقام دوم در رشته‌ی Air در مسابقات FIRA کره‌ی جنوبی ۲۰۲۵.',

            email: 'ایمیل', phone: 'شماره تماس', location: 'محل سکونت',
            city: 'تهران، ایران', availability: 'وضعیت', availableForWork: 'آماده همکاری',
            nameLabel: 'نام و نام خانوادگی',
            emailLabel: 'ایمیل (الزاماً @gmail.com)',
            phoneLabel: 'شماره موبایل (مثال: 09120000000)',
            subjectLabel: 'موضوع (اختیاری)',
            messageLabel: 'پیام شما',
            sendMessage: 'ارسال پیام',

            copyright: '© ۲۰۲۶ Artin Ali Mohammadi Davarani — تمامی حقوق محفوظ است.',

            messageSent: 'پیام شما با موفقیت ارسال شد!',
            errName: 'لطفاً نام خود را وارد کنید (حداقل ۲ حرف).',
            errEmail: 'ایمیل باید معتبر و حتماً با @gmail.com تمام شود.',
            errPhone: 'شماره موبایل ایرانی معتبر وارد کنید (مثال: 09120000000).',
            errMessage: 'پیام باید حداقل ۱۰ حرف باشد.',
        },
        en: {
            home: 'Home', about: 'About', skills: 'Skills', experience: 'Experience',
            achievements: 'Achievements', contact: 'Contact',
            heroEyebrow: 'International Robotics Champion',
            heroTitleLine1: 'Artin Ali Mohammadi',
            heroTitleLine2: 'Davarani',
            heroSubtitle: 'Designer & developer of smart‑home systems and competition robots — international medalist at FIRA and Z‑Tech.',
            medals: 'Championship Medals', competitions: 'Int. Competitions', yearsExperience: 'Years Experience',
            viewAchievements: 'View Achievements', getInTouch: 'Get In Touch',

            aboutMe: 'About Me',
            aboutDescription: 'I am Artin Ali Mohammadi Davarani — passionate about robotics, smart homes and software development. I have won medals at three international competitions and specialise in building Smart Home systems and Air‑category competition robots.',
            highlight1: 'Competition Robot Design',
            highlight2: 'Smart Home Systems',
            highlight3: 'Embedded Programming',
            highlight4: 'Modern UI Design',
            techStackTitle: 'My Toolbox',
            bentoCta: "Let's Build Together",

            mySkills: 'My Skills',
            workExperience: 'Experience & Activities',
            exp1Title: 'National Robotics Team', exp1Org: 'FIRA Competitions',
            expDesc1: 'Design, build and programming of competition robots in Smart Home and Air categories, focused on optimising control algorithms.',
            exp2Title: 'Smart Home Developer', exp2Org: 'Personal Projects',
            expDesc2: 'ESP32 & Raspberry Pi based smart‑home systems with web UIs and MQTT / Zigbee integration.',
            exp3Title: 'Robotics Journey Begins', exp3Org: 'Training Courses',
            expDesc3: 'Learning the fundamentals of electronics, mechanics and microcontroller programming, plus participating in local contests.',

            myAchievements: 'My Achievements',
            achievementsSubtitle: 'Top honours earned at international robotics competitions',
            rankFirst: '1st Place', rankSecond: '2nd Place', rankThird: '3rd Place',
            ach1Title: 'Smart Home Category',
            ach1Desc:  '1st place in the Smart Home category at the international Z‑Tech Canada 2024 competition.',
            ach2Title: 'Smart Home Category',
            ach2Desc:  '1st place in the Smart Home category at FIRA Iran 2025.',
            ach3Title: 'Air Category',
            ach3Desc:  '2nd place in the Air category at FIRA South Korea 2025.',

            email: 'Email', phone: 'Phone', location: 'Location',
            city: 'Tehran, Iran', availability: 'Status', availableForWork: 'Available for work',
            nameLabel: 'Full Name',
            emailLabel: 'Email (must end with @gmail.com)',
            phoneLabel: 'Mobile (e.g. 09120000000)',
            subjectLabel: 'Subject (optional)',
            messageLabel: 'Your Message',
            sendMessage: 'Send Message',

            copyright: '© 2026 Artin Ali Mohammadi Davarani — All rights reserved.',

            messageSent: 'Your message has been sent successfully!',
            errName: 'Please enter your name (at least 2 characters).',
            errEmail: 'Email must be valid and end with @gmail.com.',
            errPhone: 'Enter a valid Iranian mobile (e.g. 09120000000).',
            errMessage: 'Message must be at least 10 characters.',
        }
    };

    /* -------------------------------------------------- DOM */
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);
    const els = {};

    /* -------------------------------------------------- Init */
    // Run a non-critical step without letting its failure break the rest of the page.
    function safe(label, fn) {
        try { return fn(); }
        catch (err) { console.warn('[init] ' + label + ' failed:', err); }
    }

    function init() {
        try {
            cacheDom();
            safe('theme',          () => applyTheme(state.theme, /*silent*/ true));
            safe('language',       () => applyLanguage(state.currentLang, /*silent*/ true));
            safe('visits',         bumpVisits);
            safe('skills',         renderSkills);
            safe('events',         attachEvents);
            safe('reveal',         setupReveal);
            safe('counters',       animateCounters);
            safe('hero3D',         initHeroScene);   // WebGL/Three.js — optional eye-candy, must never block the page
            safe('cursorGlow',     initCursorGlow);
            safe('tilt',           initTilt);
            safe('magnetic',       initMagnetic);
            safe('scrollProgress', initScrollProgress);
            safe('spotlight',      initSpotlight);
            safe('scrollSpy',      initScrollSpy);
            safe('backToTop',      initBackToTop);
        } finally {
            // Always reveal the page, even if an init step above threw.
            hideLoader();
        }
    }

    function cacheDom() {
        els.loader      = $('#loader');
        els.themeBtn    = $('#theme-toggle');
        els.langBtn     = $('#lang-toggle');
        els.adminBtn    = $('#admin-btn');
        els.menuToggle  = $('.menu-toggle');
        els.navMenu     = $('.nav-menu');
        els.contactForm = $('#contact-form');
        els.toast       = $('#toast');
        els.toastMsg    = $('#toast-message');
        els.skillsHost  = $('#skills-container');
        els.bgCanvas    = $('#bg-canvas');
        els.heroCanvas  = $('#hero-canvas');
        els.cursorGlow  = $('#cursor-glow');
        els.msgCounter  = $('#message-counter');
    }

    function bumpVisits() {
        state.visits += 1;
        localStorage.setItem('visits', String(state.visits));
        localStorage.setItem('lastVisit', new Date().toISOString());
    }

    /* -------------------------------------------------- Theme */
    function applyTheme(theme, silent = false) {
        state.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) metaTheme.content = theme === 'dark' ? '#061826' : '#FBF6EC';
        if (!silent) showToast(theme === 'dark' ? '🌙 حالت تیره' : '☀ حالت روشن', 'info');
    }

    function toggleTheme(e) {
        const next = state.theme === 'light' ? 'dark' : 'light';

        // View Transitions API: circular reveal from the toggle button (2026)
        if (!document.startViewTransition ||
            matchMedia('(prefers-reduced-motion: reduce)').matches) {
            applyTheme(next);
            return;
        }

        const x = e?.clientX ?? window.innerWidth / 2;
        const y = e?.clientY ?? 40;
        const radius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        const vt = document.startViewTransition(() => applyTheme(next));
        vt.ready.then(() => {
            document.documentElement.animate(
                { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
                { duration: 600, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' }
            );
        }).catch(() => {});
    }

    /* -------------------------------------------------- Language */
    function applyLanguage(lang, silent = false) {
        state.currentLang = lang;
        localStorage.setItem('lang', lang);

        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', lang === 'fa' ? 'rtl' : 'ltr');

        const dict = translations[lang];
        $$('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) el.textContent = dict[key];
        });
        $$('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[key]) el.placeholder = dict[key];
        });

        if (els.langBtn) els.langBtn.textContent = lang === 'fa' ? 'EN' : 'FA';
        renderSkills();
        if (!silent) showToast(lang === 'fa' ? 'زبان: فارسی' : 'Language: English', 'info');
    }

    function toggleLanguage() {
        applyLanguage(state.currentLang === 'fa' ? 'en' : 'fa');
    }

    /* -------------------------------------------------- Events */
    function attachEvents() {
        els.themeBtn?.addEventListener('click', toggleTheme);
        els.langBtn?.addEventListener('click', toggleLanguage);
        els.adminBtn?.addEventListener('click', () => { window.location.href = 'admin.html'; });
        els.menuToggle?.addEventListener('click', () => els.navMenu.classList.toggle('active'));

        // Smooth nav scroll + close mobile menu
        $$('a[href^="#"]').forEach(a => {
            a.addEventListener('click', (e) => {
                const id = a.getAttribute('href');
                if (id.length > 1) {
                    const t = document.querySelector(id);
                    if (t) {
                        e.preventDefault();
                        t.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        els.navMenu?.classList.remove('active');
                    }
                }
            });
        });

        // Contact form
        els.contactForm?.addEventListener('submit', handleContactSubmit);
        attachLiveValidation();

        // Header shadow on scroll
        const header = $('.header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 8) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        }, { passive: true });
    }

    /* -------------------------------------------------- Skills render */
    function escapeHtml(value) {
        return String(value ?? '').replace(/[&<>"']/g, c => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[c]));
    }

    function renderSkills() {
        if (!els.skillsHost) return;
        els.skillsHost.innerHTML = '';
        state.skills.forEach((s, idx) => {
            const card = document.createElement('div');
            card.className = 'skill-card reveal';
            card.style.transitionDelay = `${idx * 80}ms`;
            card.innerHTML = `
                <div class="skill-header">
                    <span class="skill-icon">${escapeHtml(s.icon)}</span>
                    <h3 class="skill-title">${escapeHtml(s.name[state.currentLang])}</h3>
                </div>
                <div class="skill-progress"><div class="skill-progress-bar" style="width:0%"></div></div>
                <div class="skill-percentage">${Number(s.level) || 0}%</div>
            `;
            els.skillsHost.appendChild(card);
            // 2026 layer: tilt + glare + spotlight on dynamic cards
            enhanceTilt(card);
            enhanceSpotlight(card);
            // Animate bar
            requestAnimationFrame(() => {
                setTimeout(() => {
                    const bar = card.querySelector('.skill-progress-bar');
                    if (bar) bar.style.width = `${s.level}%`;
                }, 400 + idx * 80);
            });
            // Observe for reveal
            revealObserver?.observe(card);
        });
    }

    /* -------------------------------------------------- Reveal on scroll */
    let revealObserver;
    function setupReveal() {
        const targets = $$('.achievement-card, .timeline-content, .bento-card, .tech-item, .contact-item, .section-title, .section-subtitle, .skill-card');
        targets.forEach(t => t.classList.add('reveal'));

        revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(en => {
                if (en.isIntersecting) {
                    en.target.classList.add('in');
                    revealObserver.unobserve(en.target);
                    // پس از پایان reveal کلاسش حذف شود تا transition کند آن،
                    // پاسخ‌دهی tilt را روی همین کارت کند نکند
                    const clear = (ev) => {
                        if (ev.target !== en.target) return;
                        en.target.classList.remove('reveal', 'in');
                        en.target.style.transitionDelay = '';
                        en.target.removeEventListener('transitionend', clear);
                    };
                    en.target.addEventListener('transitionend', clear);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        targets.forEach(t => revealObserver.observe(t));
    }

    /* -------------------------------------------------- Counters */
    function animateCounters() {
        $$('.stat-number').forEach(el => {
            const target = parseInt(el.getAttribute('data-count') || '0', 10);
            const dur = 1800;
            let start = null;
            const tick = (t) => {
                if (!start) start = t;
                const p = Math.min((t - start) / dur, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.floor(eased * target).toString();
                if (p < 1) requestAnimationFrame(tick);
                else el.textContent = target.toString();
            };
            requestAnimationFrame(tick);
        });
    }

    /* -------------------------------------------------- Cursor glow */
    function initCursorGlow() {
        if (!els.cursorGlow || matchMedia('(hover: none)').matches) {
            els.cursorGlow?.remove();
            return;
        }
        let tx = 0, ty = 0, x = 0, y = 0;
        window.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; }, { passive: true });
        const loop = () => {
            x += (tx - x) * 0.12;
            y += (ty - y) * 0.12;
            els.cursorGlow.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
            requestAnimationFrame(loop);
        };
        loop();
    }

    /* -------------------------------------------------- Three.js: Rescue Robot (Hero) */
    function initHeroScene() {
        if (!els.heroCanvas) return;

        // ربات همیشه ساخته و نمایش داده می‌شود.
        // اگر کاربر «کاهش انیمیشن» را روشن کرده باشد، فقط حرکت متوقف می‌شود
        // و یک فریم ثابت رندر می‌گردد — نه اینکه کل ربات حذف شود.
        const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

        const canvas = els.heroCanvas;
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        const size = () => Math.min(canvas.parentElement.clientWidth, canvas.parentElement.clientHeight);
        const resize = () => {
            const s = size();
            renderer.setSize(s, s, false);
        };
        resize();

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
        camera.position.set(0, 1.2, 8.5);
        camera.lookAt(0, 0.4, 0);

        // ---- Lighting ----
        scene.add(new THREE.AmbientLight(0xffffff, 0.55));
        const key = new THREE.DirectionalLight(0xffffff, 1.25);
        key.position.set(4, 6, 5);
        key.castShadow = true;
        scene.add(key);
        const rim = new THREE.PointLight(0xD87B5C, 2.5, 30);
        rim.position.set(-4, 2, 3);
        scene.add(rim);
        const fill = new THREE.PointLight(0x5B8A8B, 1.5, 20);
        fill.position.set(3, -2, 4);
        scene.add(fill);

        // ---- Material library ----
        const matBody = new THREE.MeshStandardMaterial({
            color: 0xF4ECDA, metalness: 0.35, roughness: 0.45,
        });
        const matAccent = new THREE.MeshStandardMaterial({
            color: 0xD54B3F, metalness: 0.5, roughness: 0.35,
            emissive: 0xD54B3F, emissiveIntensity: 0.18,
        });
        const matDark = new THREE.MeshStandardMaterial({
            color: 0x0A2540, metalness: 0.6, roughness: 0.3,
        });
        const matGold = new THREE.MeshStandardMaterial({
            color: 0xC8A45C, metalness: 0.85, roughness: 0.25,
        });
        const matGlass = new THREE.MeshStandardMaterial({
            color: 0x76C8C0, metalness: 0.2, roughness: 0.1,
            emissive: 0x5B8A8B, emissiveIntensity: 0.5,
            transparent: true, opacity: 0.92,
        });
        const matEye = new THREE.MeshStandardMaterial({
            color: 0xff5a4a, emissive: 0xff5a4a, emissiveIntensity: 1.6,
        });
        const matTread = new THREE.MeshStandardMaterial({
            color: 0x1a1a1f, metalness: 0.5, roughness: 0.7,
        });

        // ---- ROBOT GROUP ----
        const robot = new THREE.Group();
        scene.add(robot);

        // Tracks / base
        const trackGeo = new THREE.BoxGeometry(0.55, 0.55, 2.2);
        const trackL = new THREE.Mesh(trackGeo, matTread);
        const trackR = new THREE.Mesh(trackGeo, matTread);
        trackL.position.set(-0.95, -1.55, 0);
        trackR.position.set(0.95, -1.55, 0);
        robot.add(trackL, trackR);

        // Wheels on each track
        const wheelGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.18, 24);
        wheelGeo.rotateZ(Math.PI / 2);
        const wheels = [];
        for (let side of [-1, 1]) {
            for (let z of [-0.75, 0, 0.75]) {
                const w = new THREE.Mesh(wheelGeo, matGold);
                w.position.set(side * 0.95, -1.55, z);
                robot.add(w);
                wheels.push(w);
            }
        }

        // Lower hull
        const hull = new THREE.Mesh(
            new THREE.BoxGeometry(2.3, 0.7, 1.9),
            matBody
        );
        hull.position.y = -1.0;
        robot.add(hull);

        // Body (chassis)
        const bodyShape = new THREE.BoxGeometry(1.7, 1.6, 1.5);
        // soften with extra geometry
        const body = new THREE.Mesh(bodyShape, matBody);
        body.position.y = 0.1;
        robot.add(body);

        // Chest emblem — red cross (medical / rescue)
        const crossV = new THREE.Mesh(
            new THREE.BoxGeometry(0.18, 0.7, 0.06),
            matAccent
        );
        const crossH = new THREE.Mesh(
            new THREE.BoxGeometry(0.7, 0.18, 0.06),
            matAccent
        );
        crossV.position.set(0, 0.2, 0.78);
        crossH.position.set(0, 0.2, 0.78);
        robot.add(crossV, crossH);

        // Chest panel light
        const panel = new THREE.Mesh(
            new THREE.BoxGeometry(0.45, 0.16, 0.05),
            matGlass
        );
        panel.position.set(0, -0.35, 0.78);
        robot.add(panel);

        // Neck
        const neck = new THREE.Mesh(
            new THREE.CylinderGeometry(0.22, 0.28, 0.3, 16),
            matDark
        );
        neck.position.y = 1.05;
        robot.add(neck);

        // Head
        const head = new THREE.Group();
        head.position.y = 1.55;
        robot.add(head);

        const headBox = new THREE.Mesh(
            new THREE.BoxGeometry(1.2, 0.95, 1.05),
            matBody
        );
        head.add(headBox);

        // Visor (eye band)
        const visor = new THREE.Mesh(
            new THREE.BoxGeometry(1.05, 0.32, 0.08),
            matDark
        );
        visor.position.set(0, 0.08, 0.53);
        head.add(visor);

        // Two glowing eyes
        const eyeGeo = new THREE.SphereGeometry(0.085, 16, 16);
        const eyeL = new THREE.Mesh(eyeGeo, matEye);
        const eyeR = new THREE.Mesh(eyeGeo, matEye);
        eyeL.position.set(-0.27, 0.08, 0.58);
        eyeR.position.set(0.27, 0.08, 0.58);
        head.add(eyeL, eyeR);

        // Ears / speakers
        const earGeo = new THREE.BoxGeometry(0.12, 0.4, 0.4);
        const earL = new THREE.Mesh(earGeo, matDark);
        const earR = new THREE.Mesh(earGeo, matDark);
        earL.position.set(-0.66, 0, 0);
        earR.position.set(0.66, 0, 0);
        head.add(earL, earR);

        // Antenna
        const antBase = new THREE.Mesh(
            new THREE.CylinderGeometry(0.05, 0.07, 0.5, 12),
            matDark
        );
        antBase.position.set(0, 0.74, 0);
        head.add(antBase);
        const antTip = new THREE.Mesh(
            new THREE.SphereGeometry(0.09, 16, 16),
            matEye
        );
        antTip.position.set(0, 1.05, 0);
        head.add(antTip);

        // Arms (shoulder + upper + lower + claw)
        function buildArm(side) {
            const arm = new THREE.Group();
            arm.position.set(side * 1.05, 0.5, 0);

            const shoulder = new THREE.Mesh(
                new THREE.SphereGeometry(0.28, 18, 18),
                matGold
            );
            arm.add(shoulder);

            const upper = new THREE.Mesh(
                new THREE.BoxGeometry(0.32, 0.85, 0.32),
                matBody
            );
            upper.position.y = -0.5;
            arm.add(upper);

            const elbow = new THREE.Mesh(
                new THREE.SphereGeometry(0.18, 16, 16),
                matDark
            );
            elbow.position.y = -1;
            arm.add(elbow);

            const lower = new THREE.Mesh(
                new THREE.BoxGeometry(0.28, 0.75, 0.28),
                matBody
            );
            lower.position.y = -1.45;
            arm.add(lower);

            // Claw / gripper
            const clawBase = new THREE.Mesh(
                new THREE.BoxGeometry(0.35, 0.2, 0.32),
                matDark
            );
            clawBase.position.y = -1.9;
            arm.add(clawBase);

            const finger1 = new THREE.Mesh(
                new THREE.BoxGeometry(0.06, 0.25, 0.1),
                matGold
            );
            const finger2 = finger1.clone();
            finger1.position.set(-0.13, -2.1, 0);
            finger2.position.set(0.13, -2.1, 0);
            arm.add(finger1, finger2);

            return arm;
        }
        const armL = buildArm(-1);
        const armR = buildArm(1);
        robot.add(armL, armR);

        // Shoulder pads
        const padL = new THREE.Mesh(
            new THREE.BoxGeometry(0.45, 0.3, 0.6),
            matAccent
        );
        const padR = padL.clone();
        padL.position.set(-1.05, 0.85, 0);
        padR.position.set(1.05, 0.85, 0);
        robot.add(padL, padR);

        // Ground reflection disc (subtle)
        const disc = new THREE.Mesh(
            new THREE.CircleGeometry(1.7, 48),
            new THREE.MeshStandardMaterial({
                color: 0x0A2540, roughness: 0.25, metalness: 0.6,
                transparent: true, opacity: 0.18,
            })
        );
        disc.rotation.x = -Math.PI / 2;
        disc.position.y = -1.9;
        scene.add(disc);

        // ---- Auto-framing ----
        // دوربین به‌جای مقدار ثابت، از روی اندازه‌ی واقعی ربات محاسبه می‌شود تا
        // روی هر اندازه‌ی صفحه‌ای کل ربات کامل داخل کادر بماند و از پایین بریده نشود.
        // ربات در انیمیشن حدود ‎±۰٫۷ رادیان تاب می‌خورد، پس بیشترین پهنای همان
        // بازه (نه یک دور کامل) محاسبه می‌شود تا کادر بی‌جهت باز نشود.
        const MAX_YAW = 0.75;
        const frameCamera = () => {
            const box = new THREE.Box3().setFromObject(robot);
            const center = box.getCenter(new THREE.Vector3());
            const ax = robot.position.x, az = robot.position.z;   // محور چرخش

            let halfW = 0, zNear = -Infinity;
            for (const cx of [box.min.x, box.max.x]) {
                for (const cz of [box.min.z, box.max.z]) {
                    const dx = cx - ax, dz = cz - az;
                    for (let k = -4; k <= 4; k++) {
                        const a = (MAX_YAW * k) / 4;
                        const sin = Math.sin(a), cos = Math.cos(a);
                        halfW = Math.max(halfW, Math.abs(dx * cos + dz * sin));
                        zNear = Math.max(zNear, -dx * sin + dz * cos);
                    }
                }
            }
            const halfH = (box.max.y - box.min.y) / 2 + 0.15;   // ‎+ نوسانِ شناوری

            const FILL = 0.985;                                  // حاشیه‌ی امن دورتادور
            const vFov = (camera.fov * Math.PI) / 180;
            const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);

            const depth = (az + zNear) - center.z;               // نزدیک‌ترین لبه به دوربین
            const dist = depth + Math.max(
                halfW / Math.tan((hFov / 2) * FILL),
                halfH / Math.tan((vFov / 2) * FILL)
            );

            camera.position.set(center.x, center.y, center.z + dist);
            camera.lookAt(center);
            camera.updateProjectionMatrix();
            camera.updateMatrixWorld();
        };
        frameCamera();

        // ---- Theme reactivity ----
        const applyTheme = () => {
            const dark = state.theme === 'dark';
            matBody.color.setHex(dark ? 0xE8DCC1 : 0xF4ECDA);
            matDark.color.setHex(dark ? 0x143352 : 0x0A2540);
            matGold.color.setHex(dark ? 0xE5B962 : 0xC8A45C);
            matGlass.color.setHex(dark ? 0x76C8C0 : 0x5B8A8B);
            matGlass.emissive.setHex(dark ? 0x76C8C0 : 0x5B8A8B);
            disc.material.color.setHex(dark ? 0xF4ECDA : 0x0A2540);
            rim.color.setHex(dark ? 0xFF9776 : 0xD87B5C);
            fill.color.setHex(dark ? 0x76C8C0 : 0x5B8A8B);
        };
        applyTheme();
        new MutationObserver(applyTheme)
            .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

        // ---- Interaction (look-at pointer) ----
        let mx = 0, my = 0, tmx = 0, tmy = 0;
        canvas.parentElement.addEventListener('pointermove', (e) => {
            const r = canvas.getBoundingClientRect();
            tmx = ((e.clientX - r.left) / r.width - 0.5) * 1.4;
            tmy = ((e.clientY - r.top) / r.height - 0.5) * 1.4;
        });
        canvas.parentElement.addEventListener('pointerleave', () => { tmx = 0; tmy = 0; });

        window.addEventListener('resize', () => { resize(); frameCamera(); });

        // ---- Animate ----
        const clock = new THREE.Clock();
        let hoverPhase = 0;
        const render = () => {
            const dt = Math.min(clock.getDelta(), 0.05);
            const t = clock.elapsedTime;
            hoverPhase += dt;

            mx += (tmx - mx) * 0.08;
            my += (tmy - my) * 0.08;

            // Whole robot gentle hover + rotation
            robot.rotation.y = mx * 0.6 + Math.sin(t * 0.6) * 0.18;
            robot.position.y = Math.sin(hoverPhase * 1.5) * 0.08;

            // Head tracks pointer
            head.rotation.y = mx * 0.5 - Math.sin(t * 0.6) * 0.18;
            head.rotation.x = -my * 0.3;

            // Wheels spin a touch
            wheels.forEach((w) => { w.rotation.x += dt * 1.2; });

            // Antenna sway + blink
            antTip.scale.setScalar(1 + Math.sin(t * 4) * 0.15);
            antTip.material.emissiveIntensity = 1.2 + Math.sin(t * 4) * 0.6;

            // Eye pulse
            const pulse = 0.7 + Math.sin(t * 3) * 0.3;
            eyeL.material.emissiveIntensity = 1.2 + pulse * 0.6;
            eyeR.material.emissiveIntensity = 1.2 + pulse * 0.6;

            // Arms slight swing
            armL.rotation.x = Math.sin(t * 1.2) * 0.12;
            armR.rotation.x = -Math.sin(t * 1.2) * 0.12;

            renderer.render(scene, camera);
            if (!reduceMotion) requestAnimationFrame(render);
        };
        render();

        // در حالت کاهش انیمیشن، با تغییر اندازه‌ی پنجره یک فریم تازه رندر کن
        if (reduceMotion) {
            window.addEventListener('resize', () => {
                resize();
                renderer.render(scene, camera);
            });
        }
    }

    /* -------------------------------------------------- Form validation */
    const VALIDATORS = {
        name:    (v) => v.trim().length >= 2,
        email:   (v) => /^[a-zA-Z0-9._%+\-]+@gmail\.com$/.test(v.trim()),
        phone:   (v) => /^(\+?98|0)?9\d{9}$/.test(v.trim().replace(/\s+/g, '')),
        message: (v) => v.trim().length >= 10,
    };
    const ERR_KEYS = { name: 'errName', email: 'errEmail', phone: 'errPhone', message: 'errMessage' };

    function validateField(field) {
        const input = document.getElementById(field);
        if (!input) return true;
        const group = input.closest('.form-group');
        const errEl = group?.querySelector('.form-error');
        const ok = VALIDATORS[field] ? VALIDATORS[field](input.value) : true;
        if (!ok) {
            group?.classList.add('has-error');
            if (errEl) errEl.textContent = translations[state.currentLang][ERR_KEYS[field]] || '';
        } else {
            group?.classList.remove('has-error');
            if (errEl) errEl.textContent = '';
        }
        return ok;
    }

    function attachLiveValidation() {
        ['name', 'email', 'phone', 'message'].forEach(field => {
            const el = document.getElementById(field);
            if (!el) return;
            el.addEventListener('blur', () => validateField(field));
            el.addEventListener('input', () => {
                if (el.closest('.form-group')?.classList.contains('has-error')) validateField(field);
            });
        });
        // Message counter
        const msg = document.getElementById('message');
        if (msg && els.msgCounter) {
            const update = () => {
                els.msgCounter.textContent = `${msg.value.length} / ${msg.maxLength}`;
            };
            msg.addEventListener('input', update);
            update();
        }
    }

    function handleContactSubmit(e) {
        e.preventDefault();
        const okName    = validateField('name');
        const okEmail   = validateField('email');
        const okPhone   = validateField('phone');
        const okMessage = validateField('message');
        if (!(okName && okEmail && okPhone && okMessage)) {
            showToast(translations[state.currentLang].errEmail || 'خطا در فرم', 'error');
            return;
        }

        const fd = new FormData(els.contactForm);
        const payload = {
            id: Date.now(),
            name:    fd.get('name')?.toString().trim(),
            email:   fd.get('email')?.toString().trim(),
            phone:   fd.get('phone')?.toString().trim(),
            subject: fd.get('subject')?.toString().trim() || '',
            message: fd.get('message')?.toString().trim(),
            timestamp: new Date().toISOString(),
            read: false,
        };

        state.messages.push(payload);
        localStorage.setItem('messages', JSON.stringify(state.messages));

        showToast(translations[state.currentLang].messageSent, 'success');
        els.contactForm.reset();
        if (els.msgCounter) els.msgCounter.textContent = '0 / 1000';
    }

    /* -------------------------------------------------- Toast */
    function showToast(text, type = 'info') {
        if (!els.toast || !els.toastMsg) return;
        els.toastMsg.textContent = text;
        els.toast.className = `toast show ${type}`;
        clearTimeout(showToast._t);
        showToast._t = setTimeout(() => els.toast.classList.remove('show'), 3200);
    }

    /* -------------------------------------------------- 3D Tilt + Glare */
    const tiltBound = new WeakSet();

    function enhanceTilt(card) {
        if (tiltBound.has(card) || matchMedia('(hover: none)').matches) return;
        tiltBound.add(card);
        card.classList.add('tilt');

        const MAX = 8; // max tilt in degrees
        const glare = document.createElement('span');
        glare.className = 'tilt-glare';
        card.appendChild(glare);

        let raf = 0;
        const onMove = (e) => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width;
            const y = (e.clientY - r.top) / r.height;
            const rx = (0.5 - y) * MAX;
            const ry = (x - 0.5) * MAX;
            if (raf) cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                card.style.transform =
                    `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-10px)`;
                glare.style.setProperty('--gx', `${x * 100}%`);
                glare.style.setProperty('--gy', `${y * 100}%`);
            });
        };
        const onLeave = () => {
            if (raf) cancelAnimationFrame(raf);
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        };
        card.addEventListener('pointermove', onMove);
        card.addEventListener('pointerleave', onLeave);
    }

    function initTilt() {
        $$('.tilt').forEach(enhanceTilt);
    }

    /* -------------------------------------------------- Spotlight cards */
    const spotBound = new WeakSet();

    function enhanceSpotlight(el) {
        if (spotBound.has(el) || matchMedia('(hover: none)').matches) return;
        spotBound.add(el);
        el.classList.add('spotlight-card');

        const spot = document.createElement('span');
        spot.className = 'card-spotlight';
        el.appendChild(spot);

        el.addEventListener('pointermove', (e) => {
            const r = el.getBoundingClientRect();
            spot.style.setProperty('--mx', `${e.clientX - r.left}px`);
            spot.style.setProperty('--my', `${e.clientY - r.top}px`);
        }, { passive: true });
    }

    function initSpotlight() {
        $$('.achievement-card, .timeline-content, .contact-item, .contact-form, .bento-card, .skill-card, .hero-stats')
            .forEach(enhanceSpotlight);
    }

    /* -------------------------------------------------- ScrollSpy */
    function initScrollSpy() {
        const links = $$('.nav-menu a[href^="#"]');
        const map = new Map();
        links.forEach(a => {
            const sec = document.querySelector(a.getAttribute('href'));
            if (sec) map.set(sec, a);
        });
        if (!map.size) return;

        const spy = new IntersectionObserver((entries) => {
            entries.forEach(en => {
                if (en.isIntersecting) {
                    links.forEach(l => l.classList.remove('active'));
                    map.get(en.target)?.classList.add('active');
                }
            });
        }, { rootMargin: '-40% 0px -55% 0px' });

        map.forEach((_, sec) => spy.observe(sec));
    }

    /* -------------------------------------------------- Back to top */
    function initBackToTop() {
        const btn = $('#back-to-top');
        if (!btn) return;
        window.addEventListener('scroll', () => {
            btn.classList.toggle('show', window.scrollY > 600);
        }, { passive: true });
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* -------------------------------------------------- Magnetic buttons */
    function initMagnetic() {
        if (matchMedia('(hover: none)').matches) return;
        const PULL = 0.32;
        $$('.magnetic').forEach((btn) => {
            let raf = 0;
            btn.addEventListener('pointermove', (e) => {
                const r = btn.getBoundingClientRect();
                const x = e.clientX - (r.left + r.width / 2);
                const y = e.clientY - (r.top + r.height / 2);
                if (raf) cancelAnimationFrame(raf);
                raf = requestAnimationFrame(() => {
                    btn.style.transform = `translate(${x * PULL}px, ${y * PULL}px)`;
                });
            });
            btn.addEventListener('pointerleave', () => {
                if (raf) cancelAnimationFrame(raf);
                btn.style.transform = '';
            });
        });
    }

    /* -------------------------------------------------- Scroll progress */
    function initScrollProgress() {
        const bar = $('#scroll-progress');
        if (!bar) return;
        const update = () => {
            const h = document.documentElement;
            const scrolled = h.scrollTop;
            const max = h.scrollHeight - h.clientHeight;
            const pct = max > 0 ? (scrolled / max) * 100 : 0;
            bar.style.setProperty('--scroll', `${pct}%`);
        };
        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update, { passive: true });
    }

    /* -------------------------------------------------- Loader */
    function hideLoader(immediate) {
        const loader = (els && els.loader) || document.getElementById('loader');
        if (!loader) return;
        setTimeout(() => loader.classList.add('hidden'), immediate ? 0 : 700);
    }

    return { init };
})();

document.addEventListener('DOMContentLoaded', PortfolioApp.init);

// ---- Failsafes: never let the loading screen trap the page ----
// (e.g. a device without WebGL, or any unexpected script error)
function dismissLoader() {
    const l = document.getElementById('loader');
    if (l) l.classList.add('hidden');
}
window.addEventListener('load', dismissLoader);
window.addEventListener('error', dismissLoader);
window.addEventListener('unhandledrejection', dismissLoader);
setTimeout(dismissLoader, 5000);
