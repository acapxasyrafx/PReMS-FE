import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import ProjectDetails from '../../features/projectlist/projectdetails'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Project Details"}))
      }, [])


    return(
        <ProjectDetails />
    )
}

export default InternalPage