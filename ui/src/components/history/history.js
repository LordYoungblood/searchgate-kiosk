import { useState, useContext, useEffect } from "react";
import { VehicleContext } from "../VehicleContext";
import { useLoading } from "../contexts/LoadingContext";
import { Box, CircularProgress } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

export const History = () => {
  const { visitorDetails } = useContext(VehicleContext);
  const { isLoading, setIsLoading } = useLoading();
  const [pageSize, setPageSize] = useState(50);

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
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
    },
    {
      field: "state",
      headerName: "State",
      width: 110,
    },
    {
      field: "drivers_license",
      headerName: "Drivers License",
      type: "number",
      width: 110,
    },
    {
      field: "plate",
      headerName: "plate",
      width: 110,
    },
    {
      field: "make",
      headerName: "Make",
      width: 110,
    },
    {
      field: "model",
      headerName: "Model",
      width: 110,
    },
    {
      field: "fullName",
      headerName: "Full DL",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.state || ""} ${params.row.drivers_license || ""}`,
    },
  ];

  const rows = [];
  visitorDetails.map((visitor) => {
    rows.push({
      date:
        visitor.date.split("T")[0] +
        " : " +
        visitor.date.split("T")[1].slice(0, 5),
      id: visitor.id,
      lastName: visitor.last_name,
      firstName: visitor.first_name,
      state: visitor.state,
      drivers_license: visitor.drivers_license,
      plate: visitor.plate,
      make: visitor.make,
      model: visitor.model,
    });
    return rows;
  });

  useEffect(() => {
    // Simulate a delay before loading the data
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 seconds delay
  }, [setIsLoading]);

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
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "77vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
            <h1>History</h1>
          </Box>
          <Box>
            <div style={{ height: "77vh", width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                onPageSizeChange={(e) => setPageSize(e)}
                rowsPerPageOptions={[10, 20, 50, 100]}
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                components={{
                  Toolbar: CustomToolbar,
                }}
              ></DataGrid>
            </div>
          </Box>
        </>
      )}
    </>
  );
};
