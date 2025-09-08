// -----------------------------
// 3D mouse-rotate for profile pic
// -----------------------------
const profPicWrapper = document.querySelector('.profile-pic-wrapper');
let bounds;

function rotateToMouse(e) {
  const { left, top, width, height } = bounds;
  const x = e.clientX - left - width  / 2;
  const y = e.clientY - top  - height / 2;
  const maxA = 15;
  const rotX = Math.max(Math.min( y / 25, maxA), -maxA);
  const rotY = Math.max(Math.min(-x / 25, maxA), -maxA);
  profPicWrapper
    .querySelector('.profile-pic')
    .style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`;
}

profPicWrapper.addEventListener('mouseenter', () => {
  bounds = profPicWrapper.getBoundingClientRect();
  document.addEventListener('mousemove', rotateToMouse);
});

profPicWrapper.addEventListener('mouseleave', () => {
  document.removeEventListener('mousemove', rotateToMouse);
  const pic = profPicWrapper.querySelector('.profile-pic');
  pic.style.transform       = '';
  pic.style.backgroundImage = '';
});

