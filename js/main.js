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


/* BAD FORM REDIRECT HALTER 
const form = document.querySelector(".cntct-form form");
console.log(form); 

if (form) {
  form.addEventListener('submit', async(event) => { 
    event.preventDefault();

    console.log("submit event triggered");

    const formData = new FormData(form);

    console.log("form data contents");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try { 
      console.log("attempting to fetch...");
      const response = await fetch("https://formspree.io/f/xojqrpdl",  {
        method: 'POST',
        body: formData, 
        headers: { 
          'Accept': 'application/json'
        }
      });

      console.log("response recieved:", response); 

      if (response.ok) {
        console.log("success");
        alert('Thank you for your Message!');
        form.reset();
      } else { 
        console.log("failure");
        alert('Oops, there was a problem with your submission, try again!');
      }
    } catch (error) { 
      console.log("error caught");
      console.error(error);
      alert('Oops! Network Error.');
    }
  });
}
*/ 