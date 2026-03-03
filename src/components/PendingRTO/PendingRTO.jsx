import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Button,
  Box,
  CircularProgress,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import getAllPendingRTOsService from '@/services/rtoServices/getAllPendingRTOService';
import processPendingRTOService from '@/services/rtoServices/processPendingRTOService';
import { toast } from 'react-toastify';

const PendingRTO = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState({});
  const [processDialogOpen, setProcessDialogOpen] = useState(false);
  const [selectedOrdId, setSelectedOrdId] = useState(null);
  const [rtoAmount, setRtoAmount] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getAllPendingRTOsService();
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

  const openProcessDialog = (ord_id) => {
    setSelectedOrdId(ord_id);
    setRtoAmount('');
    setProcessDialogOpen(true);
  };

  const closeProcessDialog = () => {
    setProcessDialogOpen(false);
    setSelectedOrdId(null);
    setRtoAmount('');
  };

  const handleProcessConfirm = async () => {
    if (!selectedOrdId) return;

    const amountNumber = Number(rtoAmount);
    if (!Number.isFinite(amountNumber)) {
      toast.error('Enter a valid RTO amount');
      return;
    }
    if (amountNumber < 0) {
      toast.error('RTO amount cannot be negative');
      return;
    }

    setActionLoading((prev) => ({ ...prev, [selectedOrdId]: true }));
    try {
      await processPendingRTOService({ ord_id: selectedOrdId, rto_amount: amountNumber });
      toast.success('RTO processed successfully');
      closeProcessDialog();
      fetchData();
    } catch (err) {
      toast.error(err.message || 'Failed to process RTO');
    } finally {
      setActionLoading((prev) => ({ ...prev, [selectedOrdId]: false }));
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
      minWidth: 120,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" gap={1} alignItems="center" height="100%">
          <Button
            variant="contained"
            size="small"
            disabled={!!actionLoading[params.row.ord_id]}
            onClick={() => openProcessDialog(params.row.ord_id)}
            sx={{ 
              whiteSpace: 'nowrap', 
              flexShrink: 0,
              backgroundColor: '#145A32', // Green color
              color: '#F1C40F', // Yellow text
              '&:hover': {
                backgroundColor: '#2E7D32', // Darker green on hover
              }
            }}
          >
            {actionLoading[params.row.ord_id] ? <CircularProgress size={18} sx={{ color: '#F1C40F' }} /> : 'Process'}
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <div className='py-10 w-full flex flex-col items-center bg-white'>
        <div className='w-full max-w-7xl px-4 flex flex-col gap-4'>
            <h1 className='text-2xl font-semibold text-center text-[#145A32]'>Pending RTOs</h1>
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
                        '& .MuiDataGrid-footerContainer': { // Styled footer to match theme
                            borderTop: '1px solid #145A32',
                            backgroundColor: '#F7F7F7', // Lighter background for footer
                            color: '#145A32',
                        }
                    }}
                />
            </Box>

            <Dialog open={processDialogOpen} onClose={closeProcessDialog} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ color: '#145A32', fontWeight: 'bold' }}>Process RTO</DialogTitle>
                <DialogContent>
                  <Typography variant="body2" sx={{ mb: 1, color: '#333' }}>
                    Order ID: <span className='font-medium'>{selectedOrdId || '-'}</span>
                  </Typography>
                  <TextField
                    autoFocus
                    fullWidth
                    label="RTO Amount"
                    type="number"
                    value={rtoAmount}
                    onChange={(e) => setRtoAmount(e.target.value)}
                    inputProps={{ min: 0, step: '0.01' }}
                    sx={{ mt: 2, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#145A32' } }, '& .MuiInputLabel-root.Mui-focused': { color: '#145A32' } }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={closeProcessDialog} disabled={selectedOrdId ? !!actionLoading[selectedOrdId] : false} sx={{ color: '#145A32', '&:hover': { backgroundColor: 'rgba(20, 90, 50, 0.04)' } }}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleProcessConfirm}
                    variant="contained"
                    disabled={selectedOrdId ? !!actionLoading[selectedOrdId] : true}
                    sx={{ 
                      backgroundColor: '#145A32', 
                      color: '#F1C40F',
                      '&:hover': {
                        backgroundColor: '#2E7D32',
                      }
                    }}
                  >
                    {selectedOrdId && actionLoading[selectedOrdId] ? <CircularProgress size={18} sx={{ color: '#F1C40F' }} /> : 'Confirm'}
                  </Button>
                </DialogActions>
            </Dialog>
        </div>
    </div>
  );
};

export default PendingRTO;
