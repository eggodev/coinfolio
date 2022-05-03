import React from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/esm/CloseButton";

const DeleteCoin = ({
  coinDelete,
  setCoinDelete,
  coins,
  setCoins,
  transactions,
  setTransactions,
}) => {
  const handleClose = () => {
    setCoinDelete(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.delete(
        "https://app-criptofolio.herokuapp.com/api/coins/" + coinDelete.symbol
      );
    } catch (error) {
      console.log(error);
    }
    try {
      await axios.delete(
        "https://app-criptofolio.herokuapp.com/api/transactions/no/" +
          coinDelete.symbol
      );
    } catch (error) {
      console.log(error);
    }
    const validTransactions = transactions.filter(
      (transaction) => transaction.symbol !== coinDelete.symbol
    );
    const validCoins = coins.filter(
      (coin) => coin.symbol !== coinDelete.symbol
    );
    await setTransactions(validTransactions);
    await setCoins(validCoins);
    handleClose();
  };

  return (
    <Modal show={true} animation={false} onHide={handleClose}>
      <Modal.Header className="bg-dark border-0 pb-0">
        <Modal.Title>
          <h5 className="modal-title">Eliminar criptomoneda</h5>
        </Modal.Title>
        <CloseButton variant="white" onClick={handleClose} />
      </Modal.Header>
      <Modal.Body className="bg-dark">
        <form className="needs-validation mt-2" onSubmit={onSubmit}>
          <div className="text-center mt-2 mb-2">
            <div className="mb-1">
              Estás seguro que quieres eliminar {coinDelete.name}
            </div>
            <div className="mb-4">
              Toda transacción asociada a la moneda también se borrará...
            </div>
            <button
              type="button"
              className="btn btn-secondary me-3"
              onClick={handleClose}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Eliminar
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteCoin;
