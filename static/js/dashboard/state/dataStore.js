function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const dataStore = {
  regions: [
    { id: "reg-1", name: "Cairo" },
    { id: "reg-2", name: "Alexandria" },
    { id: "reg-3", name: "Giza" },
    { id: "reg-4", name: "North" },
    { id: "reg-5", name: "South" },
  ],
  topReps: [
    { id: "rep-1", name: "Lina Hassan", amount: "$18,450", status: "success" },
    { id: "rep-2", name: "Omar Adel", amount: "$16,900", status: "success" },
    { id: "rep-3", name: "Maha Samir", amount: "$14,320", status: "warning" },
  ],
  sales: [
    { id: "sale-1", invoice: "INV-1042", customer: "Al Noor Store", amount: "$1,240", status: "Paid" },
    { id: "sale-2", invoice: "INV-1043", customer: "West Trade Co.", amount: "$2,990", status: "Pending" },
    { id: "sale-3", invoice: "INV-1044", customer: "Prime Retail", amount: "$780", status: "Paid" },
  ],
  customers: [
    { 
      id: "cust-1", 
      customer_id: 1008,
      customer_name: "Al Noor Store", 
      shop_name: "Al Noor General Store",
      phone1: "+20 123 456 7890",
      phone2: "+20 123 456 7891",
      address: "123 Main St, Cairo",
      region_id: "reg-1",
      assigned_user_id: "user-2",
      created_at: "2024-01-15T10:30:00Z",
      notes: "Regular customer, pays on time",
      payment_type: "Cash",
      customer_type: "Retail"
    },
    { 
      id: "cust-2", 
      customer_id: 1009,
      customer_name: "West Trade Co.", 
      shop_name: "West Trade Company",
      phone1: "+20 234 567 8901",
      phone2: "",
      address: "456 Commerce Ave, Alexandria",
      region_id: "reg-2",
      assigned_user_id: "user-3",
      created_at: "2024-02-20T14:15:00Z",
      notes: "Wholesale customer",
      payment_type: "Credit",
      customer_type: "Wholesale"
    },
    { 
      id: "cust-3", 
      customer_id: 1010,
      customer_name: "Prime Retail", 
      shop_name: "Prime Retail Chain",
      phone1: "+20 345 678 9012",
      phone2: "+20 345 678 9013",
      address: "789 Market St, Giza",
      region_id: "reg-3",
      assigned_user_id: "user-2",
      created_at: "2024-03-10T09:45:00Z",
      notes: "Chain store, needs attention",
      payment_type: "Check",
      customer_type: "Retail"
    },
  ],
  inventoryAlerts: [
    { id: "inv-1", product_id: "P001", product_name: "Detergent 500ml", description: "Premium laundry detergent", unit: "Bottle", created_by: "user-1", status: "Active", date_added: "2024-01-15T10:00:00Z", level: "danger" },
    { id: "inv-2", product_id: "P002", product_name: "Olive Oil 1L", description: "Extra virgin olive oil", unit: "Bottle", created_by: "user-2", status: "Active", date_added: "2024-02-01T14:30:00Z", level: "warning" },
    { id: "inv-3", product_id: "P003", product_name: "Tea Box Premium", description: "Premium black tea in decorative box", unit: "Box", created_by: "user-3", status: "Active", date_added: "2024-03-10T09:15:00Z", level: "success" },
  ],
  users: [
    { id: "user-1", user_id: 1001, name: "Ahmed Salah", email: "ahmed@company.com", password: "secret123", role: "Administrator", phone: "+20 100 123 4567", status: "Active", created_at: "2024-01-10T09:00:00Z" },
    { id: "user-2", user_id: 1002, name: "Yara Nabil", email: "yara@company.com", password: "secret123", role: "Sales Manager", phone: "+20 101 234 5678", status: "Active", created_at: "2024-02-05T09:30:00Z" },
    { id: "user-3", user_id: 1003, name: "Karim Hatem", email: "karim@company.com", password: "secret123", role: "Sales Representative", phone: "+20 102 345 6789", status: "On Leave", created_at: "2024-03-12T14:15:00Z" },
  ],
  priceLists: [
    { id: "pl-1", code: "RTL", name: "Retail", currency: "EGP" },
    { id: "pl-2", code: "WHL", name: "Wholesale", currency: "EGP" },
    { id: "pl-3", code: "VIP", name: "Key accounts", currency: "USD" },
  ],
  priceListItems: [
    { id: "pli-1", priceListId: "pl-1", sku: "SKU-1001", productName: "Detergent 500ml", unit: "Each", price: "48.00" },
    { id: "pli-2", priceListId: "pl-1", sku: "SKU-1002", productName: "Olive Oil 1L", unit: "Each", price: "125.50" },
    { id: "pli-3", priceListId: "pl-2", sku: "SKU-1001", productName: "Detergent 500ml", unit: "Case (12)", price: "520.00" },
    { id: "pli-4", priceListId: "pl-2", sku: "SKU-1003", productName: "Tea Box Premium", unit: "Each", price: "62.00" },
    { id: "pli-5", priceListId: "pl-3", sku: "SKU-1002", productName: "Olive Oil 1L", unit: "Each", price: "3.99" },
  ],
  invoices: [
    {
      id: "inv-1",
      Invoice_id: 5001,
      Invoice_number: "INV-2024-001",
      customer_id: 1008,
      created_by: "user-2",
      Invoice_date: "2024-03-25T10:30:00Z",
      total_Amount: "2,450.00",
      paid_Amount: "2,450.00",
      remaining_Amount: "0.00",
      status: "Paid",
      creation_method: "Mobile",
      notes: "Regular order"
    },
    {
      id: "inv-2",
      Invoice_id: 5002,
      Invoice_number: "INV-2024-002",
      customer_id: 1009,
      created_by: "user-3",
      Invoice_date: "2024-03-28T14:15:00Z",
      total_Amount: "5,890.00",
      paid_Amount: "2,945.00",
      remaining_Amount: "2,945.00",
      status: "Pending",
      creation_method: "Web",
      notes: "Partial payment received"
    },
    {
      id: "inv-3",
      Invoice_id: 5003,
      Invoice_number: "INV-2024-003",
      customer_id: 1010,
      created_by: "user-2",
      Invoice_date: "2024-04-02T09:45:00Z",
      total_Amount: "1,230.00",
      paid_Amount: "0.00",
      remaining_Amount: "1,230.00",
      status: "Overdue",
      creation_method: "Mobile",
      notes: "Follow up required"
    }
  ],
  invoiceItems: [
    {
      id: "item-1",
      invoice_item_id: 10001,
      invoice_id: "inv-1",
      product_id: "PROD-001",
      quantity: 10,
      unit_price: "245.00",
      total_price: "2,450.00"
    },
    {
      id: "item-2",
      invoice_item_id: 10002,
      invoice_id: "inv-2",
      product_id: "PROD-002",
      quantity: 5,
      unit_price: "1,178.00",
      total_price: "5,890.00"
    },
    {
      id: "item-3",
      invoice_item_id: 10003,
      invoice_id: "inv-3",
      product_id: "PROD-003",
      quantity: 2,
      unit_price: "615.00",
      total_price: "1,230.00"
    }
  ],
  invoiceItems: [
    {
      id: "item-1",
      invoice_item_id: 1,
      invoice_id: "inv-1",
      project_id: "PRJ-001",
      quantity: 10,
      unit_price: "48.00",
      total_price: "480.00"
    },
    {
      id: "item-2",
      invoice_item_id: 2,
      invoice_id: "inv-1",
      project_id: "PRJ-002",
      quantity: 5,
      unit_price: "125.50",
      total_price: "627.50"
    },
    {
      id: "item-3",
      invoice_item_id: 3,
      invoice_id: "inv-1",
      project_id: "PRJ-003",
      quantity: 20,
      unit_price: "62.00",
      total_price: "1,240.00"
    },
    {
      id: "item-4",
      invoice_item_id: 4,
      invoice_id: "inv-2",
      project_id: "PRJ-004",
      quantity: 15,
      unit_price: "48.00",
      total_price: "720.00"
    },
    {
      id: "item-5",
      invoice_item_id: 5,
      invoice_id: "inv-2",
      project_id: "PRJ-005",
      quantity: 8,
      unit_price: "125.50",
      total_price: "1,004.00"
    },
    {
      id: "item-6",
      invoice_item_id: 6,
      invoice_id: "inv-3",
      project_id: "PRJ-006",
      quantity: 5,
      unit_price: "62.00",
      total_price: "310.00"
    },
    {
      id: "item-7",
      invoice_item_id: 7,
      invoice_id: "inv-3",
      project_id: "PRJ-007",
      quantity: 3,
      unit_price: "125.50",
      total_price: "376.50"
    },
    {
      id: "item-8",
      invoice_item_id: 8,
      invoice_id: "inv-3",
      project_id: "PRJ-008",
      quantity: 12,
      unit_price: "48.00",
      total_price: "576.00"
    }
  ],
};

export function nextCustomerCode() {
  const nums = dataStore.customers
    .map((c) => parseInt(c.code.replace("C-", ""), 10))
    .filter((n) => !Number.isNaN(n));
  const next = (nums.length ? Math.max(...nums) : 1007) + 1;
  return `C-${next}`;
}

export function upsertTopRep(record) {
  if (record.id) {
    const i = dataStore.topReps.findIndex((r) => r.id === record.id);
    if (i !== -1) dataStore.topReps[i] = { ...dataStore.topReps[i], ...record };
    return;
  }
  dataStore.topReps.push({ id: createId("rep"), ...record });
}

export function removeTopRep(id) {
  dataStore.topReps = dataStore.topReps.filter((r) => r.id !== id);
}

export function upsertSale(record) {
  if (record.id) {
    const i = dataStore.sales.findIndex((r) => r.id === record.id);
    if (i !== -1) dataStore.sales[i] = { ...dataStore.sales[i], ...record };
    return;
  }
  dataStore.sales.push({ id: createId("sale"), ...record });
}

export function removeSale(id) {
  dataStore.sales = dataStore.sales.filter((r) => r.id !== id);
}

export function upsertCustomer(record) {
  if (record.id) {
    const i = dataStore.customers.findIndex((r) => r.id === record.id);
    if (i !== -1) dataStore.customers[i] = { ...dataStore.customers[i], ...record };
    return;
  }
  const customer_id = record.customer_id || (Math.max(...dataStore.customers.map(c => c.customer_id || 0), 1007) + 1);
  const created_at = record.created_at || new Date().toISOString();
  dataStore.customers.push({ 
    id: createId("cust"), 
    customer_id,
    created_at,
    ...record 
  });
}

export function removeCustomer(id) {
  dataStore.customers = dataStore.customers.filter((r) => r.id !== id);
}

export function upsertInventoryAlert(record) {
  if (record.id) {
    const i = dataStore.inventoryAlerts.findIndex((r) => r.id === record.id);
    if (i !== -1) dataStore.inventoryAlerts[i] = { ...dataStore.inventoryAlerts[i], ...record };
    return;
  }
  // For new records, generate product_id and set defaults
  const newRecord = {
    product_id: record.product_id || `P${String(dataStore.inventoryAlerts.length + 1).padStart(3, '0')}`,
    created_by: record.created_by || "user-1",
    status: record.status || "Active",
    date_added: record.date_added || new Date().toISOString(),
    level: record.level || "success",
    ...record,
    id: createId("inv")
  };
  dataStore.inventoryAlerts.push(newRecord);
}

export function removeInventoryAlert(id) {
  dataStore.inventoryAlerts = dataStore.inventoryAlerts.filter((r) => r.id !== id);
}

export function upsertUser(record) {
  if (record.id) {
    const i = dataStore.users.findIndex((r) => r.id === record.id);
    if (i !== -1) {
      const existing = dataStore.users[i];
      const payload = { ...record };
      if (payload.password === "") {
        delete payload.password;
      }
      dataStore.users[i] = { ...existing, ...payload };
    }
    return;
  }
  const user_id = record.user_id || Math.max(1000, ...dataStore.users.map((u) => Number(u.user_id) || 0)) + 1;
  const created_at = record.created_at || new Date().toISOString();
  dataStore.users.push({ id: createId("user"), user_id, created_at, ...record });
}

export function removeUser(id) {
  dataStore.users = dataStore.users.filter((r) => r.id !== id);
}

export function regionSelectOptions() {
  return dataStore.regions.map((r) => ({
    value: r.id,
    label: r.name,
  }));
}

export function userSelectOptions() {
  return dataStore.users.map((u) => ({
    value: u.id,
    label: u.name,
  }));
}

export function getRegionName(id) {
  const region = dataStore.regions.find((r) => r.id === id);
  return region ? region.name : "—";
}

export function getUserName(id) {
  const user = dataStore.users.find((u) => u.id === id);
  return user ? user.name : "—";
}

export function priceListLabel(id) {
  const pl = dataStore.priceLists.find((p) => p.id === id);
  if (!pl) return "—";
  return `${pl.name} (${pl.code})`;
}

export function priceListSelectOptions() {
  return dataStore.priceLists.map((pl) => ({
    value: pl.id,
    label: `${pl.name} — ${pl.currency}`,
  }));
}

export function upsertPriceList(record) {
  if (record.id) {
    const i = dataStore.priceLists.findIndex((r) => r.id === record.id);
    if (i !== -1) dataStore.priceLists[i] = { ...dataStore.priceLists[i], ...record };
    return;
  }
  dataStore.priceLists.push({ id: createId("pl"), ...record });
}

export function removePriceList(id) {
  dataStore.priceListItems = dataStore.priceListItems.filter((item) => item.priceListId !== id);
  dataStore.priceLists = dataStore.priceLists.filter((r) => r.id !== id);
}

export function upsertPriceListItem(record) {
  if (record.id) {
    const i = dataStore.priceListItems.findIndex((r) => r.id === record.id);
    if (i !== -1) dataStore.priceListItems[i] = { ...dataStore.priceListItems[i], ...record };
    return;
  }
  dataStore.priceListItems.push({ id: createId("pli"), ...record });
}

export function removePriceListItem(id) {
  dataStore.priceListItems = dataStore.priceListItems.filter((r) => r.id !== id);
}
export function nextInvoiceNumber() {
  const nums = dataStore.invoices
    .map((i) => parseInt(i.Invoice_number.replace("INV-", "").split("-")[1], 10))
    .filter((n) => !Number.isNaN(n));
  const next = (nums.length ? Math.max(...nums) : 2023) + 1;
  return `INV-2024-${String(next).padStart(3, "0")}`;
}

export function upsertInvoice(record) {
  if (record.id) {
    const i = dataStore.invoices.findIndex((r) => r.id === record.id);
    if (i !== -1) dataStore.invoices[i] = { ...dataStore.invoices[i], ...record };
    return;
  }
  const Invoice_id = record.Invoice_id || (Math.max(...dataStore.invoices.map(inv => inv.Invoice_id || 0), 5000) + 1);
  const Invoice_number = record.Invoice_number || nextInvoiceNumber();
  const created_at = record.created_at || new Date().toISOString();
  dataStore.invoices.push({
    id: createId("inv"),
    Invoice_id,
    Invoice_number,
    created_at,
    ...record
  });
}

export function removeInvoice(id) {
  dataStore.invoices = dataStore.invoices.filter((r) => r.id !== id);
}

export function getCustomerName(id) {
  const customer = dataStore.customers.find((c) => c.customer_id === id);
  return customer ? customer.customer_name : "—";
}

export function getInvoiceItems(invoiceId) {
  return dataStore.invoiceItems.filter((item) => item.invoice_id === invoiceId);
}