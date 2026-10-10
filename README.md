<div align="center">

# 🛒 বাজার দর | Bazar Dor

### Everyday market prices, all in one place.

A Bengali-first market price tracker that helps people explore essential grocery prices, compare market rates, and see which prices are rising or falling.

[🌐 Visit Live Website](https://a7-bazar-dor-nine.vercel.app/)

</div>

---

## 📖 About the Project

**Bazar Dor (বাজার দর)** is a responsive web application designed to make everyday market prices easier to check. Users can explore common essentials, browse products by category, and review price changes to make more informed shopping decisions.

The interface is designed with Bengali-speaking users in mind, including Bengali labels and price formatting where applicable.

## ✨ Key Features

- **📈 Market Price Ticker** — A scrolling ticker highlights product prices and price movements.
- **🔥 Daily Price Movers** — Quickly discover products whose prices have increased or decreased.
- **🛍️ Product Catalogue** — Browse essential products through a responsive product-card layout.
- **🗂️ Category Browsing** — Explore products grouped by category and sort the results by price.
- **⚖️ Market Price Comparison** — View product price summaries and compare rates across markets on supported product detail pages.
- **🔐 User Authentication** — Sign up and sign in using the configured authentication providers.
- **👤 Profile Management** — View profile information and update supported account details.
- **📱 Responsive Design** — Designed to work across mobile phones, tablets, and desktop screens.
- **⏳ Loading and Error States** — Loading indicators and helpful fallback pages improve the browsing experience.

## 🧰 Technologies Used

| Technology | Purpose |
| --- | --- |
| [Next.js](https://nextjs.org/) | React framework and App Router |
| [React](https://react.dev/) | Component-based user interface |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe application development |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling and responsive layouts |
| [DaisyUI](https://daisyui.com/) | UI components and styling utilities |
| [Better Auth](https://www.better-auth.com/) | User authentication |
| [MongoDB](https://www.mongodb.com/) | Database for authentication-related data |
| [React Toastify](https://fkhadra.github.io/react-toastify/) | Toast notifications |
| [Vercel](https://vercel.com/) | Deployment and hosting |

## 🌐 Live Demo

Try the deployed application:

**[https://a7-bazar-dor-nine.vercel.app/](https://a7-bazar-dor-nine.vercel.app/)**

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) (a version compatible with the project)
- npm
- Git

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd <your-project-folder>
```

Replace the placeholders with your actual GitHub repository URL and project folder name.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root and add the environment variables required by your application. For example:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_long_random_secret
BETTER_AUTH_URL=http://localhost:3000
```

If Google or GitHub sign-in is enabled, also configure the relevant OAuth client ID and client secret variables used by your code. Check your authentication configuration for the exact variable names.

**Important:** Never commit `.env.local`, database credentials, OAuth secrets, or other private keys to GitHub. Add the production environment variables in your Vercel project settings as well.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📡 Product Data API

The application uses the Bazar Dor products API. The configured API base URL may vary depending on your project environment.

Example API base URL:

```text
https://api.abcz.workers.dev/api/bazardor
```

Common endpoints include:

| Endpoint | Purpose |
| --- | --- |
| `/products` | Retrieve products |
| `/products?category=chal` | Retrieve products filtered by category |
| `/products/1` | Retrieve a product by ID |
| `/categories` | Retrieve available categories |
| `/categories/chal` | Retrieve a category and its products |

Refer to the API response and your application code for the exact endpoint behavior and data shape.

## 📁 Project Structure

A simplified example of the likely Next.js App Router structure:

```text
src/
├── app/              # Pages, layouts, and route handlers
├── components/       # Reusable UI components
├── lib/              # API and authentication configuration
├── types/            # TypeScript types
└── proxy.ts          # Request/route protection, if configured
```

Your actual folder names may differ; update this section to match the repository.

## 🔒 Security Notes

- Keep database credentials and authentication secrets in environment variables.
- Configure OAuth callback URLs for your local and production domains.
- Protect private routes on the server, not only by hiding links in the UI.
- Do not expose secret environment variables through client-side code.

## 🎯 Project Goal

Bazar Dor aims to make everyday market information easier to access, helping users understand price changes and compare available rates before shopping.

---

<div align="center">

**Made with ❤️ in Bangladesh**

*বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।*

</div>
