import React, {useState} from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams, GridSelectionModel } from '@mui/x-data-grid';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';
import { 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle 
} from '@mui/material'; 
import { CarForm } from '../../components/CarForm';
import { getAuth } from 'firebase/auth';

interface gridData{
  data:{
    id?:string;
  }
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
      field: 'make',
      headerName: 'Make',
      width: 150,
      editable: true,
  },
  {
      field: 'model',
      headerName: 'Model',
      width: 150,
      editable: true,
  },
  {
      field: 'year',
      headerName: 'Year',
      width: 110,
      editable: true,
      type: 'number'

  },
  {
      field: 'color',
      headerName: 'Color',
      width: 130,
      editable: true
  },
];


export const DataTable = () => {

  let { carData, getData } = useGetData();
  let [open, setOpen] = useState(false);
  let [gridData, setData] = useState<GridSelectionModel>([])

  let handleOpen = () => {
    setOpen(true)
  }

  let handleClose = () => {
    setOpen(false)
  }

  let deleteData = () => {
    serverCalls.delete(`${gridData[0]}`)
    getData()
  }

  console.log(gridData) 
  const MyAuth = localStorage.getItem('myAuth');
  console.log(MyAuth);

  if (MyAuth == 'true'){
  return ( 
      <div style={{ height: 600, width: '100%' }}>
          <h2>Cars In Our Collection</h2>
          <DataGrid
              rows={carData}
              columns={columns}
              pageSize={9}
              rowsPerPageOptions={[9]}
              checkboxSelection
              onSelectionModelChange={(newSelectionModel) => { setData(newSelectionModel); }}
              {...carData}
          />
          <Button onClick={handleOpen}>Update</Button>
          <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Update Car</DialogTitle>
              <DialogContent>
                  <DialogContentText>Car id: {gridData[0]}</DialogContentText>
                  <CarForm id={`${gridData[0]}`} />
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleClose} color="primary">Cancel</Button>
                  <Button onClick={handleClose} color="secondary">Done</Button>
              </DialogActions>
          </Dialog>
      </div>
  )
} else { 
  return(
  <div>
      <h3>Please Sign In to View Your Car Collection</h3>
  </div>
)};

}