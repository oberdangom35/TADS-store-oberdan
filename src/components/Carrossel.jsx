import { useState, useEffect } from 'react';

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

  const proximoSlide = () => {
    setIndiceAtual((prev) => (prev + 1) % produtos.length);
  };

  const slideAnterior = () => {
    setIndiceAtual((prev) => (prev - 1 + produtos.length) % produtos.length);
  };

  return (
    <div className="carrossel">
      <div className="carrossel-container">
        <button className="carrossel-btn carrossel-btn-esquerda" onClick={slideAnterior}>
          &lt;
        </button>

        <div className="carrossel-slide">
          <div className="carrossel-imagem">
            <img src={produtos[indiceAtual].imagem} alt={produtos[indiceAtual].nome} />
          </div>
          <div className="carrossel-info">
            <span className="carrossel-badge">Produto em Destaque</span>
            <h2>{produtos[indiceAtual].nome}</h2>
            <p>{produtos[indiceAtual].descricao}</p>
            <p className="carrossel-preco">
              {produtos[indiceAtual].preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
              })}
            </p>
            <div className="carrossel-acoes">
              <button className="botao">Comprar Agora</button>
            </div>
          </div>
        </div>

        <button className="carrossel-btn carrossel-btn-direita" onClick={proximoSlide}>
          &gt;
        </button>
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
