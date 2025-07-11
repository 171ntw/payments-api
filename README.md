# Payments API

A modern, professional payments API built with TypeScript, Express, EJS, and TailwindCSS. This project provides endpoints for creating and retrieving payment information (currently supports MercadoPago), and features beautiful, custom error and 404 pages, as well as a visually striking, dark-themed UI for payment details.

## 🚀 Project Overview

This API allows you to:
- Create payments via MercadoPago
- Retrieve payment information in JSON or HTML (with QR code, ticket, and more)
- Enjoy a modern, responsive, and visually appealing UI for payment status
- Get clear, custom error and 404 pages

## ✨ Features
- **TypeScript** for type safety and maintainability
- **Express** for robust API routing
- **EJS** for server-side rendering of beautiful pages
- **TailwindCSS** for rapid, modern UI development
- **Custom error and 404 pages** with dark and purple theme
- **Responsive payment info page** with QR code, ticket, and JSON details

## 🛠️ Technologies Used
- Node.js
- TypeScript
- Express.js
- EJS
- TailwindCSS (via CDN or build)
- MercadoPago SDK (custom integration)

## 📦 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/171ntw/payments-api.git
   cd payments-api
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the server:**
   ```bash
   npm run dev
   # or
   npm start
   ```
4. **Access the API:**
   - API runs at: `http://localhost:3000`
   - Example: `http://localhost:3000/api/payments/create-payment?...`

## 📖 API Endpoints

### Create Payment
```
GET /api/payments/create-payment?bank=mp&method=...&token=...&amount=...&description=...&email=...&accessToken=...
```
- Returns payment creation result (MercadoPago)

### Payment Info
```
GET /api/payments/info-payment?bank=mp&paymentId=...&token=...&type=...
```
- `type=completo` — Full JSON
- `type=resumido` — Summary JSON
- `type=completo-html` — Full HTML page (with QR code, ticket, etc.)
- `type=resumido-html` — Summary HTML page

## 🎨 Customization
- **UI:** Edit EJS files in `src/pages/` for custom branding or layout
- **Styling:** TailwindCSS classes can be changed or extended
- **Payment logic:** Extend `src/controllers/payment.ts` for more banks/providers

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details. 