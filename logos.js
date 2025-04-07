/**
 * Logo hover animation for logos within the slider - Filter style (like original)
 */
function initSliderLogoHover() {
  if (typeof gsap === "undefined") return;

  // Target all logo slides within the marquee
  const logoSlides = document.querySelectorAll(".partners-logos-marque .logo-slide");

  logoSlides.forEach((slide) => {
    // Ensure the slide itself is positioned relatively for absolute positioning of the clone
    if (window.getComputedStyle(slide).position === "static") {
      slide.style.position = "relative";
    }

    const logo = slide.querySelector(".logo2_logo.logo-slider");
    if (!logo) return;

    // Clone the logo and add it to the slide
    const hoverLogo = logo.cloneNode(true);
    hoverLogo.classList.add("hover-logo");
    slide.appendChild(hoverLogo); // Append clone to slide

    // Set initial states with GSAP
    gsap.set(logo, {
      // Use the filter from the original example, adjusted hue-rotate
      filter: "brightness(75%) saturate(75%) invert(20%) sepia(100%) saturate(50%) hue-rotate(30deg) brightness(100%) contrast(95%)",
      opacity: 1,
    });

    gsap.set(hoverLogo, {
      filter: "none", // Original logo color
      opacity: 0,
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%", // Make hover logo fill the slide area
      height: "100%",
      objectFit: "contain", // Ensure logo scales nicely if slide dimensions differ
      pointerEvents: "none", // Prevent hover issues with the overlaying clone
    });

    // Create hover timeline (paused initially)
    const hoverTl = gsap.timeline({
      paused: true,
      defaults: {
        duration: 0.4,
        ease: "power1.inOut",
      },
    });

    // Setup the animation to crossfade between filtered and original versions
    hoverTl
      .to(logo, {
        opacity: 0,
      })
      .to(
        hoverLogo,
        {
          opacity: 1,
        },
        "<"
      );

    // Add hover event listeners to the slide
    let isHovering = false;

    slide.addEventListener("mouseenter", () => {
      isHovering = true;
      requestAnimationFrame(() => {
        if (isHovering) {
          hoverTl.play();
        }
      });
    });

    slide.addEventListener("mouseleave", () => {
      isHovering = false;
      hoverTl.reverse();
    });
  });
}

/**
 * Initialize GSAP marquee animation for logo sliders
 */
function initMarqueeAnimation() {
  if (typeof gsap === "undefined") return;

  const marqueeContainer = document.querySelector(".partners-logos-marque");
  const rows = gsap.utils.toArray(".partners-logos-marque .partners-row");

  // Ensure container and rows exist
  if (!marqueeContainer || !rows || rows.length === 0) {
    console.warn("Marquee container or rows not found for animation.");
    return;
  }

  // Ensure the parent container has flex display if not set via CSS
  // (Needed for rows to be side-by-side for xPercent animation)
  // It's better to set this in CSS: .partners-logos-marque { display: flex; overflow: hidden; }
  // const currentDisplay = window.getComputedStyle(marqueeContainer).display;
  // if (currentDisplay !== 'flex' && currentDisplay !== 'inline-flex') {
  //   console.warn(".partners-logos-marque should have display: flex set in CSS.");
  //   // marqueeContainer.style.display = "flex"; // Force flex as a fallback
  // }

  const marqueeTl = gsap.timeline({
    repeat: -1,
    defaults: { ease: "none" },
  });

  // Animate xPercent from 0 to -100 for a seamless loop
  marqueeTl.to(rows, {
    xPercent: -100,
    duration: 50, // Adjust duration for speed (e.g., 30 seconds per full cycle)
  });

  // Pause animation on hover
  marqueeContainer.addEventListener("mouseenter", () => marqueeTl.timeScale(0.2)); // Slow down significantly on hover
  marqueeContainer.addEventListener("mouseleave", () => marqueeTl.timeScale(1)); // Resume normal speed
}

// Initialize when document is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initSliderLogoHover();
    initMarqueeAnimation(); // Call the marquee animation
  });
} else {
  initSliderLogoHover();
  initMarqueeAnimation(); // Call the marquee animation
}
