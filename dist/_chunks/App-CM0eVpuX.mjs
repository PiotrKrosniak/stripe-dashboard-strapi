import { jsxs, jsx } from "react/jsx-runtime";
import { Page } from "@strapi/strapi/admin";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Main, Typography, Box, Loader, Table, Thead, Tr, Th, Tbody, Td } from "@strapi/design-system";
import { useIntl } from "react-intl";
const HomePage = () => {
  const { formatMessage } = useIntl();
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("/stripe-dashboard/stats");
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
  return /* @__PURE__ */ jsxs(Main, { children: [
    /* @__PURE__ */ jsxs(Typography, { variant: "alpha", children: [
      "Welcome to ",
      formatMessage({ id: "plugin.name" })
    ] }),
    /* @__PURE__ */ jsxs(
      Box,
      {
        padding: 4,
        marginTop: 4,
        background: "neutral0",
        hasRadius: true,
        shadow: "tableShadow",
        children: [
          /* @__PURE__ */ jsx(Typography, { variant: "beta", as: "h2", style: { marginBottom: "1rem" }, children: "Stripe Payments" }),
          isLoading ? /* @__PURE__ */ jsx(Loader, { children: "Loading payments..." }) : /* @__PURE__ */ jsxs(Table, { colCount: 4, rowCount: payments.length, children: [
            /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsxs(Tr, { children: [
              /* @__PURE__ */ jsx(Th, { children: "ID" }),
              /* @__PURE__ */ jsx(Th, { children: "Amount" }),
              /* @__PURE__ */ jsx(Th, { children: "Status" }),
              /* @__PURE__ */ jsx(Th, { children: "Date" })
            ] }) }),
            /* @__PURE__ */ jsx(Tbody, { children: payments.map((payment) => /* @__PURE__ */ jsxs(Tr, { children: [
              /* @__PURE__ */ jsx(Td, { children: payment.id }),
              /* @__PURE__ */ jsxs(Td, { children: [
                "€",
                Number(payment.amount).toFixed(2)
              ] }),
              /* @__PURE__ */ jsx(Td, { children: payment.status }),
              /* @__PURE__ */ jsx(Td, { children: new Date(payment.date).toLocaleDateString(void 0, {
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
  return /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(HomePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(Page.Error, {}) })
  ] });
};
export {
  App
};
//# sourceMappingURL=App-CM0eVpuX.mjs.map
