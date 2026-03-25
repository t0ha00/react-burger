import type { FC } from 'react';

import type { Ingredient } from '@/types';

import styles from './ingredient-details-page.module.css';

type IngredientDetailsPageProps = {
  ingredient: Ingredient;
};

export const IngredientDetailsPage: FC<IngredientDetailsPageProps> = ({
  ingredient,
}) => {
  return (
    <div className={styles.container_main}>
      <h1>Детали ингредиента</h1>
      <img className="pb-4" src={ingredient.image_large} alt={ingredient.name} />
      <p className={'text text_type_main-medium pb-8'}>{ingredient.name}</p>
      <div className={styles.modal_nutrition}>
        <div>
          <div className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </div>
          <div className="text text_type_main-default text_color_inactive">
            {ingredient.calories}
          </div>
        </div>
        <div>
          <div className="text text_type_main-default text_color_inactive">Белки, г</div>
          <div className="text text_type_main-default text_color_inactive">
            {ingredient.proteins}
          </div>
        </div>
        <div>
          <div className="text text_type_main-default text_color_inactive">Жиры, г</div>
          <div className="text text_type_main-default text_color_inactive">
            {ingredient.fat}
          </div>
        </div>
        <div>
          <div className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </div>
          <div className="text text_type_main-default text_color_inactive">
            {ingredient.carbohydrates}
          </div>
        </div>
      </div>
    </div>
  );
};
