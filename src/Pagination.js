import React, { useEffect } from 'react';
import { useState } from 'react';
import './Pagination.css';

const Pagination = ({ data, setcurrentItems }) => {
  const [page, setpage] = useState(1);
  const [Pagenumberlimit, setPagenumberlimit] = useState(5);
  const [maxpageNumberLimit, setmaxpageNumberLimit] = useState(5);
  const [minpageNumberLimit, setminpageNumberLimit] = useState(0);

  const pages = [];

  for (let i = 1; i <= Math.ceil(data.length / 10); i++) {
    pages.push(i);
  }
  console.log(pages);
  const indexOfLastItem = page * 10;
  const indexofFirstItem = indexOfLastItem - 10;

  useEffect(() => {
    // Update the currentItems whenever the page changes or the data array changes
    setcurrentItems(data.slice(indexofFirstItem, indexOfLastItem));
  }, [page, data, indexofFirstItem, indexOfLastItem, setcurrentItems]);

  const handlePageData = (event) => {
    setpage(Number(event.target.id)); 
  };

  const handleprevbtn = () => {
    setpage(page - 1);

    if ((page - 1) % Pagenumberlimit === 0) {
      setmaxpageNumberLimit(maxpageNumberLimit - Pagenumberlimit);
      setminpageNumberLimit(minpageNumberLimit - Pagenumberlimit);
    }
  };

  const handlenextbtn = () => {
    setpage(page + 1);

    if (page + 1 > maxpageNumberLimit) {
      setmaxpageNumberLimit(maxpageNumberLimit + Pagenumberlimit);
      setminpageNumberLimit(minpageNumberLimit + Pagenumberlimit);
    }
  };

  return (
    <ul className="pagenumbers"> Total Pages {pages.length}
      <li>
        <button onClick={handleprevbtn} disabled={page === 1 ? true : false}>
          Previous
        </button>
      </li>
      {pages.map((number) => {
        if (number < maxpageNumberLimit + 1 && number > minpageNumberLimit) {
          return (
            <li
              key={number}
              id={number}
              onClick={handlePageData}
              className={page === number ? 'active' : null}
            >
              {number}
            </li>
          );
        } else {
          return null;
        }
      })}
      <li>
        <button onClick={handlenextbtn} disabled={page === pages.length ? true : false}>
          Next
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
