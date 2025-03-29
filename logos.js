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

// Initialize when document is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLogoHover);
} else {
  initLogoHover();
}
