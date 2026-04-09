import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { addIngredientWithId } from '@/services/burger-constructor';

import type { FC } from 'react';

import type { Ingredient } from '@/types';

type IngredientsDropZoneProps = {
  type: 'top' | 'bottom' | undefined;
  children: React.ReactNode;
};

export const IngredientsDropZone: FC<IngredientsDropZoneProps> = ({
  type,
  children,
}) => {
  const dispatch = useDispatch();
  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop: (item: Ingredient) => {
      dispatch(addIngredientWithId(item));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={dropRef} className={`drop-zone ${type || ''}`}>
      {children}
    </div>
  );
};
