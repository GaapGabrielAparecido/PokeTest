import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

export interface PaginationProps {
  filteredPokeList: any;
  page: number;
  setPage: (data: number) => void;
}

const Pagination = ({ filteredPokeList, page, setPage }: PaginationProps) => {
  const startIndex = page === 1 ? 0 : 12 * (page - 1);
  const endIndex =
    startIndex + 12 <= filteredPokeList.length
      ? startIndex + 12
      : filteredPokeList.length;

  return (
    <div className="flex justify-between items-center">
      <div className="text-white">
        Exibindo <span className="font-medium">{startIndex + 1}</span> a{" "}
        <span className="font-medium">
          {endIndex <= filteredPokeList.length
            ? endIndex
            : filteredPokeList.length}
        </span>{" "}
        de <span className="font-medium">{filteredPokeList.length}</span>{" "}
        pokemon
      </div>

      <div className="rounded-md flex overflow-hidden">
        {page > 2 && (
          <button
            type="button"
            onClick={() => setPage(1)}
            className="h-10 w-10 bg-zinc-50 hover:bg-zinc-100 flex justify-center items-center transition-all duration-150"
          >
            <ChevronDoubleLeftIcon className="w-5" />
          </button>
        )}

        {page > 1 && (
          <button
            type="button"
            onClick={() => setPage(page - 1)}
            className="h-10 w-10 bg-zinc-50 hover:bg-zinc-100 flex justify-center items-center transition-all duration-150"
          >
            {page - 1}
          </button>
        )}

        <div className="h-10 w-10 bg-zinc-200 flex justify-center items-center">
          {page}
        </div>

        {page + 1 <= Math.ceil(filteredPokeList.length / 12) && (
          <button
            type="button"
            onClick={() => setPage(page + 1)}
            className="h-10 w-10 bg-zinc-50 hover:bg-zinc-100 flex justify-center items-center transition-all duration-150"
          >
            {page + 1}
          </button>
        )}

        {page + 2 <= Math.ceil(filteredPokeList.length / 12) && (
          <button
            type="button"
            onClick={() => setPage(Math.ceil(filteredPokeList.length / 12))}
            className="h-10 w-10 bg-zinc-50 hover:bg-zinc-100 flex justify-center items-center transition-all duration-150"
          >
            <ChevronDoubleRightIcon className="w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
