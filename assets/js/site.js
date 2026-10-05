/* Applies MH_CONFIG (see config.js) to the page.
   - data-mailto="NOTIFY_SUBJECT" / "WHOLESALE_SUBJECT" / "" -> mailto:CONTACT_EMAIL?subject=...
   - data-link="KEY" -> plain URL from config; hidden if left as "#"
   - [data-email-text] inside a link is replaced with the email address */
(function () {
  var cfg = window.MH_CONFIG || {};
  var isSet = function (v) { return typeof v === "string" && v.trim() !== "" && v.trim() !== "#"; };
  var email = isSet(cfg.CONTACT_EMAIL) ? cfg.CONTACT_EMAIL.trim() : "";

  document.querySelectorAll("[data-mailto]").forEach(function (el) {
    if (!email) return; // keep the HTML fallback href
    var key = el.getAttribute("data-mailto");
    var subject = key && isSet(cfg[key]) ? cfg[key].trim() : "";
    el.setAttribute("href", "mailto:" + email + (subject ? "?subject=" + encodeURIComponent(subject) : ""));
    var label = el.querySelector("[data-email-text]");
    if (label) label.textContent = email;
  });

  document.querySelectorAll("[data-link]").forEach(function (el) {
    var val = cfg[el.getAttribute("data-link")];
    var item = el.closest("[data-link-wrap]") || el;
    if (!isSet(val)) { item.hidden = true; return; }
    el.setAttribute("href", val.trim());
    if (/^https?:\/\//i.test(val.trim())) { el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener"); }
    item.hidden = false;
  });

  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
