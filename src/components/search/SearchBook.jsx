import React, { useEffect, useState } from "react";
import fetcher from "../../utils/swr/fetcher";
import SkeletonBook from "../home/SkeletonBook";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";

const SearchBook = () => {
  const keyword = useParams().keyword;
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);

  const { data, isLoading, error, mutate } = useSWR(
    `https://dashboard.perpus.upg.ac.id/api/search?keyword=${keyword}&page=${page}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
    mutate();
  };

  useEffect(() => {
    if (data) {
      setBooks([...books, ...data?.data]);
    }
  }, [data]);

  if (error) return <h1>server error!</h1>;

  if (isLoading) return <SkeletonBook />;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Search : {keyword}
        </h2>

        {books.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {books?.map((item) => (
              <div key={item.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`/buku/${item.slug}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {item.title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {item?.kategori?.name}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="my-3 text-center space-y-3">
            <h1 className="font-bold text-xl text-center">No Data</h1>
            <p className="text-center">Try another keyword</p>
            <Link
              to={"/"}
              className="p-2 rounded-sm bg-blue-500 text-white inline-block"
            >
              Back
            </Link>
          </div>
        )}
        {data?.next_page_url !== null && (
          <div className="my-5 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="p-3 rounded-sm bg-blue-500 hover:bg-blue-600 text-white"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBook;
