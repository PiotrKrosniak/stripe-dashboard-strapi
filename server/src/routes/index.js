module.exports = {
  admin: {
    routes: []
  },
  'content-api': {
    routes: [
      {
        method: 'GET',
        path: '/stripe',
        handler: 'controller.index',
        config: {
          auth: false,
          policies: [],
          middlewares: []
        },
      },
    ]
  }
};