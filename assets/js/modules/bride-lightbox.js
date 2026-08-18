/**
 * Bride Lightbox - Ampliar fotos de noiva
 * Click para abrir, navegação com setas e botões
 */

class BrideLightbox {
  constructor() {
    this.lightbox = document.querySelector(".js-bride-lightbox");
    this.closeBtn = document.querySelector(".js-bride-lightbox-close");
    this.prevBtn = document.querySelector(".js-bride-lightbox-prev");
    this.nextBtn = document.querySelector(".js-bride-lightbox-next");
    this.image = document.querySelector(".js-bride-lightbox-image");
    this.title = document.querySelector(".js-bride-lightbox-title");
    this.cards = document.querySelectorAll(".bride-card");

    this.currentIndex = 0;
    this.images = this.extractImages();

    this.init();
  }

  extractImages() {
    const images = [];
    this.cards.forEach((card, index) => {
      const img = card.querySelector(".bride-card__media img");
      const titleEl = card.querySelector(".bride-card__overlay h3");

      if (img) {
        images.push({
          src: img.src,
          alt: img.alt,
          title: titleEl ? titleEl.textContent : `Foto ${index + 1}`,
        });
      }
    });
    return images;
  }

  init() {
    // Adicionar event listeners aos cards
    this.cards.forEach((card, index) => {
      card.addEventListener("click", () => this.open(index));
    });

    // Botões de navegação
    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.close());
    }
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.prev());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.next());
    }

    // Fechar ao clicar fora da imagem
    if (this.lightbox) {
      this.lightbox.addEventListener("click", (e) => {
        if (e.target === this.lightbox) {
          this.close();
        }
      });
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (!this.lightbox || !this.lightbox.open) return;

      if (e.key === "Escape") this.close();
      if (e.key === "ArrowLeft") this.prev();
      if (e.key === "ArrowRight") this.next();
    });
  }

  open(index) {
    this.currentIndex = index;
    this.updateImage();

    if (this.lightbox) {
      this.lightbox.showModal();
      // Prevenir scroll na página
      document.body.style.overflow = "hidden";
    }
  }

  close() {
    if (this.lightbox) {
      this.lightbox.close();
      // Restaurar scroll
      document.body.style.overflow = "";
    }
  }

  updateImage() {
    const current = this.images[this.currentIndex];
    if (current) {
      if (this.image) this.image.src = current.src;
      if (this.image) this.image.alt = current.alt;
      if (this.title) this.title.textContent = current.title;
    }
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateImage();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateImage();
  }
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new BrideLightbox();
  });
} else {
  new BrideLightbox();
}
