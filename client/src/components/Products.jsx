import { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import styled from "styled-components";
import Pagination from "./Pagination/Pagination";
import Product from "./Product";
import Progress from "./Progress";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const itemsperpage = 8;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          cat
            ? `${process.env.REACT_APP_SERVER}/api/products?category=${cat}`
            : `${process.env.REACT_APP_SERVER}/api/products`
        );
        setProducts(res.data);
      } catch (err) {}
      setLoading(false);
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) => item.size.includes(filters))
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  const handlePageChange = (page) => {
    setCurrentpage(page);
  };

  const paginate = (items, curpage, pagesize) => {
    const startIndex = (curpage - 1) * pagesize;
    return _(items).slice(startIndex).take(pagesize).value();
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <>
      {loading ? (
        <Progress />
      ) : (
        <Container>
          {cat
            ? paginate(filteredProducts, currentpage, itemsperpage)?.map(
                (item) => <Product item={item} key={item._id} />
              )
            : shuffle(products)
                .slice(0, 8)
                .map((item) => <Product item={item} key={item._id} />)}
        </Container>
      )}
      {cat ? (
        <PaginationContainer>
          <Pagination
            total={filteredProducts.length}
            pagesize={itemsperpage}
            currentpage={currentpage}
            changepage={handlePageChange}
          />
        </PaginationContainer>
      ) : null}
    </>
  );
};

export default Products;
