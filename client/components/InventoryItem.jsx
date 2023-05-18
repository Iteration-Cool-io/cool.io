import React, { useState, useEffect } from 'react';
import UpdateModal from './UpdateModal.jsx';

function InventoryItem({item, daysLeft}) {
  const [inStock, setStock] = useState(false);
  const [modalState, setModalState] = useState(false);
  const {_id, item_name, expiration, date_bought, status} = item;

  const deleteItem = async (idNum) => {
    try {
      const deletedItem = await fetch('/fridge/deleteItem', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'Application/JSON',
        },
        body: JSON.stringify({ id: idNum }),
      });
      console.log(deletedItem);
      return window.location.reload(false);
    } catch (err) {
      console.log('Fridge.useEffect: get items: ERROR:, ', err);
    }
  };

  function openModal() {
    setModalState(true);
  }

  function closeModal() {
    setModalState(false);
  }

  useEffect(() => {
    if (_id) {
      setStock(true);
    }
  });

  return (
    <div id="inventoryList">
      <section className="inventoryItem">
        <div className="itemInfo">
          <h2>{item_name}</h2>
          {/* Will show information if it exists in inventory */}
          {inStock && (
            <div>
              <ul className="inventoryTableInfo">
                <li className="itemDetail">
                  <span className="detailTitle">Expiration Date:</span>{' '}
                  {expiration}
                </li>
                <li className="itemDetail">
                  <span className="detailTitle">Bought On:</span>{' '}
                  {date_bought}
                </li>
                <li className="itemDetail">
                  <span className="detailTitle">Status:</span> {status}
                </li>
                <li className="itemDetail">
                  <span className="detailTitle">Days Left:</span> {daysLeft}
                </li>
              </ul>
              {modalState && (
                <UpdateModal closeModal={closeModal} item={item} />
              )}
              <div className="itemButtons">
                {/* //TODO: Update button will need to trigger a modal or something that
        will allow you to edit fields before submitting changes */}
                <button className="updateInventory" onClick={openModal}>
                  Update Item
                </button>
                <button
                  className="deleteInventory"
                  onClick={() => {
                    //console.log('in click: ', item._id);
                    deleteItem(_id);
                  }}
                >
                  Delete Item
                </button>
              </div>
            </div>
          )}
          {/* Will print this if there's no information besides item_name */}
          {!inStock && (
            <h3 className="outOfStock">You are currently out of this item</h3>
          )}
        </div>
      </section>
    </div>
  );
}

export default InventoryItem;
