const members = Array.from(document.querySelectorAll('.member'));
const dots = Array.from(document.querySelectorAll('.carousel-dots button'));
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let currentIndex = 0;

function showMember(index) {
  members.forEach((member, i) => {
    member.classList.toggle('active', i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

let autoRotateId = null;

function nextMember() {
  currentIndex = (currentIndex + 1) % members.length;
  showMember(currentIndex);
}

function prevMember() {
  currentIndex = (currentIndex - 1 + members.length) % members.length;
  showMember(currentIndex);
}

function startAutoRotate() {
  autoRotateId = setInterval(nextMember, 20000);
}

function resetAutoRotate() {
  if (autoRotateId !== null) {
    clearInterval(autoRotateId);
  }
  startAutoRotate();
}

const carousel = document.querySelector('.carousel');
let touchStartX = null;
let touchStartY = null;
const swipeThreshold = 50;

if (members.length) {
  showMember(0);
  startAutoRotate();
}

function getTouchPoint(event) {
  if (event.changedTouches && event.changedTouches.length === 1) {
    return event.changedTouches[0];
  }
  if ('clientX' in event && 'clientY' in event) {
    return event;
  }
  return null;
}

function handleTouchStart(event) {
  const point = getTouchPoint(event);
  if (!point) return;
  touchStartX = point.clientX;
  touchStartY = point.clientY;
}

function handleTouchEnd(event) {
  const point = getTouchPoint(event);
  if (touchStartX === null || !point) return;
  const touchEndX = point.clientX;
  const touchEndY = point.clientY;
  const diffX = touchEndX - touchStartX;
  const diffY = touchEndY - touchStartY;
  touchStartX = null;
  touchStartY = null;

  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
    if (diffX < 0) {
      nextMember();
    } else {
      prevMember();
    }
    resetAutoRotate();
  }
}

prevBtn?.addEventListener('click', () => {
  prevMember();
  resetAutoRotate();
});
nextBtn?.addEventListener('click', () => {
  nextMember();
  resetAutoRotate();
});
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    showMember(currentIndex);
    resetAutoRotate();
  });
});

carousel?.addEventListener('touchstart', handleTouchStart, { passive: true });
carousel?.addEventListener('touchend', handleTouchEnd);
carousel?.addEventListener('pointerdown', handleTouchStart);
carousel?.addEventListener('pointerup', handleTouchEnd);
