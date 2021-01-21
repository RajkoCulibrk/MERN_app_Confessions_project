import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadConfessions } from "../actions/confessionsActions";
import Confession from "../components/Confession";

const Home = () => {
  const dispatch = useDispatch();
  const { confessionsList } = useSelector((state) => state);
  const { confessions } = confessionsList;

  useEffect(() => {
    console.log("ffffffffffffffffffff");
  }, []);
  return (
    <div className="w-60 m-auto bg-light">
      {confessions.map((confession) => (
        <Confession key={confession._id} confession={confession} />
      ))}
    </div>
  );
};

export default Home;
