import { getOverviewData } from "../services/mockDataService.js";
import { dataStore } from "../state/dataStore.js";
import { escapeHtml } from "../utils/html.js";
import { renderRowActions } from "../components/tableActions.js";
import { t } from "../../i18n/i18n.js";
import { labelRepPerformance } from "../../i18n/labels.js";

export function renderOverviewPage() {
  const { kpis } = getOverviewData(t);
  const kpiHtml = kpis
    .map(
      (item) => `
        <article class="kpi-card">
          <h3>${escapeHtml(item.label)}</h3>
          <p>${escapeHtml(item.value)}</p>
          <span>${escapeHtml(item.trend)}</span>
        </article>
      `
    )
    .join("");

  const repsHtml = dataStore.topReps
    .map(
      (rep) => `
        <li class="list-row">
          <div class="list-row__main">
            <span class="list-row__title">${escapeHtml(rep.name)}</span>
            <span class="list-row__meta">${escapeHtml(rep.amount)}</span>
          </div>
          <div class="list-row__side">
            <span class="pill ${escapeHtml(rep.status)}">${escapeHtml(labelRepPerformance(rep.status))}</span>
            ${renderRowActions("topRep", rep.id)}
          </div>
        </li>
      `
    )
    .join("");

  return `
    <section class="kpi-grid">${kpiHtml}</section>
    <section class="panel-grid">
      <article class="panel">
        <h3>${escapeHtml(t("overview.quickActions"))}</h3>
        <div class="actions">
          <button type="button" class="secondary-btn" data-action="open-entity-form" data-entity="sale" data-mode="add">${escapeHtml(t("overview.createInvoice"))}</button>
          <button type="button" class="secondary-btn" data-action="open-entity-form" data-entity="customer" data-mode="add">${escapeHtml(t("overview.addCustomer"))}</button>
          <button type="button" class="secondary-btn" data-action="open-entity-form" data-entity="user" data-mode="add">${escapeHtml(t("overview.assignRep"))}</button>
          <button type="button" class="secondary-btn" data-action="nav-route" data-route="reports">${escapeHtml(t("overview.viewReports"))}</button>
        </div>
      </article>
      <article class="panel panel--tight">
        <div class="panel-head">
          <h3>${escapeHtml(t("overview.topReps"))}</h3>
          <button type="button" class="btn-text btn-text--primary" data-action="open-entity-form" data-entity="topRep" data-mode="add">${escapeHtml(t("overview.addRep"))}</button>
        </div>
        <ul class="list list--rows">${repsHtml}</ul>
      </article>
    </section>
  `;
}
