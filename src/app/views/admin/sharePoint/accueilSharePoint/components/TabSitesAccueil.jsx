import React, { useState, useEffect, useMemo } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Typography, IconButton, Tooltip, Toolbar } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
import { MatxLoading } from "app/components";
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

  const paginationData = useMemo(() => data.slice(0, 7), [data]); // Limiter les données à seulement les 5 premiers utilisateurs
  const table = useMaterialReactTable({
    columns,
    data: paginationData, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnFilterModes: false,
    enableColumnOrdering: false,
    enableGrouping: false,
    enableColumnPinning: false,
    enableFacetedValues: false,
    enableRowActions: false,
    enableRowSelection: false,
    enablePagination: false,
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: false,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"]
      }
    },

    renderTopToolbar: ({}) => {
      return (
        <Toolbar>
          <Typography variant="h6">Liste des sites</Typography>
          <Link to="/sites">
            <IconButton>
              <Tooltip title="Voir plus" placement="top">
                <RemoveRedEyeIcon color="primary" />
              </Tooltip>
            </IconButton>
          </Link>
        </Toolbar>
      );
    }
  });
  return (
    <div style={{ marginBottom: "2%" }}>
      {loading ? (
        <MatxLoading />
      ) : (
        <MaterialReactTable table={table} columns={columns} data={data} />
      )}
    </div>
  );
};

const TabSitesAccueil = () => (
  <ThemeProvider theme={theme}>
    <div style={{ fontFamily: "DM Sans" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TabSites />
      </LocalizationProvider>
    </div>
  </ThemeProvider>
);

export default TabSitesAccueil;
