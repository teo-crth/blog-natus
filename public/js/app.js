const APP = {
    DomLoaded() {
      // Get elements
      const carouselInner = document.querySelector(".carousel-inner");
      const slides = document.querySelectorAll(".carousel-slide");
      const captions = document.querySelectorAll(".carousel-slide figcaption");
      const prevButton = document.getElementById("prev");
      const nextButton = document.getElementById("next");
      const indicators = document.querySelectorAll(".indicator");
  
      let currentIndex = 0;
  
      // Function to show the current slide
      function showSlide(index) {
        // Hide all slides
        slides.forEach((slide) => (slide.style.display = "none"));
        // Hide all captions
        captions.forEach((caption) => (caption.style.display = "none"));
        // Remove active class from all indicators
        indicators.forEach((indicator) => indicator.classList.remove("active"));
  
        // Show the current slide and caption
        slides[index].style.display = "block";
        captions[index].style.display = "block";
        // Add active class to the corresponding indicator
        indicators[index].classList.add("active");
      }
  
      // Function to move to the next slide
      function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
      }
  
      // Function to move to the previous slide
      function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
      }
  
      // Event listeners for next and previous buttons
      nextButton.addEventListener("click", nextSlide);
      prevButton.addEventListener("click", prevSlide);
  
      // Event listener for indicator clicks
      indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
          currentIndex = index;
          showSlide(currentIndex);
        });
      });
  
      // Show the initial slide
      showSlide(currentIndex);
    },
    
    tagIsClicked() {
      const TAG = document.querySelectorAll('.category-item');
      const CARD_ARTICLE = document.querySelectorAll('.card-article');
  
      TAG.forEach((tag) => {
          tag.onclick = function () {
              // Toggle 'isClicked' class for the clicked tag
              tag.classList.toggle('isClicked');
              tag.style.backgroundColor = tag.classList.contains('isClicked') ? '#508212' : '';
  
              // Check if any tag has 'isClicked' class
              const isAnyTagClicked = Array.from(TAG).some((t) => t.classList.contains('isClicked'));
  
              CARD_ARTICLE.forEach((card) => {
                  const cardTag = card.classList;
  
                  if (isAnyTagClicked) {
                      // Check if the card has at least one category matching the clicked tags
                      const hasMatchingCategory = Array.from(TAG).some((t) =>
                          t.classList.contains('isClicked') && cardTag.contains(t.id)
                      );
  
                      if (hasMatchingCategory) {
                          card.classList.remove('hidden');
                      } else {
                          card.classList.add('hidden');
                      }
                  } else {
                      // If no tag is clicked, remove 'hidden' from all cards
                      card.classList.remove('hidden');
                  }
                });
            };
       });
    },

    init() {
      this.DomLoaded();
      this.tagIsClicked();
    },
  };
  
  APP.init();