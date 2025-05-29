const BackArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
    />
  </svg>
);

const ForwardArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
    />
  </svg>
);

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const siblingsCount = 2;

  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(2, currentPage - siblingsCount);
    const endPage = Math.min(totalPages - 1, currentPage + siblingsCount);

    pages.push(1);

    if (startPage > 2) {
      pages.push(-1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push(-1);
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`transition-colors duration-300 ${
          currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <BackArrowIcon />
      </button>

      <div className="flex items-end justify-center gap-2">
        {pageNumbers.map((page, index) =>
          page === -1 ? (
            <span
              key={`dots-${index}`}
              className="text-2xl font-medium text-gray-500"
            >
              ...
            </span>
          ) : (
            <button
              key={`page-${page}`}
              className={`text-3xl font-medium ${
                currentPage === page ? "" : "text-[#FFFFFFCC]"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`transition-colors duration-300 ${
          currentPage >= totalPages ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <ForwardArrowIcon />
      </button>
    </div>
  );
};

export default Pagination;
