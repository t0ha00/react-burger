import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

export const OrderDetails = () => {
  const { orderNumber } = useSelector((state) => state.order);

  return (
    <>
      <div className="text text_type_digits-large mb-8">{orderNumber}</div>
      <div className="text text_type_main-medium mb-15">идентификатор заказа</div>
      <CheckMarkIcon type="primary" className="mb-15" />
      <div className="text text_type_main-default mb2-15">Ваш заказ начали готовить</div>
      <div className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </div>
    </>
  );
};
