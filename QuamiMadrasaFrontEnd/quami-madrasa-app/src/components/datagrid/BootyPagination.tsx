


interface paginationProps{
 rowsPerPage:number;
 rowCount:number;
 onChangePage:any;
 onChangeRowsPerPage:any;
 currentPage:number;
}

function getNumberOfPages(rowCount: number, rowsPerPage: number) {
    return Math.ceil(rowCount / rowsPerPage);
  }
  
  function toPages(pages: number) {
    const results = [];
  
    for (let i = 1; i < pages; i++) {
      results.push(i);
    }
  
    return results;
  } 

const BootyPagination = (props:paginationProps) => {
  const handleBackButtonClick = () => {
    props.onChangePage(props.currentPage - 1);
  };

  const handleNextButtonClick = () => {
    props.onChangePage(props.currentPage + 1);
  };

  const handlePageNumber = (e:any) => {
    props.onChangePage(Number(e.target.value));
  };

  const pages = getNumberOfPages(props.rowCount, props.rowsPerPage);
  const pageItems = toPages(pages);
  const nextDisabled = props.currentPage === pageItems.length;
  const previosDisabled = props.currentPage === 1;

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link"
            onClick={handleBackButtonClick}
            disabled={previosDisabled}
            aria-disabled={previosDisabled}
            aria-label="previous page"
          >
            Previous
          </button>
        </li>
        {pageItems.map((page) => {
          const className =
            page === props.currentPage ? "page-item active" : "page-item";

          return (
            <li key={page} className={className}>
              <button
                className="page-link"
                onClick={handlePageNumber}
                value={page}
              >
                {page}
              </button>
            </li>
          );
        })}
        <li className="page-item">
          <button
            className="page-link"
            onClick={handleNextButtonClick}
            disabled={nextDisabled}
            aria-disabled={nextDisabled}
            aria-label="next page"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default BootyPagination;
