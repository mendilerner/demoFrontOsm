import { ChangeEvent, useEffect, useState } from "react";
import {
  filterOrdersByDate,
  filterOrdersByOrderType,
  filterOrdersByPriceRange,
  filterOrdersByStatus,
  initialSelectedOptions,
} from "../utils/filtersFuncs";
import { options, tSelectedOptions } from "../interfaces/interfacesForUtils";
import { OrderInterface } from "../interfaces/ordersInterface";
import { useNavigate } from "react-router-dom";
import { updatedOrder } from "../services/orders.graphql";
import { useMutation } from "@apollo/client";

const useFilterOrders = (orders: OrderInterface[]):
[
    tSelectedOptions,
    OrderInterface[],
    (event: ChangeEvent<HTMLInputElement>) => void,
    (event: Event, newValue: number[]) => void,
    (_option: options["orderType"]) => (event: ChangeEvent<HTMLInputElement>) => void,
    (_option: options["status"]) => (event: ChangeEvent<HTMLInputElement>) => void,
    (order: OrderInterface, _status: options["status"]) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>,
    () => void,
    number[]
] =>  {
  const Navigate = useNavigate();
  const [priceValue, setPriceValue] = useState<number[]>([0, 2000]);
  const [dateValue, setDateValue] = useState("0000-00-00");
  const [filteredOrders, setFilteredOrders] = useState<OrderInterface[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<tSelectedOptions>(
    initialSelectedOptions
  );
  const [updateOrderMutation, { error }] = useMutation(updatedOrder);
  useEffect(() => {
    console.log('re-rended###');
  })
  async function filterOrders(
    orders: OrderInterface[],
    selectedOptions: tSelectedOptions
  ) {
    const updatedFilteredOrdersByStatus = filterOrdersByStatus(
      orders,
      selectedOptions.status
    );
    const updatedFilteredOrdersByType = filterOrdersByOrderType(
      updatedFilteredOrdersByStatus,
      selectedOptions.orderType
    );
    const updatedFilteredOrdersByDate = filterOrdersByDate(
      updatedFilteredOrdersByType,
      dateValue
    );
    const updatedFilteredOrdersByPrice = filterOrdersByPriceRange(
      updatedFilteredOrdersByDate,
      priceValue[0],
      priceValue[1]
    );
    setFilteredOrders(updatedFilteredOrdersByPrice);
  }
  const handleStatusCheckboxChange =
    (_option: options["status"]) => (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setSelectedOptions((prevState) => ({
          ...prevState,
          status: [...prevState.status, _option],
        }));
      } else {
        setSelectedOptions((prevState) => ({
          ...prevState,
          status: prevState.status.filter((opt) => opt !== _option),
        }));
      }
    };
  const handleTypeCheckboxChange =
    (_option: options["orderType"]) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setSelectedOptions((prevState) => ({
          ...prevState,
          orderType: [...prevState.orderType, _option],
        }));
      } else {
        setSelectedOptions((prevState) => ({
          ...prevState,
          orderType: prevState.orderType.filter((opt) => opt !== _option),
        }));
      }
    };
  const handleChangePrice = (event: Event, newValue: number[]) => {
    if (event) {
      setPriceValue(newValue as number[]);
    }
  };
  const handleChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    const dateObject = new Date(event.target.value);
    const formattedDate = dateObject.toLocaleDateString("en-GB");
    setDateValue(formattedDate);
  };
  const handleResetFilters = () => {
    setDateValue(initialSelectedOptions.orderTime);
    setPriceValue([
      initialSelectedOptions.price.minPrice,
      initialSelectedOptions.price.maxPrice,
    ]);
    setSelectedOptions(initialSelectedOptions);
  };
  const handleChangeStatusButton = (
    order: OrderInterface,
    _status: options["status"]
  ) => {
    return async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      await updateOrderMutation(
        {variables:{id: order._id, updatedOrder: {...order, status: _status} }}
      );
      if(error){
        Navigate("/oms/orders/login?notLoginPopup=true");
      }
    };
  };
  useEffect(() => {
    filterOrders(orders, selectedOptions);
  }, [priceValue, orders, selectedOptions, dateValue]);

  return [
    selectedOptions,
    filteredOrders,
    handleChangeDate,
    handleChangePrice,
    handleTypeCheckboxChange,
    handleStatusCheckboxChange,
    handleChangeStatusButton,
    handleResetFilters,
    priceValue,
  ];
};

export default useFilterOrders;
