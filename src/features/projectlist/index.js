import moment from "moment"
import { useEffect, table } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../common/modalSlice"
import { deleteLead, getLeadsContent } from "./leadSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import { showNotification } from '../common/headerSlice'

const TopSideButtons = () => {

    const dispatch = useDispatch()

    const openAddNewLeadModal = () => {
        dispatch(openModal({title : "Add New Project", bodyType : MODAL_BODY_TYPES.LEAD_ADD_NEW}))
    }

    return(
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Add New Project</button>
        </div>
    )
}

function Leads(){

    const {leads } = useSelector(state => state.lead)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLeadsContent())
    }, [])

    

    const getDummyStatus = (index) => {
        if(index % 5 === 0)return <div className="badge">Not Interested</div>
        else if(index % 5 === 1)return <div className="badge badge-primary">In Progress</div>
        else if(index % 5 === 2)return <div className="badge badge-secondary">Sold</div>
        else if(index % 5 === 3)return <div className="badge badge-accent">Need Followup</div>
        else return <div className="badge badge-ghost">Open</div>
    }

    const deleteCurrentLead = (index) => {
        dispatch(openModal({title : "Confirmation", bodyType : MODAL_BODY_TYPES.CONFIRMATION, 
        extraObject : { message : `Are you sure you want to delete this lead?`, type : CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE, index}}))
    }

    return(
        <>
            
            <TitleCard title="" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>

            <div class="overflow-x-auto">
                <table class="table">
                    <thead>
                    <tr>
                        <th>
                        <label>
                            <input type="checkbox" class="checkbox" />
                        </label>
                        </th>
                        <th>Project Name</th>
                        <th>Project Manager</th>
                        <th>Project Status</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th>
                        <label>
                            <input type="checkbox" class="checkbox" />
                        </label>
                        </th>
                        <td>
                        PReMS
                        <br/>
                        </td>
                        <td>
                        <div class="flex items-center gap-3">
                            <div class="avatar">
                            <div class="mask mask-squircle w-12 h-12">
                                <img src="https://daisyui.com/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                            </div>
                            </div>
                            <div>
                            <div class="font-bold">Hart Hagerty</div>
                            <div class="text-sm opacity-50">United States</div>
                            </div>
                        </div>
                        </td>
                        <td>Purple</td>
                        <th>
                        <button class="btn btn-ghost btn-xs">details</button>
                        </th>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <th></th>
                        <th>Project Name</th>
                        <th>Project Manager</th>
                        <th>Project Status</th>
                        <th></th>
                    </tr>
                    </tfoot>
                    
                </table>
            </div>
            </TitleCard>
        </>
    )
}


export default Leads