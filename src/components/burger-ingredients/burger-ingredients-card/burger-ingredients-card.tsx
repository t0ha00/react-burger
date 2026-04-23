import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useLocation, useNavigate } from 'react-router-dom';

import { selectIngredientCounts } from '@/services/burger-constructor';
import { useAppSelector } from '@services/hooks';

import type { FC } from 'react';

import type { BurgerIngredientsCardProps } from '@/types';

import styles from './burger-ingredients-card.module.css';

export const BurgerIngredientsCard: FC<BurgerIngredientsCardProps> = ({
  ingredient,
}) => {
  const navigate = useNavigate();
  const counts = useAppSelector(selectIngredientCounts);
  const location = useLocation();

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  function handleOpenModal(): void {
    navigate(`/ingredients/${ingredient._id}`, { state: { background: location } });
  }

  const ingredientCount = counts[ingredient._id] || 0;

  return (
    <li
      key={ingredient._id}
      ref={dragRef}
      className={`${styles.card} mb-10 pl-4 ${isDrag ? styles.card_dragging : ''}`}
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
  );
};
