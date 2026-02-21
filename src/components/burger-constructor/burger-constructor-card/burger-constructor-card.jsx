import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { removeIngredient, moveIngredient } from '@/services/burger-constructor.js';

import styles from './burger-constructor-card.module.css';

export const BurgerConstructorCard = ({ ingredient, top, bottom, index }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const handleClose = () => {
    if (ingredient.type !== 'bun') {
      dispatch(removeIngredient(ingredient.uniqueId));
    }
  };

  const [{ isDrag }, dragRef] = useDrag({
    type: 'constructor-ingredient',
    item: () => ({
      uniqueId: ingredient.uniqueId,
      index,
    }),
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [{ isHover }, dropRef] = useDrop({
    accept: 'constructor-ingredient',
    hover(item, monitor) {
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
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(moveIngredient({ dragIndex, hoverIndex }));
      item.index = hoverIndex;
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const combinedRef =
    ingredient.type !== 'bun'
      ? (node) => {
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
        type={top ? 'top' : bottom ? 'bottom' : ''}
        isLocked={ingredient.type === 'bun' ? true : false}
        text={ingredient.name}
        thumbnail={ingredient.image}
        price={ingredient.price}
        handleClose={ingredient.type !== 'bun' ? handleClose : undefined}
      />
    </li>
  );
};
