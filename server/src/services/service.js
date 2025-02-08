import Stripe from 'stripe';

export default ({ strapi }) => ({

  async getWelcomeMessage() {
    return 'Welcome to Strapi 🚀';
  },

  async getStats() {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2023-10-16' // Use the latest API version
      });
      
      const payments = await stripe.paymentIntents.list({
        limit: 10,
        expand: ['data.customer', 'data.payment_method']
      });

      // Format the data to match the HomePage table structure
      const formattedPayments = payments.data.map(payment => ({
        id: payment.id,
        amount: (payment.amount / 100).toFixed(2), // Convert cents to dollars/euros
        status: payment.status,
        date: new Date(payment.created * 1000).toISOString(), // Convert Unix timestamp to ISO
        currency: payment.currency,
        description: payment.description,
        customer_email: payment.customer?.email,
        payment_method_type: payment.payment_method?.type,
        receipt_email: payment.receipt_email,
        shipping: payment.shipping,
        metadata: payment.metadata,
        last4: payment.payment_method?.card?.last4,
        card_brand: payment.payment_method?.card?.brand
      }));

      return {
        data: formattedPayments,
        meta: {
          total: payments.total_count
        }
      };
    } catch (err) {
      strapi.log.error('Error fetching Stripe payments:', err);
      throw err;
    }
  },
});
