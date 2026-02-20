import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { selectIngredientCounts } from '@/services/burger-constructor.js';
import {
  setSelectedIngredient,
  clearSelectedIngredient,
} from '@/services/selected-ingredient.js';

import { IngredientDetails } from '../../ingredient-details/ingredient-details.jsx';
import Modal from '../../modal/modal.jsx';

import styles from './burger-ingredients-card.module.css';

export const BurgerIngredientsCard = ({ ingredient }) => {
  const dispatch = useDispatch();
  const selectedIngredient = useSelector(
    (state) => state.selectedIngredients.selectedIngredient
  );
  const ingredientCounts = useSelector(selectIngredientCounts);

  const modalOpen = selectedIngredient?._id === ingredient._id;

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  function handleOpenModal() {
    dispatch(setSelectedIngredient(ingredient));
  }

  function handleCloseModal() {
    dispatch(clearSelectedIngredient());
  }

  const ingredientCount = ingredientCounts[ingredient._id] || 0;

  return (
    <>
      <li
        key={ingredient._id}
        ref={dragRef}
        className={`${styles.card} mb-10 pl-4`}
        onClick={handleOpenModal}
        style={{ opacity: isDrag ? 0.5 : 1 }}
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
        <Modal header={'Детали ингридиента'} close={handleCloseModal}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
};
