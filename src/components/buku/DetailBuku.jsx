import React from "react";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../../utils/swr/fetcher";

const DetailBuku = () => {
  const slug = useParams().slug;

  const { data, isLoading, error } = useSWR(
    `https://dashboard.perpus.upg.ac.id/api/buku/${slug}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>server error!</h1>;
  return (
    <div className="py-5 space-y-3">
      <div className="py-5 flex gap-3 flex-col sm:flex-row">
        <div className="flex-1">
          <img
            src={`${data?.data?.image}`}
            className="w-full object-cover"
            alt=""
          />
        </div>

        <div className="flex-[2] space-y-3">
          <h1 className="sm:text-3xl  text-2xl font-bold">
            {data?.data?.title}
          </h1>
          <Link
            to={`/category/${data?.data?.kategori.slug}`}
            className="font-semibold p-1 text-sm rounded-sm border-2 text-blue-500 border-blue-500 inline-block"
          >
            {data?.data?.kategori.name}
          </Link>
          <div>
            <strong>Penulis :</strong> <br />
            <p>{data?.data?.author}</p>
          </div>
          <div>
            <strong>Penerbit :</strong> <br />
            <p>{data?.data?.publisher}</p>
          </div>
          <div>
            <strong>Tahun terbit :</strong> <br />
            <p>{data?.data?.year}</p>
          </div>
          <div>
            <strong>NO ISBN :</strong> <br />
            <p>{data?.data?.isbn == 0 ? "-" : data?.data?.isbn}</p>
          </div>
          <div>
            <strong>Deskripsi :</strong> <br />
            <p>{data?.data?.description}</p>
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold">Buku lainnya</h1>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {data?.bukuLainnya?.map((item) => (
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
                <p className="mt-1 text-sm text-gray-500">
                  {data?.data?.kategori?.name}
                </p>
              </div>
              <p className="text-sm font-medium text-gray-900">{item.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailBuku;
