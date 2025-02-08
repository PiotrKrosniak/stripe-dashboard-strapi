"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const admin = require("@strapi/strapi/admin");
const reactRouterDom = require("react-router-dom");
const react = require("react");
const designSystem = require("@strapi/design-system");
const reactIntl = require("react-intl");
const HomePage = () => {
  const { formatMessage } = reactIntl.useIntl();
  const [payments, setPayments] = react.useState([]);
  const [isLoading, setIsLoading] = react.useState(true);
  react.useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/stripe-dashboard/stats");
        const result = await response.json();
        setPayments(result.data || []);
      } catch (error) {
        console.error(error);
        setPayments([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);
  if (isLoading) return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { padding: 8, background: "neutral100", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, { children: "Loading content..." }) });
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Typography, { variant: "alpha", children: [
      "Welcome to ",
      formatMessage({ id: "plugin.name" })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(
      designSystem.Box,
      {
        padding: 4,
        marginTop: 4,
        background: "neutral0",
        hasRadius: true,
        shadow: "tableShadow",
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "beta", as: "h2", style: { marginBottom: "1rem" }, children: "Stripe Payments" }),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Table, { colCount: 9, rowCount: payments?.length || 0, children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Thead, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: "ID" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: "Amount" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: "Status" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: "Customer" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: "Card" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: "Description" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: "Payment Method" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: "Date" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: "Receipt" })
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tbody, { children: payments.map((payment) => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", children: payment.id }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Typography, { variant: "omega", fontWeight: "bold", children: [
                payment.currency.toUpperCase(),
                " ",
                payment.amount
              ] }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Badge,
                {
                  textColor: payment.status === "succeeded" ? "success600" : "danger600",
                  backgroundColor: payment.status === "succeeded" ? "success100" : "danger100",
                  children: payment.status
                }
              ) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", children: payment.customer_email || "N/A" }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { children: payment.card_brand && payment.last4 ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", fontWeight: "bold", children: payment.card_brand.toUpperCase() }),
                /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Typography, { variant: "omega", textColor: "neutral600", children: [
                  " **** ",
                  payment.last4
                ] })
              ] }) : "N/A" }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", children: payment.description || "N/A" }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", children: payment.payment_method_type || "N/A" }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", children: new Date(payment.date).toLocaleDateString(void 0, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              }) }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", children: payment.receipt_email || "N/A" }) })
            ] }, payment.id)) })
          ] })
        ]
      }
    )
  ] });
};
const App = () => {
  return /* @__PURE__ */ jsxRuntime.jsxs(reactRouterDom.Routes, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { index: true, element: /* @__PURE__ */ jsxRuntime.jsx(HomePage, {}) }),
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "*", element: /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Error, {}) })
  ] });
};
exports.App = App;
//# sourceMappingURL=App-DF3zReHU.js.map
