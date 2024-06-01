import moment from "moment"
import { useState, setState, useEffect, table } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../common/modalSlice"
import { deleteLead, getLeadsContent } from "./leadSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import { showNotification } from '../common/headerSlice'
import { DocumentPlusIcon } from "@heroicons/react/16/solid"
import React from 'react';
import { useNavigate } from "react-router-dom";


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
    const [data, setData] = useState([]);
    let navigate = useNavigate(); 

    useEffect(() => {
        const fetchData = async () => {
            try {
              const token = localStorage.getItem('token')
  
              fetch('https://presm-be.vercel.app/api/api/getProject')
              .then(response => response.json())
              .then(data => setData(data))
              .catch(error => console.log(error));
            } catch (error) {
              console.log('An error occurred while fetching data:', error);
            }
          };
            // Optionally, you can set a polling interval to fetch data continuously
            const interval = setInterval(() => {
                fetchData();
            }, 5000); // Fetch data every 5 seconds
        
            // Clean up the interval when the component is unmounted
            return () => clearInterval(interval);
      }, []);

    

    const getDummyStatus = (index) => {
        if(index % 5 === 0)return <div className="badge">Archived</div>
        else if(index % 5 === 1)return <div className="badge badge-primary">In Progress</div>
        else if(index % 5 === 2)return <div className="badge badge-secondary">Deployed</div>
        else if(index % 5 === 3)return <div className="badge badge-accent">Need Followup</div>
        else if(index % 5 === 4)return <div className="badge badge-accent">Finished</div>
        else return <div className="badge badge-ghost">Open</div>
    }

    const deleteCurrentLead = (index) => {
        dispatch(openModal({title : "Confirmation", bodyType : MODAL_BODY_TYPES.CONFIRMATION, 
        extraObject : { message : `Are you sure you want to delete this project?`, type : CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE, index}}))
    }

    const openCurrentLead = (index) => {
          let path = `/project-details`; 
          navigate(path);
      
    }

    return(
        <>
            
            <TitleCard title="" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>

            <div class="overflow-x-auto">
                <table class="table">
                    <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Project Manager</th>
                        <th>Project Status</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((l, k) => {
                                return(
                                    <tr key={k}>

                                    <td>{l.projectName}</td>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={l.avatar} alt="Avatar" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{l.projectManager}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{getDummyStatus(k)}</td>
                                    <td><button className="btn btn-square btn-ghost" onClick={() => deleteCurrentLead(k)}><TrashIcon className="w-5"/></button>
                                    <button className="btn btn-square btn-ghost" onClick={() => openCurrentLead(k)}><DocumentPlusIcon className="w-5"/></button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <tfoot>
                    <tr>
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