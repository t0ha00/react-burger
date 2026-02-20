import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { addIngredient } from '@/services/burger-constructor.js';

export const BunDropZone = ({ children }) => {
  const dispatch = useDispatch();

  const [dropRef] = useDrop({
    accept: 'ingredient',
    drop: (item) => {
      if (item.type === 'bun') {
        dispatch(addIngredient(item));
      }
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  return <div ref={dropRef}>{children}</div>;
};

export const IngredientsDropZone = ({ children }) => {
  const dispatch = useDispatch();

  const [dropRef] = useDrop({
    accept: 'ingredient',
    drop: (item) => {
      if (item.type !== 'bun') {
        dispatch(addIngredient(item));
      }
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  return <div ref={dropRef}>{children}</div>;
};
