import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useParams, useNavigate } from 'react-router-dom';

import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import Modal from '@components/modal/modal';
import { selectIngredientById } from '@services/ingredients';
import {
  setSelectedIngredient,
  clearSelectedIngredient,
} from '@services/selected-ingredient';

import styles from './home.module.css';

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.ingredients);
  const location = useLocation();
  const { id } = useParams();

  const selectedIngredient = useSelector((state) => selectIngredientById(state, id));
  const isIngredientModalOpen =
    location.pathname.startsWith('/ingredients/') && !!selectedIngredient;

  useEffect(() => {
    if (selectedIngredient) {
      dispatch(setSelectedIngredient(selectedIngredient));
    }
    return () => {
      dispatch(clearSelectedIngredient());
    };
  }, [dispatch, selectedIngredient]);

  const handleCloseModal = () => {
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
