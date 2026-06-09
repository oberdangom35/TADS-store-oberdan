import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Botao from './Botao';
import Selo from './Selo';

function Carrossel({ produtos }) {
  const [indiceAtual, setIndiceAtual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceAtual((prev) => (prev + 1) % produtos.length);
    }, 4000);

    return () => clearInterval(intervalo);
  }, [produtos.length]);

  const irParaSlide = (indice) => {
    setIndiceAtual(indice);
  };

  const produtoAtual = produtos[indiceAtual];

  return (
    <div className="carrossel">
      <div className="carrossel-container">
        <div className="carrossel-slide">
          <div className="carrossel-imagem">
            <img src={produtoAtual.thumbnail} alt={produtoAtual.title} />
          </div>
          <div className="carrossel-info">
            <Selo texto="Produto em Destaque" cor="verde" />
            <h2>{produtoAtual.title}</h2>
            <p>{produtoAtual.description}</p>
            <p className="carrossel-preco">
              {produtoAtual.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })}
            </p>
            <div className="carrossel-acoes">
              <Link to={`/produto/${produtoAtual.id}`}>
                <Botao texto="Ver Detalhes" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="carrossel-indicadores">
        {produtos.map((_, indice) => (
          <button
            key={indice}
            className={`carrossel-indicador ${indice === indiceAtual ? 'ativo' : ''}`}
            onClick={() => irParaSlide(indice)}
          />
        ))}
      </div>
    </div>
  );
}

export default Carrossel;
