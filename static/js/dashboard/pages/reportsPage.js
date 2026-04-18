import { t } from "../../i18n/i18n.js";
import { escapeHtml } from "../utils/html.js";

export function renderReportsPage() {
  return `
    <section class="panel">
      <h3>${escapeHtml(t("reports.title"))}</h3>
      <p>${escapeHtml(t("reports.intro"))}</p>
      <div class="actions">
        <button type="button" class="secondary-btn">${escapeHtml(t("reports.daily"))}</button>
        <button type="button" class="secondary-btn">${escapeHtml(t("reports.monthly"))}</button>
        <button type="button" class="secondary-btn">${escapeHtml(t("reports.aging"))}</button>
        <button type="button" class="secondary-btn">${escapeHtml(t("reports.repPerf"))}</button>
      </div>
    </section>
  `;
}
