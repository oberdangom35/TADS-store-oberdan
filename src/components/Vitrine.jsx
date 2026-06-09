import { useState, useEffect, useRef } from 'react';
import ProdutoCard from './ProdutoCard';
import Carrossel from './Carrossel';

function Vitrine({ busca = '', categoria = 'all', categorias = [], setCategorias }) {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const vitrineRef = useRef(null);
  const tituloRef = useRef(null);
  const buscaAnterior = useRef('');

  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        setCarregando(true);
        setErro(null);
        
        const resposta = await fetch('https://dummyjson.com/products?limit=30');
        
        if (!resposta.ok) {
          throw new Error('Erro ao carregar produtos');
        }
        
        const dados = await resposta.json();
        setProdutos(dados.products);
      } catch (error) {
        setErro('Não foi possível carregar os produtos. Tente novamente mais tarde.');
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setCarregando(false);
      }
    };

    buscarProdutos();
  }, []);

  useEffect(() => {
    const buscarCategorias = async () => {
      try {
        const resposta = await fetch('https://dummyjson.com/products/categories');
        const dados = await resposta.json();
        setCategorias(dados);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    buscarCategorias();
  }, []);

  const produtosFiltrados = produtos.filter(produto => {
    const matchBusca = produto.title.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria = categoria === 'all' || produto.category === categoria;
    return matchBusca && matchCategoria;
  });

  const produtosDestaque = [...produtos]
    .sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0))
    .slice(0, 3);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (busca && busca.trim() !== '') {
        if (tituloRef.current) {
          const headerHeight = 150;
          const elementPosition = tituloRef.current.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
          
          if (Math.abs(offsetPosition) > 10) {
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      } else if (buscaAnterior.current && buscaAnterior.current.trim() !== '') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      
      buscaAnterior.current = busca;
    }, 50);

    return () => clearTimeout(timer);
  }, [busca]);

  if (carregando) {
    return (
      <section className="vitrine">
        <div className="vitrine-carregando">
          <div className="spinner"></div>
          <p>Carregando produtos...</p>
        </div>
      </section>
    );
  }

  if (erro) {
    return (
      <section className="vitrine">
        <div className="vitrine-erro">
          <p>{erro}</p>
          <button className="botao" onClick={() => window.location.reload()}>
            Tentar Novamente
          </button>
        </div>
      </section>
    );
  }

  const getNomeCategoria = () => {
    if (categoria === 'all') return 'Todas as Categorias';
    const cat = categorias.find(c => c.slug === categoria);
    return cat ? cat.name : 'Produtos';
  };

  return (
    <section className="vitrine" ref={vitrineRef}>
      {!busca && produtosDestaque.length > 0 && <Carrossel produtos={produtosDestaque} />}
      
      <div className="vitrine-secao-produtos">
        <h2 className="vitrine-titulo-categoria" ref={tituloRef}>{getNomeCategoria()}</h2>

        {produtosFiltrados.length === 0 ? (
          <div className="vitrine-vazio">
            <p>Nenhum produto encontrado.</p>
          </div>
        ) : (
          <div className="vitrine-grid">
            {produtosFiltrados.map((produto) => (
              <ProdutoCard key={produto.id} produto={produto} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Vitrine;
