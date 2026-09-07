# 1Fi Shop Marketplace & EMI Flow

This project is a standalone frontend implementation for the 1Fi SDE Intern Assignment. Since no starter project or GitHub repository was provided by 1Fi, this repository was built from scratch to exactly fulfill the assignment requirements, recreating the "1Fi Marketplace" shopping and EMI flow.

## What Was Built
A responsive, mobile-first frontend application that allows users to browse a marketplace of electronic devices, configure product variants, dynamically calculate and select EMI plans, and proceed through a mock eligibility verification flow. 

It heavily emphasizes a high-quality user experience utilizing 1Fi's signature design language (clean white backgrounds, purple navigation/primary CTAs, subtle lavender sections, and green exclusively for positive success indicators like "No Cost EMI").

## Assignment Scope

**Implemented:**
- Shop page with Top Brands, Nearby Stores and 1Fi Marketplace
- Product listing
- Search and category filtering
- Product details and gallery
- Variant selection
- Dynamic EMI calculations
- EMI plan selection
- Mock eligibility flow
- Loading and error states
- Responsive UI

**Not implemented:**
- Real payment processing
- Real PAN verification
- Real lending/eligibility APIs
- Mutual fund pledging
- Order fulfillment

These were intentionally kept outside the frontend-only assignment scope.

## Tech Stack
- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4 (using `@tailwindcss/postcss`)
- **Routing:** React Router DOM v7
- **Icons:** Lucide React

## Architecture & Structure
The application follows a clean, component-based architecture optimized for reusability and separation of concerns.

```text
src/
├── components/
│   ├── layout/         # App wrapper, global navigation
│   ├── marketplace/    # Domain-specific components (Cards, VariantSelectors)
│   └── ui/             # Generic, reusable components (Button, Card, Badge)
├── data/               # Mock data (products, EMI configurations)
├── pages/              # Route-level views (Shop, Marketplace, ProductDetails, etc.)
├── types/              # Global TypeScript interfaces
└── utils/              # Pure functions (e.g., exact EMI math logic)
```

## Mock API Approach
Due to the assignment constraints (frontend-only, no real financial API integrations), data fetching and external service integrations are fully mocked on the client side:
- **`data/products.ts` & `data/emiPlans.ts`**: Serve as mock databases for product inventory and active EMI configurations.
- **Client-side delays**: Interactions that would normally require a network request (such as checking PAN/Mobile eligibility) use simulated `setTimeout` delays to demonstrate realistic UI loading states.
- **No Cost EMI Math**: The utility functions perfectly calculate No Cost EMI installments to ensure the `Total Payable` seamlessly matches the product price, handling decimal math cleanly.

## User Flow
1. **Shop Overview (`/shop`)**: A dashboard outlining Top Brands, Nearby Stores (mocked as neutral "Coming Soon" states), and the prominently featured 1Fi Marketplace.
2. **Marketplace (`/marketplace`)**: A responsive grid of products displaying starting prices, starting EMI numbers, and a No Cost EMI visual hierarchy. Includes client-side Search and Category filtering.
3. **Product Details (`/product/:id`)**: A responsive gallery view of a specific product. Users select a specific storage/color variant (dynamically updating price) and an EMI plan.
4. **Confirmation (`/confirmation`)**: A summary view framing the action as an "intent to proceed" rather than a completed transaction.
5. **Eligibility Check (`/eligibility`)**: The final step prompting the user for a PAN and Mobile number. It includes simple regex/length validation and a fake loading state before displaying a dedicated green success page.

## Assumptions
- **Missing Starter Repo**: As noted, no initial codebase was provided, so a Vite environment was bootstrapped manually.
- **Frontend-Only**: No backend, database, or actual loan processing logic was implemented.
- **Local Assets**: Product images are served locally via `/public/images` to ensure reliability, paired with an `<ImageFallback />` component in case of broken references.
- **Strict Visual Language**: Based on reference material, purple was adopted as the primary semantic color for interaction, and green was specifically reserved for completed positive actions.

## How to Run

1. Ensure Node.js is installed.
2. Clone this repository (or navigate to the unzipped directory).
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Navigate to `http://localhost:5173` to view the application.
6. To run a production build:
   ```bash
   npm run build
   ```
