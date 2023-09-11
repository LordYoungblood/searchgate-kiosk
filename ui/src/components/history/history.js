import { useState, useContext, useEffect } from "react";
import { VehicleContext } from "../VehicleContext";
import { Box, Typography } from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

export const History = () => {
  const { base, API, token, setFlag, flag } = useContext(VehicleContext);
  const [baseName, setBaseName] = useState('');
  const [pageSize, setPageSize] = useState(50);
  const userToken = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
  const [visitorDetails, setVisitorDetails] = useState([]);

  useEffect(() => {
    fetch(API, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${userToken}`,
        Base: JSON.stringify(base),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setVisitorDetails(json);
        setFlag(false);
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log("visitorDetails from app.js", visitorDetails)

  useEffect(() => {
    const storedValue = localStorage.getItem('base')
      const containsPatrick = storedValue.includes('patrick_sfb');
      setBaseName (containsPatrick ? 'Patrick SFB' : 'NOTHING')
  }, [])





  const columns = [
    {
      field: "date",
      headerName: "Date",
      width: 200,
    },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      // editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      // editable: true,
    },
    {
      field: "state",
      headerName: "State",
      // type: 'number',
      width: 110,
      // editable: true,
    },
    {
      field: "drivers_license",
      headerName: "Drivers License",
      type: "number",
      width: 110,
      // editable: true,
    },
    {
      field: "plate",
      headerName: "plate",
      // type: 'number',
      width: 110,
      // editable: true,
    },
    {
      field: "make",
      headerName: "Make",
      // type: 'number',
      width: 110,
      // editable: true,
    },
    {
      field: "model",
      headerName: "Model",
      // type: 'number',
      width: 110,
      // editable: true,
    },
    {
      field: "fullDL",
      headerName: "Full DL",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.state || ""} ${params.row.drivers_license || ""}`,
    },
    {
      field: "delivery_location",
      headerName: "Delivery Location",
      // type: 'number',
      width: 110,
      // editable: true,
    },
  ];


  const rows = [];
  visitorDetails?.map((visitor) => {
    rows.push({
      date:
        visitor.date.split("T")[0] +
        " : " +
        visitor.date.split("T")[1].slice(0, 5),
      // time: visitor.date.split("T")[1].split(".")[0],
      id: visitor.id,
      lastName: visitor.last_name,
      firstName: visitor.first_name,
      state: visitor.state,
      drivers_license: visitor.drivers_license,
      plate: visitor.plate,
      make: visitor.make,
      model: visitor.model,
      delivery_location: visitor.delivery_location,
    });
    return rows;
  });



  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    );
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
      <Typography
          style={{ alightContent: "center", fontFamily: "sans", fontSize: 30, fontWeight: "bold" }}
        >
          {baseName} History
          
        </Typography>
        {/* <SearchBar /> */}
      </Box>
      <Box>
        {/* <Box sx={{ height: 700, width: "100%" }}> */}
        <div style={{ height: "77vh", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(e) => setPageSize(e)}
            rowsPerPageOptions={[10, 20, 50, 100]}
            // checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            sx={{ color: 'black', '& .MuiButtonBase-root': {color: 'black'}}}
            
            components={{
              Toolbar: CustomToolbar,
            }}
          ></DataGrid>
        </div>
      </Box>
    </>
  );
};
