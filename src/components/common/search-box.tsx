import React, { forwardRef } from "react";
import { SearchIcon } from "@components/icons";
import { IoCloseOutline } from "react-icons/io5";

interface SearchProps {
  className?: string;
  height?: string;
  onSubmit: (e: React.SyntheticEvent) => void;
  onClear: (e: React.SyntheticEvent) => void;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
}

const SearchBox = forwardRef<HTMLInputElement, SearchProps>(
  ({ className, onSubmit, onClear, height = "12", ...rest }, ref) => {
    return (
      <form
        className={`relative pe-12 md:pe-14 bg-white overflow-hidden rounded-md w-full ${className}`}
        noValidate
        role="search"
        onSubmit={onSubmit}
      >
        <label htmlFor="search" className="flex items-center py-0.5">
          <span className="w-12 md:w-14 h-full flex flex-shrink-0 justify-center items-center cursor-pointer focus:outline-none">
            <SearchIcon color="text-heading" className="w-4 h-4" />
          </span>
          <input
            id="search"
            className={`text-heading outline-none w-full h-${height} lg:h-${
              height + 2
            } placeholder-gray-400 text-sm lg:text-base`}
            placeholder="search"
            aria-label="Search"
            autoComplete="off"
            ref={ref}
            {...rest}
          />
        </label>
        <button
          type="button"
          className="outline-none text-2xl md:text-3xl text-gray-400 absolute top-0 end-0 w-12 md:w-14 h-full flex items-center justify-center transition duration-200 ease-in-out hover:text-heading focus:outline-none"
          onClick={onClear}
        >
          <IoCloseOutline className="w-6 h-6" />
        </button>
      </form>
    );
  }
);

export default SearchBox;
