import { PageRoute, AdminRoute, SingleView } from 'View';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from 'Context/CartContext'
import { ItemsProvider } from 'Context/ItemsContext'
import { AuthProvider } from 'Context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ItemsProvider>
            <div className="App w-auto">
              <Routes>
                <Route path='/*' element={<PageRoute />} />
                <Route path='/admin/*' element={<AdminRoute />} />
                <Route path='/confirmation/*' element={<SingleView />} />
              </Routes>
            </div>
          </ItemsProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
