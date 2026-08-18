/**
 * Present Interaction Module
 * Handles the interactive present box and bride gallery
 */

class PresentBox {
  constructor() {
    this.presentBox = document.querySelector(".js-present-box");
    this.presentSection = document.querySelector(".js-present-section");
    this.brideGallery = document.querySelector(".js-bride-gallery");
    this.brideGalleryClose = document.querySelector(".js-bride-gallery-close");
    this.carouselSlides = document.querySelectorAll(".js-bride-slide");
    this.carouselPrev = document.querySelector(".js-bride-carousel-prev");
    this.carouselNext = document.querySelector(".js-bride-carousel-next");
    this.currentSlideCounter = document.querySelector(
      ".js-bride-counter-current",
    );

    this.currentSlide = 0;
    this.totalSlides = this.carouselSlides.length;
    this.isOpened = false;

    if (this.presentBox) {
      this.init();
    }
  }

  init() {
    // Trigger animation on scroll into view
    this.observeSection();

    // Present box click handler
    this.presentBox.addEventListener("click", (e) => {
      e.stopPropagation();
      this.openPresent();
    });

    // Gallery close handler
    if (this.brideGalleryClose) {
      this.brideGalleryClose.addEventListener("click", () => {
        this.closeGallery();
      });
    }

    // Carousel navigation
    if (this.carouselPrev) {
      this.carouselPrev.addEventListener("click", () => {
        this.prevSlide();
      });
    }

    if (this.carouselNext) {
      this.carouselNext.addEventListener("click", () => {
        this.nextSlide();
      });
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (!this.brideGallery.classList.contains("active")) return;

      if (e.key === "ArrowLeft") this.prevSlide();
      if (e.key === "ArrowRight") this.nextSlide();
      if (e.key === "Escape") this.closeGallery();
    });

    // Touch/swipe support
    this.setupSwipeGestures();
  }

  observeSection() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.isOpened) {
            // Add animation trigger
            this.presentSection.classList.add("visible");
          }
        });
      },
      { threshold: 0.5 },
    );

    if (this.presentSection) {
      observer.observe(this.presentSection);
    }
  }

  openPresent() {
    if (this.isOpened) return;

    this.isOpened = true;

    // Animate box opening
    this.presentBox.classList.add("opened");

    // Hide the hint
    const hint = document.querySelector(".js-present-hint");
    if (hint) {
      hint.classList.add("hidden");
    }

    // Show gallery after animation completes
    setTimeout(() => {
      this.brideGallery.classList.add("active");
      this.updateCarouselDisplay();

      // Prevent body scroll
      document.body.style.overflow = "hidden";
    }, 500);
  }

  closeGallery() {
    this.brideGallery.classList.remove("active");
    document.body.style.overflow = "";

    // Reset slide
    this.currentSlide = 0;
    this.updateCarouselDisplay();
  }

  updateCarouselDisplay() {
    // Update counter
    if (this.currentSlideCounter) {
      this.currentSlideCounter.textContent = String(
        this.currentSlide + 1,
      ).padStart(2, "0");
    }

    // Update slides visibility
    this.carouselSlides.forEach((slide, index) => {
      slide.classList.remove("active", "prev", "next");

      if (index === this.currentSlide) {
        slide.classList.add("active");
      } else if (index < this.currentSlide) {
        slide.classList.add("prev");
      } else {
        slide.classList.add("next");
      }
    });
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateCarouselDisplay();
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateCarouselDisplay();
  }

  setupSwipeGestures() {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleSwipe = () => {
      if (touchEndX < touchStartX - 50) {
        this.nextSlide();
      }
      if (touchEndX > touchStartX + 50) {
        this.prevSlide();
      }
    };

    if (this.brideGallery) {
      this.brideGallery.addEventListener(
        "touchstart",
        (e) => {
          touchStartX = e.changedTouches[0].screenX;
        },
        false,
      );

      this.brideGallery.addEventListener(
        "touchend",
        (e) => {
          touchEndX = e.changedTouches[0].screenX;
          if (this.brideGallery.classList.contains("active")) {
            handleSwipe();
          }
        },
        false,
      );
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new PresentBox();
  });
} else {
  new PresentBox();
}
