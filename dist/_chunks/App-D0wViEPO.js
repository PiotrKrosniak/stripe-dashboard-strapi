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
    const fetchPayments = async () => {
      try {
        const response = await fetch("/stripe-dashboard/stripe");
        const result = await response.json();
        setPayments(result.data);
      } catch (error) {
        console.error("Error fetching stripe payments:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPayments();
  }, []);
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
          isLoading ? /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, { children: "Loading payments..." }) : /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Table, { colCount: 4, rowCount: payments.length, children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Thead, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: "ID" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: "Amount" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: "Status" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: "Date" })
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tbody, { children: payments.map((payment) => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: payment.id }),
              /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Td, { children: [
                "€",
                Number(payment.amount).toFixed(2)
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: payment.status }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: new Date(payment.date).toLocaleDateString(void 0, {
                year: "numeric",
                month: "short",
                day: "numeric"
              }) })
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
//# sourceMappingURL=App-D0wViEPO.js.map
