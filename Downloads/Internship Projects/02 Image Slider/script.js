// Access HTML elements
const row = document.querySelector('.slides-row');
const slides = document.getElementsByClassName('slide');
const dots = document.getElementsByClassName('dot');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const mainContainer = document.querySelector('.container');

// Declare variables
let index = 1;
let width;             // Declare width globally
let deleteInterval;    // Declare deleteInterval globally

// Function to update slide width
function slideWidth() {
  width = slides[0].clientWidth;
}
slideWidth();          // Set initial slide width
window.addEventListener('resize', slideWidth);
row.style.transform = 'translateX(' + (-width * index) + 'px)';

// Go to next slide
nextBtn.addEventListener('click', nextSlide);
function nextSlide() {
  slideWidth();                           // Update width to handle window resizing
  if (index >= slides.length - 1) return; // Prevent going beyond last slide
  row.style.transition = 'transform 0.4s ease-out';
  index++;
  row.style.transform = 'translateX(' + (-width * index) + 'px)';
  dotsLabel();
}

// Go to previous slide
prevBtn.addEventListener('click', prevSlide);
function prevSlide() {
  slideWidth();                          // Update width to handle window resizing
  if (index <= 0) return;                // Prevent going beyond first slide
  row.style.transition = 'transform 0.4s ease-out';
  index--;
  row.style.transform = 'translateX(' + (-width * index) + 'px)';
  dotsLabel();
}

// Return to the first slide when reaching the last slide
row.addEventListener('transitionend', function() {
  if (slides[index].id === 'firstImageDuplicate') {
    row.style.transition = 'none';
    index = 1;                           // Reset to first real slide
    row.style.transform = 'translateX(' + (-width * index) + 'px)';
    dotsLabel();
  }
  if (slides[index].id === 'lastImageDuplicate') {
    row.style.transition = 'none';
    index = slides.length - 2;           // Reset to last real slide
    row.style.transform = 'translateX(' + (-width * index) + 'px)';
    dotsLabel();
  }
});

// Auto sliding
function autoSlide() {
  deleteInterval = setInterval(timer, 3000); // Start interval
  function timer() {
    nextSlide();
  }
}
autoSlide();                             // Initialize auto slide

// Stop auto-sliding when mouse is over the container
mainContainer.addEventListener('mouseover', function() {
  clearInterval(deleteInterval);         // Stop auto slide on mouse over
});

// Resume sliding when mouse is out
mainContainer.addEventListener('mouseout', autoSlide); // Restart auto slide on mouse out

// Function to update dot indicators
function dotsLabel() {
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }
  // Adjust index for infinite carousel effect
  const dotIndex = index === slides.length - 1 ? 0 : index === 0 ? dots.length - 1 : index - 1;
  dots[dotIndex].className += ' active';
}
