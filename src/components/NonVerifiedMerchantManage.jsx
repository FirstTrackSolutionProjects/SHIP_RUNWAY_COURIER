import { useEffect , useState  } from 'react'
const API_URL = import.meta.env.VITE_APP_API_URL


const Card = ({merchant}) => {
    return (
        <div className='p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-sm space-y-1'>
            <p className='font-semibold text-gray-800'>User ID: <span className='font-normal text-gray-700'>{merchant.uid}</span></p>
            <p className='font-semibold text-gray-800'>Name: <span className='font-normal text-gray-700'>{merchant.fullName}</span></p>
            <p className='font-semibold text-gray-800'>Business: <span className='font-normal text-gray-700'>{merchant.businessName}</span></p>
            <p className='font-semibold text-gray-800'>Phone: <span className='font-normal text-gray-700'>{merchant.phone}</span></p>
            <p className='font-semibold text-gray-800'>Email: <span className='font-normal text-gray-700'>{merchant.email}</span></p>
        </div>
    )
}



const MerchantManage =  () => {
    const [merchants, setMerchants] = useState([    ])
    useEffect(() => {
        const getVerifiedMerchant = async () => {
            const response = await fetch(`${API_URL}/merchant/unverified`, {
                method: 'POST',
                headers: { 'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                }
            })
            const data = await response.json();
            if (data.message.length)
                setMerchants(data.message)
        }
        getVerifiedMerchant();
    },[]);
  return (
    <div className='py-10 w-full flex flex-col items-center bg-white'>
        <div className='w-full max-w-7xl px-4 flex flex-col gap-4'>
            <h1 className='text-2xl font-semibold text-center text-[#145A32]'>Non-Verified Merchants</h1>
            <div className='w-full bg-white p-4 sm:p-6 rounded-lg shadow-sm border'>
                {merchants.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                        {merchants.map(((merchant,index)=>(
                            <Card key={index}  merchant={merchant}/>
                        )))}
                    </div>
                ) : (
                    <p className='text-center text-gray-500'>No non-verified merchants found.</p>
                )}
            </div>
        </div>
    </div>
  )
}

export default MerchantManage
