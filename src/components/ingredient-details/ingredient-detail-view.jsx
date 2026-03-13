import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { IngredientDetailsPage } from '@components/ingredient-details/ingredient-details-page';
import { selectIngredientById } from '@services/ingredients';
import {
  setSelectedIngredient,
  clearSelectedIngredient,
} from '@services/selected-ingredient';

import styles from './ingredient-details-view.module.css';

export const IngredientDetailView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const selectedIngredient = useSelector((state) => selectIngredientById(state, id));

  useEffect(() => {
    if (selectedIngredient) {
      dispatch(setSelectedIngredient(selectedIngredient));
    }
    return () => {
      dispatch(clearSelectedIngredient());
    };
  }, [dispatch, selectedIngredient]);

  const handleCloseModal = () => {
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

  return <IngredientDetailsPage ingredient={selectedIngredient} />;
};
