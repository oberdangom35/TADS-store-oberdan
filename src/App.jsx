import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Vitrine from './components/Vitrine'
import Erro404 from './components/Erro404'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Layout>
            <Vitrine />
          </Layout>
        } />
        <Route path="*" element={<Erro404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
