import React, { useEffect, useState, useContext } from "react";
import Popup from "../Components/Popup";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context";

const Home = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Pasta & Rice", vote: true },
    { id: 2, name: "Frozen Food", vote: false },
    { id: 3, name: "Bakery & Bread", vote: true },
    { id: 4, name: "Meat & Sea Food", vote: false },
    { id: 5, name: "Pasta", vote: true }
  ]);
  const [search, setSearch] = useState("");
  const { showModal, setShowModal } = useContext(Context);
  const [updateId, setUpdateId] = useState("");
  const navigate = useNavigate();
  const forceUpdate = React.useReducer((bool) => !bool)[1];

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === undefined) {
      navigate("/login");
    }
  }, []);

  const handleVote = (id) => {
    let temp = products;
    let index = temp.findIndex((product) => product.id == id);
    temp[index] = {
      id: temp[index].id,
      name: temp[index].name,
      vote: !temp[index].vote
    };
    setProducts(temp);
    forceUpdate();
  };

  const updateProduct = (id) => {
    setUpdateId(id);
    setShowModal(true);
  };

  const modalActivity = () => {
    setShowModal(true);
  };

  const deleteProduct = (id) => {
    let temp = products;
    let index = temp.findIndex((product) => product.id == id);
    if (index > -1) {
      temp.splice(index, 1);
    }
    setProducts(temp);
    forceUpdate();
  };

  return (
    <div className="text-center">
      <input
        className="mx-3"
        type="search"
        placeholder="Search Products"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></input>

      <button className="btn btn-dark my-5" onClick={modalActivity}>
        Add Products
      </button>
      <div className="container">
        <table className="table border shadow">
          <tbody>
            {search === ""
              ? products
                  .sort((prd1, prd2) => prd2.vote - prd1.vote)
                  .map((product, index) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>
                        {product.vote ? (
                          <i
                            className="fas fa-thumbs-up fa-2x"
                            onClick={() => handleVote(product.id)}
                          ></i>
                        ) : (
                          <i
                            className="fas fa-thumbs-down fa-2x"
                            onClick={() => handleVote(product.id)}
                          ></i>
                        )}

                        <button
                          className="btn btn-outline-dark mx-4 px-2"
                          onClick={() => updateProduct(product.id)}
                        >
                          Updte
                        </button>
                        <button
                          className="btn btn-outline-dark mx-2 px-2"
                          onClick={() => deleteProduct(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
              : products
                  .filter((product) =>
                    product.name
                      .toLocaleLowerCase()
                      .includes(search.toLocaleLowerCase())
                  )
                  .map((product, index) => (
                    <tr>
                      <td>{product.name}</td>
                    </tr>
                  ))}
          </tbody>
        </table>
      </div>
      {showModal === true && (
        <Popup
          showModal={showModal}
          setShowModal={setShowModal}
          products={products}
          setProducts={setProducts}
          updateId={updateId}
          setUpdateId={setUpdateId}
        />
      )}
    </div>
  );
};

export default Home;
