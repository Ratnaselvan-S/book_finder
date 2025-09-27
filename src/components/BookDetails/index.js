import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { bookKey } = useParams();
  const [data, setData] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [covers, setCovers] = useState(null);

  useEffect(() => {
    const FetchData = async () => {
      try {
        // Fetch book details
        const res = await fetch(
          `https://openlibrary.org/works/${bookKey}.json`
        );
        const json = await res.json();
        console.log(json);
        setData(json);

        // Fetch authors
        if (json.authors && json.authors.length > 0) {
          const authorPromises = json.authors.map(async (a) => {
            const authorId = a.author.key.split("/").pop();
            const res = await fetch(
              `https://openlibrary.org/authors/${authorId}.json`
            );
            const authorData = await res.json();
            return authorData.name;
          });

          const authorNames = await Promise.all(authorPromises);
          setAuthors(authorNames);
        }
        if (json.covers && json.covers.length > 0) {
          // Preload all cover images
          const promises = json.covers.map(
            (id) =>
              new Promise((resolve) => {
                const img = new Image();
                img.src = `https://covers.openlibrary.org/b/id/${id}-L.jpg`;
                img.onload = () => resolve(img.src);
                img.onerror = () => resolve(null);
              })
          );

          const results = await Promise.all(promises);
          setCovers(results.filter(Boolean));
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    FetchData();
  }, [bookKey]);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading book details...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-2 text-center">{data.title}</h1>

      {/* Authors */}
      {authors.length > 0 && (
        <p className="text-lg text-gray-700 text-center mb-6">
          by{" "}
          {authors.map((author, idx) => (
            <span key={idx} className="font-medium">
              {author}
              {idx < authors.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      )}

      {/* Covers */}
      {!covers ? (
        <p className="text-center text-gray-500 animate-pulse mb-6">
          Loading covers...
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
          {covers.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={data.title}
              className="rounded-xl shadow-lg hover:scale-105 transition-transform"
            />
          ))}
        </div>
      )}
      {/* Subjects */}
      {data.subjects && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Subjects</h2>
          <div className="flex flex-wrap gap-2">
            {data.subjects.map((subject, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm shadow"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>
      )}
      {data.description && (
        <div className="mt-6 p-4 border rounded-lg shadow-sm bg-white">
          {/* Description */}
          {data.description && (
            <div>
              <h3 className="font-bold">Description:</h3>
              <p className="text-gray-700 mb-4">
                {typeof data.description === "string"
                  ? data.description
                  : data.description.value}
              </p>
            </div>
          )}

          {/* eBook / Read Link */}
        </div>
      )}
      <div>
        {data.ebooks &&
          data.ebooks.length > 0 &&
          data.ebooks[0].preview_url && (
            <a
              href={data.ebooks[0].preview_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              📖 Read this eBook
            </a>
          )}
      </div>
      <div className="mt-6 text-gray-600 text-sm space-y-1">
        <p>
          <span className="font-medium">Work Key:</span> {data.key}
        </p>
        <p>
          <span className="font-medium">Revision:</span> {data.revision}
        </p>
        <p>
          <span className="font-medium">Created:</span>{" "}
          {new Date(data.created?.value).toLocaleDateString()}
        </p>
        <p>
          <span className="font-medium">Last Modified:</span>{" "}
          {new Date(data.last_modified?.value).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default BookDetails;

// {
//     "title": "The art of money getting, or, Golden rules for money getting",
//     "subjects": [
//         "Success",
//         "Finance",
//         "Nonfiction",
//         "Self-Improvement",
//         "Success in business",
//         "Finance, personal",
//         "Income",
//         "Commerce",
//         "Business",
//         "Self-help techniques"
//     ],
//     "key": "/works/OL891636W",
//     "authors": [
//         {
//             "type": {
//                 "key": "/type/author_role"
//             },
//             "author": {
//                 "key": "/authors/OL78901A"
//             }
//         }
//     ],
//     "type": {
//         "key": "/type/work"
//     },
//     "covers": [
//         756095,
//         9106530,
//         9178457,
//         9216725,
//         13333475,
//         11996932,
//         12528100,
//         13892650
//     ],
//     "latest_revision": 4,
//     "revision": 4,
//     "created": {
//         "type": "/type/datetime",
//         "value": "2009-12-09T06:47:49.076810"
//     },
//     "last_modified": {
//         "type": "/type/datetime",
//         "value": "2024-08-17T21:16:35.458226"
//     }
// }
