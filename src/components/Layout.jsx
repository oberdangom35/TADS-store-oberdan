import Cabecalho from './Cabecalho';
import Rodape from './Rodape';

function Layout({ children, busca, setBusca, categoria, setCategoria, categorias, buscaAberta, setBuscaAberta }) {
  return (
    <div className="layout">
      <Cabecalho 
        busca={busca} 
        setBusca={setBusca}
        categoria={categoria}
        setCategoria={setCategoria}
        categorias={categorias}
        buscaAberta={buscaAberta}
        setBuscaAberta={setBuscaAberta}
      />
      <main className="conteudo">
        {children}
      </main>
      <Rodape />
    </div>
  );
}

export default Layout;
