export function getOverviewData(translate) {
  const t = translate;
  return {
    kpis: [
      { label: t("overview.kpi.totalSales"), value: "$128,430", trend: t("overview.kpi.trendSales") },
      { label: t("overview.kpi.activeCustomers"), value: "1,248", trend: t("overview.kpi.trendCustomers") },
      { label: t("overview.kpi.pendingOrders"), value: "57", trend: t("overview.kpi.trendPending") },
      { label: t("overview.kpi.collectionRate"), value: "93.8%", trend: t("overview.kpi.trendCollection") },
    ],
  };
}
