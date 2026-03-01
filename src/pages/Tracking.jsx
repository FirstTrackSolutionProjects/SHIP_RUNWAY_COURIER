import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Search, MapPin, Package, BellRing } from 'lucide-react';

const API_URL = import.meta.env.VITE_APP_API_URL;

const Form = () => {
    const [isTracking, setIsTracking] = useState(false);
    const [formData, setFormData] = useState({
        awb: ''
    });

    useEffect(() => {
        const storedTrack = localStorage.getItem('track');
        if (storedTrack) {
            setFormData({ awb: storedTrack });
            localStorage.setItem('track', '');
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const [trackingData, setTrackingData] = useState(null);
    const closeResultModal = () => {
        setTrackingData(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.awb.trim()) return;
        setIsTracking(true);
        try {
            const data = await fetch(`${API_URL}/shipment/track`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ id: formData.awb, isWaybill: true })
            }).then(response => response.json());
            setTrackingData(data);
        } catch (e) {
            console.log(e);
        } finally {
            setIsTracking(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-gray">
            {/* Hero & Form Section */}
            <div className="w-full bg-linear-to-b from-[#F0FDF4] to-brand-gray pt-16 pb-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-brand-accent mb-4 tracking-tight">
                        Track Your Shipment
                    </h1>
                    <p className="text-gray-500 text-lg max-w-xl mx-auto">
                        Enter your AWB number below to receive real-time updates and monitor your delivery progress.
                    </p>
                    <div className="w-16 h-1 bg-brand-orange mx-auto mt-6 rounded-full"></div>

                    {/* Tracking Card */}
                    <div className="mt-12 max-w-2xl mx-auto">
                        <div className="bg-white shadow-xl rounded-3xl p-6 md:p-10 border border-gray-200">
                            <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
                                <div className="relative flex-1">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                        <Search size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        name="awb"
                                        value={formData.awb}
                                        onChange={handleChange}
                                        placeholder="Enter AWB / Tracking ID"
                                        className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 transition-all text-gray-800 font-medium"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isTracking}
                                    className="h-14 px-8 bg-brand-green text-white rounded-2xl font-bold hover:bg-brand-green-light transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 shadow-lg shadow-brand-green/20"
                                >
                                    {isTracking ? 'Tracking...' : 'Track Now'}
                                </button>
                            </form>

                            {/* Trust Indicators */}
                            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400 font-medium border-t border-gray-50 pt-8">
                                <div className="flex items-center gap-2">
                                    <span className="text-brand-green text-lg">✔</span> Real-time updates
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-brand-green text-lg">✔</span> Nationwide coverage
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-brand-green text-lg">✔</span> Secure monitoring
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="max-w-6xl mx-auto py-20 px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-brand-green">How It Works</h2>
                    <p className="text-gray-500 mt-2">Simple steps to track your shipment lifecycle</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 bg-white shadow-sm border border-gray-100 rounded-2xl flex items-center justify-center text-brand-orange mb-6 group-hover:-translate-y-2 transition-transform duration-300">
                            <Package size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-brand-accent mb-2">Enter AWB</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Input your unique Air Waybill number provided during shipment booking.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 bg-white shadow-sm border border-gray-100 rounded-2xl flex items-center justify-center text-brand-orange mb-6 group-hover:-translate-y-2 transition-transform duration-300">
                            <MapPin size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-brand-accent mb-2">Live Status</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Get real-time location and status information as your parcel travels across the network.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 bg-white shadow-sm border border-gray-100 rounded-2xl flex items-center justify-center text-brand-orange mb-6 group-hover:-translate-y-2 transition-transform duration-300">
                            <BellRing size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-brand-accent mb-2">Final Delivery</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Receive notifications when your shipment reaches the final hub for delivery.
                        </p>
                    </div>
                </div>
            </div>

            {trackingData && <ResultModal data={trackingData} onClose={closeResultModal} />}
        </div>
    );
};

const Card = ({ scan }) => {
    return (
        <>
            <Box className="w-full h-16 bg-white relative items-center px-8 flex border-b space-x-4">
                <Box>{scan.ScanDateTime}</Box>
                <Box>{scan.ScannedLocation}</Box>
                <Box className="absolute right-8 cursor-pointer">{scan.Instructions}</Box>
            </Box>
        </>
    )
}
const FlightGoCard = ({ scan }) => {
    return (
        <>
            <Box className="w-full h-16 bg-white relative items-center px-8 flex border-b space-x-4">
                <Box>{scan.event_at}</Box>
                <Box>{scan.event_location}</Box>
                <Box className="absolute right-8 cursor-pointer">{scan.event_description}</Box>
            </Box>
        </>
    )
}
const MovinCard = ({ scan }) => {
    return (
        <>
            <Box className="w-full h-16 bg-white relative items-center px-8 flex border-b space-x-4">
                <Box>{scan.timestamp}</Box>
                <Box className="absolute right-8 cursor-pointer">{scan.package_status}</Box>
            </Box>
        </>
    )
}

const PickrrCard = ({ scan }) => {
    return (
        <>
            <Box className="w-full py-3 bg-white relative items-center justify-center px-8 flex border-b space-x-4">
                <Box className='flex flex-col items-center justify-center'>
                    <Box className='font-bold'>{scan.remarks}</Box>
                    <Box>{scan.location}</Box>
                    <Box>{scan.timestamp}</Box>
                </Box>
            </Box>
        </>
    )
}

const DillikingCard = ({ scan }) => {
    const date = scan.event_date;
    const time = scan.event_time;
    const formattedDate = `${date.substr(0,4)}/${date.substr(4,6)}/${date.substr(6,8)}`
    const formattedTime = `${time.substr(0,2)}:${time.substr(2,4)}`
    return (
    <>
        <Box className="w-full py-3 bg-white relative items-center justify-center px-8 flex border-b space-x-4">
            <Box className='flex flex-col items-center justify-center'>
                <Box className='font-bold'>{scan.remark}</Box>
                <Box>{scan.location}</Box>
                <Box>{`${formattedDate} ${formattedTime}`}</Box>
            </Box>
        </Box>
    </>
    )
}

const ShiprocketCard = ({ scan }) => {
    return (
    <>
        <Box className="w-full py-3 bg-white relative items-center justify-center px-8 flex border-b space-x-4">
            <Box className='flex flex-col items-center justify-center'>
                <Box className='font-bold'>{scan["sr-status-label"]}</Box>
                <Box>{scan.location}</Box>
                <Box>{scan.date}</Box>
            </Box>
        </Box>
    </>
    )
}


const ResultModal = ({ data, onClose }) => {
    useEffect(() => {
      console.log("data : ", data);
    }, [data]);
  
    return (
      <Box className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Box className="bg-white rounded-lg shadow-lg w-11/12 max-w-md max-h-screen overflow-hidden relative">
          <button
            className="absolute top-2 right-6 z-50 text-gray-400 hover:text-gray-600 text-3xl"
            onClick={onClose}
          >
            ×
          </button>
          <Box className="w-full p-4 overflow-y-auto max-h-[80vh]">
          <h1 className='text-center text-2xl text-bold'>Shipment Tracking</h1>
            {/* Conditional Rendering for Cards */}
            {(data?.id === 1 || data?.id === 2) &&
              data?.data.ShipmentData[0].Shipment.Scans.slice()
                .reverse()
                .map((scan, index) => <Card key={index} scan={scan.ScanDetail} />)}
            {data?.id === 3 &&
              data?.data.map((scan, index) => (
                <MovinCard key={index} scan={scan} />
              ))}
            {data?.id === 4 &&
              data?.data.docket_events.map((scan, index) => (
                <FlightGoCard key={index} scan={scan} />
              ))}
            {data?.id === 5 &&
              data?.data.reverse().map((scan, index) => (
                <PickrrCard key={index} scan={scan} />
              ))}
            {data?.id === 6 &&
              data?.data.map((scan, index) => (
                <ShiprocketCard key={index} scan={scan} />
              ))}
            {data?.id === 7 &&
              data?.data.map((scan, index) => (
                <DillikingCard key={index} scan={scan} />
              ))}
          </Box>
        </Box>
      </Box>
    );
  };
  

const Tracking = () => {
  return <Form />
}

export default Tracking
