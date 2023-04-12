import Footer from "components/navigation/Footer"
import Navbar from "components/navigation/Navbar"
import Layout from "hocs/Layout"
import { useEffect } from "react"
import { Helmet } from 'react-helmet-async';
import { get_categories } from "redux/actions/categories/categories";
import { connect } from "react-redux";
import { get_blog_list, get_blog_list_page } from "redux/actions/blog/blog";
import CategoriesHeader from "components/blog/CategoriesHeader";
import BlogList from "components/blog/BlogList";

function Blog({
    get_categories,
    categories,
    get_blog_list,
    get_blog_list_page,
    posts,
    count,
    next,
    previous,
}){
  console.log("print blog ok:" + posts)

    useEffect(()=>{
        window.scrollTo(0,0)
        get_categories()
        get_blog_list()
        
    },[])


    return(
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
            <Navbar/>
              <div className="pt-24">
                <CategoriesHeader categories={categories&&categories}/>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
                <div className="mx-auto max-w-6xl my-10">
                    {/* Content goes here */}
                    <BlogList posts={posts&&posts} get_blog_list_page={get_blog_list_page} count={count&&count}/>
                    </div>
                </div>
              </div>
            <Footer/>
        </Layout>
    )
}
const mapStateToProps=state=>({
    categories: state.categories.categories,
    posts: state.blog.blog_list,
    count: state.blog.count,
    next: state.blog.next,
    previous: state.blog.previous,

})

export default connect(mapStateToProps,{
    get_categories,
    get_blog_list,
    get_blog_list_page
}) (Blog)