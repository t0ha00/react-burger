import { useEffect, type FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import Modal from '@components/modal/modal';
import { useAppDispatch, useAppSelector } from '@services/hooks';
import { selectIngredientById } from '@services/ingredients';
import {
  setSelectedIngredient,
  clearSelectedIngredient,
} from '@services/selected-ingredient';

import styles from './ingredient-details-module.module.css';

export const IngredientDetailsModule: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const selectedIngredient = useAppSelector((state) =>
    selectIngredientById(state, id || '')
  );

  useEffect((): (() => void) => {
    if (selectedIngredient) {
      dispatch(setSelectedIngredient(selectedIngredient));
    }
    return (): void => {
      dispatch(clearSelectedIngredient());
    };
  }, [dispatch, selectedIngredient]);

  const handleCloseModal = (): void => {
    navigate(-1);
  };

  if (!selectedIngredient) {
    return (
      <div className={styles.notFound}>
        <p>Ингредиент не найден</p>
        <button onClick={handleCloseModal} className={styles.notFoundButton}>
          Вернуться на главную
        </button>
      </div>
    );
  }

  return (
    <Modal header={'Детали ингредиента'} close={handleCloseModal}>
      <IngredientDetails ingredient={selectedIngredient} />
    </Modal>
  );
};
