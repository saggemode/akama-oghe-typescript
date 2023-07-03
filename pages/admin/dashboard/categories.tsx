import Layout from "@/components/admin/layout/Layout";
import db from "@/utils/db";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Category from "@/models/Category";
import { useState, useEffect } from "react";
import CreateCategory from "@/components/admin/categories/CreateCategory";
import DataTable from "react-data-table-component";
import getCategories from "@/utils/getCategories";
import NormalToast from "@/utils/Toast/NormalToast";
import Loading from "@/components/loading";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type CategoryDataType = {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

const Categories = ({ categories }: any) => {
  //const { categories, error, isLoading } = getCat(props?.users);
  const [data, setData] = useState(categories);
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(categories);
  const isLoading = useSelector((state: RootState) => state.Admin.catLoading);

  const columns = [
    {
      name: "Name",
      selector: (row: CategoryDataType) => row?.name,
      sortable: true,
    },
    {
      name: "Slug",
      cell: (row: CategoryDataType) => row?.slug,
      selector: (row: CategoryDataType) => row?.slug,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row: CategoryDataType) => (
        <div className="flex items-center justify-start px-2 h-20">
          <button
            onClick={() => router.push(`/admin/dashboard/category/${row?._id}`)}
            className=" w-20 py-2 mx-2 text-xs text-green-600 hover:text-white my-2 hover:bg-green-600 border border-green-600 rounded transition-all duration-700"
          >
            Update
          </button>
          {/* <Link
            className=" text-center w-20 py-2 mx-2 text-xs text-green-600 hover:text-white my-2 hover:bg-green-600 border border-green-600 rounded transition-all duration-700"
            href={`/admin/category/${row._id}`}
          >
            Edit
          </Link> */}
          <button
            onClick={() => handleDeleteCategory(row?._id)}
            className=" w-20 py-2 mx-2 text-xs text-red-600 hover:text-white my-2 hover:bg-red-600 border border-red-600 rounded transition-all duration-700"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleDeleteCategory = async (catId: string) => {
    setDisabled(true);
    await axios
      .delete(`/api/admin/category/${catId}`)
      .then(() => {
        NormalToast("Category deleted");
        setDisabled(false);
      })
      .catch((err) => {
        NormalToast(err);
        console.error(err);
        setDisabled(false);
      });
  };

  return (
    <Layout>
      <CreateCategory setCategories={setData} />
      <div className="mt-4">
        <>
          {/* {data?.map((cat: string, i: number) => (
            <div key={i}>{cat.name} </div>
          ))} */}

          <DataTable
            columns={columns}
            data={data}
            key={"ThisisCategoryData"}
            pagination
            keyField="id"
            title={`Categories list`}
            fixedHeader
            fixedHeaderScrollHeight="500px"
            selectableRows
            selectableRowsHighlight
            persistTableHead
            progressPending={isLoading}
            progressComponent={<Loading />}
            subHeader
            subHeaderComponent={
              <input
                className="w-60 dark:bg-transparent py-2 px-2  outline-none  border-b-2 border-orange-600"
                type={"search"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={"Category Name"}
              />
            }
            className="bg-white px-4 h-4/6 "
          />
        </>
      </div>
    </Layout>
  );
};

export default Categories;

export async function getServerSideProps(context: any) {
  db.connectDb();
  const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
