import React, { useMemo, useEffect, useState } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Breadcrumb, MatxLoading } from "app/components";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

// Material UI Imports
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

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
            accessorKey: "userType",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Rôle",
            size: 100
          },
          {
            accessorKey: "department",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Département",
            size: 100
          },
          {
            accessorKey: "jobTitle",
            enableClickToCopy: true,
            header: "Métier",
            size: 100
          },
          {
            accessorKey: "mobilePhone",
            enableClickToCopy: true,
            header: "Téléphone",
            size: 100
          }
        ]
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
    <div style={{ position: "relative", marginBottom: "5%" }}>
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

const UsersTab = () => (
  <ThemeProvider theme={theme}>
    <div style={{ margin: "auto", width: "87%", fontFamily: "DM Sans", padding: "2%" }}>
      <Box marginBottom={"2%"} className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Utilisateurs" }]} />
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TabUsers />
      </LocalizationProvider>
    </div>
  </ThemeProvider>
);

export default UsersTab;
