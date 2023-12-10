import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoard from "../pages/dashboard/DashBoard";
import Login from "../pages/login/Login";
import PageNotFound from "../pages/pageNotFound/PageNotFound";
import Statistic from "../pages/statistics/StatisticsPage";

function MyRouter(): JSX.Element {
  return (
    <Router>
      <Routes>
          <Route path="/oms/orders/login" element={<Login/>} />
          <Route path="/*" element={<PageNotFound />} />
          <Route path="/oms/" element={<DashBoard/>}></Route>
          <Route path="/oms/orders/dashboard" element={<DashBoard/>} /> 
          <Route path="/oms/Statistics" element={<Statistic/>} /> 
      </Routes>
    </Router>
  );
}
export default MyRouter;
