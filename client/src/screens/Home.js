import React from "react";
import { useSelector } from "react-redux";

import Confession from "../components/Confession";
import PostConfession from "../components/PostConfession";
import { Spinner } from "react-bootstrap";
import SpinnerComonent from "../components/Spinner";

const Home = () => {
  const { confessionsList } = useSelector((state) => state);
  const { confessions, loading } = confessionsList;

  return (
    <div className="">
      {loading && <SpinnerComonent />}
      <div className="pt-5 m-auto ">
        {confessions.map((confession) => (
          <Confession key={confession._id} confession={confession} />
        ))}
      </div>
      <PostConfession />
    </div>
  );
};

export default Home;
