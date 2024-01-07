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
    <div className="py-5">
      <div className="flex gap-3 flex-col sm:flex-row">
        <div className="flex-1">
          <img src={`${data?.image}`} className="w-full object-cover" alt="" />
        </div>

        <div className="flex-[2] space-y-3">
          <h1 className="sm:text-3xl  text-2xl font-bold">{data?.title}</h1>
          <Link
            to={`/category/${data?.kategori.slug}`}
            className="font-semibold p-1 text-sm rounded-sm border-2 text-blue-500 border-blue-500 inline-block"
          >
            {data?.kategori.name}
          </Link>
          <div>
            <strong>Penulis :</strong> <br />
            <p>{data?.author}</p>
          </div>
          <div>
            <strong>Penerbit :</strong> <br />
            <p>{data?.publisher}</p>
          </div>
          <div>
            <strong>Tahun terbit :</strong> <br />
            <p>{data?.year}</p>
          </div>
          <div>
            <strong>NO ISBN :</strong> <br />
            <p>{data?.isbn == 0 ? "-" : data?.isbn}</p>
          </div>
          <div>
            <strong>Deskripsi :</strong> <br />
            <p>{data?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBuku;
