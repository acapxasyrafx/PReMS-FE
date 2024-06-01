import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector, Loading} from "react-redux"
import TitleCard from "../../../components/Cards/TitleCard"
import { showNotification } from '../../common/headerSlice'
import InputText from '../../../components/Input/InputText'
import TextAreaInput from '../../../components/Input/TextAreaInput'
import ToogleInput from '../../../components/Input/ToogleInput'

function ProjectDetails(){

    const loadingStatus= true;
    const dispatch = useDispatch()

    // Call API to update profile settings changes
    const updateProfile = () => {
        dispatch(showNotification({message : "Profile Updated", status : 1}))
        loadingStatus = false; 
    }

    const updateFormValue = ({updateType, value}) => {
        console.log(updateType)
    }

    return(
        <>
            <TitleCard title="Profile Settings" topMargin="mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputText labelTitle="Project Start Date" defaultValue="-" updateFormValue={updateFormValue}/>
                        <InputText labelTitle="Project End Date" defaultValue="-" updateFormValue={updateFormValue}/>
                        <InputText labelTitle="Project Code" defaultValue="-" updateFormValue={updateFormValue}/>
                        <InputText labelTitle="Project Type" defaultValue="-" updateFormValue={updateFormValue}/>
                        <InputText labelTitle="Project Category" defaultValue="-" updateFormValue={updateFormValue}/>
                        <InputText labelTitle="Project Cost" defaultValue="-" updateFormValue={updateFormValue}/>
                        <TextAreaInput labelTitle="Project Description" defaultValue="-" updateFormValue={updateFormValue}/>
                        <labelTitle labelTitle="Project Status" defaultValue=""></labelTitle>
                    </div>
                    <div className="divider" ></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextAreaInput labelTitle="Project Team Members" defaultValue="-" updateFormValue={updateFormValue}/>
                    </div>
                    <div className="divider" ></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                <tr>
                                    <th>No.</th>
                                    <th> Document Name</th>
                                    <th> Date</th>
                                    <th></th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>

                    <div className="mt-16"><button className="btn btn-primary float-right" onClick={() => updateProfile()}>Update</button></div>
            </TitleCard>
        </>
    )
}


export default ProjectDetails