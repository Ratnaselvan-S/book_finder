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
// {
//     "author_key": [
//         "OL42805A"
//     ],
//     "author_name": [
//         "Françoise Sagan"
//     ],
//     "cover_edition_key": "OL3946758M",
//     "cover_i": 52680,
//     "ebook_access": "borrowable",
//     "edition_count": 96,
//     "first_publish_year": 1954,
//     "has_fulltext": true,
//     "ia": [
//         "bonjourtristesss0000fran",
//         "bonjourtristesse00sagarich",
//         "zdravstvugrust0000saga",
//         "bonjourtristesse00saga_1",
//         "bonjourtristesse0000saga_d2m3",
//         "bonjourtristesse00saga",
//         "bonjourtristesse00saga_0",
//         "bonjourtristesse0000fran_x9t9",
//         "bonjourtristesse0000fran_s8x7",
//         "snj.bonjourtristesse0000fran_s2m1"
//     ],
//     "ia_collection_s": "JaiGyan;ServantsOfKnowledge-Print;americana;inlibrary;internetarchivebooks;openlibrary-d-ol;printdisabled;riceuniversity-ol",
//     "key": "/works/OL584333W",
//     "language": [
//         "jpn",
//         "chi",
//         "spa",
//         "und",
//         "dut",
//         "rus",
//         "ita",
//         "wel",
//         "ger",
//         "gre",
//         "kor",
//         "fre",
//         "heb",
//         "eng"
//     ],
//     "lending_edition_s": "OL45817488M",
//     "lending_identifier_s": "bonjourtristesss0000fran",
//     "public_scan_b": false,
//     "title": "Bonjour tristesse"
// }
