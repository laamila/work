
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-link");
  const currentYear = document.getElementById("currentYear");

  // Tahun otomatis
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Menu navigasi mobile
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
      );
    });
  }

  // Tutup menu saat tautan dipilih
  navItems.forEach(function (link) {
    link.addEventListener("click", function () {
      navItems.forEach(function (item) {
        item.classList.remove("active");
      });

      link.classList.add("active");

      if (navLinks) {
        navLinks.classList.remove("open");
      }

      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute(
          "aria-label",
          "Buka menu navigasi"
        );
      }
    });
  });

  // Navigasi aktif sesuai bagian yang terlihat
  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navItems.forEach(function (item) {
              item.classList.toggle(
                "active",
                item.getAttribute("href") === "#" + entry.target.id
              );
            });
          }
        });
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: 0
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }
});
