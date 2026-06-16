import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/analytics/:id" element={<Analytics />} />
    </Routes>
  );
};

export default AppRouter;
