/* A visible contact choice is more reliable than a silent mailto: link. */
document.addEventListener('DOMContentLoaded', function () {
  var dialog = document.getElementById('photo-dialog');
  if (!dialog) return;
  document.querySelectorAll('[data-photo-cta]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      if (typeof dialog.showModal !== 'function') return; // The anchor still works as a fallback.
      event.preventDefault();
      dialog.showModal();
    });
  });
  var close = dialog.querySelector('[data-close-photo]');
  if (close) close.addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) dialog.close();
  });
  async function copyEmail() {
    var value = 'hallo@kastanie.wien';
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        var area = document.createElement('textarea');
        area.value = value;
        area.setAttribute('readonly','');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        var copied = document.execCommand('copy');
        document.body.removeChild(area);
        if (!copied) throw Error('Could not copy');
      }
      document.querySelectorAll('[data-copy-feedback]').forEach(function (feedback) {
        feedback.textContent = dialog.dataset.copySuccess;
      });
    } catch (error) {
      document.querySelectorAll('[data-copy-feedback]').forEach(function (feedback) {
        feedback.textContent = dialog.dataset.copyFailure;
      });
    }
  }
  document.querySelectorAll('[data-copy-email]').forEach(function (button) {
    button.addEventListener('click', copyEmail);
  });
});
