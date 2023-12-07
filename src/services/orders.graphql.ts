import { gql } from '@apollo/client';

export const getOrdersQuery = gql`
query getOrders {
    getAllOrders {
      _id
      cartItems {
        name
        description
        price
        quantity
      }
      orderTime
      status
      price
      shippingDetails {
        address
        contactNumber
        orderType
      }
      userId
    }
  }
`;

export const updatedOrder = gql`
mutation UpdateOrder($id: ID!, $updatedOrder: OrderInput!) {
    updateOrder(id: $id, updatedOrder: $updatedOrder) {
      _id
      cartItems {
        name
        description
        price
        quantity
      }
      orderTime
      status
      price
      shippingDetails {
        address
        contactNumber
        orderType
      }
      userId
    }
  }`