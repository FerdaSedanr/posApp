import "./style.css";
import { useEffect, useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./Add";
import Edit from "./Edit";
import Products from "../products/Products";
export const Categories = ({
  categories,
  setCategories,
  setFiltered,
  products,
}) => {
  //modal için oluşturulmuş stateler
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("Tümü");

  useEffect(() => {
    if (categoryTitle === "Tümü") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((item) => item.category === categoryTitle));
    }
  }, [products, setFiltered, categoryTitle]);

  const sortedCategories = [...categories].sort((a, b) => {
    if (a.title === "Tümü") return -1;
    if (b.title === "Tümü") return 1;
    return a.title.localeCompare(b.title);
  });

  return (
    // genel kapsayıcı içinde gap-4 ile cart aralarını açtık
    //flex-col ile alt alta hizaladık
    <ul className="flex gap-4 md:flex-col text-xl">
      {sortedCategories.map((item) => (
        <li
          className={`category-item ${
            item.title === categoryTitle && "!bg-pink-400 "
          }`}
          key={item._id}
          onClick={() => setCategoryTitle(item.title)}
        >
          {" "}
          <span>{item.title}</span>
        </li>
      ))}

      <li
        className="category-item !bg-orange-500 hover:opacity-80"
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined className="md:text-2xl" />
      </li>
      <li
        className="category-item !bg-orange-500 hover:opacity-80"
        onClick={() => setIsEditModalOpen(true)}
      >
        <EditOutlined className="md:text-2xl" />
      </li>
      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        setCategories={setCategories}
        categories={categories}
      />
      <Edit
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
    </ul>
  );
};
