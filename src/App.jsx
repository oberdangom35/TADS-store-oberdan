import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProdutoDetalhe from './pages/ProdutoDetalhe'
import Erro404 from './pages/Erro404'
import './App.css'

function App() {
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('all');
  const [categorias, setCategorias] = useState([]);
  const [buscaAberta, setBuscaAberta] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Home 
            busca={busca}
            setBusca={setBusca}
            categoria={categoria}
            setCategoria={setCategoria}
            categorias={categorias}
            setCategorias={setCategorias}
            buscaAberta={buscaAberta}
            setBuscaAberta={setBuscaAberta}
          />
        } />
        <Route path="/produto/:id" element={
          <ProdutoDetalhe 
            busca={busca}
            setBusca={setBusca}
            categoria={categoria}
            setCategoria={setCategoria}
            categorias={categorias}
            buscaAberta={buscaAberta}
            setBuscaAberta={setBuscaAberta}
          />
        } />
        <Route path="*" element={
          <Erro404 
            busca={busca}
            setBusca={setBusca}
            categoria={categoria}
            setCategoria={setCategoria}
            categorias={categorias}
            buscaAberta={buscaAberta}
            setBuscaAberta={setBuscaAberta}
          />
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
