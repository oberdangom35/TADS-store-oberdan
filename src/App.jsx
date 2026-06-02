import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Layout from './components/Layout'
import Vitrine from './components/Vitrine'
import Erro404 from './components/Erro404'
import './App.css'

function App() {
  const [buscaGlobal, setBuscaGlobal] = useState('')
  const [categoriaGlobal, setCategoriaGlobal] = useState('all')
  const [categoriasGlobal, setCategoriasGlobal] = useState([])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Layout 
            busca={buscaGlobal} 
            setBusca={setBuscaGlobal}
            categoria={categoriaGlobal}
            setCategoria={setCategoriaGlobal}
            categorias={categoriasGlobal}
          >
            <Vitrine 
              busca={buscaGlobal}
              categoria={categoriaGlobal}
              setCategoria={setCategoriaGlobal}
              categorias={categoriasGlobal}
              setCategorias={setCategoriasGlobal}
            />
          </Layout>
        } />
        <Route path="*" element={<Erro404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
