import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useRef, type FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { removeIngredient, moveIngredient } from '@/services/burger-constructor';
import { useAppDispatch } from '@services/hooks';

import type { BurgerConstructorCardProps, DragItem } from '@/types';

import styles from './burger-constructor-card.module.css';

export const BurgerConstructorCard: FC<BurgerConstructorCardProps> = ({
  ingredient,
  top,
  bottom,
  index,
}) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLLIElement>(null);

  const handleClose = (): void => {
    if (ingredient.type !== 'bun') {
      dispatch(removeIngredient(ingredient.uniqueId));
    }
  };

  const [{ isDrag }, dragRef] = useDrag({
    type: 'constructor-ingredient',
    item: (): DragItem => ({
      uniqueId: ingredient.uniqueId,
      index,
    }),
    collect: (monitor): { isDrag: boolean } => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [{ isHover }, dropRef] = useDrop({
    accept: 'constructor-ingredient',
    hover(item: DragItem, monitor): void {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(moveIngredient({ dragIndex, hoverIndex }));
      item.index = hoverIndex;
    },
    collect: (monitor): { isHover: boolean } => ({
      isHover: monitor.isOver(),
    }),
  });

  const combinedRef =
    ingredient.type !== 'bun'
      ? (node: HTMLLIElement | null): void => {
          ref.current = node;
          dragRef(node);
          dropRef(node);
        }
      : null;

  return (
    <li
      key={ingredient.uniqueId}
      className={`${styles.card} ${top || bottom ? 'ml-8' : ''} ${isDrag ? styles.card_dragging : ''} ${isHover ? styles.card_hover : ''}`}
      ref={combinedRef}
    >
      {!(top || bottom) && <DragIcon type="primary" className={`${styles.drag_icon}`} />}
      <ConstructorElement
        extraClass={`${styles.constructor_element} ${ingredient.type === 'bun' ? 'ml-8' : ''}`}
        type={top ? 'top' : bottom ? 'bottom' : undefined}
        isLocked={ingredient.type === 'bun'}
        text={`${ingredient.name}${top ? ' (верх)' : bottom ? ' (низ)' : ''}`}
        thumbnail={ingredient.image}
        price={ingredient.price}
        handleClose={ingredient.type !== 'bun' ? handleClose : undefined}
      />
    </li>
  );
};
