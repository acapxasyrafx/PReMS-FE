import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import ProjectList from '../../features/projectlist'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Project List"}))
      }, [])


    return(
        <ProjectList />
    )
}

export default InternalPage