const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      // Show all pages if total pages are 5 or less
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Handle cases where total pages are greater than 5
      if (currentPage <= 3) {
        // Show first 4 pages and ellipsis with the last page
        pageNumbers.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage > totalPages - 3) {
        // Show ellipsis, last 4 pages, and the first page
        pageNumbers.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Show ellipsis on both sides, current, and the last page
        pageNumbers.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pageNumbers;
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber !== currentPage && pageNumber !== "...") {
      onPageChange(pageNumber);
    }
  };

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        {"<"}
      </button>
      {getPageNumbers().map((number, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(number)}
          className={`px-4 py-2 mx-2 ${
            number === currentPage
              ? "bg-gray-600 text-white"
              : number === "..."
              ? "bg-transparent text-gray-500 cursor-default"
              : "bg-gray-200 text-black"
          } rounded`}
          disabled={number === "..."}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
