import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { addIngredientWithId } from '@/services/burger-constructor.js';

import styles from './burger-constructor-list.module.css';

export const IngredientsDropZone = ({ children }) => {
  const dispatch = useDispatch();

  const [{ isHover }, dropRef] = useDrop({
    accept: 'ingredient',
    drop: (item) => {
      dispatch(addIngredientWithId(item));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  return (
    <div ref={dropRef} className={isHover ? styles.drop_zone_hover : ''}>
      {children}
    </div>
  );
};
