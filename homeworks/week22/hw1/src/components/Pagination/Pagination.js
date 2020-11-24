import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PaginationContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Pages = styled.div`
  display: flex;
`;

const Page = styled.a`
  margin: 0 15px;
`;

const PaginationDescription = styled.div`
  margin-bottom: 10px;
`;

export default function Pagination({
  pagination,
  limit,
  getData,
  setValue,
  totalPostsNumber,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const handleClickPage = (page) => () => {
    getData(page, limit).then((posts) => setValue(posts));
    setCurrentPage(page);
  };

  return (
    <PaginationContainer>
      <PaginationDescription>
        {`共有 ${totalPostsNumber} 篇文章，目前在第 ${currentPage} 頁`}
      </PaginationDescription>
      <Pages>
        {pagination.map((page) => (
          <Page key={page} onClick={handleClickPage(page)}>
            {page}
          </Page>
        ))}
      </Pages>
    </PaginationContainer>
  );
}

Pagination.propTypes = {
  pagination: PropTypes.array.isRequired,
  limit: PropTypes.number.isRequired,
  getData: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  totalPostsNumber: PropTypes.number,
}