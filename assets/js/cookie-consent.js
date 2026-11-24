
(function () {
  "use strict";
  var STORAGE_KEY = "volton_cookie_consent_v1";
  var GA_ID = "G-5WP3VGPC1L";
  var lang = (document.documentElement.getAttribute("lang") || "en").toLowerCase();
  var copy = {
    al: {
      title:"Përdorimi i cookies", text:"Ne përdorim cookies të nevojshme për funksionimin e website-it. Me pëlqimin tuaj, përdorim edhe cookies analitike për të kuptuar përdorimin e faqes.",
      accept:"Prano të gjitha", reject:"Refuzo jo të domosdoshmet", customize:"Personalizo", policy:"Politika e Cookies",
      settings:"Preferencat e Cookies", always:"Gjithmonë aktive", settingsText:"Zgjidhni kategoritë e cookies që dëshironi të lejoni. Cookies të domosdoshme janë gjithmonë aktive.",
      essential:"Cookies të domosdoshme", essentialDesc:"Nevojiten për funksionimin bazë dhe sigurinë e website-it.",
      analytics:"Cookies analitike", analyticsDesc:"Na ndihmojnë të kuptojmë se si përdoret website-i.",
      marketing:"Cookies marketingu", marketingDesc:"Përdoren për marketing dhe matjen e fushatave, nëse aktivizohen.",
      save:"Ruaj preferencat", close:"Mbyll"
    },
    en: {
      title:"Cookie preferences", text:"We use essential cookies to make this website work. With your permission, we also use analytics cookies to understand how the website is used.",
      accept:"Accept All Cookies", reject:"Reject Non-Essential", customize:"Customize", policy:"Cookie Policy",
      settings:"Cookie preferences", always:"Always active", settingsText:"Choose which cookie categories you want to allow. Essential cookies are always active.",
      essential:"Essential cookies", essentialDesc:"Required for the basic operation and security of this website.",
      analytics:"Analytics cookies", analyticsDesc:"Help us understand how visitors use this website.",
      marketing:"Marketing cookies", marketingDesc:"Used for marketing and campaign measurement, if enabled.",
      save:"Save preferences", close:"Close"
    },
    mk: {
      title:"Поставки за колачиња", text:"Користиме неопходни колачиња за функционирање на веб-страницата. Со ваша согласност, користиме и аналитички колачиња за да разбереме како се користи страницата.",
      accept:"Прифати ги сите", reject:"Одбиј ги несуштинските", customize:"Прилагоди", policy:"Политика за колачиња",
      settings:"Поставки за колачиња", always:"Секогаш активно", settingsText:"Изберете кои категории колачиња сакате да ги дозволите. Неопходните колачиња се секогаш активни.",
      essential:"Неопходни колачиња", essentialDesc:"Потребни за основното функционирање и безбедноста на веб-страницата.",
      analytics:"Аналитички колачиња", analyticsDesc:"Ни помагаат да разбереме како посетителите ја користат веб-страницата.",
      marketing:"Маркетинг колачиња", marketingDesc:"Се користат за маркетинг и мерење кампањи, доколку се активирани.",
      save:"Зачувај ги поставките", close:"Затвори"
    }
  };
  var t = copy[lang] || copy.en;

  function getConsent() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); }
    catch (e) { return null; }
  }
  function saveConsent(consent) {
    var value = {
      necessary: true,
      analytics: !!consent.analytics,
      marketing: !!consent.marketing,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    applyConsent(value);
    return value;
  }
  function loadAnalytics() {
    if (window.__voltonAnalyticsLoaded) return;
    window.__voltonAnalyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { anonymize_ip: true });
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(script);
  }
  function applyConsent(consent) {
    if (consent && consent.analytics) loadAnalytics();
  }
  function createInterface() {
    if (document.getElementById("volton-cookie-banner")) return;
    var banner = document.createElement("section");
    banner.id = "volton-cookie-banner";
    banner.className = "volton-cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", t.title);
    banner.innerHTML =
      '<div class="volton-cookie-banner__card">' +
      '<button type="button" class="volton-cookie-close volton-cookie-banner__close" data-cookie-banner-close aria-label="' + t.close + '">&times;</button>' +
      '<div class="volton-cookie-banner__top"><div><h3>' + t.title + '</h3><p>' + t.text + '</p></div></div>' +
      '<div class="volton-cookie-banner__actions">' +
      '<button type="button" class="volton-cookie-btn volton-cookie-btn--primary" data-cookie-accept>' + t.accept + '</button>' +
      '<button type="button" class="volton-cookie-btn volton-cookie-btn--secondary" data-cookie-reject>' + t.reject + '</button>' +
      '<button type="button" class="volton-cookie-link" data-cookie-customize>' + t.customize + '</button>' +
      '<a class="volton-cookie-link" href="cookies-policy.html">' + t.policy + '</a>' +
      '</div></div>';
    document.body.appendChild(banner);

    var modal = document.createElement("div");
    modal.id = "volton-cookie-modal";
    modal.className = "volton-cookie-modal-backdrop";
    modal.innerHTML =
      '<div class="volton-cookie-modal" role="dialog" aria-modal="true" aria-labelledby="volton-cookie-settings-title">' +
      '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px"><h3 id="volton-cookie-settings-title">' + t.settings + '</h3><button type="button" class="volton-cookie-close" data-cookie-close aria-label="' + t.close + '">&times;</button></div>' +
      '<p>' + t.settingsText + '</p>' +
      '<div class="volton-cookie-category"><div><strong>' + t.essential + '</strong><small>' + t.essentialDesc + '</small></div><span class="always-on">' + t.always + '</span></div>' +
      '<label class="volton-cookie-category"><span><strong>' + t.analytics + '</strong><small>' + t.analyticsDesc + '</small></span><input type="checkbox" id="volton-cookie-analytics"></label>' +
      '<label class="volton-cookie-category"><span><strong>' + t.marketing + '</strong><small>' + t.marketingDesc + '</small></span><input type="checkbox" id="volton-cookie-marketing"></label>' +
      '<div class="volton-cookie-modal__actions"><button type="button" class="volton-cookie-btn volton-cookie-btn--secondary" data-cookie-close>' + t.close + '</button><button type="button" class="volton-cookie-btn volton-cookie-btn--primary" data-cookie-save>' + t.save + '</button></div>' +
      '</div>';
    document.body.appendChild(modal);

    banner.querySelector("[data-cookie-accept]").addEventListener("click", function () {
      saveConsent({ analytics: true, marketing: true }); banner.classList.remove("is-visible");
    });
    banner.querySelector("[data-cookie-reject]").addEventListener("click", function () {
      saveConsent({ analytics: false, marketing: false }); banner.classList.remove("is-visible");
    });
    banner.querySelector("[data-cookie-banner-close]").addEventListener("click", function () {
      saveConsent({ analytics: false, marketing: false });
      banner.classList.remove("is-visible");
    });
    banner.querySelector("[data-cookie-customize]").addEventListener("click", openSettings);
    modal.querySelectorAll("[data-cookie-close]").forEach(function (button) {
      button.addEventListener("click", function () { modal.classList.remove("is-visible"); });
    });
    modal.addEventListener("click", function (event) {
      if (event.target === modal) modal.classList.remove("is-visible");
    });
    modal.querySelector("[data-cookie-save]").addEventListener("click", function () {
      saveConsent({
        analytics: modal.querySelector("#volton-cookie-analytics").checked,
        marketing: modal.querySelector("#volton-cookie-marketing").checked
      });
      modal.classList.remove("is-visible");
      banner.classList.remove("is-visible");
    });
  }
  function openSettings() {
    var modal = document.getElementById("volton-cookie-modal");
    if (!modal) return;
    var consent = getConsent() || {};
    modal.querySelector("#volton-cookie-analytics").checked = !!consent.analytics;
    modal.querySelector("#volton-cookie-marketing").checked = !!consent.marketing;
    modal.classList.add("is-visible");
  }
  function bindSettingsLinks() {
    document.querySelectorAll("[data-cookie-settings]").forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        openSettings();
      });
    });
  }
  document.addEventListener("DOMContentLoaded", function () {
    createInterface();
    bindSettingsLinks();
    var consent = getConsent();
    if (consent) applyConsent(consent);
    else document.getElementById("volton-cookie-banner").classList.add("is-visible");
  });
})();
