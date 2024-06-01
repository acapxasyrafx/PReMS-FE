import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addNewLead } from "../leadSlice"
import axios from "axios"

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


    const saveNewLead = async (e) => {

        // e.preventDefault()
        setErrorMessage("")
        // if(leadObj.project_name.trim() === "")return setErrorMessage("Project Name is required!")
        // else if(leadObj.project_manager.trim() === "")return setErrorMessage("Project Manager is required!")
        // else if(leadObj.email.trim() === "")return setErrorMessage("Client Name is required!")
        // else{
            let newLeadObj = {
                "id": 7,
                "clientName": leadObj.client_name,
                "projectName": leadObj.project_name,
                "projectManager": leadObj.project_manager,
                "projectDetail": '-',
                "projectCode": leadObj.project_name,
            }
            // dispatch(addNewLead({newLeadObj}))
            setLoading(true)
            // await csrfToken();
            try {
                const resp = await axios.post('/addProject', newLeadObj);
                if (resp.status === 200) {
                    setLoading(false)
                    dispatch(showNotification({message : "New Project Added!", status : 1}))
                }
            } catch (error) {
                if (error.response.status === 401) {
                    setLoading(false)
                    setErrorMessage(error.response.data.message);
                } else if (error.response.status === 400 ) {
                    setLoading(false)
                    setErrorMessage(error.response.data.message);
                } else {
                    setLoading(false)
                    setErrorMessage(error.response.data.message);
                }
            }
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