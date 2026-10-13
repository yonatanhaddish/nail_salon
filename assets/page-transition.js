(() => {
  const loader = document.createElement("div");
  loader.className = "page-transition";
  loader.setAttribute("role", "status");
  loader.setAttribute("aria-live", "polite");
  loader.setAttribute("aria-label", "Loading page");
  loader.innerHTML = '<div class="page-transition-inner"><div class="page-transition-mark"><img src="assets/koko-nails-logo.jpg" alt=""></div><span class="page-transition-label">Loading KoKo</span></div>';
  document.body.appendChild(loader);

  const clearLoader = () => document.body.classList.remove("page-is-leaving");
  window.addEventListener("pageshow", clearLoader);

  document.addEventListener("click", event => {
    const link = event.target.closest("a[href]");
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.target === "_blank" || link.hasAttribute("download")) return;

    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || /^(tel:|mailto:|javascript:)/i.test(href)) return;

    const destination = new URL(link.href, window.location.href);
    const current = new URL(window.location.href);
    const sameDocument = destination.pathname === current.pathname && destination.search === current.search;
    const externalPage = current.protocol !== "file:" && destination.origin !== current.origin;
    if (sameDocument || externalPage || !/\.html?$/i.test(destination.pathname)) return;

    event.preventDefault();
    document.body.classList.add("page-is-leaving");
    window.setTimeout(() => window.location.assign(destination.href), 320);
  });
})();