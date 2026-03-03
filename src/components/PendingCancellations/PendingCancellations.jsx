import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box, CircularProgress, Typography } from '@mui/material';
import getAllPendingCancellationServices from '../../services/pendingCancellationServices/getAllPendingCancellationServices';
import approveCancellationService from '../../services/pendingCancellationServices/approveCancellationService';
import rejectCancellationService from '../../services/pendingCancellationServices/rejectCancellationService';
import { toast } from 'react-toastify';

const PendingCancellations = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState({});

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAllPendingCancellationServices();
      setRows(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = async (ord_id) => {
    setActionLoading((prev) => ({ ...prev, [ord_id]: true }));
    try {
      await approveCancellationService(ord_id);
      toast.success('Cancellation approved');
      fetchData();
    } catch (err) {
      toast.error(err.message || 'Failed to approve');
    } finally {
      setActionLoading((prev) => ({ ...prev, [ord_id]: false }));
    }
  };

  const handleReject = async (ord_id) => {
    setActionLoading((prev) => ({ ...prev, [ord_id]: true }));
    try {
      await rejectCancellationService(ord_id);
      toast.success('Cancellation rejected');
      fetchData();
    } catch (err) {
      toast.error(err.message || 'Failed to reject');
    } finally {
      setActionLoading((prev) => ({ ...prev, [ord_id]: false }));
    }
  };

  const columns = [
    { field: 'ord_id', headerName: 'Order ID', flex: 1, minWidth: 100 },
    { field: 'fullName', headerName: 'Merchant', flex: 1, minWidth: 150 },
    { field: 'awb', headerName: 'AWB', flex: 1, minWidth: 150 },
    { field: 'service_name', headerName: 'Service', flex: 2, minWidth: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 180, // Increased minWidth to accommodate both buttons
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" gap={1} alignItems="center" height="100%">
          <Button
            variant="contained"
            size="small"
            disabled={!!actionLoading[params.row.ord_id]}
            onClick={() => handleApprove(params.row.ord_id)}
            sx={{
              backgroundColor: '#145A32',
              color: 'white',
              '&:hover': {
                backgroundColor: '#F1C40F',
                color: '#145A32',
              },
              whiteSpace: 'nowrap',
              minWidth: '70px',
            }}
          >
            {actionLoading[params.row.ord_id] ? <CircularProgress size={18} sx={{ color: 'white' }} /> : 'Approve'}
          </Button>
          <Button
            variant="contained"
            size="small"
            disabled={!!actionLoading[params.row.ord_id]}
            onClick={() => handleReject(params.row.ord_id)}
            sx={{
              backgroundColor: '#D32F2F', // Red color for reject
              color: 'white',
              '&:hover': {
                backgroundColor: '#EF5350',
              },
              whiteSpace: 'nowrap',
              minWidth: '70px',
            }}
          >
            {actionLoading[params.row.ord_id] ? <CircularProgress size={18} sx={{ color: 'white' }} /> : 'Reject'}
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <div className='py-10 w-full flex flex-col items-center bg-white'>
        <div className='w-full max-w-7xl px-4 flex flex-col gap-4'>
            <h1 className='text-2xl font-semibold text-center text-[#145A32]'>Pending Cancellations</h1>
            <Box sx={{ width: '100%', background: 'white', borderRadius: 2, boxShadow: 1, overflowX: 'auto' }} className='rounded-lg border border-[#145A32]'>
                <DataGrid
                    autoHeight
                    rows={rows}
                    columns={columns}
                    getRowId={(row) => row.ord_id}
                    loading={loading}
                    disableSelectionOnClick
                    pageSizeOptions={[20]}
                    initialState={{ pagination: { paginationModel: { pageSize: 20, page: 0 } } }}
                    pageSize={20}
                    rowHeight={80} // Consistent row height
                    disableColumnMenu
                    disableRowSelectionOnClick
                    sx={{
                        border: '1px solid #145A32', // Consistent border
                        borderRadius: 0,
                        '& .MuiDataGrid-overlayWrapper': { backgroundColor: '#fff' },
                        '& .MuiDataGrid-columnHeaders': {
                          borderBottom: '2px solid #F1C40F',
                          backgroundColor: '#145A32',
                          color: '#FFF',
                        },
                        '& .MuiDataGrid-columnHeader': {
                          backgroundColor: '#145A32',
                          fontWeight: 'bold',
                        },
                        '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
                          borderRight: '1px solid #145A32',
                        },
                        '& .MuiDataGrid-columnHeader:first-of-type, & .MuiDataGrid-cell:first-of-type': {
                          borderLeft: '1px solid #145A32',
                        },
                        '& .MuiDataGrid-row': {
                          borderBottom: '1px solid #145A32',
                          '&:hover': {
                            backgroundColor: '#fefce8', // Light yellow hover
                          }
                        },
                        // Ensure all cells align well on smaller screens
                        '& .MuiDataGrid-cell': {
                            whiteSpace: 'normal !important',
                            lineHeight: 'normal',
                            py: 1, // Add some vertical padding
                            display: 'flex',
                            alignItems: 'center',
                        },
                    }}
                />
            </Box>
        </div>
    </div>
  );
};

export default PendingCancellations;
