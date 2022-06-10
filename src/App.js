import { useSelector } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { LoadingScreen, NavBar, ProtectedRoutes, Footer } from './components';
import { Home, Login, ProductDetail, Purchases } from './pages';

function App() {

  const isLoading = useSelector(state => state.isLoading);

  return (
    <div className="App">
      <HashRouter>
        <NavBar />
        {isLoading && <LoadingScreen />}
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/productDetail/:id" element={<ProductDetail />}/>
          <Route path="/login" element={<Login />}/>

          <Route element={<ProtectedRoutes />}>
            <Route path="/purchases" element={<Purchases />}/>
          </Route>
        </Routes>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
