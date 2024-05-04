import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addNewLead } from "../leadSlice"

const INITIAL_LEAD_OBJ = {
    client_name : "",
    project_name : "",
    project_manager : ""
}

function AddLeadModalBody({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ)


    const saveNewLead = () => {
        // if(leadObj.project_name.trim() === "")return setErrorMessage("Project Name is required!")
        // else if(leadObj.project_manager.trim() === "")return setErrorMessage("Project Manager is required!")
        // else if(leadObj.email.trim() === "")return setErrorMessage("Client Name is required!")
        // else{
            let newLeadObj = {
                "id": 7,
                "client_name": leadObj.client_name,
                "project_name": leadObj.project_name,
                "project_manager": leadObj.project_manager,
                "avatar": "https://reqres.in/img/faces/1-image.jpg"
            }
            dispatch(addNewLead({newLeadObj}))
            dispatch(showNotification({message : "New Project Added!", status : 1}))
            closeModal()
        // }
    }

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setLeadObj({...leadObj, [updateType] : value})
    }

    return(
        <>

            <InputText type="text" defaultValue={leadObj.project_name} updateType="project_name" containerStyle="mt-4" labelTitle="Project Name" updateFormValue={updateFormValue}/>

            <InputText type="text" defaultValue={leadObj.project_manager} updateType="project_manager" containerStyle="mt-4" labelTitle="Project Manager Name" updateFormValue={updateFormValue}/>

            <InputText type="email" defaultValue={leadObj.client_name} updateType="client_name" containerStyle="mt-4" labelTitle="Client Name" updateFormValue={updateFormValue}/>


            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className="btn btn-primary px-6" onClick={() => saveNewLead()}>Save</button>
            </div>
        </>
    )
}

export default AddLeadModalBody