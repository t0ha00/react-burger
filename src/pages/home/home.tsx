import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, type FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Outlet, useLocation, useParams, useNavigate } from 'react-router-dom';

import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import Modal from '@components/modal/modal';
import { useAppDispatch, useAppSelector } from '@services/hooks';
import { selectIngredientById, selectIngredientsLoading } from '@services/ingredients';
import {
  setSelectedIngredient,
  clearSelectedIngredient,
} from '@services/selected-ingredient';

import styles from './home.module.css';

export const Home: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectIngredientsLoading);
  const location = useLocation();
  const { id } = useParams();

  const selectedIngredient = useAppSelector((state) =>
    selectIngredientById(state, id || '')
  );
  const isIngredientModalOpen =
    location.pathname.startsWith('/ingredients/') && !!selectedIngredient;

  useEffect((): (() => void) => {
    if (selectedIngredient) {
      dispatch(setSelectedIngredient(selectedIngredient));
    }
    return (): void => {
      dispatch(clearSelectedIngredient());
    };
  }, [dispatch, selectedIngredient]);

  const handleCloseModal = (): void => {
    dispatch(clearSelectedIngredient());
    navigate(-1);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.home}>
        <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
          Соберите бургер
        </h1>
        {!isLoading ? (
          <main className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        ) : (
          <Preloader />
        )}
        <Outlet />
      </div>

      {isIngredientModalOpen && (
        <Modal header={'Детали ингредиента'} close={handleCloseModal}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
    </DndProvider>
  );
};
