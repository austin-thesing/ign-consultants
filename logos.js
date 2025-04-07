/**
 * Logo hover animation for company items - Greenoaks style
 */
function initLogoHover() {
  if (typeof gsap === "undefined") return;

  // Target all company wrappers
  const companyWrappers = document.querySelectorAll(".logo2_wrapper");

  companyWrappers.forEach((wrapper) => {
    const logo = wrapper.querySelector(".logo2_logo");
    if (!logo) return;

    // Clone the logo and add it as a sibling
    const hoverLogo = logo.cloneNode(true);
    hoverLogo.classList.add("hover-logo");
    logo.parentNode.appendChild(hoverLogo);

    // Set initial states with GSAP
    gsap.set(logo, {
      filter: "brightness(75%) saturate(100%) invert(40%) sepia(60%) saturate(500%) hue-rotate(340deg) brightness(90%) contrast(95%)",
      opacity: 1,
    });

    gsap.set(hoverLogo, {
      filter: "none",
      opacity: 0,
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    });

    // Create hover timeline (paused initially)
    const hoverTl = gsap.timeline({
      paused: true,
      defaults: {
        duration: 0.4,
        ease: "power1.inOut",
      },
    });

    // Setup the animation to crossfade between filtered and unfiltered versions
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

    // Add hover event listeners
    let isHovering = false;

    wrapper.addEventListener("mouseenter", () => {
      isHovering = true;
      requestAnimationFrame(() => {
        if (isHovering) {
          hoverTl.play();
        }
      });
    });

    wrapper.addEventListener("mouseleave", () => {
      isHovering = false;
      hoverTl.reverse();
    });
  });
}

/**
 * Logo hover animation for logos within the slider - Greenoaks style
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
    // Remove slider-specific class if needed, though unlikely necessary
    // hoverLogo.classList.remove('logo-slider');
    slide.appendChild(hoverLogo); // Append to slide, not logo's parent

    // Set initial states with GSAP
    gsap.set(logo, {
      filter: "brightness(75%) saturate(100%) invert(40%) sepia(60%) saturate(500%) hue-rotate(340deg) brightness(90%) contrast(95%)",
      opacity: 1,
    });

    gsap.set(hoverLogo, {
      filter: "none",
      opacity: 0,
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%", // Make hover logo fill the slide area
      height: "100%",
      objectFit: "contain", // Ensure logo scales nicely if slide dimensions differ
    });

    // Create hover timeline (paused initially)
    const hoverTl = gsap.timeline({
      paused: true,
      defaults: {
        duration: 0.4,
        ease: "power1.inOut",
      },
    });

    // Setup the animation to crossfade between filtered and unfiltered versions
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

// Initialize when document is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initLogoHover();
    initSliderLogoHover(); // Call the new function
  });
} else {
  initLogoHover();
  initSliderLogoHover(); // Call the new function
}
