import React, { useEffect, useState } from "react";
import BookListOnSearch from "../../components/BookListOnSearch";

const Home = () => {
  const [books, setBooks] = useState(null);
  const [searchParams, setsearchParams] = useState("q");
  const [inputValue, setInputValue] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!inputValue) {
      setBooks([]);
      return;
    }
    setLoading(true);
    const controller = new AbortController();
    const timeOut = setTimeout(async () => {
      try {
        const FetchData = await fetch(
          `https://openlibrary.org/search.json?${searchParams}=${inputValue}`,
          { signal: controller.signal }
        );

        const data = await FetchData.json();
        setBooks(data);
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => {
      clearTimeout(timeOut);
    };
  }, [inputValue, searchParams]);
  const handleChangeOnOptions = (e) => {
    setsearchParams(e.target.value);
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  return (
    <>
      <div className="flex justify-center w-[100%] mt-20 mb-2">
        <form
          className="relative w-[30%]"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <span className="absolute right-2 top-1/2  transform -translate-y-1/2 text-gray-400">
            🔍
          </span>
          <input
            type="search"
            placeholder=""
            className="border  border-black rounded px-3 py-2 w-full"
            onChange={handleInputChange}
          />
        </form>
        <label
          htmlFor="searchType"
          className="mx-5 align-middle flex items-center"
        >
          Search by:
        </label>
        <select
          id="searchType"
          value={searchParams}
          onChange={handleChangeOnOptions}
        >
          <option value="q">General Query (q)</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="isbn">ISBN</option>
          <option value="subject">Subject</option>
        </select>
      </div>
      {loading ? (
        <div className="flex flex-col  w-[60%] items-center m-auto">
          Loading....
        </div>
      ) : (
        <div className="flex flex-col  w-[60%] items-center m-auto">
          {books?.numFound === 0 ? (
            <p>Not found</p>
          ) : (
            <BookListOnSearch bookList={books?.docs} />
          )}
        </div>
      )}
    </>
  );
};

export default Home;
