import { Box, Button, Stack, Skeleton } from "@mui/material";
import Order from "../Order";
import TableHeader from "../TableHeader";
import { useEffect, useState } from "react";
//import { fetchOrders } from "../../../../services/ordersService";
import { OrderInterface } from "../../../../interfaces/ordersInterface";
import { useNavigate } from "react-router";
import TuneIcon from "@mui/icons-material/Tune";
import RotateLeftRoundedIcon from "@mui/icons-material/RotateLeftRounded";
import useFilterOrders from "../../../../hooks/filterOrdersHooks";
import FilterModal from "../filterModal/FilterModal";
import { useQuery } from "@apollo/client";
import { getOrdersQuery } from "../../../../services/orders.graphql";

export default function Table() {
  const Navigate = useNavigate();
  const [orders, setOrders] = useState<OrderInterface[]>([]);
  const [open, setOpen] = useState(false);
  //const [loading, setLoading] = useState(false);
  const { loading, error, data } = useQuery(getOrdersQuery);
  const [
    selectedOptions,
    filteredOrders,
    handleChangeDate,
    handleChangePrice,
    handleTypeCheckboxChange,
    handleStatusCheckboxChange,
    handleChangeStatusButton,
    handleResetFilters,
    priceValue,
  ] = useFilterOrders(orders);
  
  useEffect(() => {
    data && setOrders(data.getAllOrders)
    error && Navigate("/oms/orders/login?notLoginPopup=true")
  }, [data, error]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ marginTop: "7em" }}>
      <Box
        sx={{
          width: "100vw",
          height: "3em",
          display: "flex",
          alignItems: "center",
          marginTop: "2em",
        }}
      >
        <TableHeader />
        <Box sx={{ display: "flex", width: "40em", ml: "2.8em" }}>
          <Button
            onClick={handleOpen}
            sx={{
              color: "white",
              border: "none",
              width: "9em",
              backgroundColor: "#26a69a",
              "&:hover": { border: "none", backgroundColor: "#80cbc4" },
            }}
            startIcon={<TuneIcon />}
          >
            Filters
          </Button>
          <FilterModal
            open={open}
            handleClose={handleClose}
            priceValue={priceValue}
            handleChangePrice={handleChangePrice}
            selectedOptions={selectedOptions}
            handleStatusCheckboxChange={handleStatusCheckboxChange}
            handleTypeCheckboxChange={handleTypeCheckboxChange}
            handleChangeDate={handleChangeDate}
          />
          <Button
            variant="outlined"
            onClick={handleResetFilters}
            sx={{
              color: "white",
              border: "none",
              backgroundColor: "#26a69a",
              marginLeft: "0.5em",
              "&:hover": { border: "none", backgroundColor: "#80cbc4" },
            }}
            startIcon={<RotateLeftRoundedIcon sx={{ color: "white" }} />}
          >
            reset filters
          </Button>
        </Box>
      </Box>
      {loading && (
        <Stack spacing={1} sx={{ display: "flex", alignItems: "center" }}>
          {new Array(8).fill(1).map((a) => (
            <Skeleton key={a} variant="rounded" width={"95vw"} height={"5em"} />
          ))}
          ;
        </Stack>
      )}
      <Box
        sx={{
          width: "100vw",
          minHeight: "50vh",
          display: "flex",
          justifyItems: "center",
          flexDirection: "column",
        }}
      >
        {filteredOrders.map((order) => (
          <Order order={order} handleChangeStatus={handleChangeStatusButton} key={order._id}/>
        ))}
      </Box>
    </Box>
  );
}
