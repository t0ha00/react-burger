import styles from './ingredient-details.module.css';

export const IngredientDetails = ({ ingredient }) => {
  return (
    <>
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
    </>
  );
};
