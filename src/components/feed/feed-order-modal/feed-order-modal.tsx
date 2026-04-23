import Modal from '@components/modal/modal';

import { FeedOrderDetails } from '../feed-order-details/feed-order-details';

import type { Order } from '@/types';

type FeedOrderModalProps = {
  order: Order;
  onClose: () => void;
};

export const FeedOrderModal: React.FC<FeedOrderModalProps> = ({ order, onClose }) => {
  return (
    <Modal header={`#${order.number}`} close={onClose}>
      <FeedOrderDetails order={order} />
    </Modal>
  );
};
