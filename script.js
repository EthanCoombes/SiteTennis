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

const carouselTrack = document.querySelector('.carousel-track');
let touchStartX = null;
let touchStartY = null;
const swipeThreshold = 50;

if (members.length) {
  showMember(0);
  startAutoRotate();
}

function handleTouchStart(event) {
  if (!event.touches || event.touches.length !== 1) return;
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
}

function handleTouchEnd(event) {
  if (touchStartX === null || !event.changedTouches || event.changedTouches.length !== 1) return;
  const touchEndX = event.changedTouches[0].clientX;
  const touchEndY = event.changedTouches[0].clientY;
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

carouselTrack?.addEventListener('touchstart', handleTouchStart, { passive: true });
carouselTrack?.addEventListener('touchend', handleTouchEnd);
