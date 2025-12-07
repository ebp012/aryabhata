let t0 = performance.now();
requestAnimationFrame(() => {
  let t1 = performance.now();
  if (t1 - t0 > 100) {
    document.documentElement.classList.add("lowfx");

    // break all filter references
    document.querySelectorAll("filter[id]").forEach(f => {
      f.removeAttribute("id");
    });
  }
});
