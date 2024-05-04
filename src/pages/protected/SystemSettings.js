import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import SystemSettings from '../../features/settings/systemsettings'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "System Settings"}))
      }, [])

    return(
        <SystemSettings />
    )
}

export default InternalPage