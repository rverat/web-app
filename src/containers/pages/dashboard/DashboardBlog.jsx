import axios from "axios";
import BlogList from "components/dashboard/blog/BlogList";
import Layout from "hocs/dashboard/Layout";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import {
  get_author_blog_list,
  get_author_blog_list_page,
} from "redux/actions/blog/blog";
import { get_categories } from "redux/actions/categories/categories";

function DashboardBlog({
  get_author_blog_list,
  get_author_blog_list_page,
  posts,
  count,
  next,
  previous,
  get_categories,
  categories,
}) {
  console.log("print d blog: " + count);

  useEffect(() => {
    //window.scrollTo(0,0)
    get_author_blog_list();
    get_categories();
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Road | About us</title>
        <meta
          name="description"
          content="Sitio web de desarrollo de sofware."
        />
        <meta
          name="keywords"
          content="programación, linux, seguridad informática"
        />
        <meta name="robots" content="all" />
        <link rel="canonical" href="https://www.therroad.com/" />
        <meta name="author" content="Road" />
        <meta name="publisher" content="Road" />

        {/* Social Media Tags */}
        <meta property="og:title" content="Road | Software Development" />
        <meta
          property="og:description"
          content="Sitio web de desarrollo de sofware."
        />
        <meta property="og:url" content="https://www.therroad.com/" />
        <meta
          property="og:image"
          content="https://bafybeicwrhxloesdlojn3bxyjqnxgsagtd4sl53a7t4cn4vfe2abmybzua.ipfs.w3s.link/lightbnuilbg.jpg"
        />

        <meta name="twitter:title" content="Road | Software Development" />
        <meta
          name="twitter:description"
          content="Sitio web de desarrollo de sofware."
        />
        <meta
          name="twitter:image"
          content="https://bafybeicwrhxloesdlojn3bxyjqnxgsagtd4sl53a7t4cn4vfe2abmybzua.ipfs.w3s.link/lightbnuilbg.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="border-b border-gray-200 bg-gray-500 px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-4">
            <h3 className="text-3xl font-medium leading-6 text-white">
              Blog Managements
            </h3>
            <p className="mt-3 text-lg text-white">
              Create or edit a blog post
            </p>
          </div>
          <div className="ml-4 mt-4 flex-shrink-0">
            <Link
              to="/create-post"
              className="inline-flex ml-12 items-center rounded-md border border-transparent bg-gray-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-900 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              New Post
            </Link>
          </div>
        </div>
      </div>

      <BlogList
        posts={posts && posts}
        get_blog_list_page={get_author_blog_list_page}
        count={count && count}
      />
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  posts: state.blog.author_blog_list,
  categories: state.categories.categories,
  count: state.blog.count,
  next: state.blog.next,
  previous: state.blog.previous,
});

export default connect(mapStateToProps, {
  get_author_blog_list,
  get_author_blog_list_page,
  get_categories,
})(DashboardBlog);
