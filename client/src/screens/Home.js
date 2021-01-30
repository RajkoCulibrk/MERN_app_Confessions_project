import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Confession from "../components/Confession";
import PostConfession from "../components/PostConfession";
import { Spinner } from "react-bootstrap";
import SpinnerComonent from "../components/Spinner";
import { loadConfessions } from "../actions/confessionsActions";

const Home = ({ match }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState(true);

  const {
    confessionsList,
    page: { page },
  } = useSelector((state) => state);
  const { confessions, loading, end } = confessionsList;
  const fetchConfessions = async () => {
    dispatch({ type: "NEXT_PAGE" });
    console.log(page, "promena");
    dispatch(loadConfessions(page));
  };

  useEffect(() => {
    const fetchuj = () => {
      if (
        document.documentElement.scrollHeight - 100 <
          window.pageYOffset + window.innerHeight &&
        !loading &&
        !end
      ) {
        fetchConfessions();
        console.log("trulu");
      }
      /* console.log(
          document.documentElement.scrollHeight,
          window.pageYOffset + window.innerHeight
        ); */
    };
    document.addEventListener("scroll", fetchuj);
    return () => {
      /* setState(false); */
      document.removeEventListener("scroll", fetchuj);
    };
  });
  return (
    <div className="pt-5">
      <div className="pt-5 m-auto ">
        {confessions.map((confession) => (
          <Confession key={confession._id} confession={confession} />
        ))}
        {loading && <SpinnerComonent />}
        {!end ? (
          <button onClick={fetchConfessions}>load jos</button>
        ) : (
          <div className="ml-auto mr-auto pt-2 pb-2 text-light text-center lead font-weight-bold font-italic text-uppercase confession no-more">
            No more content
          </div>
        )}
      </div>
      <PostConfession />
    </div>
  );
};

export default Home;
