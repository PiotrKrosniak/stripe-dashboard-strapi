import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Page } from "@strapi/strapi/admin";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Loader, Main, Typography, Table, Thead, Tr, Th, Tbody, Td, Badge, Flex } from "@strapi/design-system";
import { useIntl } from "react-intl";
const HomePage = () => {
  const { formatMessage } = useIntl();
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/stripe-dashboard/stripe");
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
  if (isLoading) return /* @__PURE__ */ jsx(Box, { padding: 8, background: "neutral100", children: /* @__PURE__ */ jsx(Loader, { children: "Loading content..." }) });
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
          /* @__PURE__ */ jsxs(Table, { colCount: 9, rowCount: payments?.length || 0, children: [
            /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsxs(Tr, { children: [
              /* @__PURE__ */ jsx(Th, { children: "ID" }),
              /* @__PURE__ */ jsx(Th, { children: "Amount" }),
              /* @__PURE__ */ jsx(Th, { children: "Status" }),
              /* @__PURE__ */ jsx(Th, { children: "Customer" }),
              /* @__PURE__ */ jsx(Th, { children: "Card" }),
              /* @__PURE__ */ jsx(Th, { children: "Description" }),
              /* @__PURE__ */ jsx(Th, { children: "Payment Method" }),
              /* @__PURE__ */ jsx(Th, { children: "Date" }),
              /* @__PURE__ */ jsx(Th, { children: "Receipt" })
            ] }) }),
            /* @__PURE__ */ jsx(Tbody, { children: payments.map((payment) => /* @__PURE__ */ jsxs(Tr, { children: [
              /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { variant: "omega", children: payment.id }) }),
              /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsxs(Typography, { variant: "omega", fontWeight: "bold", children: [
                payment.currency.toUpperCase(),
                " ",
                payment.amount
              ] }) }),
              /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(
                Badge,
                {
                  textColor: payment.status === "succeeded" ? "success600" : "danger600",
                  backgroundColor: payment.status === "succeeded" ? "success100" : "danger100",
                  children: payment.status
                }
              ) }),
              /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { variant: "omega", children: payment.customer_email || "N/A" }) }),
              /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Flex, { children: payment.card_brand && payment.last4 ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Typography, { variant: "omega", fontWeight: "bold", children: payment.card_brand.toUpperCase() }),
                /* @__PURE__ */ jsxs(Typography, { variant: "omega", textColor: "neutral600", children: [
                  " **** ",
                  payment.last4
                ] })
              ] }) : "N/A" }) }),
              /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { variant: "omega", children: payment.description || "N/A" }) }),
              /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { variant: "omega", children: payment.payment_method_type || "N/A" }) }),
              /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { variant: "omega", children: new Date(payment.date).toLocaleDateString(void 0, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              }) }) }),
              /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { variant: "omega", children: payment.receipt_email || "N/A" }) })
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
//# sourceMappingURL=App-BgqklvTP.mjs.map
