import Layout from "hocs/dashboard/Layout"
import { connect } from "react-redux"

function Dashboard(){
    return(
        <Layout>
            Dashboard
        </Layout>
    )
}

const mapStateToProps=state=>({

})

export default connect(mapStateToProps,{

}) (Dashboard)