/* Kastanie: Zoho hosted waiting-list forms, bilingual pages and email fallback. */
document.addEventListener('DOMContentLoaded', function () {
  var lang = document.documentElement.lang.toLowerCase().startsWith('de') ? 'de' : 'en';
  var forms = window.KASTANIE_FORMS || {};
  var link = typeof forms[lang] === 'string' ? forms[lang].trim() : '';
  var active = document.querySelector('[data-zoho-active]');
  var pending = document.querySelector('[data-zoho-pending]');
  var frameSlot = document.querySelector('[data-zoho-frame]');
  var direct = document.querySelector('[data-zoho-direct]');
  function isPublicZohoForm(url) {
    try {
      var parsed = new URL(url);
      var host = parsed.hostname.toLowerCase();
      return parsed.protocol === 'https:' &&
        (host === 'forms.zohopublic.eu' || host === 'forms.zohopublic.com' ||
         host === 'forms.zohopublic.in' || host === 'forms.zohopublic.com.au' ||
         host === 'forms.zohopublic.jp' || host === 'forms.zohopublic.ca' ||
         host === 'forms.zohopublic.com.cn') &&
        parsed.pathname.includes('/form/') && parsed.pathname.includes('/formperma/');
    } catch (err) { return false; }
  }
  if (active && pending && frameSlot && direct && isPublicZohoForm(link)) {
    var iframe = document.createElement('iframe');
    iframe.src = link;
    iframe.title = lang === 'de' ? 'Kastanie – Warteliste für Wien' : 'Kastanie – Vienna waiting list';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.setAttribute('frameborder','0');
    iframe.setAttribute('aria-label', iframe.title);
    frameSlot.appendChild(iframe);
    direct.href = link;
    active.hidden = false;
    pending.hidden = true;
  } else if (active && pending) {
    active.hidden = true;
    pending.hidden = false;
  }
  var fallback = document.getElementById('waitlist');
  if (!fallback) return;
  fallback.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!fallback.reportValidity()) return;
    var email = document.getElementById('email').value.trim();
    var district = document.getElementById('district').selectedOptions[0].textContent.trim();
    var language = document.getElementById('language').value;
    var subject = fallback.dataset.subject || 'Kastanie waiting list';
    var body = [
      (fallback.dataset.labelEmail || 'Email') + ': ' + email,
      (fallback.dataset.labelDistrict || 'District') + ': ' + district,
      (fallback.dataset.labelLanguage || 'Language') + ': ' + language
    ].join('\n');
    window.location.href = 'mailto:hallo@kastanie.wien?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
});
