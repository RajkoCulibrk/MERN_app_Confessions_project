import React from "react";
import { Spinner } from "react-bootstrap";
const SpinnerComonent = () => {
  return (
    <div className="d-flex justify-content-center mt-5">
      <Spinner className="p-5 color-main" animation="border" />
    </div>
  );
};

export default SpinnerComonent;
