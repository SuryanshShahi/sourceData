import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import Button from "../buttons/Button";
import { useHook } from "./useHook";

const Pagination = (props: any) => {
  const { width } = useHook();
  const isFirstPage = props.page === 1;
  const isLastPage = props.page === props.totalPages;

  return (
    <ReactPaginate
      containerClassName="flex w-full gap-x-[2px] items-center justify-center relative"
      breakLabel="..."
      nextLabel={<Button
        btnName="Next"
        variant="secondary"
        size="sm"
        icon={<FiArrowRight size={20} />}
        disabled={isLastPage}
        className="absolute right-0 top-0" />}
      initialPage={props.page - 1}
      onPageChange={props.active}
      pageRangeDisplayed={width < 600 ? 1 : 2}
      pageCount={props.totalPages}
      previousLabel={<Button
        btnName="Previous"
        variant="secondary"
        size="sm"
        iconFirst
        icon={<FiArrowLeft size={20} />}
        disabled={isFirstPage}
        className="absolute left-0 top-0" />}
      nextClassName="ml-auto"
      previousClassName="mr-auto"
      activeClassName="bg-btn-secondary-hover !text-secondary flex items-center justify-center md:h-10 md:w-10 h-8 w-8 rounded-lg"
      pageClassName="flex items-center text-tertiary duration-300 hover:bg-btn-secondary-hover justify-center md:h-10 md:w-10 h-8 w-8 cursor-pointer rounded-lg [&>a]:flex [&>a]:h-full [&>a]:w-full [&>a]:justify-center [&>a]:items-center" marginPagesDisplayed={0}    />
  );
};

export default Pagination;
