import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';

import styles from './burger-constructor-card.module.css';

export const BurgerConstructorCard = ({ ingredient, top, bottom }) => {
  return (
    <li key={ingredient._id} className={`${styles.card} ${top || bottom ? 'ml-8' : ''}`}>
      {!(top || bottom) && <DragIcon type="primary" className={`${styles.drag_icon}`} />}
      <ConstructorElement
        extraClass={`${styles.constructor_element} ${ingredient.type === 'bun' ? 'ml-8' : ''}`}
        type={top ? 'top' : bottom ? 'bottom' : ''}
        isLocked={ingredient.type === 'bun' ? true : false}
        text={ingredient.name}
        thumbnail={ingredient.image}
        price={ingredient.price}
      />
    </li>
  );
};
