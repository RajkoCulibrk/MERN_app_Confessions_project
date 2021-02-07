import React from "react";
import { useDispatch } from "react-redux";

import {
  resetPage,
  setSortBy,
  setSortOrder,
} from "../actions/confessionsActions";

const FilteringSorting = () => {
  const dispatch = useDispatch();

  return (
    <div className="  d-flex justify-content-center mb-5 ">
      <select
        className="bg-dark text-light rounded p-2 text-uppercase font-weight-bold"
        onChange={async (e) => {
          /*  when changed resets the page needed for pagination back to 1 and resets the confessions aray to [] so the confessions can be fetched againg with new parameters for pagination sorting and filtering */
          await dispatch(resetPage());
          await dispatch(setSortOrder(e.target.value));
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
          /*  when changed resets the page needed for pagination back to 1 and resets the confessions aray to [] so the confessions can be fetched againg with new parameters for pagination sorting and filtering */
          await dispatch(resetPage());
          await dispatch(setSortBy(e.target.value));
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
