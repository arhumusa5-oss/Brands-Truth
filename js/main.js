/**
 * DON'T BUY THE LIE — BRANDS TRUTH
 * Interactive Landing Page Script
 */

document.addEventListener("DOMContentLoaded", () => {
  // Update copyright year
  const colophonYear = document.getElementById("colophonYear");
  if (colophonYear) {
    colophonYear.textContent = new Date().getFullYear();
  }

  /* --------------------------------------------------------------------------
     MOBILE NAVIGATION TOGGLE
     -------------------------------------------------------------------------- */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("is-open");
      const expanded = navMenu.classList.contains("is-open");
      navToggle.setAttribute("aria-expanded", expanded);
      navToggle.innerHTML = expanded ? "&times;" : "&#9776;";
    });

    // Close menu when clicking on any nav link
    navMenu.querySelectorAll(".navbar__link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.innerHTML = "&#9776;";
      });
    });
  }

  /* --------------------------------------------------------------------------
     EXIT-INTENT MODAL LOGIC
     -------------------------------------------------------------------------- */
  const exitModal = document.getElementById("exitModal");
  const modalClose = document.getElementById("modalClose");
  const modalBackdrop = document.querySelector(".modal__backdrop");
  let modalShown = false;

  const showModal = () => {
    if (!modalShown && exitModal) {
      exitModal.classList.add("is-active");
      modalShown = true;
      sessionStorage.setItem("brands_truth_modal_shown", "true");
    }
  };

  const closeModal = () => {
    if (exitModal) {
      exitModal.classList.remove("is-active");
    }
  };

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && exitModal && exitModal.classList.contains("is-active")) {
      closeModal();
    }
  });

  // Trigger exit-intent when mouse moves towards top of viewport
  if (!sessionStorage.getItem("brands_truth_modal_shown")) {
    document.addEventListener("mouseleave", (e) => {
      if (e.clientY <= 25) {
        showModal();
      }
    });

    // Mobile fallback: trigger after 45 seconds on page
    setTimeout(() => {
      if (!modalShown && window.innerWidth <= 768) {
        showModal();
      }
    }, 45000);
  }

  /* --------------------------------------------------------------------------
     LIVE SOCIAL PROOF NOTIFICATION TOAST
     -------------------------------------------------------------------------- */
  const salenotif = document.getElementById("saleNotif");
  const notifAvatar = document.getElementById("notifAvatar");
  const notifName = document.getElementById("notifName");
  const notifWhat = document.getElementById("notifWhat");
  const notifTime = document.getElementById("notifTime");
  const notifClose = document.getElementById("notifClose");

  const verifiedShoppers = [
    { name: "Patricia M. (Age 58)", location: "Ohio", time: "2 minutes ago", initial: "P" },
    { name: "Robert H. (Age 64)", location: "Texas", time: "4 minutes ago", initial: "R" },
    { name: "Linda S. (Age 55)", location: "Pennsylvania", time: "7 minutes ago", initial: "L" },
    { name: "James C. (Age 62)", location: "Florida", time: "11 minutes ago", initial: "J" },
    { name: "Susan W. (Age 57)", location: "North Carolina", time: "14 minutes ago", initial: "S" },
    { name: "David K. (Age 53)", location: "Arizona", time: "18 minutes ago", initial: "D" },
    { name: "Mary & John T.", location: "Michigan", time: "23 minutes ago", initial: "M" }
  ];

  let currentShopperIndex = 0;
  let toastTimeout;

  const cycleNotification = () => {
    if (!salenotif) return;

    const shopper = verifiedShoppers[currentShopperIndex];
    if (notifAvatar) notifAvatar.textContent = shopper.initial;
    if (notifName) notifName.textContent = `${shopper.name} · ${shopper.location}`;
    if (notifWhat) notifWhat.innerHTML = `Downloaded <strong>Don't Buy The Lie</strong> ($46)`;
    if (notifTime) notifTime.textContent = shopper.time;

    salenotif.classList.add("is-visible");

    // Hide after 6.5 seconds
    setTimeout(() => {
      salenotif.classList.remove("is-visible");
      currentShopperIndex = (currentShopperIndex + 1) % verifiedShoppers.length;
      // Show next notification after 12 seconds
      toastTimeout = setTimeout(cycleNotification, 12000);
    }, 6500);
  };

  if (notifClose) {
    notifClose.addEventListener("click", () => {
      if (salenotif) salenotif.classList.remove("is-visible");
      clearTimeout(toastTimeout);
    });
  }

  // Start first toast notification after 5 seconds
  setTimeout(cycleNotification, 5000);

  /* --------------------------------------------------------------------------
     SMOOTH SCROLLING FOR INTERNAL JUMP LINKS
     -------------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "#order" || targetId === "#editions") {
        return;
      }
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
});
