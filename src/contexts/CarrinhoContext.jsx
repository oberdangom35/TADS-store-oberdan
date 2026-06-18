import { createContext, useContext, useState, useEffect } from 'react';

const CarrinhoContext = createContext();

export function useCarrinho() {
  return useContext(CarrinhoContext);
}

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState(() => {
    const carrinhoSalvo = localStorage.getItem('tads-store-carrinho');
    return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
  });

  useEffect(() => {
    localStorage.setItem('tads-store-carrinho', JSON.stringify(itens));
  }, [itens]);

  const adicionarAoCarrinho = (produto) => {
    setItens(itensAtuais => {
      const itemExistente = itensAtuais.find(item => item.id === produto.id);
      
      if (itemExistente) {
        return itensAtuais.map(item =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      
      return [...itensAtuais, { ...produto, quantidade: 1 }];
    });
  };

  const removerDoCarrinho = (produtoId) => {
    setItens(itensAtuais => itensAtuais.filter(item => item.id !== produtoId));
  };

  const atualizarQuantidade = (produtoId, quantidade) => {
    if (quantidade <= 0) {
      removerDoCarrinho(produtoId);
      return;
    }
    
    setItens(itensAtuais =>
      itensAtuais.map(item =>
        item.id === produtoId ? { ...item, quantidade } : item
      )
    );
  };

  const limparCarrinho = () => {
    setItens([]);
  };

  const totalItens = itens.reduce((total, item) => total + item.quantidade, 0);
  
  const totalValor = itens.reduce((total, item) => {
    const preco = parseFloat(item.price.replace('$', ''));
    return total + (preco * item.quantidade);
  }, 0);

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionarAoCarrinho,
        removerDoCarrinho,
        atualizarQuantidade,
        limparCarrinho,
        totalItens,
        totalValor
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}
