import Pagination from "../../components/pagination/Pagination";
import Filter from "../../components/filters/Filter";
import { useState } from "react";
import style from "./home.module.css";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div className={style.div}>
      <Filter />
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Home;
