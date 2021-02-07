import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Alert } from "react-bootstrap";
const Error = ({ error }) => {
  const dispatch = useDispatch();
  // dispatches the remove error action afetr 3 seconds after mounting so it gets removed from the state and unmounted
  useEffect(() => {
    let t = setTimeout(() => {
      dispatch({
        type: "REMOVE_ERROR",
        payload: error.id,
      });
      clearTimeout(t);
    }, 3000);
  });
  return (
    <div>
      <Alert variant="danger text-center"> {error.text} </Alert>
    </div>
  );
};

export default Error;
