import { dataStore, priceListLabel } from "../state/dataStore.js";
import { escapeHtml } from "../utils/html.js";
import { renderRowActions } from "../components/tableActions.js";
import { t, getLocale } from "../../i18n/i18n.js";

function listCurrency(listId) {
  const pl = dataStore.priceLists.find((p) => p.id === listId);
  return pl?.currency || "";
}

function formatMoney(amount, currency) {
  const raw = String(amount ?? "").replace(/,/g, "");
  const n = Number.parseFloat(raw);
  const cur = escapeHtml(currency);
  const loc = getLocale() === "ar" ? "ar-EG" : undefined;
  if (!Number.isFinite(n)) {
    return `${escapeHtml(String(amount))} ${cur}`;
  }
  const formatted = n.toLocaleString(loc, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${formatted} ${cur}`;
}

export function renderPricelistsPage() {
  const listsRows = dataStore.priceLists
    .map((pl) => {
      const count = dataStore.priceListItems.filter((i) => i.priceListId === pl.id).length;
      return `
        <tr>
          <td class="td-strong">${escapeHtml(pl.code)}</td>
          <td>${escapeHtml(pl.name)}</td>
          <td><span class="badge badge--neutral">${escapeHtml(pl.currency)}</span></td>
          <td class="td-muted">${count}</td>
          <td class="td-actions">${renderRowActions("priceList", pl.id)}</td>
        </tr>
      `;
    })
    .join("");

  const plFilterOptions = [
    `<option value="">${escapeHtml(t("pricelists.allLists"))}</option>`,
    ...dataStore.priceLists.map(
      (pl) => `<option value="${escapeHtml(pl.id)}">${escapeHtml(pl.name)} (${escapeHtml(pl.code)})</option>`
    ),
  ].join("");

  const itemsRows = dataStore.priceListItems
    .map((item) => {
      const cur = listCurrency(item.priceListId);
      return `
        <tr data-pl="${escapeHtml(item.priceListId)}">
          <td class="td-muted">${escapeHtml(priceListLabel(item.priceListId))}</td>
          <td class="td-strong">${escapeHtml(item.sku)}</td>
          <td>${escapeHtml(item.productName)}</td>
          <td>${escapeHtml(item.unit)}</td>
          <td class="td-strong">${formatMoney(item.price, cur)}</td>
          <td class="td-actions">${renderRowActions("priceItem", item.id)}</td>
        </tr>
      `;
    })
    .join("");

  return `
    <section class="panel panel--flush stack-gap">
      <div class="panel-block">
        <div class="toolbar toolbar--split">
          <div>
            <h3 class="toolbar-title">${escapeHtml(t("pricelists.sectionLists"))}</h3>
            <p class="toolbar-desc">${escapeHtml(t("pricelists.sectionListsDesc"))}</p>
          </div>
          <div class="toolbar-filters toolbar-filters--inline">
            <input class="search-input table-filter" type="search" data-table="priceLists" placeholder="${escapeHtml(t("pricelists.searchListsPh"))}" />
            <button class="primary-btn" type="button" data-action="open-entity-form" data-entity="priceList" data-mode="add">${escapeHtml(t("pricelists.addList"))}</button>
          </div>
        </div>
        <div class="table-shell table-shell--no-top-pad">
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>${escapeHtml(t("pricelists.thCode"))}</th>
                  <th>${escapeHtml(t("pricelists.thName"))}</th>
                  <th>${escapeHtml(t("pricelists.thCurrency"))}</th>
                  <th>${escapeHtml(t("pricelists.thProducts"))}</th>
                  <th class="th-actions">${escapeHtml(t("common.actions"))}</th>
                </tr>
              </thead>
              <tbody id="priceListsTableBody">${listsRows}</tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="panel-block panel-block--bordered">
        <div class="toolbar toolbar--wrap">
          <div class="toolbar-cluster">
            <h3 class="toolbar-title">${escapeHtml(t("pricelists.sectionItems"))}</h3>
            <p class="toolbar-desc">${escapeHtml(t("pricelists.sectionItemsDesc"))}</p>
          </div>
          <div class="toolbar-cluster toolbar-filters">
            <label class="filter-label">
              <span>${escapeHtml(t("pricelists.filterList"))}</span>
              <select class="search-input pricelist-filter" aria-label="${escapeHtml(t("pricelists.filterAria"))}">${plFilterOptions}</select>
            </label>
            <input class="search-input table-filter" type="search" data-table="priceItems" placeholder="${escapeHtml(t("pricelists.searchItemsPh"))}" />
            <button class="primary-btn" type="button" data-action="open-entity-form" data-entity="priceItem" data-mode="add" ${dataStore.priceLists.length === 0 ? "disabled" : ""}>${escapeHtml(t("pricelists.addPrice"))}</button>
          </div>
        </div>
        <div class="table-shell table-shell--no-top-pad">
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>${escapeHtml(t("pricelists.thPricelist"))}</th>
                  <th>${escapeHtml(t("pricelists.thSku"))}</th>
                  <th>${escapeHtml(t("pricelists.thProduct"))}</th>
                  <th>${escapeHtml(t("pricelists.thUnit"))}</th>
                  <th>${escapeHtml(t("pricelists.thUnitPrice"))}</th>
                  <th class="th-actions">${escapeHtml(t("common.actions"))}</th>
                </tr>
              </thead>
              <tbody id="priceItemsTableBody">${itemsRows}</tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  `;
}
