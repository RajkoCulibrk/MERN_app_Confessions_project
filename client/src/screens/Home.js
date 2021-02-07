import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Confession from "../components/Confession";
import PostConfession from "../components/PostConfession";

import SpinnerComonent from "../components/Spinner";
import { loadConfessions } from "../actions/confessionsActions";

import FilteringSorting from "../components/FilteringSorting";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { HashLink as Link } from "react-router-hash-link";
const Home = () => {
  const dispatch = useDispatch();
  const toTheTopButton = useRef();

  let {
    confessionsList,
    pagination: { page, sortOrder, sortBy },
  } = useSelector((state) => state);
  const { confessions, loading, end, submitting } = confessionsList;

  useEffect(() => {
    const fetchConfessions = async () => {
      dispatch({ type: "NEXT_PAGE" });

      dispatch(loadConfessions({ page, sortBy, sortOrder }));
    };
    const fetchuj = () => {
      if (
        document.documentElement.scrollHeight - 100 <
          window.pageYOffset + window.innerHeight &&
        !loading &&
        !end
      ) {
        fetchConfessions();
      }
    };
    const showHideToTheTopButton = () => {
      if (window.pageYOffset > 1000) {
        toTheTopButton.current.style.visibility = "visible";
      } else {
        toTheTopButton.current.style.visibility = "hidden";
      }
    };
    document.addEventListener("scroll", fetchuj);
    document.addEventListener("scroll", showHideToTheTopButton);
    return () => {
      document.removeEventListener("scroll", fetchuj);
      document.removeEventListener("scroll", showHideToTheTopButton);
    };
    // eslint-disable-next-line
  }, [end, loading, dispatch, page]);

  return (
    <div className="pt-5">
      <div id="g"></div>
      <div className="pt-5 m-auto ">
        <FilteringSorting />
        {submitting && <SpinnerComonent />}

        {confessions.map((confession) => (
          <Confession key={confession._id} confession={confession} />
        ))}
        {loading && <SpinnerComonent />}

        {!end ? (
          ""
        ) : (
          <div className="ml-auto mr-auto pt-2 pb-2 text-light text-center lead font-weight-bold font-italic text-uppercase confession no-more">
            No more content
          </div>
        )}
      </div>
      <PostConfession />
      <Link to="#g">
        <Button
          ref={toTheTopButton}
          className="to-the-top rounded-circle text-light"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </Button>
      </Link>
    </div>
  );
};

export default Home;
