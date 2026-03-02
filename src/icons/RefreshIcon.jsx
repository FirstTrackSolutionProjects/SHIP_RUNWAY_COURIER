import React from 'react'
import RefIcon from '@mui/icons-material/Refresh';
const RefreshIcon = ({onClick=()=>{}}) => {
  return (
    <RefIcon fontSize="small" color='primary' className='cursor-pointer hover:rotate-180 transition-transform duration-700 ease-in-out' onClick={onClick} />
  )
}

export default RefreshIcon
