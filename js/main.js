// Dati sensibili offuscati (inseriti via JS per evitare scraping)
function initSensitiveData() {
    // IBAN (spezzato per offuscamento)
    const ibanParts = ['IT68', 'D036', '6901', '6002', '9942', '4446', '113'];
    const ibanEl = document.getElementById('iban-value');
    if (ibanEl) {
        ibanEl.textContent = ibanParts.join(' ');
    }

    // Numeri WhatsApp (spezzati per offuscamento)
    const waData = {
        1: ['39', '340', '700', '3825'],
        2: ['39', '342', '076', '6823']
    };

    const waMarcello = document.getElementById('wa-marcello');
    const waFederica = document.getElementById('wa-federica');

    if (waMarcello) {
        waMarcello.href = 'https://wa.me/' + waData[1].join('');
    }
    if (waFederica) {
        waFederica.href = 'https://wa.me/' + waData[2].join('');
    }
}

function updateCountdown() {
    const weddingDate = new Date('July 18, 2026 16:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = hours;
    if (minutesEl) minutesEl.textContent = minutes;
    if (secondsEl) secondsEl.textContent = seconds;
}

async function copyTextToClipboard(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(text);
        return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();

    const success = document.execCommand('copy');
    document.body.removeChild(textarea);

    if (!success) {
        throw new Error('Copy failed');
    }
}

function initCopyIban() {
    const ibanEl = document.getElementById('iban-value');
    const copyBtn = document.getElementById('copy-iban');
    const feedbackEl = document.getElementById('copy-iban-feedback');

    if (!ibanEl || !copyBtn) return;

    const setFeedback = (message) => {
        if (feedbackEl) feedbackEl.textContent = message;
    };

    copyBtn.addEventListener('click', async () => {
        const iban = (ibanEl.textContent || '').trim();
        if (!iban) return;

        try {
            await copyTextToClipboard(iban);
            setFeedback('Copiato negli appunti');
            copyBtn.textContent = 'Copiato';

            window.setTimeout(() => {
                copyBtn.textContent = 'Copia IBAN';
                setFeedback('');
            }, 2000);
        } catch (e) {
            setFeedback('Seleziona e copia manualmente');
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initSensitiveData();
        updateCountdown();
        initCopyIban();
        setInterval(updateCountdown, 1000);
    });
} else {
    initSensitiveData();
    updateCountdown();
    initCopyIban();
    setInterval(updateCountdown, 1000);
}
