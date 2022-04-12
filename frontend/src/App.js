import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import HomeScreen from './containers/HomeScreen';
import ProductScreen from './containers/ProductScreen';
import CartScreen from './containers/CartScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" exact element={<HomeScreen />} />
            <Route path="/products/:id" element={<ProductScreen />} />
            {/* <Route path="/cart/:id?" element={<CartScreen />} /> */}
            <Route path="/cart">
              <Route index element={<CartScreen />} />
              <Route path=":id" element={<CartScreen />} />
            </Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
