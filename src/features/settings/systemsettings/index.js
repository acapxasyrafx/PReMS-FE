import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector, Loading} from "react-redux"
import TitleCard from "../../../components/Cards/TitleCard"
import { showNotification } from '../../common/headerSlice'
import InputText from '../../../components/Input/InputText'
import axios from "axios"


function SystemSettings(){

    const SYSTEM_SETTING_OBJ = {
        setting_key : "",
        setting_value : "",
        setting_group : "",
    }
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [sysSettingObj, setSysSettingObj] = useState(SYSTEM_SETTING_OBJ)

    // Call API to update profile settings changes
    const updateSystemSetting = async (e) => {
        // e.preventDefault()
        setErrorMessage("") 

        if(sysSettingObj.setting_key === "")return setErrorMessage("Setting Key is required! (use any string value)")
        if(sysSettingObj.setting_value === "")return setErrorMessage("Setting Value is required! (use any string or integer value)")
        if(sysSettingObj.setting_group === "")return setErrorMessage("Setting Value is required! (use any string or integer value)")
        else{
            setLoading(true)
            try{
                const resp = await axios.post('/system-settings',sysSettingObj)
                if (resp.status === 200) {
                dispatch(showNotification({message : "System Settings Updated", status : 1}))
                sysSettingObj.setting_key = ""
                sysSettingObj.setting_value = ""
                sysSettingObj.setting_group = ""
                setLoading(false)
                }
            }catch (error) {
                if (error.response.status === 401) {
                    setLoading(false)
                    setErrorMessage("Not authorized to make changes.");
                } else if (error.response.status === 400 ) {
                    setLoading(false)
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage(error.response.message);
                    setLoading(false)
                }
            }
        
        }
    }

    const updateFormValue = ({updateType, value}) => {
        console.log(updateType)
        setSysSettingObj({...sysSettingObj, [updateType] : value})
    }

    return(
        <>
             <TitleCard title="System Settings" topMargin="mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputText labelTitle="Setting Key" defaultValue={sysSettingObj.settingKey} updateType="setting_key" updateFormValue={updateFormValue}/>
                        <InputText labelTitle="Setting Value" defaultValue={sysSettingObj.settingValue} updateType="setting_value" updateFormValue={updateFormValue}/>
                        <InputText labelTitle="Setting Group" defaultValue={sysSettingObj.settingGroup} updateType="setting_group" updateFormValue={updateFormValue}/>
                        <div className="mt-16"><button className="btn btn-primary float-right" onClick={() => updateSystemSetting()}>Update</button></div>
                    </div>
                    
                    <div className="divider" ></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    </div>
            </TitleCard>
        </>
    )
}


export default SystemSettings