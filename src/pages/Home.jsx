import Layout from '../components/Layout';
import Vitrine from '../components/Vitrine';

function Home({ busca, setBusca, categoria, setCategoria, categorias, setCategorias, buscaAberta, setBuscaAberta }) {
  return (
    <Layout 
      busca={busca} 
      setBusca={setBusca}
      categoria={categoria}
      setCategoria={setCategoria}
      categorias={categorias}
      buscaAberta={buscaAberta}
      setBuscaAberta={setBuscaAberta}
    >
      <Vitrine 
        busca={busca}
        categoria={categoria}
        setCategoria={setCategoria}
        categorias={categorias}
        setCategorias={setCategorias}
      />
    </Layout>
  );
}

export default Home;
