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

function nextMember() {
  currentIndex = (currentIndex + 1) % members.length;
  showMember(currentIndex);
}

function prevMember() {
  currentIndex = (currentIndex - 1 + members.length) % members.length;
  showMember(currentIndex);
}

if (members.length) {
  showMember(0);
  setInterval(nextMember, 10000);
}

prevBtn?.addEventListener('click', prevMember);
nextBtn?.addEventListener('click', nextMember);
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    showMember(currentIndex);
  });
});
