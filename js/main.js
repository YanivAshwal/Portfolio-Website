let zoomLevel = 1;
const minZoom = 1;
const maxZoom = 6.68;
const zoomStep = 0.17;

const zoomText = document.querySelector('.zoom_text');
const page2 = document.querySelector('.page_2');
const zoomTop = document.querySelector('.zoom_top');
const zoomBottom = document.querySelector('.zoom_bottom');

function updateZoom() {
    const progress = (zoomLevel - minZoom) / (maxZoom - minZoom);

    // Delay page2 appearance by offsetting progress
    const delay = 0.7; // 0.2 = 20% delay, adjust as needed (0 to 1)
    let page2Progress = (progress - delay) / (1 - delay);
    page2Progress = Math.max(0, Math.min(1, page2Progress)); // Clamp between 0 and 1

    zoomText.style.transform = `scale(${zoomLevel})`;
    zoomText.style.opacity = 1 - progress;

    // Move top up and bottom down as zoom increases
    const moveDistance = 15 * progress;
    zoomTop.style.transform = `translateY(-${moveDistance}px)`;
    zoomBottom.style.transform = `translateY(${moveDistance}px)`;

    // Animate second page in with delay
    const page2Scale = 0.6 + 0.4 * page2Progress;
    page2.style.opacity = page2Progress;
    page2.style.transform = `scale(${page2Scale})`;
    page2.style.pointerEvents = page2Progress > 0.95 ? 'auto' : 'none';

  // when page 2 is fully visible
  if (page2Progress >= 1) {
    // allow body scrolling
    document.body.classList.add('scroll-enabled');
    document.documentElement.classList.add('scroll-enabled');
  } else {
    document.body.classList.remove('scroll-enabled');
    document.documentElement.classList.remove('scroll-enabled');
  }
}

function onWheel(e) {
  // if we’ve “unlocked” scrolling, do nothing and let the browser scroll
  if (document.body.classList.contains('scroll-enabled')) return;

  // otherwise handle zoom…
  if (e.deltaY > 0) {
    zoomLevel = Math.min(maxZoom, zoomLevel + zoomStep);
  } else {
    zoomLevel = Math.max(minZoom, zoomLevel - zoomStep);
  }
  updateZoom();

  // prevent the default scroll while zooming
  e.preventDefault();
}

window.addEventListener('wheel', onWheel, { passive: false });

updateZoom();



const prof_pic_wrapper = document.querySelector(".profile-pic-wrapper");
let bounds;

function rotateToMouse(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const leftX = mouseX - bounds.left;
    const topY = mouseY - bounds.top;
    const center = {
        x: leftX - bounds.width / 2,
        y: topY - bounds.height / 2
    };
    // Limit the max rotation angle (e.g., 15deg)
    const maxAngle = 5;
    const rotateX = Math.max(Math.min(center.y / 25, maxAngle), -maxAngle);
    const rotateY = Math.max(Math.min(-center.x / 25, maxAngle), -maxAngle);

    const profilePic = prof_pic_wrapper.querySelector(".profile-pic");
    profilePic.style.transform =
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
}

prof_pic_wrapper.addEventListener("mouseenter", () => {
    bounds = prof_pic_wrapper.getBoundingClientRect();
    document.addEventListener("mousemove", rotateToMouse);
});

prof_pic_wrapper.addEventListener("mouseleave", () => {
    document.removeEventListener("mousemove", rotateToMouse);
    const profilePic = prof_pic_wrapper.querySelector(".profile-pic");
    profilePic.style.transform = "";
    profilePic.style.backgroundImage = "";
});