import Layout from "@/components/admin/layout/Layout";
import db from "@/utils/db";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Category from "@/models/Category";
import { useState, useEffect } from "react";

import DataTable from "react-data-table-component";
import getCategories from "@/utils/getCategories";
import NormalToast from "@/utils/Toast/NormalToast";
import Loading from "@/components/loading";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import UpdateCategory from "@/components/admin/categories/UpdateCategories";

type CategoryDataType = {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

const Categories = ({ categories }: any) => {
  const [data, setData] = useState(categories);
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const { query } = useRouter();
  const catId = query.id;

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(categories);
  const isLoading = useSelector((state: RootState) => state.Admin.catLoading);



  const handleDeleteCategory = async (userId: string) => {
    setDisabled(true);
    await axios
      .delete(`/api/admin/users/${userId}`)
      .then(() => {
        NormalToast("User deleted");
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
      <UpdateCategory setCategories={setData} />
      <div className="mt-4">
        <>
          {/* {data?.map((cat: string, i: number) => (
            <div key={i}>{cat.name} </div>
          ))} */}

        
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
