import { BurgerConstructorCard } from '../burger-constructor-card/burger-constructor-card';
import { BunDropZone, IngredientsDropZone } from './drop-zones';

import styles from './burger-constructor-list.module.css';

export const BurgerConstructorList = ({ bun, ingredients }) => {
  return (
    <div className={`${styles.list_container}`}>
      <BunDropZone type="top">
        {bun ? (
          <BurgerConstructorCard ingredient={bun} top={true} />
        ) : (
          <div
            className={`${styles.constructor_placeholder} ${styles.constructor_placeholder_top}`}
          >
            <span className="text text_type_main-default text_color_inactive">
              Добавьте булку
            </span>
          </div>
        )}
      </BunDropZone>

      <IngredientsDropZone>
        <ul className={`${styles.list}`}>
          {ingredients.length > 0 ? (
            ingredients.map((ingredient, index) => (
              <BurgerConstructorCard
                key={ingredient.uniqueId}
                ingredient={ingredient}
                index={index}
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

      <BunDropZone type="top">
        {bun ? (
          <BurgerConstructorCard ingredient={bun} bottom={true} />
        ) : (
          <div
            className={`${styles.constructor_placeholder} ${styles.constructor_placeholder_bottom}`}
          >
            <span className="text text_type_main-default text_color_inactive">
              Добавьте булку
            </span>
          </div>
        )}
      </BunDropZone>
    </div>
  );
};
