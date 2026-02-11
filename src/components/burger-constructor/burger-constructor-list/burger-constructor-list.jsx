import { BurgerConstructorCard } from '../burger-constructor-card/burger-constructor-card';

import styles from './burger-constructor-list.module.css';

export const BurgerConstructorList = ({ ingredients }) => {
  const buns = ingredients.filter((item) => item.type === 'bun');
  const mains = ingredients.filter((item) => item.type === 'main');
  const sauces = ingredients.filter((item) => item.type === 'sauce');

  return (
    <div className={`${styles.list_container}`}>
      <BurgerConstructorCard ingredient={buns[0]} top={true} />
      <ul className={`${styles.list}`}>
        {[...sauces, ...mains].map((ingredient) => (
          <BurgerConstructorCard key={ingredient._id} ingredient={ingredient} />
        ))}
      </ul>
      <BurgerConstructorCard ingredient={buns[0]} bottom={true} />
    </div>
  );
};
