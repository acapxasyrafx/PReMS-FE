import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector, Loading} from "react-redux"
import TitleCard from "../../../components/Cards/TitleCard"
import { showNotification } from '../../common/headerSlice'
import InputText from '../../../components/Input/InputText'
import TextAreaInput from '../../../components/Input/TextAreaInput'
import ToogleInput from '../../../components/Input/ToogleInput'

function SystemSettings(){

    const loadingStatus= true;
    const dispatch = useDispatch()

    // Call API to update profile settings changes
    const updateProfile = () => {
        dispatch(showNotification({message : "System Settings Updated", status : 1}))
        loadingStatus = false; 
    }

    const updateFormValue = ({updateType, value}) => {
        console.log(updateType)
    }

    return(
        <>
            <TitleCard title="Profile Settings" topMargin="mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputText labelTitle="Name" defaultValue="-" updateFormValue={updateFormValue}/>
                        <InputText labelTitle="Email Id" defaultValue="-" updateFormValue={updateFormValue}/>
                        <InputText labelTitle="Birth Date" defaultValue="-" updateFormValue={updateFormValue}/>
                        <InputText labelTitle="Company" defaultValue="-" updateFormValue={updateFormValue}/>
                        <InputText labelTitle="Title" defaultValue="-" updateFormValue={updateFormValue}/>
                        <InputText labelTitle="Place" defaultValue="-" updateFormValue={updateFormValue}/>
                        <TextAreaInput labelTitle="About" defaultValue="-" updateFormValue={updateFormValue}/>
                    </div>
                    <div className="divider" ></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputText labelTitle="Language" defaultValue="-" updateFormValue={updateFormValue}/>
                        <InputText labelTitle="Timezone" defaultValue="-" updateFormValue={updateFormValue}/>
                        <ToogleInput updateType="syncData" labelTitle="Sync Data" defaultValue={true} updateFormValue={updateFormValue}/>
                    </div>
                    <div className="divider" ></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputText labelTitle="User Role" defaultValue="-" updateFormValue={updateFormValue}/>
                        <InputText labelTitle="Project Involve" defaultValue="-" updateFormValue={updateFormValue}/>
                    </div>

                    <div className="mt-16"><button className="btn btn-primary float-right" onClick={() => updateProfile()}>Update</button></div>
            </TitleCard>
        </>
    )
}


export default SystemSettings