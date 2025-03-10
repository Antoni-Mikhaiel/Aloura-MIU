
document.addEventListener('DOMContentLoaded', function() {  //Ensures the JavaScript runs only after the HTML document is fully loaded.
  //Once the HTML document is fully loaded, these functions are called.

    // Initialize page animations
    initPageAnimations();
    
    // Initialize product slider
    initProductSlider();
});

/**
 * Initializes all page entrance animations
 */
function initPageAnimations() {
    // Fetch all elements that need transitions
    const femaleImg = document.querySelector('.female img');
    const maleImg = document.querySelector('.male img');
    const buttons = document.querySelectorAll('.text-overlay button');
    const indulgeText = document.querySelector('.text-overlay-indulge');
    const yourText = document.querySelector('.text-overlay-your');

    // Start image transitions
    setTimeout(() => { // setTimeout delays the execution of the code inside it by 100 milliseconds.
        if (femaleImg) femaleImg.classList.add('loaded'); // Adds the 'loaded' class (CSS transition class) to the female image.
        if (maleImg) maleImg.classList.add('loaded'); // Adds the 'loaded' class (CSS transition class) to the male image.
    }, 100);

    // Start text transitions after images finish loading
    setTimeout(() => {
        if (indulgeText) indulgeText.classList.add('show');
        if (yourText) yourText.classList.add('show');
        
        // Add slight delay for buttons to appear after the text
        setTimeout(() => {
            buttons.forEach(button => {
                button.classList.add('show');
                button.style.pointerEvents = 'auto'; // Make buttons clickable after they are visible.
            });
        }, 130);
    }, 200);
}

/**
 * Initializes the product slider with circular looping
 */
function initProductSlider() {
  const slider = document.querySelector('.product-slider');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let cards = Array.from(document.querySelectorAll('.product-card')); //Array.from converts the NodeList of cards into an array

  if (!slider || !prevBtn || !nextBtn || cards.length === 0) return;

  const visibleCards = 3; // Number of cards visible at once
  const cardWidth = slider.offsetWidth / visibleCards;
  const cardCount = cards.length; // Total Number of cards in the slider

  // Duplicate first and last few cards for seamless looping
  const firstClones = cards.slice(0, visibleCards).map(card => card.cloneNode(true)); //slice(0, visibleCards) gets the first 3 cards. cloneNode(true) creates a deep copy of each card.
  const lastClones = cards.slice(-visibleCards).map(card => card.cloneNode(true));//slice(-visibleCards) gets the first 3 cards. cloneNode(true) creates a deep copy of each card.

  
  // Append clones at the start and end
  firstClones.forEach(clone => slider.appendChild(clone)); //appendChild adds the first clones to the end of the slider.
  lastClones.reverse().forEach(clone => slider.prepend(clone)); //prepend adds the last clones to the start of the slider. (reverse() Reverses the elements in an array).

  // Update card list after adding clones
  cards = Array.from(slider.children); //Add the NodeList contents of the slider (slider.children including original cards & the clones) to the cards array(Array.from)).
  
  let cardIndex = visibleCards; // Starting card of the slider.
  slider.scrollLeft = cardIndex * cardWidth; // Sets the slider's scroll position to the starting card

  /**
   * Moves the slider and handles looping
   */
  function updateSlider() {
      slider.style.scrollBehavior = 'smooth'; //transition.
      slider.scrollLeft = cardIndex * cardWidth; //Updates the slider's scroll position to the next card.

      // Update active class
      cards.forEach((card, index) => {
//card.classList.toggle('active', condition). If the condition is true, the class 'active' is added to the card. If the condition is false, the class 'active' is removed from the card.
          card.classList.toggle('active', index === cardIndex + 1);
      });
  }

  function resetPosition() {
      slider.style.scrollBehavior = 'auto'; // Disable smooth scrolling for instant reset
      if (cardIndex >= cardCount + visibleCards) {
          // If beyond last clone, reset to first real card
          cardIndex = visibleCards;
          slider.scrollLeft = cardIndex * cardWidth;
      } else if (cardIndex < visibleCards) {
          // If before first clone, reset to last real card
          cardIndex = cardCount + visibleCards - 1; //idk it just works
          slider.scrollLeft = cardIndex * cardWidth;
      }
  }

  // Navigation Buttons
  nextBtn.addEventListener('click', function() {
      if (!slider.classList.contains('moving')) {
          slider.classList.add('moving');
          cardIndex++;
          updateSlider();
          setTimeout(() => { //ensures the slider runs after the transition is complete.
              resetPosition();
              slider.classList.remove('moving');
          }, 300); // Delay matches transition time
      }
  });

  prevBtn.addEventListener('click', function() {
      if (!slider.classList.contains('moving')) {
          slider.classList.add('moving');
          cardIndex--;
          updateSlider();
          setTimeout(() => {
              resetPosition();
              slider.classList.remove('moving');
          }, 300);
      }
  });

  // Handle window resize
  window.addEventListener('resize', function() { //resize event ensures the slider adjusts to the new window size.
      updateSlider();
  });

  updateSlider(); // Initial update
}


/**
 * Handles gender selection animation and transition
 * @param {string} gender - 'male' or 'female'
 */
function changeImages(gender) {
    // Get elements
    const femaleDiv = document.querySelector(".female");
    const maleDiv = document.querySelector(".male");
    const transitionContainer = document.querySelector(".transition-container");
    const transitionImg = document.getElementById("transition-img");
    
    // Hide text overlays
    const textOverlays = document.querySelectorAll(".text-overlay-indulge, .text-overlay-your");
    textOverlays.forEach(overlay => overlay.classList.add("hidden"));

    // Set the transition image based on gender
    if (gender === "female") {
        transitionImg.src = "https://www.perfumestars.com/wp-content/uploads/2024/12/burberry-her-eau-de-parfum-intense-new-fragrance-2024.jpg";
    } else if (gender === "male") {
        transitionImg.src = "https://cdn.shopify.com/s/files/1/0524/6733/5333/files/Versace_Eros-5_480x480.jpg?v=1609687512";
    }

    // Hide gender containers
    femaleDiv.classList.add("hidden");
    maleDiv.classList.add("hidden");

    // Show transition container
    transitionContainer.classList.add("active");
}
