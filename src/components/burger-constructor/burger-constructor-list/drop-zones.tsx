import { useDrop } from 'react-dnd';

import { addIngredientWithId } from '@/services/burger-constructor';
import { useAppDispatch } from '@services/hooks';

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
  const dispatch = useAppDispatch();
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
    <div
      ref={dropRef as unknown as React.Ref<HTMLDivElement>}
      className={`drop-zone ${type || ''}`}
      data-testid="constructor-drop-zone"
    >
      {children}
    </div>
  );
};
