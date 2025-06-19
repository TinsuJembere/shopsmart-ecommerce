you can watch alive on https://shopsmart-ecommerce.vercel.app/

ShopSmart
ShopSmart is a modern e-commerce web application with a React frontend and Node.js/Express backend. It allows users to browse products, manage their cart and favorites, place orders, and more.
Features
🛒 Browse and search products
❤️ Add/remove favorites
🛍️ Shopping cart management
📝 Product reviews
👤 User authentication (register/login/profile)
📦 Order placement and history
Responsive, modern UI
Tech Stack
Frontend:
-React
-Vite
-React Router
-React Icons
-Axios
Backend:
-Node.js
-Express
-MongoDB (via Mongoose)
#Getting Started
Prerequisites
Node.js (v16+ recommended)
npm or yarn
Installation
1. Clone the repository
   2. Install dependencies
Frontend:
cd frontend
npm install
Apply to vite.config....
Backend:
cd ../backend
npm install
Apply to vite.config....
3. Configure Environment Variables
   Create a .env file in the backend/ directory for your backend configuration (e.g., MongoDB URI, JWT secret).
4. Run the Application
Start the backend:
cd backend
npm start
Apply to vite.config....
Start the frontend:
cd ../frontend
npm run dev
Apply to vite.config....
The frontend will typically run at http://localhost:5173
The backend will typically run at http://localhost:5000
Folder Structure
ShopSmart/
  backend/      # Express API, models, controllers, routes
  frontend/     # React app, components, pages, assets
Scripts
Frontend:
npm run dev – Start development server
npm run build – Build for production
npm run preview – Preview production build
Backend:
npm start – Start backend server
Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
