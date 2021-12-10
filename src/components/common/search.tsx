import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import {
	disableBodyScroll,
	enableBodyScroll,
	clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import SearchBox from '@components/common/search-box';
import Scrollbar from '@components/common/scrollbar';
import { closeSearch } from '@slices/ui.slice';

export default function Search() {
  const dispatch = useDispatch();
  const { displaySearch } = useSelector((state) => state.ui);
  const [ searchText, setSearchText ] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      if (displaySearch) {
        disableBodyScroll(ref.current);
      } else {
        enableBodyScroll(ref.current);
      }
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [displaySearch]);
  
  function handleSearch(e: React.SyntheticEvent) {
    e.preventDefault();
  }

  function handleAutoSearch(e: React.FormEvent<HTMLInputElement>) {
    setSearchText(e.currentTarget.value);
  }

  function clear() {
    setSearchText('');
  }

  return (
    <div ref={ref}>
      <div
        className={cn('overlay', {
          open: displaySearch
        })}
        role="button"
        onClick={() => dispatch(closeSearch())}
      />
      <div
        className={cn(
          'drawer-search relative hidden top-0 z-30 opacity-0 invisible transition duration-300 ease-in-out left-1/2 px-4 w-full md:w-[730px] lg:w-[930px]',
          {
            open: displaySearch
          }
        )}
      >
        <div className="flex flex-col justify-center w-full">
          <div className="flex-shrink-0 mt-3.5 lg:mt-4 w-full">
            <div className="flex flex-col mx-auto mb-1.5 w-full">
              <SearchBox 
                onSubmit={handleSearch}
                onChange={handleAutoSearch}
                name="search"
                value={searchText}
                onClear={clear}
                ref={(input) => input?.focus()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}