// Definition Workbench chrome: section navigator with scroll-spy, field search, expand/collapse all,
// remembered section open state, and wbReveal() for jumping to a field from other tabs.
// Pure UI over the existing markup in index.html; it never reads or writes definition data.
(function () {
  'use strict';

  const ws = document.getElementById('ws-workbench');
  const navList = document.getElementById('wbNavList');
  const search = document.getElementById('wbFieldSearch');
  const searchStatus = document.getElementById('wbSearchStatus');
  if (!ws || !navList) return;

  const OPEN_KEY = 'GVK_WB_SECTIONS_OPEN';
  const scopes = Array.from(ws.querySelectorAll('.scope-content'));
  let query = '';
  let applyingFilter = false;   // programmatic opens while filtering are not remembered
  let filterOpened = new Set(); // sections the filter opened, closed again when it clears

  const readOpenState = () => {
    try { return JSON.parse(localStorage.getItem(OPEN_KEY)) || {}; } catch (e) { return {}; }
  };
  const writeOpenState = (state) => {
    try { localStorage.setItem(OPEN_KEY, JSON.stringify(state)); } catch (e) { /* storage blocked: keep defaults */ }
  };

  const activeScope = () => scopes.find((s) => s.classList.contains('active')) || scopes[0];
  const sectionsOf = (scope) => Array.from(scope.querySelectorAll(':scope > .wc-accordion, :scope > [data-wb-section]'));
  const sectionName = (sec) => {
    const n = sec.querySelector('.wc-name');
    return n ? n.textContent.trim() : (sec.getAttribute('data-wb-section') || 'Section');
  };
  const sectionNum = (sec) => {
    const n = sec.querySelector('.wc-num');
    return n ? n.textContent.trim() : '';
  };
  const isOpen = (sec) => sec.tagName !== 'DETAILS' || sec.open;

  // Stable ids so open state survives reloads
  scopes.forEach((scope) => {
    sectionsOf(scope).forEach((sec, i) => { if (!sec.id) sec.id = `${scope.id}-sec-${i + 1}`; });
  });

  // ---- Remembered open/closed state ---------------------------------------------------------
  const saved = readOpenState();
  scopes.forEach((scope) => sectionsOf(scope).forEach((sec) => {
    if (sec.tagName !== 'DETAILS') return;
    if (Object.prototype.hasOwnProperty.call(saved, sec.id)) sec.open = !!saved[sec.id];
    sec.addEventListener('toggle', () => {
      markNavState();
      if (applyingFilter || query) return;
      const st = readOpenState();
      st[sec.id] = sec.open;
      writeOpenState(st);
    });
  }));

  // ---- Sticky offset (header height varies with wrapping) -----------------------------------
  function updateStickyTop() {
    const header = document.querySelector('header');
    const h = header ? header.getBoundingClientRect().height : 84;
    document.documentElement.style.setProperty('--wb-sticky-top', `${Math.round(h + 12)}px`);
  }

  // ---- Navigator ----------------------------------------------------------------------------
  function buildNav() {
    const scope = activeScope();
    navList.innerHTML = '';
    sectionsOf(scope).forEach((sec) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'wb-nav-item';
      btn.dataset.target = sec.id;
      const def = sec.querySelector('.wc-def');
      btn.title = def ? `${sectionName(sec)} · ${def.textContent.trim()}` : sectionName(sec);
      btn.innerHTML = '<span class="wb-nav-num"></span><span class="wb-nav-name"></span><span class="wb-nav-count" hidden></span>';
      btn.querySelector('.wb-nav-num').textContent = sectionNum(sec);
      btn.querySelector('.wb-nav-name').textContent = sectionName(sec);
      btn.addEventListener('click', () => {
        if (sec.tagName === 'DETAILS' && !sec.open) sec.open = true;
        sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setCurrent(sec.id);
      });
      navList.appendChild(btn);
    });
    markNavState();
    updateScrollSpy();
  }

  function markNavState() {
    navList.querySelectorAll('.wb-nav-item').forEach((btn) => {
      const sec = document.getElementById(btn.dataset.target);
      if (sec) btn.classList.toggle('is-closed', !isOpen(sec));
    });
  }

  function setCurrent(id) {
    navList.querySelectorAll('.wb-nav-item').forEach((btn) => {
      const on = btn.dataset.target === id;
      btn.classList.toggle('is-current', on);
      if (on) btn.setAttribute('aria-current', 'true'); else btn.removeAttribute('aria-current');
    });
  }

  let spyQueued = false;
  function updateScrollSpy() {
    spyQueued = false;
    if (!ws.classList.contains('active')) return;
    const top = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--wb-sticky-top')) || 96;
    const visible = sectionsOf(activeScope()).filter((s) => !s.classList.contains('wb-filter-hide'));
    let current = visible[0];
    for (const sec of visible) {
      if (sec.getBoundingClientRect().top - top <= 120) current = sec;
      else break;
    }
    // Scrolled to the bottom: the last section is current even if its top never reaches the line
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4 && visible.length) {
      current = visible[visible.length - 1];
    }
    if (current) setCurrent(current.id);
  }

  window.addEventListener('scroll', () => {
    if (!spyQueued) { spyQueued = true; requestAnimationFrame(updateScrollSpy); }
  }, { passive: true });
  window.addEventListener('resize', () => { updateStickyTop(); updateScrollSpy(); });

  // ---- Expand / collapse all ----------------------------------------------------------------
  function setAllOpen(open) {
    const st = readOpenState();
    sectionsOf(activeScope()).forEach((sec) => {
      if (sec.tagName !== 'DETAILS' || sec.classList.contains('wb-filter-hide')) return;
      sec.open = open;
      st[sec.id] = open;
    });
    if (!query) writeOpenState(st);
    markNavState();
  }
  const expandBtn = document.getElementById('wbExpandAll');
  const collapseBtn = document.getElementById('wbCollapseAll');
  if (expandBtn) expandBtn.addEventListener('click', () => setAllOpen(true));
  if (collapseBtn) collapseBtn.addEventListener('click', () => setAllOpen(false));

  // ---- Field search -------------------------------------------------------------------------
  const squash = (t) => (t || '').toLowerCase().replace(/[\s_\-./·]+/g, '');

  function itemText(item) {
    const label = item.matches('.chk-label') ? item : item.querySelector('.control-label');
    const input = item.querySelector('input, select, textarea');
    return [
      label ? label.textContent : '',
      label ? label.title : '',
      input ? input.id : '',
      input ? input.title : '',
      input ? input.placeholder : ''
    ].join(' ');
  }

  function clearFilterMarks() {
    ws.querySelectorAll('.wb-filter-hide, .wb-filter-match').forEach((el) => el.classList.remove('wb-filter-hide', 'wb-filter-match'));
    navList.querySelectorAll('.wb-nav-item').forEach((b) => {
      b.classList.remove('is-nomatch');
      const c = b.querySelector('.wb-nav-count');
      if (c) c.hidden = true;
    });
  }

  // Filters one container's direct children; returns the number of matching fields left visible.
  function filterChildren(container, q) {
    let total = 0;
    const kids = Array.from(container.children);
    kids.forEach((child) => {
      if (child.matches('.control-grid, .checkbox-row')) {
        let n = 0;
        child.querySelectorAll(':scope > .control-item, :scope > .chk-label').forEach((item) => {
          const hit = squash(itemText(item)).includes(q);
          item.classList.toggle('wb-filter-hide', !hit);
          item.classList.toggle('wb-filter-match', hit);
          if (hit) n++;
        });
        child.classList.toggle('wb-filter-hide', n === 0);
        total += n;
      } else if (child.matches('.control-item')) {
        const hit = squash(itemText(child)).includes(q);
        child.classList.toggle('wb-filter-hide', !hit);
        child.classList.toggle('wb-filter-match', hit);
        if (hit) total++;
      } else if (child.matches('.nested-card')) {
        const n = filterChildren(child, q);
        child.classList.toggle('wb-filter-hide', n === 0);
        total += n;
      } else if (!child.matches('.wb-subhead, .nested-card-title')) {
        child.classList.add('wb-filter-hide'); // notes, tables, previews: context, not fields
      }
    });
    // Headings stay only above a group that still has matches
    kids.forEach((child) => {
      if (child.matches('.wb-subhead')) {
        const next = child.nextElementSibling;
        child.classList.toggle('wb-filter-hide', !next || next.classList.contains('wb-filter-hide'));
      } else if (child.matches('.nested-card-title')) {
        child.classList.toggle('wb-filter-hide', total === 0);
      }
    });
    return total;
  }

  function applyFilter() {
    const raw = search ? search.value.trim() : '';
    const q = squash(raw);
    const wasFiltering = !!query;
    query = q;
    if (search && search.parentElement) search.parentElement.classList.toggle('has-query', !!raw);
    clearFilterMarks();

    if (!q) {
      // Close what the filter opened; the user's own open/closed choices come back
      applyingFilter = true;
      if (wasFiltering) filterOpened.forEach((sec) => { sec.open = false; });
      applyingFilter = false;
      filterOpened = new Set();
      if (searchStatus) searchStatus.hidden = true;
      markNavState();
      updateScrollSpy();
      return;
    }

    let fields = 0;
    let sectionsHit = 0;
    applyingFilter = true;
    sectionsOf(activeScope()).forEach((sec) => {
      const headerHit = squash(sec.querySelector('.wc-title') ? sec.querySelector('.wc-title').textContent : sectionName(sec)).includes(q);
      const body = sec.querySelector('.wc-body, .wb-output-body');
      // Field matches win; a section whose title matches but none of its fields do is shown whole
      let n = body ? filterChildren(body, q) : 0;
      const wholeSection = n === 0 && headerHit;
      if (wholeSection) {
        body.querySelectorAll('.wb-filter-hide').forEach((el) => el.classList.remove('wb-filter-hide'));
        n = body.querySelectorAll('.control-item, .checkbox-row > .chk-label').length;
      }
      const show = n > 0 || headerHit;
      sec.classList.toggle('wb-filter-hide', !show);
      if (show) {
        sectionsHit++;
        fields += n;
        if (sec.tagName === 'DETAILS' && !sec.open) { sec.open = true; filterOpened.add(sec); }
      }
      const btn = navList.querySelector(`.wb-nav-item[data-target="${sec.id}"]`);
      if (btn) {
        btn.classList.toggle('is-nomatch', !show);
        const c = btn.querySelector('.wb-nav-count');
        if (c) { c.hidden = !show || wholeSection; c.textContent = String(n); }
      }
    });
    applyingFilter = false;

    if (searchStatus) {
      searchStatus.hidden = false;
      searchStatus.classList.toggle('is-empty', sectionsHit === 0);
      searchStatus.textContent = sectionsHit === 0
        ? `No fields match “${raw}”`
        : `${fields} field${fields === 1 ? '' : 's'} in ${sectionsHit} section${sectionsHit === 1 ? '' : 's'}`;
    }
    markNavState();
    updateScrollSpy();
  }

  function clearSearch() {
    if (!search || !search.value) return;
    search.value = '';
    applyFilter();
  }

  if (search) {
    search.addEventListener('input', applyFilter);
    search.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { clearSearch(); search.blur(); }
      if (e.key === 'Enter') {
        // Jump to the first matching field
        const hit = activeScope().querySelector('.wb-filter-match');
        const field = hit && hit.querySelector('input:not([type="hidden"]), select, textarea');
        if (hit) {
          hit.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (field) field.focus({ preventScroll: true });
        }
      }
    });
  }

  // "/" focuses the search while the Workbench is open
  document.addEventListener('keydown', (e) => {
    if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey || !search) return;
    if (!ws.classList.contains('active')) return;
    const t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|SELECT|TEXTAREA)$/.test(t.tagName))) return;
    e.preventDefault();
    search.focus();
    search.select();
  });

  // ---- Scope changes (switchScope in app.js toggles .active) --------------------------------
  const scopeObserver = new MutationObserver(() => {
    buildNav();
    if (query) applyFilter();
  });
  scopes.forEach((s) => scopeObserver.observe(s, { attributes: true, attributeFilter: ['class'] }));

  // Workspace switch: the header may have wrapped differently; spy needs a fresh read
  const wsObserver = new MutationObserver(() => { updateStickyTop(); updateScrollSpy(); });
  wsObserver.observe(ws, { attributes: true, attributeFilter: ['class'] });

  /// <summary>Shows a Workbench field: switches to its scope, clears a hiding search, opens its section and scrolls to it.</summary>
  window.wbReveal = function (el, opts) {
    if (!el) return;
    opts = opts || {};
    const scope = el.closest('.scope-content');
    if (scope && !scope.classList.contains('active') && typeof window.switchScope === 'function') window.switchScope(scope.id);
    if (el.closest('.wb-filter-hide')) clearSearch();
    let d = el.parentElement ? el.parentElement.closest('details') : null;
    while (d) { d.open = true; d = d.parentElement ? d.parentElement.closest('details') : null; }
    setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: opts.block || 'center' });
      if (opts.flash !== false) {
        el.classList.add('am-flash');
        setTimeout(() => el.classList.remove('am-flash'), 1600);
      }
    }, opts.delay !== undefined ? opts.delay : 60);
  };

  updateStickyTop();
  buildNav();
})();
