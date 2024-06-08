import React, { useState, useEffect, useMemo } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Typography, IconButton, Tooltip, Toolbar } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
import { MatxLoading } from "app/components";

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

const TabUsers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const accessToken = localStorage.getItem("authToken");

        const url = "https://localhost:7048/api/GetUsers/users";
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        });

        const fetchedData = await response.json();
        // Update avatar URL and handle empty fields
        const usersWithAvatarAndEmptyFields = await Promise.all(
          fetchedData.value.map(async (user) => {
            const avatarResponse = await fetch(
              `https://localhost:7048/api/AvatarUsers/users/${user.id}/avatar`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`
                }
              }
            );
            if (avatarResponse.ok) {
              const blob = await avatarResponse.blob();
              const avatarUrl = URL.createObjectURL(blob);
              // Replace empty fields with "---"
              const userDataWithEmptyFields = Object.fromEntries(
                Object.entries(user).map(([key, value]) => [key, value || "-"])
              );
              return { ...userDataWithEmptyFields, avatar: avatarUrl };
            } else {
              // Set default avatar URL and replace empty fields with "---"
              const userDataWithEmptyFields = Object.fromEntries(
                Object.entries(user).map(([key, value]) => [key, value || "-"])
              );
              return {
                ...userDataWithEmptyFields,
                avatar:
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1024px-Windows_10_Default_Profile_Picture.svg.png"
              };
            }
          })
        );
        setData(usersWithAvatarAndEmptyFields);
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
        id: "employee",
        header: "",
        columns: [
          {
            accessorKey: "displayName",
            id: "name",
            header: "Nom & Prénom",
            enableClickToCopy: true,
            size: 250,
            Cell: ({ row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem"
                }}
              >
                <img
                  alt="avatar"
                  height={30}
                  src={row.original.avatar}
                  loading="lazy"
                  style={{ borderRadius: "50%" }}
                />
                <span>{row.original.displayName}</span>
              </Box>
            )
          },
          {
            accessorKey: "mail",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Email",
            size: 100
          },
          {
            accessorKey: "companyName",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Société",
            size: 100
          },

          {
            accessorKey: "department",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Département",
            size: 100
          },
          
        ]
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
          <Typography variant="h6">Liste des utilisateurs</Typography>
          <Link to="/utilisateurs">
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

const UsersTab = () => (
  <ThemeProvider theme={theme}>
    <div style={{ fontFamily: "DM Sans" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TabUsers />
      </LocalizationProvider>
    </div>
  </ThemeProvider>
);

export default UsersTab;
