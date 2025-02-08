# Strapi Plugin - Stripe Dashboard

A Strapi v5 plugin that provides a dashboard to view your Stripe transactions.

image

## 🚀 Features

- View latest Stripe transactions
- Transaction details including amount, status, customer info
- Card payment information
- Receipt tracking
- Clean, modern UI using Strapi Design System

## ⚙️ Installation
bash
Using npm
'''
npm install strapi-plugin-stripe-dashboard
'''
Using yarn
'''
yarn add strapi-plugin-stripe-dashboard
'''

## 🔧 Configuration

1. Add your Stripe secret key to your environment variables:
env
STRIPE_SECRET_KEY=sk_test_...

2. Enable the plugin in your `config/plugins.js`:
javascript
module.exports = ({ env }) => ({
'stripe-dashboard': {
enabled: true,
},
});


## 🎯 Usage

Once installed and configured, you'll see a "Stripe" menu item in your Strapi admin panel. Click it to view your Stripe transactions.

## 🤝 Contributing

Feel free to fork and make a Pull Request to this plugin! All contributions are welcome.

## 📝 License

[MIT License](LICENSE)

## ✨ Author

PiotrKrosniak 