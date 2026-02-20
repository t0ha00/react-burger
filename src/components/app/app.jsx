import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { fetchIngredients } from '@services/ingredients';

import styles from './app.module.css';

export const App = () => {
  const dispatch = useDispatch();
  const { ingredients, isLoading } = useSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      {!isLoading ? (
        <main className={`${styles.main} pl-5 pr-5`}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor ingredients={ingredients} />
        </main>
      ) : (
        <Preloader />
      )}
    </div>
  );
};
