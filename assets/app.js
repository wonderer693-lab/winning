// Progressive enhancement only. The site works fully without JS.

(function () {
  // Mobile nav toggle
  var toggle = document.querySelector('[data-nav-toggle]');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    // Close on escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  // Mark scrollable tables so the CSS can hint at overflow
  document.querySelectorAll('[data-table-scroll]').forEach(function (el) {
    function check() {
      el.classList.toggle('is-scrollable', el.scrollWidth > el.clientWidth + 2);
    }
    check();
    window.addEventListener('resize', check);
  });
})();
