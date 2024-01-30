//FAIRE JAVASCRIPT POUR QUE LES IMAGES CHANGES AVEC LE TITRE

document.addEventListener("DOMContentLoaded", function () {
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
});
