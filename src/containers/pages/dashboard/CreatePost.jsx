import React, { useState, useEffect } from "react";
import Layout from "hocs/dashboard/Layout";
import { Helmet } from "react-helmet-async";
import { connect, useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { get_categories } from "redux/actions/categories/categories";

function CreatePost({ categoriesResponse, get_categories }) {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    category: "",
    time_read: "",
    thumbnail: null,
    content: "",
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [expandedCategories, setExpandedCategories] = useState([]);

  useEffect(() => {
    get_categories(); // Llamada a la acción get_categories
  }, [get_categories]);

  console.log("print categories sasa: " + JSON.stringify(categoriesResponse));

  const { title, slug, description, category, time_read, thumbnail, content } =
    formData;

  const onChange = (e) => {
    if (e.target.name === "thumbnail") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("time_read", time_read);
    formData.append("thumbnail", thumbnail, thumbnail.name);
    formData.append("content", content);

    const fetchData = async () => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/blog/create`,
          formData,
          config
        );

        if (res.status === 200) {
           alert("Exito al enviar");
        }
         
       
      }catch (err){
        alert("Error al enviar");
      }
    };
    fetchData();
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setSelectedSubCategory("");
  };

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
  };

  const toggleCategoryExpansion = (categoryId) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(
        expandedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };

  const getSubCategories = (categoryId) => {
    const category = categoriesResponse.categories.find(
      (cat) => cat.id === categoryId
    );

    if (category) {
      return category.sub_categories || [];
    }

    return [];
  };

  console.log("selectedCategory:", selectedCategory);

  console.log("form data: ", formData);

  return (
    <Layout>
      <form
        onSubmit={onSubmit}
        className="bg-gray-300 border-gradient-blue-purple border-4 rounded-lg"
      >
        <div className="mt-5 border-t border-gray-200">
          <dl className="divide-y divide-gray-100">
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-4">
              <dt className="text-lg font-medium text-gray-500">Title</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => onChange(e)}
                    className="border border-gray-400 rounded-lg w-full"
                    required
                  />
                </span>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-4">
              <dt className="text-lg font-medium text-gray-500">Slug</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={slug}
                    onChange={(e) => onChange(e)}
                    className="border border-gray-400 rounded-lg w-full"
                    required
                  />
                </span>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-4">
              <dt className="text-lg font-medium text-gray-500">Description</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => onChange(e)}
                    required
                    className="border border-gray-400 rounded-lg w-full"
                  ></textarea>
                </span>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-4">
              <dt className="text-lg font-medium text-gray-500">Category</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul>
                  {categoriesResponse.categories &&
                    categoriesResponse.categories.map((category) => (
                      <li key={category.id}>
                        <label>
                          <input
                            type="radio"
                            name="category"
                            value={category.id}
                            checked={selectedCategory === category.id}
                            onChange={(e) => {
                              onChange(e);
                              handleCategoryChange();
                            }}
                          />
                          {category.name}{" "}
                        </label>
                        <a
                          className="text-blue-600"
                          href="#"
                          onClick={() => toggleCategoryExpansion(category.id)}
                        >
                          {expandedCategories.includes(category.id)
                            ? "Hide"
                            : "Show"}{" "}
                          sub categories
                        </a>
                        {expandedCategories.includes(category.id) && (
                          <ul>
                            {getSubCategories(category.id).map(
                              (subCategory) => (
                                <li
                                  key={subCategory.id}
                                  style={{ marginLeft: "1rem" }}
                                >
                                  <label>
                                    <input
                                      type="radio"
                                      name="subCategory"
                                      value={subCategory.id}
                                      checked={
                                        selectedSubCategory === subCategory.id
                                      }
                                      onChange={(e) => {
                                        onChange(e);
                                        handleCategoryChange();
                                      }}
                                    />
                                    {subCategory.name}
                                  </label>
                                </li>
                              )
                            )}
                          </ul>
                        )}
                      </li>
                    ))}
                </ul>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-4">
              <dt className="text-lg font-medium text-gray-500">
                Time to Read
              </dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">
                  <input
                    type="text"
                    id="time_read"
                    name="time_read"
                    value={time_read}
                    onChange={(e) => onChange(e)}
                    className="border border-gray-400 rounded-lg w-full"
                    required
                  />
                </span>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-4">
              <dt className="text-lg font-medium text-gray-500">Thumbnail</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">
                  <input
                    type="file"
                    id="thumbnail"
                    name="thumbnail"
                    onChange={(e) => onChange(e)}
                    accept="image/*"
                    className="border border-gray-400 rounded-lg w-full"
                    required
                  />
                </span>
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-4">
              <dt className="text-lg font-medium text-gray-500">Content</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">
                  <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    onChange={(e) => onChange(e)}
                    className="border border-gray-400 rounded-lg w-full"
                    required
                  />
                </span>
              </dd>
            </div>
          </dl>
          <span className="ml-4 flex-shrink-0">
            <button
              type="submit"
              className="rounded-md mr-2 bg-white font-medium text-indigo-600 hover:text-indigo-500"
              onClick={onSubmit}
            >
              Create Post
            </button>
          </span>
        </div>
      </form>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  categoriesResponse: state.categories,
});

export default connect(mapStateToProps, {
  get_categories,
})(CreatePost);
