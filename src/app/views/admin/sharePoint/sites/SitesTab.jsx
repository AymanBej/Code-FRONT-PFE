import React, { useMemo, useEffect, useState } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Breadcrumb, MatxLoading } from "app/components";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";

const theme = createTheme({
  palette: {
    background: {
      default: "#FFF"
    }
  },
  typography: {
    fontFamily: "DM Sans"
  }
});

const TabSites = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const accessToken = localStorage.getItem("authToken");

        const url = "https://localhost:7048/api/AllSites/sites";
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        });

        const fetchedData = await response.json();
        const formattedData = fetchedData.value.map((site) => ({
          createdDateTime: format(new Date(site.createdDateTime), "yyyy-MM-dd HH:mm:ss"),
          lastModifiedDateTime: format(new Date(site.lastModifiedDateTime), "yyyy-MM-dd HH:mm:ss"),
          displayName: site.displayName,
          hostname: site.siteCollection.hostname,
          webUrl: site.webUrl
        }));

        setData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "displayName",
        header: "Nom du Site",
        size: 250
      },
      {
        accessorKey: "createdDateTime",
        header: "Date de Création",
        size: 250
      },
      {
        accessorKey: "lastModifiedDateTime",
        header: "Dernière Modification",
        size: 250
      },

      {
        accessorKey: "webUrl",
        header: "URL du Site",
        size: 250,
        Cell: ({ row }) => (
          <a href={row.original.webUrl} target="_blank" rel="noopener noreferrer">
            {row.original.webUrl}
          </a>
        )
      }
    ],
    []
  );

  useMaterialReactTable({
    columns,
    data,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: false,
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: true,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"]
      }
    },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined"
    },
    muiPaginationProps: {
      color: "primary",
      rowsPerPageOptions: [10, 20, 30],
      shape: "rounded",
      variant: "outlined"
    }
  });

  return (
    <div style={{ position: "relative",marginBottom:"5%" }}>
      {loading ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
        >
          <MatxLoading />
        </div>
      ) : (
        <MaterialReactTable columns={columns} data={data} />
      )}
    </div>
  );
};

const SitesTab = () => (
  <ThemeProvider theme={theme}>
    <div style={{ margin: "auto", width: "87%", fontFamily: "DM Sans", padding: "2%" }}>
      <Box marginBottom={"2%"} className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Sites" }]} />
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TabSites />
      </LocalizationProvider>
    </div>
  </ThemeProvider>
);

export default SitesTab;
