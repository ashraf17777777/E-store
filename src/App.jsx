import { Routes,Route } from 'react-router-dom'
import './App.css'
import ProductListPage from './pages/productList'
import ProductDetailsPage from './pages/productDetails'
import CartPage from './pages/cart'
function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<ProductListPage/>}></Route>
        <Route path='/product-list' element={<ProductListPage/>}></Route>
        <Route path='/product-details/:id' element={<ProductDetailsPage/>}></Route>
        <Route path='/cart' element={<CartPage/>}></Route>
      </Routes>
    </>
  )
}

export default App
