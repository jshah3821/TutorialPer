import React, { useEffect, useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Context } from "../Context";

const Popup = (props) => {
  const [item, setItem] = useState("");
  const { showModal, setShowModal } = useContext(Context);

  useEffect(() => {
    if (props.updateId && props.updateId !== "") {
      setItem(
        props.products[
          props.products.findIndex((product) => product.id == props.updateId)
        ].name
      );
    }
  }, []);

  const closePopup = () => {
    props.setUpdateId("");
    setShowModal(false);
  };

  const updateItem = () => {
    let temp = props.products;
    if (props.updateId !== "") {
      let index = temp.findIndex((product) => product.id == props.updateId);
      temp[index] = { id: temp[index].id, name: item, vote: temp[index].vote };
      props.setUpdateId("");
      props.setProducts(temp);
    } else {
      temp.push({ id: props.products.length + 1, name: item, vote: true });
      props.setProducts(temp);
    }
    setShowModal(false);
  };

  return (
    <div>
      <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter Product</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setItem(e.target.value)}
                value={item}
                placeholder="Enter Product"
                autoFocus
              />
            </Form.Group>
            {console.log(item)}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closePopup}>
            Close
          </Button>

          <Button
            variant="primary"
            onClick={updateItem}
            disabled={item == "" ? true : false}
          >
            ADD
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Popup;
