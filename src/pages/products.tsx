import { GetStaticProps, InferGetServerSidePropsType } from "next";
import React from "react";

interface ProductType {
  id: number;
  name: string;
  description: string;
  price: string;

  file: {
    url: string;
  };
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch("http://127.0.0.1:3333/api/products");
  const products = await response.json();
  return { props: { products } };
};

const Products: React.FC = ({
  products,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  return (
    <div>
      {products.map((product: ProductType) => (
        <p key={product.id}>{product.name}</p>
      ))}
    </div>
  );
};

export default Products;
