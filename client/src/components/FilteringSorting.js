import React from "react";
import { useDispatch } from "react-redux";

import {
  resetPage,
  setSortBy,
  setSortOrder,
} from "../actions/confessionsActions";

const FilteringSorting = () => {
  const dispatch = useDispatch();

  /* bg-dark text-light rounded */
  return (
    <div className="  d-flex justify-content-center mb-5 ">
      <select
        className="bg-dark text-light rounded p-2 text-uppercase font-weight-bold"
        onChange={async (e) => {
          await dispatch(resetPage());
          await dispatch(setSortOrder(e.target.value));
          /*  await dispatch(resetConfessions()); */
        }}
        name=""
        id=""
      >
        <option className="lll" value="-1">
          Descending
        </option>
        <option value="1">Ascending</option>
      </select>

      <select
        className="bg-dark text-light rounded ml-5 p-2 text-uppercase font-weight-bold"
        onChange={async (e) => {
          await dispatch(resetPage());
          await dispatch(setSortBy(e.target.value));
          /*    await dispatch(resetConfessions()); */
        }}
      >
        <option value="created_at">Date</option>
        <option value="comments">Comments</option>
        <option value="likes">Likes</option>
        <option value="dislikes">Dislikes</option>
      </select>
    </div>
  );
};

export default FilteringSorting;
