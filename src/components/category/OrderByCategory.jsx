import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../../utils/swr/fetcher.js";
import SkeletonBook from "../../components/home/SkeletonBook.jsx";
const OrderByCategory = () => {
  const category = useParams().category;
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://dashboard.perpus.upg.ac.id/api/kategori/${category}`
      );
      const data = await response.json();
      setBooks(data?.buku);
      setIsLoading(false);
    };
    fetchData();
  }, [category]);

  if (isLoading) return <SkeletonBook />;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Category : {category}
        </h2>

        {books?.length > 0 ? (
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
                      <a href={`/buku/${item.slug}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {item.title}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{category}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1 className="text-xl font-bold tracking-tight text-gray-900 my-10 text-center">
            No Books Found
          </h1>
        )}

        {/* {data?.next_page_url !== null && (
          <div className="my-5 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="p-3 rounded-sm bg-blue-500 hover:bg-blue-600 text-white"
            >
              Load More
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default OrderByCategory;
