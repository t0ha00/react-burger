import { useSelector } from 'react-redux';

import { BurgerIngredientsCard } from '../burger-ingredients-card/burger-ingredients-card';

import type { FC, RefObject } from 'react';

import type { RootState } from '@/types';

import styles from './burger-ingredients-list.module.css';

type BurgerIngredientsListProps = {
  bunsRef: RefObject<HTMLDivElement | null>;
  mainsRef: RefObject<HTMLDivElement | null>;
  saucesRef: RefObject<HTMLDivElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
};

export const BurgerIngredientsList: FC<BurgerIngredientsListProps> = ({
  bunsRef,
  mainsRef,
  saucesRef,
  containerRef,
}) => {
  const { ingredients } = useSelector((state: RootState) => state.ingredients);
  const buns = ingredients.filter((item) => item.type === 'bun');
  const mains = ingredients.filter((item) => item.type === 'main');
  const sauces = ingredients.filter((item) => item.type === 'sauce');

  return (
    <div ref={containerRef} className={`${styles.list} custom-scroll`}>
      <h2 ref={bunsRef} className="text text_type_main-medium mt-10 mb-6">
        Булки
      </h2>
      <ul className={styles.cards}>
        {buns.map((ingredient) => (
          <BurgerIngredientsCard key={ingredient._id} ingredient={ingredient} />
        ))}
      </ul>
      <h2 ref={mainsRef} className="text text_type_main-medium mt-10 mb-6">
        Начинки
      </h2>
      <ul className={styles.cards}>
        {mains.map((ingredient) => (
          <BurgerIngredientsCard key={ingredient._id} ingredient={ingredient} />
        ))}
      </ul>
      <h2 ref={saucesRef} className="text text_type_main-medium mt-10 mb-6">
        Соусы
      </h2>
      <ul className={styles.cards}>
        {sauces.map((ingredient) => (
          <BurgerIngredientsCard key={ingredient._id} ingredient={ingredient} />
        ))}
      </ul>
    </div>
  );
};
