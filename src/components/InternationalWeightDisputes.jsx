import { useEffect, useState } from "react";
import CreateInternationalWeightDisputePopup from "./CreateInternationalWeightDisputePopup";
import ViewInternationalWeightDisputePopup from "./ViewInternationalWeightDisputePopup";
import { useAuth } from "../context/AuthContext";
import { USER_ROLES } from "@/Constants";
const API_URL = import.meta.env.VITE_APP_API_URL

const Card = ({ report }) => {


  const [view, setIsView] = useState(false)
  const toggleView = () => {
    setIsView((prev) => !prev)
  }
  return (
    <>
      <ViewInternationalWeightDisputePopup open={view} onClose={toggleView} disputeId={report?.dispute_id} />
      <div className="w-full h-24 bg-white relative items-center px-4 sm:px-8 flex border-b">
        <div>
          <div className="text-sm font-bold">
            {report.iid}
          </div>
          <div className="text-[10px] text-gray-500">
            {report.created_at ? report.created_at.toString().split('T')[0] + ' ' + report.created_at.toString().split('T')[1].split('.')[0] : null}
          </div>
        </div>
        <div className="absolute right-4 sm:right-8 flex items-center space-x-2">
          <div className={`${report.dispute_deduction >= 0 ? 'text-[#E49B0F]' : 'text-[#145A32]'} font-bold`}>{report.dispute_deduction >= 0 ? '-':''}₹{report.dispute_deduction}</div>
          <div className="px-3 py-1 bg-[#145A32] hover:bg-[#0E3F2D] rounded text-white cursor-pointer transition-colors" onClick={() => setIsView(true)}>View</div>
        </div>
      </div>
    </>
  );
};

const Listing = () => {
  const [reports, setReports] = useState([])
  const {role} = useAuth();
  const admin = role === USER_ROLES.ADMIN;
  const brandGreen = "#145A32";
  const brandDarkGreen = "#0E3F2D";
  const [filteredReports, setFilteredReports] = useState([]);
  const [filters, setFilters] = useState({
    orderId: ""
  });
  const [openCreateDisputePopup, setOpenCreateDisputePopup]= useState(false);
  const toggleCreateDisputePopup = () => {
    setOpenCreateDisputePopup((prev) => !prev);
  }
  useEffect(() => {

    fetch(`${API_URL}/weight-disputes/international/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      },
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          result.data.sort((a, b) => parseInt(a.dispute_id) - parseInt(b.dispute_id)).reverse();
          setReports(result.data);
        } else {
          alert('Fetch failed: ' + result.message)
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during fetching reports');
      });
  }, []);

  useEffect(() => {
    if (!reports.length) {
      return;
    }
    const filteredData = reports.filter((report) => {
      return (
        (filters.orderId === "" || (report.iid.toLowerCase() == filters.iid.toLowerCase()))
      );
    });
    setFilteredReports(filteredData)
  }, [reports, filters])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  }
  return (
    <>
      <div
        className={`w-full p-4 flex flex-col items-center space-y-6 bg-white`}
      >
        <div className="w-full h-16 px-4  relative flex justify-between border-b border-[#F5F5F5]">
          <div className="text-2xl font-bold text-[#145A32]">INTERNATIONAL WEIGHT DISPUTES</div>
          {admin ? <div><button type='button' onClick={toggleCreateDisputePopup} className="mx-2 px-5 py-1 rounded bg-[#E49B0F] hover:bg-[#C97A00] text-white font-bold transition-colors">Create</button></div> : null}
        </div>

        <details className="w-full p-2 bg-[#145A32] rounded-xl text-white">
          <summary className="cursor-pointer font-bold">Filters</summary>
          <div className="grid space-y-2 lg:grid-rows-1 lg:grid-cols-4 lg:space-y-0 lg:space-x-4 p-2 rounded-xl w-full bg-[#145A32] text-black justify-evenly">
            <input
              className="p-1 rounded-xl"
              type="text"
              name="orderId"
              placeholder="Order Id"
              value={filters.orderId}
              onChange={handleChange}
            />
          </div>
        </details>
        <div className="w-full">

          {filteredReports.length ? filteredReports.map((report, index) => (
            <Card key={index} report={report} />
          )): <div className="w-full text-center">Hurray! No Disputes Found!</div>}
        </div>
      </div>
      <CreateInternationalWeightDisputePopup open={openCreateDisputePopup} onClose={toggleCreateDisputePopup} />
    </>
  );
};
const InternationalWeightDisputes = () => {
  return (
    <div className=" py-16 w-full h-full flex flex-col items-center overflow-x-hidden overflow-y-auto">
      <Listing />
    </div>
  )
}

export default InternationalWeightDisputes
