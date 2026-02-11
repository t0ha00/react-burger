import {
  Counter,
  CurrencyIcon,
  CloseIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { IngredientDetails } from '../../ingredient-details/ingredient-details.jsx';
import Modal from '../../modal/modal.jsx';

import styles from './burger-ingredients-card.module.css';

export const BurgerIngredientsCard = ({ ingredient }) => {
  const [modalOpen, setModalOpen] = useState(false);

  function handleOpenModal() {
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
  }

  const ingredientCount = 1;

  return (
    <>
      <li
        key={ingredient._id}
        className={`${styles.card} mb-10 pl-4`}
        onClick={handleOpenModal}
      >
        {ingredientCount > 0 && <Counter count={ingredientCount} size="default" />}
        <img className="pl-4" src={ingredient.image} alt={ingredient.name} />
        <div className={`${styles.card_price} mt-1 mb-1`}>
          <span className="text text_type_digits-default mt-1 pr-1">
            {ingredient.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <p className={'text text_type_main-default mt-1'}>{ingredient.name}</p>
      </li>
      {modalOpen && (
        <Modal close={handleCloseModal}>
          <div className="pl-10 pr-10 pt-10 pb-15">
            <div className={styles.modal_header}>
              <h3 className="text text_type_main-large">Детали ингредиента</h3>
              <CloseIcon type="primary" onClick={handleCloseModal} />
            </div>
            <IngredientDetails ingredient={ingredient} />
          </div>
        </Modal>
      )}
    </>
  );
};
