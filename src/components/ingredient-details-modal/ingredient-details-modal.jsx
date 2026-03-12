import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import Modal from '@components/modal/modal';

export const IngredientDetailsModal = () => {
  const navigate = useNavigate();
  const selectedIngredient = useSelector(
    (state) => state.selectedIngredients.selectedIngredient
  );

  const handleCloseModal = () => {
    navigate('/');
  };

  if (!selectedIngredient) {
    return null;
  }

  return (
    <Modal header={'Детали ингредиента'} close={handleCloseModal}>
      <IngredientDetails ingredient={selectedIngredient} />
    </Modal>
  );
};
