import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import { useAppSelector } from '@services/hooks';

import type { FC } from 'react';

import type { Order, Ingredient } from '@/types';

import styles from './feed-order-details.module.css';

export const FeedOrderDetails: FC<{ order: Order }> = ({ order }) => {
  const ingredients = useAppSelector((state) => state.ingredients.ingredients);

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

  return (
    <div className={styles.order_details}>
      <div className={styles.order_content}>
        <h3 className={`${styles.order_name} text text_type_main-medium`}>
          {order.name}
        </h3>

        <div className={styles.order_status}>
          <span
            className={`${styles.status_value} ${getStatusColor(order.status)} text text_type_main-default`}
          >
            {getStatusText(order.status)}
          </span>
        </div>

        <div className={styles.ingredients_section}>
          <h4 className={`${styles.ingredients_title} text text_type_main-medium`}>
            Состав:
          </h4>
          <div className={styles.ingredients_list}>
            {getOrderIngredients().map(({ ingredient, count }) => (
              <div key={ingredient._id} className={styles.ingredient_item}>
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className={styles.ingredient_image}
                />
                <span
                  className={`${styles.ingredient_name} text text_type_main-default`}
                >
                  {ingredient.name}
                </span>
                <div className={styles.ingredient_bottom}>
                  <span
                    className={`${styles.ingredient_count} text text_type_main-default text_color_inactive`}
                  >
                    x{count}
                  </span>
                  <span
                    className={`${styles.ingredient_price} text text_type_digits-default`}
                  >
                    {ingredient.price * count} <CurrencyIcon type="primary" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.order_footer}>
          <span
            className={`${styles.order_time} text text_type_main-default text_color_inactive`}
          >
            {formatDate(order.createdAt)}
          </span>
          <span className={`${styles.order_total} text text_type_digits-default`}>
            {calculateTotalPrice()} <CurrencyIcon type="primary" />
          </span>
        </div>
      </div>
    </div>
  );
};
