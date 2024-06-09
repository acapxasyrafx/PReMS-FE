import DashboardStats from './components/DashboardStats'
import AmountStats from './components/AmountStats'
import PageStats from './components/PageStats'

import UserGroupIcon  from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon  from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon  from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon  from '@heroicons/react/24/outline/CreditCardIcon'
import UserChannels from './components/UserChannels'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import DashboardTopBar from './components/DashboardTopBar'
import { useDispatch } from 'react-redux'
import {showNotification} from '../common/headerSlice'
import DoughnutChart from './components/DoughnutChart'
import React, { useState, setState, useEffect } from 'react'


function Dashboard(){
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);

    const dispatch = useDispatch()

    const statsData = [
        {title : "New Users", value : data, icon : <UserGroupIcon className='w-8 h-8'/>, description : ""},
        {title : "Total Sales", value : "RM "+data, icon : <CreditCardIcon className='w-8 h-8'/>, description : "Current month"},
        {title : "Pending Project", value : data, icon : <CircleStackIcon className='w-8 h-8'/>, description : data + " in Progress"},
        {title : "Total Project", value : data2, icon : <CircleStackIcon className='w-8 h-8'/>, description : ""},
    ]
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = localStorage.getItem('token')

            fetch('https://presm-be.vercel.app/api/api/data-report')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.log(error));
            fetch('https://presm-be.vercel.app/api/api/data-report2')
            .then(response => response.json())
            .then(data => setData2(data))
            .catch(error => console.log(error));
          } catch (error) {
            console.log('An error occurred while fetching data:', error);
          }
        };
    
        fetchData();
    
        // Optionally, you can set a polling interval to fetch data continuously
        const interval = setInterval(() => {
          fetchData();
        }, 5000); // Fetch data every 5 seconds
    
        // Clean up the interval when the component is unmounted
        return () => clearInterval(interval);
      }, []);
 

    const updateDashboardPeriod = (newRange) => {
        // Dashboard range changed, write code to refresh your values
        dispatch(showNotification({message : `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status : 1}))
    }

    return(
        <>
        {/** ---------------------- Select Period Content ------------------------- */}
            <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod}/>
        
        {/** ---------------------- Different stats content 1 ------------------------- */}
            <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
                {
                    statsData.map((d, k) => {
                        return (
                            <DashboardStats key={k} {...d} colorIndex={k}/>
                        )
                    })
                }
            </div>



        {/* * ---------------------- Different charts -------------------------
            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <LineChart />
                <BarChart />
            </div> */}
            
        {/* * ---------------------- Different stats content 2 -------------------------
        
            <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
                <AmountStats />
                <PageStats />
            </div> */}

        {/* * ---------------------- User source channels table  -------------------------
        
            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <UserChannels />
                <DoughnutChart />
            </div> */}
        </>
    )
}

export default Dashboard