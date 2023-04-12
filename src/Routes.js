import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import Error404 from 'containers/errors/Error404';
import Home from 'containers/pages/Home';

import About from 'containers/pages/About';
import Blog from 'containers/pages/Blog';

import { AnimatePresence } from 'framer-motion'
import Category from 'containers/pages/Category';
import Search from 'containers/pages/Search';
import PostDetail from 'containers/pages/PostDetail';
import Login from 'containers/pages/dashboard/Login';
import BlogD from 'containers/pages/dashboard/BlogD';
import Dashboard from 'containers/pages/dashboard/Dashboard';
import EditPost from 'containers/pages/dashboard/EditPost';

function AnimatedRoutes(){

    const location = useLocation()

    return(
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                    {/* Error Display */}
                    <Route path="*" element={<Error404 />} />

                    {/* Home Display */}
                    <Route path="/" element={<Home />} />
                    <Route path="/nosotros" element={<About />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<PostDetail />} />
                    <Route path="/s" element={<Search />} />
                    <Route path="/category/:slug" element={<Category />} />

                    {/* Dashboard */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/blogD" element={<BlogD />} />
                    <Route path="/blogD/:slug" element={<EditPost />} />

                    

                    
                </Routes>
        </AnimatePresence>
    )
}
export default AnimatedRoutes
