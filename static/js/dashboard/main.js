import { renderSidebar } from "./components/sidebar.js";
import { renderTopbar } from "./components/topbar.js";
import { buildModalMarkup, handleEntityFormSubmit, buildInvoiceItemsModalMarkup } from "./components/entityModal.js";
import { appState, setActiveRoute } from "./state/appState.js";
import {
  dataStore,
  removeCustomer,
  removeInventoryAlert,
  removePriceList,
  removePriceListItem,
  removeSale,
  removeTopRep,
  removeUser,
  removeInvoice,
} from "./state/dataStore.js";
import { renderOverviewPage } from "./pages/overviewPage.js";
import { renderSalesPage } from "./pages/salesPage.js";
import { renderCustomersPage } from "./pages/customersPage.js";
import { renderInvoicesPage } from "./pages/invoicesPage.js";
import { renderInventoryPage } from "./pages/inventoryPage.js";
import { renderReportsPage } from "./pages/reportsPage.js";
import { renderUsersPage } from "./pages/usersPage.js";
import { renderPricelistsPage } from "./pages/pricelistsPage.js";
import { t, setLocale, initI18n } from "../i18n/i18n.js";

initI18n();

const routes = [
  { key: "overview", render: renderOverviewPage },
  { key: "sales", render: renderSalesPage },
  { key: "customers", render: renderCustomersPage },
  { key: "invoices", render: renderInvoicesPage },
  { key: "inventory", render: renderInventoryPage },
  { key: "pricelists", render: renderPricelistsPage },
  { key: "reports", render: renderReportsPage },
  { key: "users", render: renderUsersPage },
];

const TABLE_BODY_IDS = {
  sales: "salesTableBody",
  customers: "customersTableBody",
  invoices: "invoicesTableBody",
  inventory: "inventoryTableBody",
  users: "usersTableBody",
  priceLists: "priceListsTableBody",
  priceItems: "priceItemsTableBody",
};

const sidebarMount = document.getElementById("sidebarMount");
const topbarMount = document.getElementById("topbarMount");
const pageMount = document.getElementById("pageMount");
const modalMount = document.getElementById("modalMount");

function getRouteFromHash() {
  const key = window.location.hash.replace("#", "").trim();
  return routes.some((item) => item.key === key) ? key : "overview";
}

function closeModal() {
  if (modalMount) modalMount.innerHTML = "";
}

function openEntityModal(entity, mode, id) {
  if (!modalMount) return;
  modalMount.innerHTML = buildModalMarkup(entity, mode, id || "");
}

function openInvoiceItemsModal(invoiceId) {
  if (!modalMount) return;
  modalMount.innerHTML = buildInvoiceItemsModalMarkup(invoiceId);
}

function deleteEntity(entity, id) {
  const message = entity === "priceList" ? t("confirm.deletePricelist") : t("confirm.deleteRecord");
  if (!window.confirm(message)) {
    return;
  }
  if (entity === "user") removeUser(id);
  else if (entity === "customer") removeCustomer(id);
  else if (entity === "sale") removeSale(id);
  else if (entity === "invoice") removeInvoice(id);
  else if (entity === "inventory") removeInventoryAlert(id);
  else if (entity === "topRep") removeTopRep(id);
  else if (entity === "priceList") removePriceList(id);
  else if (entity === "priceItem") removePriceListItem(id);
  renderApp();
}

function archiveEntity(entity, id) {
  if (entity === "invoice") {
    const message = t("confirm.archiveRecord") || "Archive this invoice? It will be moved to archived status.";
    if (!window.confirm(message)) {
      return;
    }
    // For demo purposes, we'll just update the status to "Archived"
    const invoice = dataStore.invoices.find(inv => inv.id === id);
    if (invoice) {
      invoice.status = "Archived";
      renderApp();
    }
  } else if (entity === "inventory") {
    const message = t("confirm.archiveRecord") || "Archive this product? It will be moved to archived status.";
    if (!window.confirm(message)) {
      return;
    }
    // For demo purposes, we'll just update the status to "Archived"
    const product = dataStore.inventoryAlerts.find(inv => inv.id === id);
    if (product) {
      product.status = "Archived";
      renderApp();
    }
  }
}

function applyPriceItemFilters() {
  const tbody = document.getElementById("priceItemsTableBody");
  if (!tbody) return;
  const sel = document.querySelector("select.pricelist-filter");
  const inp = document.querySelector('input.table-filter[data-table="priceItems"]');
  const listVal = sel instanceof HTMLSelectElement ? sel.value : "";
  const q = inp instanceof HTMLInputElement ? inp.value.toLowerCase().trim() : "";
  tbody.querySelectorAll("tr").forEach((tr) => {
    const pl = tr.dataset.pl || "";
    const text = tr.textContent.toLowerCase();
    const matchList = !listVal || pl === listVal;
    const matchQ = !q || text.includes(q);
    tr.style.display = matchList && matchQ ? "" : "none";
  });
}

function filterTable(tableKey, query) {
  if (tableKey === "priceItems") {
    applyPriceItemFilters();
    return;
  }
  const tbodyId = TABLE_BODY_IDS[tableKey];
  if (!tbodyId) return;
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  const q = query.toLowerCase().trim();
  tbody.querySelectorAll("tr").forEach((tr) => {
    tr.style.display = !q || tr.textContent.toLowerCase().includes(q) ? "" : "none";
  });
}

function renderApp() {
  const activeRoute = getRouteFromHash();
  setActiveRoute(activeRoute);
  const currentRoute = routes.find((item) => item.key === activeRoute) || routes[0];

  document.title = t("meta.dashboardTitle");

  sidebarMount.innerHTML = renderSidebar(routes, appState.activeRoute);
  topbarMount.innerHTML = renderTopbar(t(`titles.${currentRoute.key}`), t(`roles.${appState.userRoleKey}`));
  pageMount.innerHTML = currentRoute.render();
}

document.addEventListener("click", (event) => {
  const target = event.target;
  const overlayEl = target instanceof HTMLElement ? target.closest(".modal-overlay") : null;
  if (overlayEl && target === overlayEl) {
    closeModal();
    return;
  }

  const routeBtn = target.closest("button[data-route]");
  if (routeBtn && sidebarMount.contains(routeBtn)) {
    window.location.hash = routeBtn.dataset.route || "overview";
    return;
  }

  if (target.closest('[data-action="logout"]')) {
    window.location.href = "./index.html";
    return;
  }

  const actionEl = target.closest("[data-action]");
  if (!actionEl) return;

  const action = actionEl.dataset.action;
  if (action === "set-locale") {
    event.preventDefault();
    const lang = actionEl.dataset.lang;
    if (lang === "en" || lang === "ar") {
      setLocale(lang);
      closeModal();
      renderApp();
    }
    return;
  }
  if (action === "close-modal") {
    event.preventDefault();
    closeModal();
    return;
  }

  if (action === "open-entity-form") {
    event.preventDefault();
    const entity = actionEl.dataset.entity;
    const mode = actionEl.dataset.mode || "add";
    const id = actionEl.dataset.id || "";
    if (entity) openEntityModal(entity, mode, id);
    return;
  }

  if (action === "view-invoice-items") {
    event.preventDefault();
    const invoiceId = actionEl.dataset.invoiceId;
    if (invoiceId) openInvoiceItemsModal(invoiceId);
    return;
  }

  if (action === "delete-entity") {
    event.preventDefault();
    const entity = actionEl.dataset.entity;
    const id = actionEl.dataset.id;
    if (entity && id) deleteEntity(entity, id);
    return;
  }

  if (action === "archive-entity") {
    event.preventDefault();
    const entity = actionEl.dataset.entity;
    const id = actionEl.dataset.id;
    if (entity && id) archiveEntity(entity, id);
    return;
  }

  if (action === "nav-route") {
    event.preventDefault();
    const route = actionEl.dataset.route || "overview";
    window.location.hash = route;
  }
});

document.addEventListener("submit", (event) => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  if (form.id !== "dashboardEntityForm") return;
  event.preventDefault();
  handleEntityFormSubmit(form);
  closeModal();
  renderApp();
});

window.addEventListener("hashchange", () => {
  closeModal();
  renderApp();
});

document.addEventListener("input", (event) => {
  const el = event.target;
  if (!(el instanceof HTMLInputElement)) return;
  if (!el.classList.contains("table-filter")) return;
  const table = el.dataset.table;
  if (table) filterTable(table, el.value);
});

document.addEventListener("change", (event) => {
  const el = event.target;
  if (!(el instanceof HTMLSelectElement)) return;
  if (!el.classList.contains("pricelist-filter")) return;
  applyPriceItemFilters();
});

renderApp();
