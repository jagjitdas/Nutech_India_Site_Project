// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  // Floating WhatsApp button (site-wide)
  const wa = document.createElement('a');
  wa.href = 'https://wa.me/919090004400?text=' + encodeURIComponent("Hi Nu-Tech India, I'd like to request a quote.");
  wa.className = 'wa-float';
  wa.target = '_blank';
  wa.rel = 'noopener';
  wa.setAttribute('aria-label', 'Request a quote on WhatsApp');
  wa.innerHTML = '<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16.03 3C9.4 3 4 8.4 4 15.03c0 2.23.6 4.32 1.65 6.12L4 29l8.03-1.6a12.9 12.9 0 0 0 4 .63c6.63 0 12.03-5.4 12.03-12.03C28.06 8.4 22.66 3 16.03 3Zm0 21.9c-1.98 0-3.83-.55-5.4-1.5l-.39-.23-4.76.95.98-4.65-.25-.4a9.85 9.85 0 0 1-1.55-5.24c0-5.46 4.44-9.9 9.9-9.9 5.45 0 9.88 4.44 9.88 9.9 0 5.46-4.43 10.07-9.88 10.07Zm5.42-7.4c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.63.08-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.14-.14.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.58-.9-2.17-.24-.57-.48-.5-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.62.71.23 1.36.2 1.87.12.57-.09 1.75-.71 2-1.4.24-.68.24-1.27.17-1.4-.07-.12-.27-.2-.56-.34Z"/></svg><span>Request a Quote</span>';
  document.body.appendChild(wa);

  // Scroll-reveal — content is visible by default; only elements currently
  // below the fold get the animated "pre" treatment, so nothing depends on
  // JS or scrolling to become visible.
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.85) {
        el.classList.add('pre');
        io.observe(el);
      }
    });
  }

  // Stat counters
  const counters = document.querySelectorAll('.num[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const countIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1200;
        const start = performance.now();
        function tick(now) {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        countIo.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(el => countIo.observe(el));
  } else {
    counters.forEach(el => { el.textContent = el.dataset.count + (el.dataset.suffix || ''); });
  }
  const toggle = document.querySelector('.hamburger');
  const links = document.querySelector('nav.links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.style.display === 'flex';
      links.style.display = open ? 'none' : 'flex';
      links.style.flexDirection = 'column';
      links.style.position = 'absolute';
      links.style.top = '100%';
      links.style.left = '0';
      links.style.right = '0';
      links.style.background = 'var(--concrete)';
      links.style.padding = '20px 32px';
      links.style.borderBottom = '2px solid var(--ink)';
      links.style.gap = '20px';
      toggle.setAttribute('aria-expanded', String(!open));
    });
  }

  // Duplicate marquee content so the CSS scroll loop is seamless
  document.querySelectorAll('.marquee-track').forEach(track => {
    track.innerHTML = track.innerHTML + track.innerHTML;
  });

  // Portfolio filter chips
  const chips = document.querySelectorAll('.chip[data-filter]');
  const items = document.querySelectorAll('.port-grid [data-cat]');
  if (chips.length && items.length) {
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const filter = chip.dataset.filter;
        items.forEach(item => {
          const show = filter === 'all' || item.dataset.cat === filter;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  // Enquiry forms.
  // - A form with data-netlify is posted to Netlify Forms (enquiries land in the Netlify dashboard).
  // - Any other form falls back to opening the visitor's email app.
  document.querySelectorAll('form.quote-form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      const setStatus = (msg) => {
        if (status) { status.textContent = msg; status.style.color = 'var(--signal)'; }
      };

      if (form.hasAttribute('data-netlify')) {
        if (!form.checkValidity()) { form.reportValidity(); return; }
        setStatus('Sending…');
        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(new FormData(form)).toString()
        }).then((r) => {
          if (!r.ok) throw new Error('bad response');
          form.reset();
          setStatus("Thank you — we'll get back to you within one business day.");
        }).catch(() => {
          setStatus('Could not send right now. Please call 90900 04400 or WhatsApp us.');
        });
        return;
      }

      const data = new FormData(form);
      const subject = encodeURIComponent('Quote request — ' + (data.get('service') || 'General enquiry'));
      const bodyLines = [
        'Name: ' + data.get('name'),
        'Company: ' + data.get('company'),
        'Phone: ' + data.get('phone'),
        'Email: ' + data.get('email'),
        'Service required: ' + data.get('service'),
        'Project location: ' + data.get('location'),
        '',
        data.get('message')
      ];
      const body = encodeURIComponent(bodyLines.join('\n'));
      setStatus('Opening your email app to send this enquiry to Nu-Tech India…');
      window.location.href = `mailto:nutech_india@yahoo.co.in?subject=${subject}&body=${body}`;
    });
  });
});
