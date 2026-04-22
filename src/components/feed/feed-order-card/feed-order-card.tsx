import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import type { FC } from 'react';

import type { Order, Ingredient } from '@/types';
import type { RootState } from '@services/store';

import styles from './feed-order-card.module.css';

type FeedOrderCardProps = {
  order: Order;
  basePath?: string;
};

export const FeedOrderCard: FC<FeedOrderCardProps> = ({ order, basePath = '/feed' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const ingredients = useSelector((state: RootState) => state.ingredients.ingredients);
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Moscow',
    });
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'done':
        return styles.status_done;
      case 'pending':
        return styles.status_pending;
      case 'created':
        return styles.status_created;
      default:
        return styles.status_default;
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'done':
        return 'Выполнен';
      case 'pending':
        return 'Готовится';
      case 'created':
        return 'Создан';
      default:
        return status;
    }
  };

  const getOrderIngredients = (): { ingredient: Ingredient; count: number }[] => {
    const ingredientCounts: Record<string, number> = {};

    order.ingredients.forEach((ingredientId) => {
      ingredientCounts[ingredientId] = (ingredientCounts[ingredientId] || 0) + 1;
    });

    return Object.entries(ingredientCounts)
      .map(([ingredientId, count]) => ({
        ingredient: ingredients.find((ing) => ing._id === ingredientId),
        count,
      }))
      .filter(
        (item): item is { ingredient: Ingredient; count: number } =>
          item.ingredient !== undefined
      );
  };

  const calculateTotalPrice = (): number => {
    return getOrderIngredients().reduce((total, { ingredient, count }) => {
      return total + ingredient.price * count;
    }, 0);
  };

  const handleClick = (): void => {
    navigate(`${basePath}/${order._id}`, { state: { background: location } });
  };

  return (
    <div className={styles.order_card} onClick={handleClick}>
      <div className={styles.order_header}>
        <span className={`${styles.order_number} text text_type_digits-default`}>
          #{order.number}
        </span>
        <span
          className={`${styles.order_time} text text_type_main-default text_color_inactive`}
        >
          {formatDate(order.createdAt)}
        </span>
      </div>

      <div className={styles.order_content}>
        <h3 className={`${styles.order_name} text text_type_main-medium`}>
          {order.name}
        </h3>

        <div className={styles.order_ingredients}>
          {getOrderIngredients()
            .slice(0, 6)
            .map(({ ingredient }) => (
              <img
                key={ingredient._id}
                src={ingredient.image}
                alt={ingredient.name}
                className={styles.ingredient_image}
              />
            ))}
          {getOrderIngredients().length > 6 && (
            <div className={styles.ingredients_more}>
              +{getOrderIngredients().length - 6}
            </div>
          )}
        </div>

        <div className={styles.order_footer}>
          <span className={`${styles.order_price} text text_type_digits-default`}>
            {calculateTotalPrice()} <CurrencyIcon type="primary" />
          </span>
          <span
            className={`${styles.order_status} ${getStatusColor(order.status)} text text_type_main-default`}
          >
            {getStatusText(order.status)}
          </span>
        </div>
      </div>
    </div>
  );
};
