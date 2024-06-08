import React, { useState, useEffect, useMemo } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Typography, IconButton, Tooltip, Toolbar } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
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

const TabDemande = () => {
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
            accessorFn: (row) => row.nom,
            id: "nom",
            header: "Nom du Site",
            size: 250
          },

          {
            accessorKey: "type",
            header: "Type du site",
            size: 250
          },
          {
            accessorKey: "catégorie",
            header: "Catégorie du site",
            size: 250
          },
          {
            accessorKey: "statut",
            header: "Statut du site",
            size: 250,
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
          },

          {
            accessorKey: "actions",
            header: "Actions",
            filterVariant: "autocomplete",
            size: 150,
            Cell: () => (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <IconButton>
                  <Tooltip title="Accepter" placement="top">
                    <DoneIcon style={{ color: "#09b66d" }} />
                  </Tooltip>
                </IconButton>

                <IconButton>
                  <Tooltip title="Rejeter" placement="top">
                    <ClearIcon color="error" />
                  </Tooltip>
                </IconButton>
              </Box>
            )
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
    renderTopToolbar: ({}) => {
      return (
        <Toolbar>
          <Typography variant="h6">Liste des demandes</Typography>
          <Link to="/demandes">
            <IconButton>
              <Tooltip title="Voir plus" placement="top">
                <RemoveRedEyeIcon color="primary" />
              </Tooltip>
            </IconButton>
          </Link>
        </Toolbar>
      );
    },
    renderDetailPanel: ({ row }) => (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 4fr"
        }}
      >
        <Box marginLeft={"20%"}>
          <img
            alt="avatar"
            height={100}
            src={userDetails?.avatar}
            loading="lazy"
            style={{ borderRadius: "50%" }}
          />
          <Typography variant="subtitle1">{userDetails?.displayName}</Typography>
        </Box>
        <Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
              position: "sticky"
            }}
          >
            <Typography variant="subtitle1">
              <strong>Nom du site:</strong> {row.original.nom}
            </Typography>

            <Typography variant="subtitle1">
              <strong>Société de l'utilisateur:</strong> {userDetails?.companyName || "-"}
            </Typography>

            <Typography variant="subtitle1">
              <strong>Objectif du site:</strong> {row.original.objectif}
            </Typography>

            <Typography variant="subtitle1">
              <strong>Métier de l'utilisateur:</strong> {userDetails?.jobTitle || "-"}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Description du site:</strong> {row.original.description}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Identité de l'utilisateur:</strong> {userDetails?.mail || "-"}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Département de l'utilisateur:</strong> {userDetails?.department || "-"}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Téléphone de l'utilisateur:</strong> {userDetails?.mobilePhone || "-"}
            </Typography>
          </Box>
        </Box>
      </Box>
    )
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

const TabDemandeWithThemeProvider = () => (
  <ThemeProvider theme={theme}>
    <div style={{ fontFamily: "DM Sans" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TabDemande />
      </LocalizationProvider>
    </div>
  </ThemeProvider>
);

export default TabDemandeWithThemeProvider;
