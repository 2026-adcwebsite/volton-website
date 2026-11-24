
(function () {
  "use strict";
  var config = window.VOLTON_EMAILJS_CONFIG || {};
  var lang = (document.documentElement.getAttribute("lang") || "en").toLowerCase();
  var messages = {
    al: { success:"Faleminderit! Kërkesa juaj u dërgua me sukses.", error:"Kërkesa nuk u dërgua. Ju lutemi provoni përsëri.", missing:"EmailJS nuk është konfiguruar ende. Plotësoni të dhënat në assets/js/emailjs-config.js.", sending:"Duke dërguar..." },
    en: { success:"Thank you! Your request has been sent successfully.", error:"Your request could not be sent. Please try again.", missing:"EmailJS is not configured yet. Complete the values in assets/js/emailjs-config.js.", sending:"Sending..." },
    mk: { success:"Ви благодариме! Вашето барање е успешно испратено.", error:"Барањето не беше испратено. Обидете се повторно.", missing:"EmailJS сè уште не е конфигуриран. Пополнете ги вредностите во assets/js/emailjs-config.js.", sending:"Се испраќа..." }
  };
  var t = messages[lang] || messages.en;

  function fieldValue(form, names) {
    for (var i = 0; i < names.length; i++) {
      var field = form.querySelector('[name="' + names[i] + '"]');
      if (field && field.value) return field.value;
    }
    return "";
  }
  function ensureHidden(form, name) {
    var input = form.querySelector('input[name="' + name + '"]');
    if (!input) {
      input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      form.appendChild(input);
    }
    return input;
  }
  function buildFormSummary(form) {
    var data = new FormData(form);
    var lines = [];
    data.forEach(function (value, key) {
      if (key === "form_data" || key === "attachments" || value instanceof File) return;
      if (typeof value === "string" && value.trim()) lines.push(key + ": " + value.trim());
    });
    return lines.join("\n");
  }
  function setStatus(form, text, type) {
    var status = form.previousElementSibling;
    if (!status || !status.classList.contains("emailjs-form-status")) {
      status = form.parentNode.querySelector(".emailjs-form-status");
    }
    if (!status) return;
    status.textContent = text;
    status.className = "emailjs-form-status is-visible " + (type || "is-info");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var forms = document.querySelectorAll("form[data-emailjs-form]");
    if (!forms.length) return;

    forms.forEach(function (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!config.serviceId || !config.templateId || !config.publicKey ||
            config.serviceId.indexOf("YOUR_") === 0 ||
            config.templateId.indexOf("YOUR_") === 0 ||
            config.publicKey.indexOf("YOUR_") === 0 ||
            !window.emailjs) {
          setStatus(form, t.missing, "is-error");
          return;
        }

        var button = form.querySelector('[type="submit"]');
        var originalText = button ? button.textContent : "";
        if (button) { button.disabled = true; button.textContent = t.sending; }

        ensureHidden(form, "form_data").value = buildFormSummary(form);
        ensureHidden(form, "reply_to").value = fieldValue(form, ["email"]);
        ensureHidden(form, "from_name").value = fieldValue(form, ["name", "contact_person", "name_company", "company_name"]) || "Volton Website";

        window.emailjs.sendForm(config.serviceId, config.templateId, form)
          .then(function () {
            setStatus(form, t.success, "is-success");
            form.reset();
          })
          .catch(function (error) {
            console.error("Volton EmailJS submission failed:", error);
            setStatus(form, t.error, "is-error");
          })
          .finally(function () {
            if (button) { button.disabled = false; button.textContent = originalText; }
          });
      });
    });
  });
})();
