import { useSelector } from 'react-redux';

import styles from './ingredient-details.module.css';

export const IngredientDetails = () => {
  const selectedIngredient = useSelector(
    (state) => state.selectedIngredients.selectedIngredient
  );
  return (
    <>
      <img
        className="pb-4"
        src={selectedIngredient.image_large}
        alt={selectedIngredient.name}
      />
      <p className={'text text_type_main-medium pb-8'}>{selectedIngredient.name}</p>
      <div className={styles.modal_nutrition}>
        <div>
          <div className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </div>
          <div className="text text_type_main-default text_color_inactive">
            {selectedIngredient.calories}
          </div>
        </div>
        <div>
          <div className="text text_type_main-default text_color_inactive">Белки, г</div>
          <div className="text text_type_main-default text_color_inactive">
            {selectedIngredient.proteins}
          </div>
        </div>
        <div>
          <div className="text text_type_main-default text_color_inactive">Жиры, г</div>
          <div className="text text_type_main-default text_color_inactive">
            {selectedIngredient.fat}
          </div>
        </div>
        <div>
          <div className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </div>
          <div className="text text_type_main-default text_color_inactive">
            {selectedIngredient.carbohydrates}
          </div>
        </div>
      </div>
    </>
  );
};
