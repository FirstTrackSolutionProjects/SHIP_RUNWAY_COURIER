import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { Users, Warehouse, Package, CheckCircle2, Clock, IndianRupee, Wallet, Truck, RotateCcw } from 'lucide-react'
import { useNavigate } from "react-router-dom"
import { USER_ROLES } from "@/Constants"
const API_URL = import.meta.env.VITE_APP_API_URL

const DashboardSummaryCard = ({title, number, Icon, onClick=() => {}}) => {
  return (
    <div 
      onClick={onClick} 
      className="group rounded-xl flex-1 m-2 min-w-64 h-32 transition-all flex items-center duration-300 text-brand-green font-medium bg-white border border-gray-200 shadow-sm hover:bg-yellow-400 hover:text-black hover:border-yellow-400 hover:shadow-xl transform hover:-translate-y-1 active:bg-yellow-400 active:text-black active:border-yellow-400 active:shadow-xl active:-translate-y-1 p-6 cursor-pointer"
    >
      <Icon className="w-10 h-10 mr-4 transition-all duration-300 text-brand-green group-hover:text-black group-hover:scale-110 group-active:text-black group-active:scale-110" />
      <div>
        <div className="text-sm uppercase tracking-wider opacity-70 group-hover:opacity-100">{title}</div>
        <div className="text-2xl font-bold">{number}</div>
      </div>
    </div>
  )
}


const DashboardSummary = () => { 
  const [summary, setSummary] = useState(null)
  const admin = jwtDecode(localStorage.getItem('token')).role === USER_ROLES.ADMIN
  const navigate = useNavigate()
  useEffect(() => {
      const getStatistics = async () => {
        await fetch(`${API_URL}/dashboard/statistics`, {
          method: 'POST',
          headers: { 'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token'),
          }
        }).then(response => response.json()).then(response => {setSummary(response); console.log(response)});
      }
      getStatistics()
  },[])
    return (
      <div className="w-full max-w-[1220px] flex flex-wrap justify-center px-4 py-6">
        {admin ? <DashboardSummaryCard title="Total Merchants" number={summary?summary.merchant:0} Icon={Users} /> : null}
        <DashboardSummaryCard title="Total Warehouses" number={summary?summary.warehouse:0} Icon={Warehouse} />
        <DashboardSummaryCard title="Total Shipments" number={summary?summary.shipment:0} Icon={Package} />
        <DashboardSummaryCard title="Total Delivered" number={summary?summary.delivered:0} Icon={CheckCircle2} />
        <DashboardSummaryCard title="Pending Pickups" number={summary?summary.unDelivered:0} Icon={Clock} />
        <DashboardSummaryCard title={admin?`Total Revenue`:`Total Wallet Recharge`} number={summary? (admin ? summary.revenue : summary.total_recharge) :0} Icon={admin ? IndianRupee : Wallet} />
        <DashboardSummaryCard title="Shipment In Transit" number={summary?summary.inTransit:0} Icon={Truck} />
        <DashboardSummaryCard title="Out For Delivery" number={summary?summary.outForDeliveries:0} Icon={Truck} />
        <DashboardSummaryCard title="Total RTO Shipments" number={summary?summary.rtoShipment:0} Icon={RotateCcw} />
        {!admin ? <DashboardSummaryCard title="Pending COD Remittance" number={`₹${summary?summary.pendingCodRemittance:0}`} Icon={IndianRupee} /> : null}
        {!admin ? <DashboardSummaryCard title="Paid COD Remittance" number={`₹${summary?summary.paidCodRemittance:0}`} Icon={IndianRupee} /> : null}
        {!admin ? <DashboardSummaryCard title="Total COD Remittance" number={`₹${summary?summary.totalCodRemittance:0}`} Icon={IndianRupee} /> : null}
      </div>
    )
}

export default DashboardSummary