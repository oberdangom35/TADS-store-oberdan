import Cabecalho from './Cabecalho';
import Rodape from './Rodape';

function Layout({ children }) {
  return (
    <div className="layout">
      <Cabecalho />
      <main className="conteudo">
        {children}
      </main>
      <Rodape />
    </div>
  );
}

export default Layout;
