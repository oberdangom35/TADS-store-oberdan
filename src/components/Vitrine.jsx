import ProdutoCard from './ProdutoCard';
import Carrossel from './Carrossel';

function Vitrine() {
  const produtos = [
    {
      id: 1,
      nome: "Essence Mascara Lash Princess",
      descricao: "Máscara volumizadora e alongadora com fórmula duradoura e cruelty-free",
      preco: 49.90,
      imagem: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
      freteGratis: true
    },
    {
      id: 2,
      nome: "Eyeshadow Palette with Mirror",
      descricao: "Paleta versátil de sombras com espelho embutido para maquiagem em movimento",
      preco: 99.90,
      imagem: "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp",
      freteGratis: true
    },
    {
      id: 3,
      nome: "Calvin Klein CK One",
      descricao: "Fragrância unissex clássica, conhecida por seu aroma fresco e limpo",
      preco: 249.90,
      imagem: "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/1.webp",
      freteGratis: false
    },
    {
      id: 4,
      nome: "Chanel Coco Noir Eau De",
      descricao: "Fragrância elegante e misteriosa com notas de toranja, rosa e sândalo",
      preco: 649.90,
      imagem: "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/1.webp",
      freteGratis: true
    },
    {
      id: 5,
      nome: "Gucci Bloom Eau de",
      descricao: "Fragrância floral e cativante com notas de tuberosa, jasmim e Rangoon",
      preco: 399.90,
      imagem: "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/1.webp",
      freteGratis: false
    },
    {
      id: 6,
      nome: "Annibale Colombo Bed",
      descricao: "Estrutura de cama luxuosa e elegante, feita com materiais de alta qualidade",
      preco: 9499.90,
      imagem: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/1.webp",
      freteGratis: true
    }
  ];

  const produtosDestaque = produtos.slice(0, 3);

  return (
    <section className="vitrine">
      <Carrossel produtos={produtosDestaque} />
      
      <div className="vitrine-secao-produtos">
        <h2>Todos os Produtos</h2>
        <div className="vitrine-grid">
          {produtos.map((produto) => (
            <ProdutoCard key={produto.id} produto={produto} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Vitrine;
