// Admin Dashboard Application
const AdminApp = (function() {
    // State Management
    const state = {
        isLoggedIn: false,
        currentView: 'overview',
        messages: JSON.parse(localStorage.getItem('messages')) || [],
        skills: JSON.parse(localStorage.getItem('skills')) || [
            { 
                id: 1, 
                name: { fa: 'HTML/CSS', en: 'HTML/CSS' }, 
                level: 95, 
                icon: '🌐' 
            },
            { 
                id: 2, 
                name: { fa: 'JavaScript', en: 'JavaScript' }, 
                level: 90, 
                icon: '🟨' 
            },
            { 
                id: 3, 
                name: { fa: 'React', en: 'React' }, 
                level: 85, 
                icon: '⚛️' 
            },
            { 
                id: 4, 
                name: { fa: 'Vue.js', en: 'Vue.js' }, 
                level: 80, 
                icon: '💚' 
            },
            { 
                id: 5, 
                name: { fa: 'Node.js', en: 'Node.js' }, 
                level: 75, 
                icon: '🟢' 
            },
            { 
                id: 6, 
                name: { fa: 'UI/UX Design', en: 'UI/UX Design' }, 
                level: 70, 
                icon: '🎨' 
            }
        ],
        visits: parseInt(localStorage.getItem('visits')) || 0,
        lastVisit: localStorage.getItem('lastVisit') || new Date().toISOString()
    };

    /* ---------- Security helpers ---------- */
    const PW_KEY      = 'adminPasswordHash';   // sha-256 hex
    const PW_KEY_OLD  = 'adminPassword';       // legacy btoa value
    const SESSION_KEY = 'adminSession';        // sessionStorage, per-tab

    // Real hash instead of btoa(); works with non-ASCII (Persian) passwords.
    async function hashPassword(password) {
        const bytes = new TextEncoder().encode(password);
        const digest = await crypto.subtle.digest('SHA-256', bytes);
        return Array.from(new Uint8Array(digest))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    function getStoredHash() {
        return localStorage.getItem(PW_KEY);
    }

    function escapeHtml(value) {
        return String(value ?? '').replace(/[&<>"']/g, c => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[c]));
    }

    // DOM Elements
    const elements = {
        loginScreen: document.getElementById('login-screen'),
        dashboard: document.getElementById('dashboard'),
        loginForm: document.getElementById('login-form'),
        loginError: document.getElementById('login-error'),
        logoutBtn: document.getElementById('logout-btn'),
        navLinks: document.querySelectorAll('.nav-link[data-view]'),
        views: document.querySelectorAll('.view'),
        toast: document.getElementById('admin-toast'),
        toastMessage: document.getElementById('admin-toast-message'),
        addSkillBtn: document.getElementById('add-skill-btn')
    };

    // Initialize Application
    function init() {
        checkLoginStatus();
        setupEventListeners();
        updateLastVisit();
    }

    // Check login status — a stored password is NOT a logged-in session.
    function checkLoginStatus() {
        // Drop the legacy btoa() value; it is not a usable credential.
        localStorage.removeItem(PW_KEY_OLD);

        if (sessionStorage.getItem(SESSION_KEY) === '1' && getStoredHash()) {
            state.isLoggedIn = true;
            showDashboard();
            loadOverviewData();
        } else {
            sessionStorage.removeItem(SESSION_KEY);
            state.isLoggedIn = false;
            showLoginScreen();
        }
    }

    // Show login screen
    function showLoginScreen() {
        elements.loginScreen.classList.remove('hidden');
        elements.dashboard.classList.add('hidden');
    }

    // Show dashboard
    function showDashboard() {
        elements.loginScreen.classList.add('hidden');
        elements.dashboard.classList.remove('hidden');
        loadCurrentView();
    }

    // Setup event listeners
    function setupEventListeners() {
        // Login form
        elements.loginForm.addEventListener('submit', handleLogin);
        
        // Logout
        elements.logoutBtn.addEventListener('click', handleLogout);
        
        // Navigation
        elements.navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const view = this.getAttribute('data-view');
                switchView(view);
            });
        });
        
        // Add skill button
        elements.addSkillBtn.addEventListener('click', showAddSkillModal);
        
        // Change password form
        const changePasswordForm = document.getElementById('change-password-form');
        if (changePasswordForm) {
            changePasswordForm.addEventListener('submit', handleChangePassword);
        }
        
        // Dark mode toggle
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('change', toggleDarkMode);
        }
    }

    // Handle login
    async function handleLogin(e) {
        e.preventDefault();
        const passwordInput = document.getElementById('password');
        const password = passwordInput.value;
        passwordInput.value = '';

        const savedHash = getStoredHash();

        if (!savedHash) {
            // First-time setup on this browser — require a real password.
            if (password.length < 5) {
                showToast('رمز عبور باید حداقل ۵ کاراکتر باشد', 'error');
                return;
            }
            localStorage.setItem(PW_KEY, await hashPassword(password));
            sessionStorage.setItem(SESSION_KEY, '1');
            state.isLoggedIn = true;
            showToast('رمز عبور با موفقیت تنظیم شد!', 'success');
            showDashboard();
            loadOverviewData();
            return;
        }

        if (await hashPassword(password) === savedHash) {
            sessionStorage.setItem(SESSION_KEY, '1');
            state.isLoggedIn = true;
            showToast('ورود موفقیت‌آمیز!', 'success');
            showDashboard();
            loadOverviewData();
        } else {
            showToast('رمز عبور اشتباه است!', 'error');
        }
    }

    // Handle logout
    function handleLogout(e) {
        e.preventDefault();
        state.isLoggedIn = false;
        sessionStorage.removeItem(SESSION_KEY); // end the session, keep the password
        showLoginScreen();
        showToast('با موفقیت خارج شدید', 'success');
    }

    // Switch view
    function switchView(viewName) {
        state.currentView = viewName;
        
        // Update active nav link
        elements.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-view') === viewName) {
                link.classList.add('active');
            }
        });
        
        // Show selected view
        elements.views.forEach(view => {
            view.classList.add('hidden');
            view.classList.remove('active');
        });
        
        const targetView = document.getElementById(`${viewName}-view`);
        if (targetView) {
            targetView.classList.remove('hidden');
            targetView.classList.add('active');
        }
        
        // Load view data
        loadCurrentView();
    }

    // Load current view data
    function loadCurrentView() {
        switch (state.currentView) {
            case 'overview':
                loadOverviewData();
                break;
            case 'messages':
                loadMessages();
                break;
            case 'skills':
                loadSkills();
                break;
            case 'settings':
                loadSettings();
                break;
        }
    }

    // Load overview data
    function loadOverviewData() {
        document.getElementById('visit-count').textContent = state.visits;
        document.getElementById('message-count').textContent = state.messages.length;
        document.getElementById('read-message-count').textContent = 
            state.messages.filter(msg => msg.read).length;
        document.getElementById('last-visit').textContent = 
            new Date(state.lastVisit).toLocaleString('fa-IR');
    }

    // Load messages
    function loadMessages() {
        const container = document.getElementById('messages-container');
        if (!container) return;
        
        if (state.messages.length === 0) {
            container.innerHTML = '<p class="no-messages">هیچ پیامی وجود ندارد</p>';
            return;
        }
        
        container.innerHTML = '';
        state.messages.forEach(message => {
            const messageCard = document.createElement('div');
            messageCard.className = `message-card ${message.read ? '' : 'unread'}`;
            messageCard.innerHTML = `
                <div class="message-header">
                    <div class="message-name">${escapeHtml(message.name)}</div>
                    <div class="message-date">${new Date(message.timestamp).toLocaleString('fa-IR')}</div>
                </div>
                <div class="message-email">${escapeHtml(message.email)}</div>
                <div class="message-content">${escapeHtml(message.message)}</div>
                <div class="message-actions">
                    ${!message.read ? 
                        `<button class="btn btn-small secondary-btn mark-read-btn" data-id="${message.id}">علامت‌گذاری به عنوان خوانده شده</button>` : 
                        ''
                    }
                    <button class="btn btn-small danger-btn delete-btn" data-id="${message.id}">حذف</button>
                </div>
            `;
            
            container.appendChild(messageCard);
        });
        
        // Add event listeners for action buttons
        document.querySelectorAll('.mark-read-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                markMessageAsRead(id);
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                deleteMessage(id);
            });
        });
    }

    // Mark message as read
    function markMessageAsRead(id) {
        state.messages = state.messages.map(msg => 
            msg.id === id ? {...msg, read: true} : msg
        );
        localStorage.setItem('messages', JSON.stringify(state.messages));
        loadMessages();
        loadOverviewData();
        showToast('پیام به عنوان خوانده شده علامت‌گذاری شد', 'success');
    }

    // Delete message
    function deleteMessage(id) {
        state.messages = state.messages.filter(msg => msg.id !== id);
        localStorage.setItem('messages', JSON.stringify(state.messages));
        loadMessages();
        loadOverviewData();
        showToast('پیام با موفقیت حذف شد', 'success');
    }

    // Load skills
    function loadSkills() {
        const container = document.getElementById('admin-skills-container');
        if (!container) return;
        
        container.innerHTML = '';
        state.skills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.innerHTML = `
                <div class="skill-header">
                    <div>
                        <div class="skill-icon">${skill.icon}</div>
                        <div class="skill-title">${skill.name.fa}</div>
                    </div>
                    <div class="skill-level">${skill.level}%</div>
                </div>
                <div class="skill-actions">
                    <button class="btn btn-small secondary-btn edit-skill-btn" data-id="${skill.id}">ویرایش</button>
                    <button class="btn btn-small danger-btn delete-skill-btn" data-id="${skill.id}">حذف</button>
                </div>
            `;
            
            container.appendChild(skillItem);
        });
        
        // Add event listeners for action buttons
        document.querySelectorAll('.edit-skill-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                showEditSkillModal(id);
            });
        });
        
        document.querySelectorAll('.delete-skill-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                deleteSkill(id);
            });
        });
    }

    // Show add skill modal
    function showAddSkillModal() {
        const modal = createSkillModal();
        document.body.appendChild(modal);
        
        const form = modal.querySelector('#skill-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const newSkill = {
                id: Date.now(),
                name: {
                    fa: document.getElementById('skill-name-fa').value,
                    en: document.getElementById('skill-name-en').value
                },
                level: parseInt(document.getElementById('skill-level').value),
                icon: document.getElementById('skill-icon').value
            };
            
            state.skills.push(newSkill);
            localStorage.setItem('skills', JSON.stringify(state.skills));
            loadSkills();
            document.body.removeChild(modal);
            showToast('مهارت با موفقیت اضافه شد', 'success');
        });
    }

    // Show edit skill modal
    function showEditSkillModal(id) {
        const skill = state.skills.find(s => s.id === id);
        if (!skill) return;
        
        const modal = createSkillModal(skill);
        document.body.appendChild(modal);
        
        const form = modal.querySelector('#skill-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const updatedSkill = {
                id: id,
                name: {
                    fa: document.getElementById('skill-name-fa').value,
                    en: document.getElementById('skill-name-en').value
                },
                level: parseInt(document.getElementById('skill-level').value),
                icon: document.getElementById('skill-icon').value
            };
            
            state.skills = state.skills.map(s => s.id === id ? updatedSkill : s);
            localStorage.setItem('skills', JSON.stringify(state.skills));
            loadSkills();
            document.body.removeChild(modal);
            showToast('مهارت با موفقیت به‌روزرسانی شد', 'success');
        });
    }

    // Create skill modal
    function createSkillModal(skill = null) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${skill ? 'ویرایش مهارت' : 'افزودن مهارت جدید'}</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <form id="skill-form" class="modal-form">
                    <div class="form-group">
                        <input type="text" id="skill-name-fa" required placeholder=" " value="${skill ? escapeHtml(skill.name.fa) : ''}">
                        <label for="skill-name-fa">نام مهارت (فارسی)</label>
                    </div>
                    <div class="form-group">
                        <input type="text" id="skill-name-en" required placeholder=" " value="${skill ? escapeHtml(skill.name.en) : ''}">
                        <label for="skill-name-en">نام مهارت (انگلیسی)</label>
                    </div>
                    <div class="form-group">
                        <input type="number" id="skill-level" min="0" max="100" required placeholder=" " value="${skill ? skill.level : ''}">
                        <label for="skill-level">سطح مهارت (0-100)</label>
                    </div>
                    <div class="form-group">
                        <input type="text" id="skill-icon" required placeholder=" " value="${skill ? escapeHtml(skill.icon) : ''}">
                        <label for="skill-icon">آیکون (ایموجی)</label>
                    </div>
                    <button type="submit" class="btn primary-btn">${skill ? 'به‌روزرسانی' : 'افزودن'}</button>
                </form>
            </div>
        `;
        
        // Close modal event
        modal.querySelector('.close-modal').addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // Close on outside click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        return modal;
    }

    // Delete skill
    function deleteSkill(id) {
        state.skills = state.skills.filter(skill => skill.id !== id);
        localStorage.setItem('skills', JSON.stringify(state.skills));
        loadSkills();
        showToast('مهارت با موفقیت حذف شد', 'success');
    }

    // Load settings
    function loadSettings() {
        // Settings are loaded via HTML, just set up event listeners
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (darkModeToggle) {
            darkModeToggle.checked = document.documentElement.getAttribute('data-theme') !== 'light';
        }
    }

    // Handle change password
    async function handleChangePassword(e) {
        e.preventDefault();
        const currentPassword = document.getElementById('current-password').value;
        const newPassword     = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        const savedHash = getStoredHash();
        if (!savedHash || await hashPassword(currentPassword) !== savedHash) {
            showToast('رمز عبور فعلی اشتباه است', 'error');
            return;
        }

        if (newPassword !== confirmPassword) {
            showToast('رمز عبور جدید و تأیید آن مطابقت ندارند', 'error');
            return;
        }

        if (newPassword.length < 5) {
            showToast('رمز عبور جدید باید حداقل ۵ کاراکتر باشد', 'error');
            return;
        }

        localStorage.setItem(PW_KEY, await hashPassword(newPassword));

        e.target.reset();
        showToast('رمز عبور با موفقیت تغییر کرد', 'success');
    }

    // Toggle dark mode
    function toggleDarkMode() {
        const isDark = document.getElementById('dark-mode-toggle').checked;
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }

    // Update last visit
    function updateLastVisit() {
        const now = new Date().toISOString();
        localStorage.setItem('lastVisit', now);
        state.lastVisit = now;
    }

    // Show toast notification
    function showToast(message, type = 'info') {
        elements.toastMessage.textContent = message;
        elements.toast.className = `toast show ${type}`;
        
        setTimeout(() => {
            elements.toast.classList.remove('show');
        }, 3000);
    }

    // Return public methods
    return {
        init
    };
})();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', AdminApp.init);
