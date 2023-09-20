module.exports = ({ env }) => ({
  host: env('HOST'),
  port: env.int('PORT'),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  url: env('PUBLIC_URL', 'https://luxifyverse.com/strapi/'),
  admin: {
    url: '/admin',
    serveAdminPanel: true,
  },
})
