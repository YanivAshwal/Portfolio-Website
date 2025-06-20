let zoomLevel = 1;
const minZoom = 1;
const maxZoom = 6.68;
const zoomStep = 0.17;

const zoomText     = document.querySelector('.zoom_text');
const mainContent  = document.querySelector('.main-content');
const zoomTop      = document.querySelector('.zoom_top');
const zoomBottom   = document.querySelector('.zoom_bottom');

function updateZoom() {
  const progress = (zoomLevel - minZoom) / (maxZoom - minZoom);

  // offset when mainContent begins to appear
  const delay = 0.7;
  let contentProgress = (progress - delay) / (1 - delay);
  contentProgress = Math.max(0, Math.min(1, contentProgress));

  // Zoom-out intro text
  zoomText.style.transform = `scale(${zoomLevel})`;
  zoomText.style.opacity   = 1 - progress;
  const move = 15 * progress;
  zoomTop.style.transform    = `translateY(-${move}px)`;
  zoomBottom.style.transform = `translateY(${move}px)`;

  // Zoom-in main content
  const scaleVal = 0.6 + 0.4 * contentProgress;
  mainContent.style.opacity       = contentProgress;
  mainContent.style.transform     = `scale(${scaleVal})`;
  mainContent.style.pointerEvents = contentProgress > 0.95 ? 'auto' : 'none';

  // Once fully visible, hide overlay + enable native scroll
  if (contentProgress >= 1) {
    document.body.classList.add('scrolled', 'scroll-enabled');
    document.documentElement.classList.add('scroll-enabled');
  } else {
    document.body.classList.remove('scroll-enabled');
    document.documentElement.classList.remove('scroll-enabled');
  }
}

function onWheel(e) {
  // if native scroll is unlocked, bail out
  if (document.body.classList.contains('scroll-enabled')) return;

  // adjust zoom level
  zoomLevel = 
    e.deltaY > 0
      ? Math.min(maxZoom, zoomLevel + zoomStep)
      : Math.max(minZoom, zoomLevel - zoomStep);

  updateZoom();
  e.preventDefault();
}

window.addEventListener('wheel', onWheel, { passive: false });
updateZoom();


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


let fired = false;
window.addEventListener('scroll', () => {
  if (!fired && window.scrollY > 10) {
    document.body.classList.add('scrolled');
    fired = true;
  }
});