import { useState, useContext, useEffect } from "react";
import { VehicleContext } from "../VehicleContext";
import { Box, Container, Modal } from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

export const Users = () => {
  const { visitorDetails, API } = useContext(VehicleContext);
  const [pageSize, setPageSize] = useState(10);
  const [userDetails, setUserDetails] = useState([]);

  // console.log(visitorDetails);

  useEffect(() => {
    fetch(`${API}/users`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setUserDetails(json);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user_name",
      headerName: "User Name",
      width: 150,
      // editable: true,
    },
    {
      field: "admin",
      headerName: "admin",
      width: 150,
      // editable: true,
    },
  ];

  // { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 }
  const rows = [];
  userDetails.map((user, index) => {
    rows.push({
      id: index + 1,
      user_name: user.user_name,
      admin: user.admin,
    });
  });

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
        <h1>History</h1>
        {/* <SearchBar /> */}
      </Box>
      <Box sx={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(e) => setPageSize(e)}
          rowsPerPageOptions={[10, 20, 50, 100]}
          // checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          components={{
            Toolbar: GridToolbar,
          }}
        ></DataGrid>
      </Box>
    </>
  );
};
