import { BurgerIngredientsCard } from '../burger-ingredients-card/burger-ingredients-card';

import styles from './burger-ingredients-list.module.css';

export const BurgerIngredientsList = ({
  ingredients,
  bunsRef,
  mainsRef,
  saucesRef,
  containerRef,
}) => {
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
