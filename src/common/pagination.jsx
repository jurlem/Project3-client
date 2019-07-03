import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = props => {
  const {pageSize, itemsCount, currentPage, onPageChange} = props;
  console.log (currentPage);

  //.ceil method rounds up to integer (from floating point):
  const pagesCount = Math.ceil (itemsCount / pageSize);

  // show a range of pages with underschore.range methode(from, to)
  const pages = _.range (1, pagesCount + 1);

  // if only 1 page, dont render pagination: // edge case
  if (pagesCount === 1) return null;

  return (
    <nav>
      <ul className="pagination">
        {pages.map (page => (
          <li
            key={page}
            className={page === currentPage ? 'page-item active' : 'page-item '}
          >
            <a onClick={() => onPageChange (page)} className="page-link">
              {page}
            </a>
          </li>
        ))}

      </ul>
    </nav>
  );
};
// to avoid bugs in input of pagination
Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
