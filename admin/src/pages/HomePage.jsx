import React, { useState, useEffect } from 'react';
import {
  Main,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Loader,
  Typography,
  Badge,
  Flex,
} from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { getTranslation } from '../utils/getTranslation';

const HomePage = () => {
  const { formatMessage } = useIntl();
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/stripe-dashboard/stripe');
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

  if (isLoading) return (
    <Box padding={8} background="neutral100">
      <Loader>Loading content...</Loader>
    </Box>
  );

  return (
    <Main>
      <Typography variant="alpha">
        Welcome to {formatMessage({ id: 'plugin.name' })}
      </Typography>

      <Box
        padding={4}
        marginTop={4}
        background="neutral0"
        hasRadius
        shadow="tableShadow"
      >
        <Typography variant="beta" as="h2" style={{ marginBottom: '1rem' }}>
          Stripe Payments
        </Typography>

        <Table colCount={9} rowCount={payments?.length || 0}>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
              <Th>Customer</Th>
              <Th>Card</Th>
              <Th>Description</Th>
              <Th>Payment Method</Th>
              <Th>Date</Th>
              <Th>Receipt</Th>
            </Tr>
          </Thead>
          <Tbody>
            {payments.map((payment) => (
              <Tr key={payment.id}>
                <Td>
                  <Typography variant="omega">{payment.id}</Typography>
                </Td>
                <Td>
                  <Typography variant="omega" fontWeight="bold">
                    {payment.currency.toUpperCase()} {payment.amount}
                  </Typography>
                </Td>
                <Td>
                  <Badge 
                    textColor={payment.status === 'succeeded' ? 'success600' : 'danger600'}
                    backgroundColor={payment.status === 'succeeded' ? 'success100' : 'danger100'}
                  >
                    {payment.status}
                  </Badge>
                </Td>
                <Td>
                  <Typography variant="omega">
                    {payment.customer_email || 'N/A'}
                  </Typography>
                </Td>
                <Td>
                  <Flex>
                    {payment.card_brand && payment.last4 ? (
                      <>
                        <Typography variant="omega" fontWeight="bold">
                          {payment.card_brand.toUpperCase()}
                        </Typography>
                        <Typography variant="omega" textColor="neutral600">
                          &nbsp;**** {payment.last4}
                        </Typography>
                      </>
                    ) : 'N/A'}
                  </Flex>
                </Td>
                <Td>
                  <Typography variant="omega">
                    {payment.description || 'N/A'}
                  </Typography>
                </Td>
                <Td>
                  <Typography variant="omega">
                    {payment.payment_method_type || 'N/A'}
                  </Typography>
                </Td>
                <Td>
                  <Typography variant="omega">
                    {new Date(payment.date).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Typography>
                </Td>
                <Td>
                  <Typography variant="omega">
                    {payment.receipt_email || 'N/A'}
                  </Typography>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Main>
  );
};

export { HomePage };

