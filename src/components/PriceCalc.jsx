import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { toast } from "react-toastify"

const API_URL = import.meta.env.VITE_APP_API_URL

const ComparePrices = ({method, boxes, status, origin, dest, payMode, codAmount, isB2B, invoiceAmount, setShowCompare}) => {
  const [prices,setPrices] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const {isAuthenticated} = useAuth()
  useEffect(()=>{
    const data = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${API_URL}/shipment/domestic/price`, {
          method: 'POST',
          headers: { 'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
          },
            body : JSON.stringify({method: method, boxes : boxes, status : status, origin : origin, dest : dest, payMode : payMode, codAmount : codAmount, isB2B : isB2B, invoiceAmount : invoiceAmount, priceCalc : true}),
          
        })
        const result = await response.json()
        setPrices(result.prices || [])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }  
    data()
  }, []) 

  const handleShip = () => {
    const shipment = {
      payMode: payMode,
      shippingType: method==="E"?"Express":"Surface",
      postcode: dest,
      isB2B: isB2B,
      cod: codAmount,
      invoiceAmount: invoiceAmount
    }
    const shipmentBoxes = boxes.map((box, index) => ({
      box_no: index + 1,
      ...box
    }))
    navigate('/dashboard/order/create', {
      state: { shipment, boxes: shipmentBoxes }
    })
  }
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="bg-brand-green text-white px-4 py-4 sm:px-8 sm:py-6 flex justify-between items-center">
          <h2 className="text-lg sm:text-2xl font-bold">Available Services</h2>
          <button onClick={()=>setShowCompare(false)} className="hover:bg-white/10 p-1 sm:p-2 rounded-full transition-colors text-white text-xl sm:text-2xl font-bold leading-none">
            &times;
          </button>
        </div>

        <div className="p-3 sm:p-6 max-h-[70vh] overflow-y-auto space-y-3 sm:space-y-4">
          {loading ? (
            <div className="py-20 text-center flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 font-medium">Fetching best rates for you...</p>
            </div>
          ) : prices.length > 0 ? (
            prices.map((price, idx)=>(
              <div key={idx} className="bg-brand-gray border border-gray-100 rounded-2xl p-3 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:border-brand-green/30 transition-all shadow-sm">
                <div>
                  <div className="text-base sm:text-lg font-bold text-brand-green">{price.name}</div>
                  <div className="text-xs sm:text-sm text-gray-500 font-medium">Chargable Weight: <span className="text-brand-orange">{price.chargableWeight}g</span></div>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-6">
                  <div className="text-lg sm:text-2xl font-extrabold text-brand-accent shrink-0">₹{Math.round(price.price)}</div>
                  {isAuthenticated && (
                    <button 
                      type="button" 
                      onClick={handleShip} 
                      className="bg-brand-green hover:bg-brand-green-light text-white px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-2xl text-xs sm:text-base font-bold transition-all shadow-lg shadow-brand-green/10 active:scale-95 whitespace-nowrap"
                    >
                      Ship Now
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center text-gray-500">No services found for this route.</div>
          )}
        </div>
      </div>
    </div>
  )
}


const Domestic = () => {
  const [boxes, setBoxes] = useState([{weight : 0, weight_unit : 'kg', length : 0, breadth : 0, height : 0, quantity : 1}])
  const [formData, setFormData] = useState({
    method : 'S',
    status: 'Delivered',
    origin : '',
    dest : '',
    payMode : 'COD',
    codAmount : '0',
    invoiceAmount : 0,
    isB2B : false
  })
  const [showCompare, setShowCompare] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.origin.length !== 6 || formData.dest.length !== 6){
      toast.error("Origin and Destination pincodes should be 6 digits")
      return;
    }
    if (formData.isB2B && formData.invoiceAmount < 1){
      toast.error("Invoice Amount should be atleast 1 for B2B")
      return;
    }
    if (formData.payMode == "COD" && formData.codAmount < 1){
      toast.error("COD Amount should be atleast 1")
      return;
    }
    let boxValidationError = false;
    boxes.map(box => {
      if (!box.weight){
        toast.error("Weight is required")
        boxValidationError = true;
      }
      if (!box.length || !box.breadth || !box.height){
        toast.error("Length, Breadth and Height should be non-zero")
        boxValidationError = true;
      }
      if (box.quantity < 1){
        toast.error("Quantity should be atleast 1")
        boxValidationError = true;
      }
    })
    if (boxValidationError) return;
    setShowCompare(true)
  }
  const handleBoxes = (index, event) => {
    const { name, value } = event.target;
    const updatedBoxes = [...boxes];
    updatedBoxes[index][name] = value;
    setBoxes(updatedBoxes);
  };
  const addBox = () => {
    setBoxes([...boxes, {  length: 0 , breadth : 0 , height : 0  , weight: 0, weight_unit : 'kg', quantity: 1 }]);
  };
  const removeBox = (index) => {
    const updatedBoxes = boxes.filter((_, i) => i !== index);
    setBoxes(updatedBoxes);
  };
  return (
    <div className="w-full max-w-4xl mx-auto">
      {showCompare && <ComparePrices {...formData} boxes={boxes} setShowCompare={setShowCompare} />}
      
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-3xl p-4 sm:p-8 md:p-12 border border-gray-100 space-y-6 sm:space-y-8 md:space-y-10">
        
        {/* Core Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-4 sm:gap-y-5 md:gap-y-6">
          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-xs sm:text-sm font-bold text-brand-accent ml-1">Shipping Method</label>
            <select
              name="method"
              className="w-full h-12 px-3 sm:px-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all text-sm sm:text-base text-gray-800 font-medium"
              value={formData.method}
              onChange={handleChange}
            >
              <option value="S">Surface</option>
              <option value="E">Express</option>
            </select>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-xs sm:text-sm font-bold text-brand-accent ml-1">Status</label>
            <select
              name="status"
              className="w-full h-12 px-3 sm:px-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all text-sm sm:text-base text-gray-800 font-medium"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Delivered">Forward</option>
              <option value="RTO">RTO</option>
              <option value="DTO">Reverse</option>
            </select>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-xs sm:text-sm font-bold text-brand-accent ml-1">Origin Pincode</label>
            <input
              type="text"
              name="origin"
              placeholder="Ex. 813210"
              className="w-full h-12 px-3 sm:px-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all text-sm sm:text-base text-gray-800 font-medium"
              value={formData.origin}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-xs sm:text-sm font-bold text-brand-accent ml-1">Destination Pincode</label>
            <input
              type="text"
              name="dest"
              placeholder="Ex. 845401"
              className="w-full h-12 px-3 sm:px-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all text-sm sm:text-base text-gray-800 font-medium"
              value={formData.dest}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-xs sm:text-sm font-bold text-brand-accent ml-1">Payment Mode</label>
            <select
              name="payMode"
              className="w-full h-12 px-3 sm:px-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all text-sm sm:text-base text-gray-800 font-medium"
              value={formData.payMode}
              onChange={handleChange}
            >
              <option value="COD">COD</option>
              <option value="Pre-paid">Prepaid</option>
              <option value="Pickup">Pickup</option>
            </select>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-xs sm:text-sm font-bold text-brand-accent ml-1">COD Amount</label>
            <input
              type="text"
              name="codAmount"
              placeholder="0"
              disabled={formData.payMode !== 'COD'}
              className="w-full h-12 px-3 sm:px-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all disabled:opacity-50 text-sm sm:text-base text-gray-800 font-medium"
              value={formData.codAmount}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-xs sm:text-sm font-bold text-brand-accent ml-1">Shipment Type</label>
            <select
              name="isB2B"
              className="w-full h-12 px-3 sm:px-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all text-sm sm:text-base text-gray-800 font-medium"
              value={formData.isB2B}
              onChange={handleChange}
            >
              <option value={false}>B2C (Individual)</option>
              <option value={true}>B2B (Business)</option>
            </select>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-xs sm:text-sm font-bold text-brand-accent ml-1">Invoice Amount</label>
            <input
              type="text"
              name="invoiceAmount"
              placeholder="0"
              className="w-full h-12 px-3 sm:px-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green transition-all text-sm sm:text-base text-gray-800 font-medium"
              value={formData.invoiceAmount}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Boxes Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <h3 className="text-lg font-bold text-brand-green">Box Dimensions & Weight</h3>
            <button 
              type="button" 
              onClick={addBox}
              className="text-sm font-bold text-brand-orange hover:text-brand-orange-light transition-colors flex items-center gap-1.5 px-4 py-2 bg-brand-gray rounded-xl border border-gray-200 shadow-sm"
            >
              <span className="text-lg">+</span> Add Box
            </button>
          </div>

          <div className="space-y-4">
            {boxes.map((box, index) => (
              <div key={index} className="relative bg-brand-gray border border-gray-100 rounded-2xl p-3 sm:p-6 transition-all hover:bg-white hover:shadow-md hover:border-brand-green/10">
                {boxes.length > 1 && (
                  <button 
                    type="button" 
                    className="absolute -top-3 -right-3 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center text-sm shadow-lg hover:bg-red-600 transition-colors z-10" 
                    onClick={() => removeBox(index)}
                  >
                    &times;
                  </button>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
                  <div className="lg:col-span-2 space-y-1">
                    <label className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-gray-400">Weight</label>
                    <div className="flex gap-1.5 sm:gap-2">
                      <input 
                        required
                        type="text"
                        name="weight"
                        placeholder="0.00"
                        className="flex-1 h-11 px-2 sm:px-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-green/10 text-xs sm:text-base text-gray-800 font-medium"
                        value={box.weight}
                        onChange={(e)=>handleBoxes(index,e)}
                      />
                      <select
                        name="weight_unit"
                        className="w-14 sm:w-20 h-11 px-1 sm:px-2 bg-white border border-gray-200 rounded-xl focus:outline-none text-xs sm:text-base text-gray-800 font-medium"
                        value={box.weight_unit}
                        onChange={(e)=>handleBoxes(index,e)}
                      >
                        <option value="g">g</option>
                        <option value="kg">kg</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 lg:col-span-2 gap-1 sm:gap-2">
                    <div className="space-y-1">
                      <label className="text-[9px] sm:text-[11px] uppercase tracking-wider font-bold text-gray-400 block truncate">L (cm)</label>
                      <input required type="text" name="length" className="w-full h-11 px-1 bg-white border border-gray-200 rounded-xl text-center focus:ring-4 focus:ring-brand-green/10 outline-none text-xs sm:text-base text-gray-800 font-medium" value={box.length} onChange={(e)=>handleBoxes(index,e)} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] sm:text-[11px] uppercase tracking-wider font-bold text-gray-400 block truncate">B (cm)</label>
                      <input required type="text" name="breadth" className="w-full h-11 px-1 bg-white border border-gray-200 rounded-xl text-center focus:ring-4 focus:ring-brand-green/10 outline-none text-xs sm:text-base text-gray-800 font-medium" value={box.breadth} onChange={(e)=>handleBoxes(index,e)} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] sm:text-[11px] uppercase tracking-wider font-bold text-gray-400 block truncate">H (cm)</label>
                      <input required type="text" name="height" className="w-full h-11 px-1 bg-white border border-gray-200 rounded-xl text-center focus:ring-4 focus:ring-brand-green/10 outline-none text-xs sm:text-base text-gray-800 font-medium" value={box.height} onChange={(e)=>handleBoxes(index,e)} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-gray-400">Qty</label>
                    <input required type="number" name="quantity" min="1" className="w-full h-11 px-2 sm:px-4 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-brand-green/10 outline-none text-xs sm:text-base text-gray-800 font-medium" value={box.quantity} onChange={(e)=>handleBoxes(index,e)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6">
          <button 
            type="submit" 
            className="w-full h-14 bg-brand-green hover:bg-brand-green-light text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-brand-green/20 active:scale-95"
          >
            Submit and Compare Rates
          </button>
        </div>
      </form>
    </div>
  )
}


const PriceCalc = () => {
  return (
    <div className="w-full py-6 sm:py-10 md:py-16 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto text-center mb-6 sm:mb-8 md:mb-12">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-brand-green tracking-tight mb-2 sm:mb-3 md:mb-4">
          Rate Calculator
        </h1>
        <p className="text-gray-500 text-sm sm:text-lg px-1 sm:px-2">
          Get instant estimates for your domestic shipments across India.
        </p>
        <div className="w-20 h-1.5 bg-brand-orange mx-auto mt-6 rounded-full"></div>
      </div>
      
      <Domestic />
    </div>
  );
};

export default PriceCalc
