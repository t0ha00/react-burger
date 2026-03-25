import { BurgerConstructorCard } from '../burger-constructor-card/burger-constructor-card';
import { IngredientsDropZone } from './drop-zones';

import type { FC } from 'react';

import type { IngredientWithId } from '@/types';

import styles from './burger-constructor-list.module.css';

type BurgerConstructorListProps = {
  bun: IngredientWithId | null;
  ingredients: IngredientWithId[];
};

export const BurgerConstructorList: FC<BurgerConstructorListProps> = ({
  bun,
  ingredients,
}) => {
  return (
    <div className={`${styles.list_container}`}>
      <IngredientsDropZone type="top">
        {bun ? (
          <BurgerConstructorCard ingredient={bun} index={0} top={true} />
        ) : (
          <div
            className={`${styles.constructor_placeholder} ${styles.constructor_placeholder_top}`}
          >
            <span className="text text_type_main-default text_color_inactive">
              Добавьте булку
            </span>
          </div>
        )}
      </IngredientsDropZone>

      <IngredientsDropZone type={undefined}>
        <ul className={`${styles.list}`}>
          {ingredients.length > 0 ? (
            ingredients.map((ingredient, _index) => (
              <BurgerConstructorCard
                key={ingredient.uniqueId}
                ingredient={ingredient}
                index={_index}
              />
            ))
          ) : (
            <div
              className={`${styles.constructor_placeholder} ${styles.constructor_placeholder_middle}`}
            >
              <span className="text text_type_main-default text_color_inactive">
                Добавьте начинку
              </span>
            </div>
          )}
        </ul>
      </IngredientsDropZone>

      <IngredientsDropZone type="bottom">
        {bun ? (
          <BurgerConstructorCard ingredient={bun} index={0} bottom={true} />
        ) : (
          <div
            className={`${styles.constructor_placeholder} ${styles.constructor_placeholder_bottom}`}
          >
            <span className="text text_type_main-default text_color_inactive">
              Добавьте булку
            </span>
          </div>
        )}
      </IngredientsDropZone>
    </div>
  );
};
