export function scrollToSection(id) {
  const slug = id.replace("#", "");

  const tryScroll = (attempts = 0) => {
    const element = document.getElementById(slug);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (attempts < 24) {
      window.dispatchEvent(new CustomEvent("portfolio:preload-sections"));
      window.setTimeout(() => tryScroll(attempts + 1), 50);
    }
  };

  tryScroll();
}
