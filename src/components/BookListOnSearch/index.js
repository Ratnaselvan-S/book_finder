import React from "react";
import { Link } from "react-router-dom";
const BookListOnSearch = ({ bookList }) => {
  if (!bookList || bookList.length === 0) return null;
  return (
    <div className="shadow-lg p-10 ">
      {bookList?.length > 0 &&
        bookList.map(({ cover_i, title, author_name, ...rest }) => {
          return (
            <Link to={"/book" + rest.key} key={rest.key}>
              <div className="flex gap-5 border-b-2 p-10">
                <div>
                  {cover_i && (
                    <img
                      src={`https://covers.openlibrary.org/b/id/${cover_i}-S.jpg `}
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold">{title}</h3>
                  <span>
                    by{" "}
                    <span className="text-blue-600">
                      {author_name && author_name.length > 0
                        ? author_name.join(", ")
                        : "Unknown"}
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default BookListOnSearch;
