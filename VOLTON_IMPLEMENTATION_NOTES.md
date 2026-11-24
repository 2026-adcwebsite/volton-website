# Volton website – implementation notes

This archive contains the first implementation pass on the existing static HTML website.

## Changes prepared

- Added a cookie consent banner in AL / EN / MK with **Accept All Cookies**, **Reject Non-Essential**, and **Customize**.
- Added a cookie preferences panel with Essential, Analytics, and Marketing categories.
- Consent is stored in the visitor's browser (`localStorage`) and can be changed later through **Cookie Settings** in the footer.
- Google Analytics (`G-5WP3VGPC1L`) is no longer loaded before consent. It is loaded only if Analytics cookies are accepted.
- Added **Cookies** and **Cookie Settings** links next to **Privacy Policy** in the footer.
- Added Privacy Policy and Cookie Policy page shells for all three languages. The legal text is intentionally a placeholder until the approved documents are supplied.
- Prepared all existing website forms for EmailJS in AL / EN / MK (contact, become-a-client, and customer-care forms).

## EmailJS – required setup before form submission works

Open `assets/js/emailjs-config.js` and replace:

- `YOUR_EMAILJS_SERVICE_ID`
- `YOUR_EMAILJS_TEMPLATE_ID`
- `YOUR_EMAILJS_PUBLIC_KEY`

In the EmailJS template dashboard:

1. Set the recipient / **To Email** to `info@volton.mk`.
2. Use a subject such as `New {{form_type}} submission – Volton website`.
3. Include these template variables in the message body:
   - `{{website_language}}`
   - `{{form_type}}`
   - `{{reply_to}}`
   - `{{form_data}}`
4. Set the Reply-To field to `{{reply_to}}`.
5. For the Customer Care form's file input (`attachments`), configure the EmailJS template's file attachment source to use that form field and test it with the actual account. The website keeps the existing multiple-file field; attachment handling must be verified in EmailJS before launch.

All forms currently use the same EmailJS service and template ID. If you prefer separate templates for each form type, the integration can be adjusted.

**Important:** The forms are not live until the EmailJS values are configured and tested. Do not publish the placeholder configuration as a finished contact solution.

## Documents still required

- The approved Privacy Policy text/document.
- The approved Cookie Policy text/document.
- The EN and MK PDF files for each Legal & Regulatory download.
- Confirmation whether Privacy and Cookie Policy pages should follow the selected website language or use another default-language rule.

The Legal & Regulatory PDF links have not been assigned to files yet because no PDFs were included in the uploaded ZIP.

## Local testing

This is a static HTML project. From the project root, run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

To test the cookie banner again after making a choice, clear the site's local storage in browser developer tools (Application / Storage → Local Storage → remove `volton_cookie_consent_v1`) or use a private browser window.
