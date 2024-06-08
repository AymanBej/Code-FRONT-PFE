import React, { useState, useEffect, useMemo } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { IconButton, Tooltip, Toolbar, Typography } from "@mui/material";
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

const DemandeTabUser = () => {
  const [loading, setLoading] = useState(true);

  const [userDetails, setUserDetails] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const accessToken = localStorage.getItem("authToken");

      try {
        const userId = "1c36fb4a-229a-4951-906c-eb4fb909aebf"; // ID de l'utilisateur spécifique
        const response = await fetch(`https://graph.microsoft.com/beta/users/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        });

        if (response.ok) {
          const userData = await response.json();
          console.log("User data:", userData);
          setUserDetails(userData);

          // Fetch avatars for users
          const avatarResponse = await fetch(
            `https://graph.microsoft.com/beta/users/${userId}/photos/648x648/$value`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }
          );
          if (avatarResponse.ok) {
            const blob = await avatarResponse.blob();
            const avatarUrl = URL.createObjectURL(blob);
            setUserDetails({ ...userData, avatar: avatarUrl });
          } else {
            console.error("Failed to fetch avatar:", avatarResponse.status);
            // Assign default avatar if avatar fetching fails
            setUserDetails({
              ...userData,
              avatar:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1024px-Windows_10_Default_Profile_Picture.svg.png"
            });
          }
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("authToken");

      try {
        const response = await fetch("https://localhost:7048/api/Demande_SharePoint", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        });

        if (response.ok) {
          const fetchedData = await response.json();
          console.log("this is the data", fetchedData);
          setData(fetchedData);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        id: "siteInfo",
        header: "",
        columns: [
          {
            accessorFn: (row) => row.title,
            header: "Nom du Site",
            size: 250
          },

          {
            accessorFn: (row) => row.catégorie,
            header: "Catégorie du site",
            size: 100
          },

          {
            accessorFn: (row) => row.objectif,
            header: "Objectif du site",
            size: 250
          },
          {
            accessorFn: (row) => row.statut,
            header: "Statut du site",
            size: 100,
            Cell: ({ row }) => {
              let color;
              switch (row.original.statut) {
                case "En attente":
                  color = "orange";
                  break;
                case "Acceptée":
                  color = "green";
                  break;
                case "Refusée":
                  color = "red";
                  break;
                default:
                  color = "black";
              }
              return (
                <Typography style={{ color, fontWeight: "bold" }}>{row.original.statut}</Typography>
              );
            }
          }
        ]
      }
    ],
    []
  );

  const paginationData = useMemo(() => data.slice(0, 5), [data]); // Limiter les données à seulement les 5 premiers utilisateurs
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
    renderTopToolbar: () => {
      return (
        <Toolbar>
          <Typography variant="h6">Liste des demandes</Typography>
          <Link to="/demandesUser">
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

const DemandeTabUserAccueil = () => (
  <ThemeProvider theme={theme}>
    <div style={{ fontFamily: "DM Sans" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemandeTabUser />
      </LocalizationProvider>
    </div>
  </ThemeProvider>
);

export default DemandeTabUserAccueil;
