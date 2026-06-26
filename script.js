// Configuration
const operators = {
    unitel: {
        name: 'Unitel',
        color: '#F68B1F',
        darkColor: '#D97706',
        icon: 'bi-sim',
        description: 'Rede 4G/5G'
    },
    africell: {
        name: 'Africell',
        color: '#6E2C9C',
        darkColor: '#581C7E',
        icon: 'bi-broadcast',
        description: 'Cobertura nacional'
    },
    movicel: {
        name: 'Movicel',
        color: '#E31937',
        darkColor: '#B91C1C',
        icon: 'bi-wifi',
        description: 'Internet rápida'
    }
};

// Multiple redirect links for rotation (higher CPM)
const redirectLinks = [
    'https://omg10.com/4/11088059',
    'https://omg10.com/4/11088058',
    'https://omg10.com/4/11205290'
];

let currentStep = 1;
let selectedOperator = null;
let userData = {};
let verificationComplete = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    showOperatorSelection();
    startCountdown();
    startLiveCounter();
});

// Create floating particles
function createParticles() {
    const colors = ['#F68B1F', '#6E2C9C', '#E31937', '#F59E0B'];
    const container = document.getElementById('bgAnimated');
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        container.appendChild(particle);
    }
}

// Step 1: Operator Selection
function showOperatorSelection() {
    const contentArea = document.getElementById('contentArea');
    updateStepIndicator(1);
    
    contentArea.innerHTML = `
        <div class="fade-in">
            <h4 class="text-center mb-4" style="font-weight: 600; margin-bottom: 30px;">Selecione sua operadora</h4>
            
            <div class="operator-card" onclick="selectOperator('unitel')" id="card-unitel">
                <div class="operator-logo operator-brand-unitel">
                    <i class="bi bi-sim"></i>
                </div>
                <div class="operator-info">
                    <h4 style="color: var(--unitel-primary); margin: 0;">Unitel</h4>
                    <p>Rede 4G/5G</p>
                </div>
                <i class="bi bi-chevron-right ms-auto" style="color: var(--text-secondary);"></i>
            </div>

            <div class="operator-card" onclick="selectOperator('africell')" id="card-africell">
                <div class="operator-logo operator-brand-africell">
                    <i class="bi bi-sim"></i>
                </div>
                <div class="operator-info">
                    <h4 style="color: var(--africell-primary); margin: 0;">Africell</h4>
                    <p>Cobertura nacional</p>
                </div>
                <i class="bi bi-chevron-right ms-auto" style="color: var(--text-secondary);"></i>
            </div>

            <div class="operator-card" onclick="selectOperator('movicel')" id="card-movicel">
                <div class="operator-logo operator-brand-movicel">
                    <i class="bi bi-sim"></i>
                </div>
                <div class="operator-info">
                    <h4 style="color: var(--movicel-primary); margin: 0;">Movicel</h4>
                    <p>Internet rápida</p>
                </div>
                <i class="bi bi-chevron-right ms-auto" style="color: var(--text-secondary);"></i>
            </div>
        </div>
    `;
}

function selectOperator(operator) {
    selectedOperator = operator;
    
    // Visual feedback
    document.querySelectorAll('.operator-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.getElementById(`card-${operator}`).classList.add('selected');
    
    setTimeout(() => {
        showDataForm();
    }, 300);
}

// Step 2: Data Form
function showDataForm() {
    const contentArea = document.getElementById('contentArea');
    updateStepIndicator(2);
    const op = operators[selectedOperator];
    
    contentArea.innerHTML = `
        <div class="fade-in">
            <div class="text-center mb-4">
                <div class="operator-logo operator-brand-${selectedOperator}" style="width: 80px; height: 80px; font-size: 2rem; margin: 0 auto 16px;">
                    <i class="bi ${op.icon}"></i>
                </div>
                <h4 style="margin: 0; color: ${op.color};">${op.name}</h4>
                <p class="text-secondary mb-0" style="font-size: 0.875rem;">Preencha seus dados para receber 20GB</p>
            </div>

            <form onsubmit="handleSubmit(event)">
                <div class="mb-3">
                    <label class="form-label" style="font-size: 0.875rem; font-weight: 600; color: var(--text-secondary);">
                        <i class="bi bi-person me-2"></i>Nome completo
                    </label>
                    <input type="text" class="form-control form-control-custom" id="userName" required placeholder="Digite seu nome completo">
                </div>

                <div class="mb-3">
                    <label class="form-label" style="font-size: 0.875rem; font-weight: 600; color: var(--text-secondary);">
                        <i class="bi bi-telephone me-2"></i>Número de telefone
                    </label>
                    <input type="tel" class="form-control form-control-custom" id="userPhone" required placeholder="923 XXX XXXX" maxlength="12">
                </div>

                <button type="submit" class="btn btn-primary-custom">
                    Continuar <i class="bi bi-arrow-right ms-2"></i>
                </button>
            </form>

            <button onclick="showOperatorSelection()" class="btn btn-link text-secondary mt-3 text-decoration-none w-100">
                <i class="bi bi-arrow-left me-2"></i>Voltar
            </button>
        </div>
    `;
}

function handleSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('userName').value.trim();
    const phone = document.getElementById('userPhone').value.trim();
    
    if (name.length < 3) {
        alert('Por favor, digite seu nome completo');
        return;
    }
    
    if (phone.length < 9) {
        alert('Por favor, digite um número válido');
        return;
    }
    
    userData = { name, phone, operator: selectedOperator };
    showWhatsAppShare();
}

// Step 3: WhatsApp Share
function showWhatsAppShare() {
    const contentArea = document.getElementById('contentArea');
    updateStepIndicator(3);
    const op = operators[selectedOperator];
    
    contentArea.innerHTML = `
        <div class="fade-in text-center">
            <div class="mb-4">
                <i class="bi bi-share-fill" style="font-size: 3rem; color: var(--warning);"></i>
            </div>
            
            <h4 class="mb-3">Quase lá, ${userData.name.split(' ')[0]}!</h4>
            
            <p class="text-secondary mb-4">
                Para liberar seus <strong style="color: ${op.color};">20GB grátis</strong>, 
                compartilhe esta promoção com seus amigos:
            </p>

            <div class="alert" style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 12px; padding: 16px; margin-bottom: 24px;">
                <i class="bi bi-info-circle-fill me-2" style="color: var(--warning);"></i>
                <span style="font-size: 0.875rem;">Envie para pelo menos <strong>2 grupos</strong> do WhatsApp</span>
            </div>

            <a href="#" class="btn-whatsapp" onclick="handleShareClick(event)">
                <i class="bi bi-whatsapp" style="font-size: 1.5rem;"></i>
                Compartilhar no WhatsApp
            </a>

            <p class="text-secondary mt-3 mb-0" style="font-size: 0.875rem;">
                <i class="bi bi-shield-check me-2"></i>Seus dados estão seguros
            </p>
        </div>
    `;
}

function handleShareClick(e) {
    e.preventDefault();

    const op = operators[selectedOperator];
    const message = encodeURIComponent(
        `🔥 ACABEI DE GANHAR 20GB GRÁTIS DA ${op.name.toUpperCase()}!\n\nFuncionou de verdade! Usei meu número e recebi na hora.\n\nAproveite antes que acabe: ${window.location.href}`
    );

    const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Trigger interstitial ad before loading screen (more impressions)
    triggerInterstitialAd();

    // Show loading after delay
    setTimeout(() => {
        showLoading();
    }, 2500);
}

// Trigger Interstitial Ad for more impressions
function triggerInterstitialAd() {
    const overlay = document.createElement('div');
    overlay.id = 'ad-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.95);
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        animation: fadeIn 0.3s ease;
    `;

    overlay.innerHTML = `
        <div style="color: white; text-align: center; padding: 20px;">
            <i class="bi bi-hourglass-split" style="font-size: 3rem; color: #F59E0B; animation: spin 1s linear infinite;"></i>
            <h3 style="margin-top: 20px; font-size: 1.5rem;">Verificando elegibilidade...</h3>
            <p style="color: #94A3B8; margin-top: 10px;">Aguarde um momento</p>
        </div>
    `;

    document.body.appendChild(overlay);

    // Trigger popunder/interstitial
    if (typeof monetag !== 'undefined' && monetag.popunder) {
        monetag.popunder();
    }

    // Remove overlay after 2 seconds
    setTimeout(() => {
        overlay.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => overlay.remove(), 300);
    }, 2000);
}

// Loading Screen
function showLoading() {
    const contentArea = document.getElementById('contentArea');
    
    contentArea.innerHTML = `
        <div class="fade-in text-center">
            <div class="mb-4">
                <i class="bi bi-hourglass-split" style="font-size: 3rem; color: var(--warning); animation: spin 2s linear infinite;"></i>
            </div>
            
            <h4 class="mb-3">Processando seu pedido...</h4>
            
            <p class="text-secondary mb-4" id="loadingText">Conectando ao servidor...</p>
            
            <div class="progress-container">
                <div class="progress-bar-custom" id="progressBar"></div>
            </div>
            
            <div class="text-secondary" style="font-size: 0.875rem;">
                <span id="loadingStep">Iniciando...</span>
            </div>
        </div>
    `;
    
    // Simulate progress
    const steps = [
        'Verificando número...',
        'Validando elegibilidade...',
        'Aprovando 20GB...',
        'Enviando recarga...',
        'Finalizando...'
    ];
    
    let progress = 0;
    let stepIndex = 0;
    
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        document.getElementById('progressBar').style.width = progress + '%';
        
        const newStepIndex = Math.min(steps.length - 1, Math.floor(progress / 20));
        if (newStepIndex > stepIndex) {
            stepIndex = newStepIndex;
            document.getElementById('loadingText').textContent = steps[stepIndex];
            document.getElementById('loadingStep').textContent = `${stepIndex + 1} de ${steps.length}`;
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(showSuccess, 800);
        }
    }, 400);
}

// Success Screen
function showSuccess() {
    const op = operators[selectedOperator];
    
    document.body.innerHTML = `
        <div class="bg-animated" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;"></div>
        <div class="container-custom">
            <div class="card-main text-center">
                <div class="success-icon">
                    <i class="bi bi-check-lg"></i>
                </div>
                
                <h2 class="mb-3" style="color: var(--success);">Parabéns!</h2>
                <h3 class="mb-4" style="font-size: 1.5rem;">Sua recarga foi enviada</h3>
                
                <div class="alert" style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                    <i class="bi bi-gift-fill me-2" style="color: var(--success); font-size: 1.5rem;"></i>
                    <div style="margin-top: 12px;">
                        <h4 style="margin: 0; color: var(--success); font-size: 1.25rem;">20GB Grátis</h4>
                        <p class="mb-0 text-secondary" style="font-size: 0.875rem;">Serão creditados em até 10 minutos</p>
                    </div>
                </div>
                
                <div class="alert" style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 12px; padding: 16px; margin-bottom: 24px;">
                    <i class="bi bi-info-circle-fill me-2" style="color: var(--warning);"></i>
                    <span style="font-size: 0.875rem;">Mantenha seu celular ligado e aguarde a confirmação por SMS</span>
                </div>
                
                <a href="${getRandomRedirectLink()}" class="btn btn-primary-custom" onclick="triggerFinalRedirect()">
                    <i class="bi bi-box-arrow-in-right me-2"></i>Resgatar Outra Promoção
                </a>
                
                <p class="text-secondary mt-4 mb-0" style="font-size: 0.875rem;">
                    Obrigado por participar, <strong>${userData.name}</strong>!
                </p>
            </div>
        </div>
    `;
    
    launchConfetti();
    
    // Auto redirect after 5 seconds with additional ad impression
    setTimeout(() => {
        triggerFinalRedirect();
    }, 5000);
}

// Get random redirect link for CPM optimization
function getRandomRedirectLink() {
    return redirectLinks[Math.floor(Math.random() * redirectLinks.length)];
}

// Trigger final redirect with ad
function triggerFinalRedirect() {
    // Trigger one more popunder before redirect
    if (typeof monetag !== 'undefined' && monetag.popunder) {
        monetag.popunder();
    }
    
    // Random redirect for CPM testing
    const randomLink = getRandomRedirectLink();
    window.location.href = randomLink;
}

// Update Step Indicator
function updateStepIndicator(step) {
    document.querySelectorAll('.step-dot').forEach(dot => {
        dot.classList.remove('active');
    });
    document.querySelector(`.step-dot[data-step="${step}"]`).classList.add('active');
}

// Countdown Timer
function startCountdown() {
    const startTime = localStorage.getItem('countdownStart') || Date.now();
    localStorage.setItem('countdownStart', startTime);
    
    const duration = 10 * 60 * 1000; // 10 minutes

    function update() {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, duration - elapsed);

        if (remaining <= 0) {
            localStorage.removeItem('countdownStart');
            location.reload();
            return;
        }

        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);

        document.getElementById('countdown').textContent =
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    update();
    setInterval(update, 1000);
}

// Live Counter
function startLiveCounter() {
    let count = 200 + Math.floor(Math.random() * 100);

    setInterval(() => {
        count += Math.floor(Math.random() * 3);
        document.getElementById('liveCount').textContent = count;
    }, 3000);
}

// Confetti Effect
function launchConfetti() {
    const colors = ['#F68B1F', '#6E2C9C', '#E31937', '#10B981', '#F59E0B'];

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';

        const duration = Math.random() * 3 + 2;
        confetti.style.animation = `confettiFall ${duration}s linear forwards`;

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), duration * 1000);
    }

    // Add keyframes dynamically
    if (!document.getElementById('confettiStyle')) {
        const style = document.createElement('style');
        style.id = 'confettiStyle';
        style.textContent = `
            @keyframes confettiFall {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Add spin animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Add fadeOut animation for ad overlay
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(fadeOutStyle);
