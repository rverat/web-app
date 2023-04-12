import { connect } from "react-redux"
import {motion} from 'framer-motion'


function Layout({children}){
    return(
        <motion.div
        initial={{opacity: 0, transition: {duration: 0.5}}}
        animate={{opacity: 1}}
        exit={{opacity: 0, transition: {duration: 0.5}}}
        >
            <div>
                {children}
            </div>
            
        </motion.div>
    )
}

const mapStateToProps = state =>({

})

export default connect(mapStateToProps,{

}) (Layout)