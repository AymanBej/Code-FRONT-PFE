import React, { useState, useEffect, useMemo } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Breadcrumb, MatxLoading } from "app/components";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from "@mui/icons-material/Warning";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [lastDemands, setLastDemands] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const accessToken = localStorage.getItem("authToken");

      try {
        // Fetch user data
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

        // Fetch demand data
        const demandResponse = await fetch("https://localhost:7048/api/Demande_SharePoint", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        });

        if (demandResponse.ok) {
          const fetchedData = await demandResponse.json();
          setData(fetchedData);

          // Compare new demands with last demands
          const lastDemands = JSON.parse(localStorage.getItem("lastDemands") || "[]");
          console.log("lastDemands:", lastDemands); // Log for debugging
          console.log("fetchedData:", fetchedData); // Log for debugging

          const newDemands = fetchedData.filter(
            (demand) => !lastDemands.some((lastDemand) => lastDemand.id === demand.id)
          );

          console.log("newDemands:", newDemands); // Log for debugging

          // Check for status changes and show alerts
          fetchedData.forEach((demand) => {
            const lastDemand = lastDemands.find((lastDemand) => lastDemand.id === demand.id);
            if (lastDemand) {
              if (lastDemand.statut === "En attente" && demand.statut === "Acceptée") {
                toast.success("Acceptation d'une demande", {
                  position: "top-right",
                  style: {
                    fontFamily: "DM Sans" // Appliquer DM Sans
                  }
                });
              } else if (lastDemand.statut === "En attente" && demand.statut === "Refusée") {
                toast.error("Refus d'une demande", {
                  position: "top-right",
                  style: {
                    fontFamily: "DM Sans" // Appliquer DM Sans
                  }
                });
              }
            }
          });

          // Store current demands in localStorage
          localStorage.setItem("lastDemands", JSON.stringify(fetchedData));
        } else {
          throw new Error("Failed to fetch demand data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle delete action
  const handleDelete = async () => {
    const accessToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(`https://localhost:7048/api/Demande_SharePoint/${selectedId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        setData((prevData) => prevData.filter((demande) => demande.id !== selectedId));
        setDialogOpen(false);
        setSelectedId(null);
        toast.error("La demande a été supprimée !", {
          position: "top-right",
          style: {
            fontFamily: "DM Sans" // Appliquer DM Sans
          }
        });
      } else {
        console.error("Failed to delete demande");
      }
    } catch (error) {
      console.error("Error deleting demande:", error);
    }
  };

  const handleOpenDialog = (id) => {
    setSelectedId(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedId(null);
  };

  const columns = useMemo(
    () => [
      {
        id: "siteInfo",
        header: "",
        columns: [
          {
            accessorFn: (row) => row.title,
            header: "Nom du Site",
            size: 150
          },
          {
            accessorFn: (row) => row.template,
            header: "Type du site",
            size: 100
          },
          {
            accessorFn: (row) => row.catégorie,
            header: "Catégorie du site",
            size: 100
          },
          {
            accessorFn: (row) => row.owner,
            header: "Propriétaire du site",
            size: 250
          },
          {
            accessorFn: (row) => row.url,
            header: "Adresse du site",
            size: 200
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
          },
          {
            accessorKey: "actions",
            header: "Actions",
            filterVariant: "autocomplete",
            size: 100,
            Cell: ({ row }) =>
              row.original.statut === "En attente" ? (
                <IconButton onClick={() => handleOpenDialog(row.original.id)}>
                  <Tooltip title="Supprimer" placement="top">
                    <DeleteIcon color="error" />
                  </Tooltip>
                </IconButton>
              ) : null
          }
        ]
      }
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: false,
    enableRowSelection: false,
    enablePagination: true,
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: true,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"]
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
        <>
          <MaterialReactTable table={table} columns={columns} data={data} />
          <ToastContainer />
        </>
      )}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
          <WarningIcon color="error" style={{ fontSize: 40, marginBottom: "10px" }} />
          <Typography variant="h6">Confirmation de suppression </Typography>
        </DialogTitle>

        <DialogContent>
          <DialogContentText>Tu es sûr de vouloir supprimer cette demande?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDelete} color="error">
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const DemandeTabUserWithThemeProvider = () => (
  <ThemeProvider theme={theme}>
    <div style={{ margin: "auto", width: "85%", fontFamily: "DM Sans", padding: "2%" }}>
      <Box marginBottom={"2%"} className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Demandes" }]} />
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemandeTabUser />
      </LocalizationProvider>
    </div>
  </ThemeProvider>
);

export default DemandeTabUserWithThemeProvider;
