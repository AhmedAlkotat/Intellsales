import { t } from "../../i18n/i18n.js";
import { escapeHtml } from "../utils/html.js";
import { renderLangSwitch } from "../../i18n/langSwitch.js";

export function renderTopbar(title, roleLabel) {
  return `
    <div class="topbar-start">
      <p class="eyebrow">${escapeHtml(roleLabel)}</p>
      <h2>${escapeHtml(title)}</h2>
    </div>
    <div class="topbar-actions">
      ${renderLangSwitch("lang-switch")}
      <button type="button" class="logout-btn" data-action="logout">${escapeHtml(t("dashboard.logout"))}</button>
    </div>
  `;
}
