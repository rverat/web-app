import { CheckCircleIcon, ChevronRightIcon, EnvelopeIcon } from "@heroicons/react/20/solid"
import SmallSetPagination from "components/dashboard/pagination/SmallSetPagination"
import BlogCardHorizontal from "./BlogCardHorizontal"

function BlogList({posts,get_blog_list_page,count}){

  console.log("print data count: " + posts)

    return(
    <div className="overflow-hidden px-8 bg-gray-200">
      <ul role="list" className="divide-y space-y-8 gap-8  divide-gray-200">
        {posts&&posts.map((post,index) => (
          <BlogCardHorizontal data={post} key={index} index={index}/>
        ))}
      </ul>
      <SmallSetPagination list_page={get_blog_list_page} list={posts} count={count} />
    </div>
    )
}
export default BlogList