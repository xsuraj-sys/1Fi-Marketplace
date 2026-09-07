import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Shop } from './pages/Shop';
import { Marketplace } from './pages/Marketplace';
import { ProductDetails } from './pages/ProductDetails';
import { Confirmation } from './pages/Confirmation';
import { EligibilityCheck } from './pages/EligibilityCheck';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/shop" replace />} />
          <Route path="shop" element={<Shop />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="confirmation" element={<Confirmation />} />
          <Route path="eligibility" element={<EligibilityCheck />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
