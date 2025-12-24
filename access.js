// ===========================================================
//  XỬ LÝ INPUT
// ===========================================================

function handleDateInput(input, nextFieldId) {
    input.value = input.value.replace(/[^0-9]/g, '');
    if (input.value.length === 2) {
        const nextInput = document.getElementById(nextFieldId);
        if (nextInput) nextInput.focus();
    }
}

function handleYearInput(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
}

function setupInputEvents() {
    const dayInput = document.getElementById('dayInput');
    const monthInput = document.getElementById('monthInput');
    const yearInput = document.getElementById('yearInput');

    if (!dayInput || !monthInput || !yearInput) return;

    dayInput.addEventListener('input', () => handleDateInput(dayInput, 'monthInput'));
    monthInput.addEventListener('input', () => handleDateInput(monthInput, 'yearInput'));
    yearInput.addEventListener('input', () => handleYearInput(yearInput));
}

// ===========================================================
//  THÔNG BÁO LỖI THEO CHU KỲ
// ===========================================================

const ATTEMPT_KEY = 'birthdayFailedAttempts';
const errorMessages = [
    "nhập ngày sinh của mình á mom =)))))",
    "không nhớ ngày sinh mình thật hả chị haiiiiiii",
    "vãi lờ quên thật à :))))))))",
    "hỏi cái thằng đưa link này, xem thử nó có nhớ không :33"
];

function getFailedCount() {
    const v = localStorage.getItem(ATTEMPT_KEY);
    return v ? parseInt(v, 10) : 0;
}
function setFailedCount(n) {
    localStorage.setItem(ATTEMPT_KEY, String(n));
}
function resetFailedCount() {
    localStorage.removeItem(ATTEMPT_KEY);
}

function setupFormSubmit() {
    const form = document.getElementById('birthdayForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const day = document.getElementById('dayInput').value.padStart(2, '0');
        const month = document.getElementById('monthInput').value.padStart(2, '0');
        const year = document.getElementById('yearInput').value.padStart(4, '0');
        const birthdayInput = `${day}/${month}/${year}`;
        const correctBirthday = "29/04/2008";

        const errorEl = document.getElementById("errorMessage");

        if (birthdayInput === correctBirthday) {
            resetFailedCount();
            localStorage.setItem("christmasAuthenticated", "true");
            window.location.href = "index.html";
        } else {
            let cnt = getFailedCount() + 1;
            setFailedCount(cnt);

            const idx = (cnt - 1) % errorMessages.length;
            errorEl.textContent = errorMessages[idx];
            errorEl.style.display = "block";

            form.style.animation = 'shake 0.45s';
            setTimeout(() => form.style.animation = '', 450);

            const di = document.getElementById('dayInput');
            if (di) { di.focus(); di.select(); }
        }
    });
}

// ===========================================================
//  TUYẾT: GHÉP 2 HIỆU ỨNG & PHÂN BỐ ĐỀU TO – VỪA – NHỎ
// ===========================================================

function getSnowSize() {
    const r = Math.random();
    if (r < 0.4) return Math.random() * 1 + 2;
    if (r < 0.8) return Math.random() * 1 + 3;
    return Math.random() * 2 + 4;
}

function createContinuousSnow() {
    const container = document.getElementById('snowflakesContainer');

    function createSnowBatch() {
        const SNOW_PER_BATCH = 80;
        const BATCH_DELAY = 3000;
        const FALL_TIME_MIN = 7;
        const FALL_TIME_MAX = 12;

        for (let i = 0; i < SNOW_PER_BATCH; i++) {
            const s = document.createElement('div');
            s.className = 'snow';

            s.style.left = Math.random() * 100 + 'vw';
            s.style.animationDuration =
                (FALL_TIME_MIN + Math.random() * (FALL_TIME_MAX - FALL_TIME_MIN)) + 's';
            s.style.animationDelay = (i * 0.04) + 's';

            const size = getSnowSize();
            s.style.width = s.style.height = size + 'px';
            s.style.opacity = Math.random() * 0.5 + 0.3;

            container.appendChild(s);
            s.addEventListener('animationend', () => s.remove());
        }

        setTimeout(createSnowBatch, BATCH_DELAY);
    }

    createSnowBatch();

    for (let i = 0; i < 350; i++) {
        let s = document.createElement('div');
        s.className = 'snow';

        s.style.left = Math.random() * 100 + 'vw';
        s.style.animationDuration = (5 + Math.random() * 7) + 's';
        s.style.animationDelay = (i * 0.04) + 's';

        let sz = getSnowSize();
        s.style.width = s.style.height = sz + 'px';
        s.style.opacity = Math.random() * 0.5 + 0.4;

        document.body.appendChild(s);

        s.addEventListener('animationend', () => s.remove());
    }
}

// ===========================================================
//  KHỞI TẠO
// ===========================================================

document.addEventListener('DOMContentLoaded', function () {
    setupInputEvents();
    setupFormSubmit();
    createContinuousSnow();

    const di = document.getElementById('dayInput');
    if (di) di.focus();
});