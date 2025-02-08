export default ({ strapi }) => ({
  async index(ctx) {
    ctx.body = await strapi
      .plugin('stripe-dashboard')
      .service('service')
      .getStats();
  },

});

// module.exports = {
//   async getPayments(ctx) {
//     try {
//       // For example, retrieve payments created in the last 30 days:
//       const thirtyDaysAgo = Math.floor(Date.now() / 1000) - (30 * 24 * 60 * 60);

//       const payments = await stripe.paymentIntents.list({
//         created: { gte: thirtyDaysAgo },
//         limit: 100,
//       });

//       // Filter successful payments
//       const successfulPayments = payments.data.filter(
//         (payment) => payment.status === 'succeeded'
//       );

//       // Format the payment data as needed
//       const formattedPayments = successfulPayments.map((payment) => ({
//         id: payment.id,
//         amount: payment.amount / 100, // convert from cents to euros
//         status: payment.status,
//         date: new Date(payment.created * 1000).toISOString(),
//       }));
//       console.log('Routes:', formattedPayments);
//       // Respond with the data
//       ctx.send({ data: formattedPayments });
//     } catch (error) {
//       ctx.throw(500, error.message);
//     }
//   },
// };
