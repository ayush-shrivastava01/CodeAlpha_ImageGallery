
/* =========================
   IMAGE DATA
========================= */

const images = [
    {
        title: "Mountain Paradise",
        category: "nature",
        url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900",
        description: "Beautiful mountain landscape"
    },
    {
        title: "Forest Dreams",
        category: "nature",
        url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=900",
        description: "Peaceful green forest"
    },
    {
        title: "Ocean Waves",
        category: "nature",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900",
        description: "Beautiful blue ocean"
    },
    {
        title: "Modern Architecture",
        category: "architecture",
        url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900",
        description: "Contemporary building design"
    },
    {
        title: "City Lights",
        category: "architecture",
        url: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=900",
        description: "City skyline at night"
    },
    {
        title: "Urban Design",
        category: "architecture",
        url: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=900",
        description: "Modern urban architecture"
    },
    {
        title: "Wild Lion",
        category: "animals",
        url: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=900",
        description: "King of the jungle"
    },
    {
        title: "Beautiful Deer",
        category: "animals",
        url: "https://images.unsplash.com/photo-1484406566174-9da000fda645?w=900",
        description: "Wildlife photography"
    },
    {
        title: "Wild Elephant",
        category: "animals",
        url: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=900",
        description: "Majestic elephant"
    },
    {
        title: "Digital Technology",
        category: "technology",
        url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900",
        description: "Modern electronic technology"
    },
    {
        title: "Computer Workspace",
        category: "technology",
        url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900",
        description: "Developer workspace"
    },
    {
        title: "Creative Coding",
        category: "technology",
        url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900",
        description: "Technology and teamwork"
    }
];


/* =========================
   SELECT HTML ELEMENTS
========================= */

const galleryContainer = document.getElementById("gallery-container");

const filterButtons = document.querySelectorAll(".filter-btn");

const galleryCount = document.getElementById("gallery-count");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightbox-image");

const lightboxTitle = document.getElementById("lightbox-title");

const lightboxCategory = document.getElementById("lightbox-category");

const imageCounter = document.getElementById("image-counter");

const closeButton = document.getElementById("close-btn");

const nextButton = document.getElementById("next-btn");

const prevButton = document.getElementById("prev-btn");


/* =========================
   GALLERY VARIABLES
========================= */

let currentImages = [...images];

let currentIndex = 0;


/* =========================
   DISPLAY IMAGES
========================= */

function displayImages(imageArray) {

    galleryContainer.innerHTML = "";

    galleryCount.textContent =
        `Showing ${imageArray.length} photographs`;

    imageArray.forEach((image, index) => {

        const galleryItem = document.createElement("div");

        galleryItem.classList.add("gallery-item");

        const img = document.createElement("img");

        img.src = image.url;
        img.alt = image.description;
        img.loading = "lazy";

        const overlay = document.createElement("div");

        overlay.classList.add("gallery-overlay");

        const title = document.createElement("h3");

        title.textContent = image.title;

        const category = document.createElement("p");

        category.textContent = image.category;

        overlay.appendChild(title);

        overlay.appendChild(category);

        galleryItem.appendChild(img);

        galleryItem.appendChild(overlay);

        galleryItem.addEventListener("click", () => {

            openLightbox(index);

        });

        galleryContainer.appendChild(galleryItem);

    });

}


/* =========================
   FILTER IMAGES
========================= */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const category = button.dataset.filter;

        if (category === "all") {

            currentImages = [...images];

        } else {

            currentImages = images.filter(image => {

                return image.category === category;

            });

        }

        displayImages(currentImages);

    });

});


/* =========================
   OPEN LIGHTBOX
========================= */

function openLightbox(index) {

    currentIndex = index;

    updateLightbox();

    lightbox.classList.add("active");

    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    closeButton.focus();

}


/* =========================
   UPDATE LIGHTBOX
========================= */

function updateLightbox() {

    const image = currentImages[currentIndex];

    if (!image) return;

    lightboxImage.src = image.url;

    lightboxImage.alt = image.description;

    lightboxTitle.textContent = image.title;

    lightboxCategory.textContent = image.category;

    imageCounter.textContent =
        `${currentIndex + 1} / ${currentImages.length}`;

}


/* =========================
   NEXT IMAGE
========================= */

function nextImage() {

    currentIndex++;

    if (currentIndex >= currentImages.length) {

        currentIndex = 0;

    }

    updateLightbox();

}


/* =========================
   PREVIOUS IMAGE
========================= */

function previousImage() {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = currentImages.length - 1;

    }

    updateLightbox();

}


/* =========================
   CLOSE LIGHTBOX
========================= */

function closeLightbox() {

    lightbox.classList.remove("active");

    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}


/* =========================
   BUTTON EVENTS
========================= */

nextButton.addEventListener("click", nextImage);

prevButton.addEventListener("click", previousImage);

closeButton.addEventListener("click", closeLightbox);


/* =========================
   CLICK OUTSIDE TO CLOSE
========================= */

lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


/* =========================
   KEYBOARD NAVIGATION
========================= */

document.addEventListener("keydown", event => {

    if (!lightbox.classList.contains("active")) return;

    if (event.key === "ArrowRight") {

        nextImage();

    }

    else if (event.key === "ArrowLeft") {

        previousImage();

    }

    else if (event.key === "Escape") {

        closeLightbox();

    }

});


/* =========================
   INITIALIZE GALLERY
========================= */

displayImages(images);
