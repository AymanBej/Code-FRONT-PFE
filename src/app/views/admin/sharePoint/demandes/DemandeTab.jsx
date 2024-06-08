import React, { useState, useEffect, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importer les styles CSS
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Breadcrumb, MatxLoading } from "app/components";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import WarningIcon from "@mui/icons-material/Warning";

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
  Button,
  CircularProgress
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";

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
  const [userDetails, setUserDetails] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [creatingSite, setCreatingSite] = useState(false);

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

          const avatarResponse = await fetch(
            `https://localhost:7048/api/AvatarUsers/users/${userId}/avatar`,
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

  const compareDemands = (oldDemands, newDemands) => {
    const oldIds = oldDemands.map((demand) => demand.id);
    const newIds = newDemands.map((demand) => demand.id);
    const newDemandCount = newIds.filter((id) => !oldIds.includes(id)).length;
    return newDemandCount;
  };

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

          // Compare new demands with old demands
          const oldDemands = JSON.parse(localStorage.getItem("lastDemands") || "[]");
          const newDemandCount = compareDemands(oldDemands, fetchedData);
          if (newDemandCount > 0) {
            toast.info(
              `${newDemandCount} nouvelle(s) demande(s) ajoutée(s) depuis votre dernière connexion!`,
              {
                position: "top-right",
                style: {
                  fontFamily: "DM Sans"
                }
              }
            );
          }

          // Store current demands in localStorage
          localStorage.setItem("lastDemands", JSON.stringify(fetchedData));
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleConfirmAcceptClick = (row) => {
    setSelectedRow(row);
    setOpenDialog("accept");
  };

  const handleRejectClick = (row) => {
    setSelectedRow(row);
    setOpenDialog("reject");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRow(null);
  };

  const handleConfirmReject = async () => {
    if (selectedRow) {
      const accessToken = localStorage.getItem("authToken");

      try {
        const response = await fetch(
          `https://localhost:7048/api/Demande_SharePoint/${selectedRow.id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              ...selectedRow,
              statut: "Refusée"
            })
          }
        );

        if (response.ok) {
          setData((prevData) =>
            prevData.map((demande) =>
              demande.id === selectedRow.id ? { ...demande, statut: "Refusée" } : demande
            )
          );
          toast.error("La demande a été refusée!", {
            position: "top-right",
            style: {
              fontFamily: "DM Sans" // Appliquer DM Sans
            }
          });
        } else {
          throw new Error("Failed to update statut");
        }
      } catch (error) {
        console.error("Error updating statut:", error);
      } finally {
        handleCloseDialog();
      }
    }
  };

  const handleConfirmAccept = async () => {
    if (selectedRow) {
      const accessToken = localStorage.getItem("authToken");
      setCreatingSite(true);

      try {
        const response = await fetch(
          `https://localhost:7048/api/Demande_SharePoint/${selectedRow.id}/createSite`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json"
            }
          }
        );

        if (response.ok) {
          setData((prevData) =>
            prevData.map((demande) =>
              demande.id === selectedRow.id ? { ...demande, statut: "Acceptée" } : demande
            )
          );
          toast.success("Le site a été créé avec succès!", {
            position: "top-right",
            style: {
              fontFamily: "DM Sans" // Appliquer DM Sans
            }
          });
        } else {
          throw new Error("Failed to create site");
        }
      } catch (error) {
        console.error("Error creating site:", error);
      } finally {
        setCreatingSite(false);
        handleCloseDialog();
      }
    }
  };

  const columns = useMemo(
    () => [
      {
        id: "demandeInfo",
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
            size: 150
          },
          {
            accessorFn: (row) => row.owner,
            header: "Propriétaire du site",
            size: 250
          },
          {
            accessorFn: (row) => row.statut,
            header: "Statut du site",
            size: 150,
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
            Cell: ({ row }) => (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                {row.original.statut === "En attente" && (
                  <>
                    <IconButton onClick={() => handleConfirmAcceptClick(row.original)}>
                      <Tooltip title="Accepter" placement="top">
                        <DoneIcon style={{ color: "#09b66d" }} />
                      </Tooltip>
                    </IconButton>
                    <IconButton onClick={() => handleRejectClick(row.original)}>
                      <Tooltip title="Rejeter" placement="top">
                        <ClearIcon color="error" />
                      </Tooltip>
                    </IconButton>
                  </>
                )}
              </Box>
            )
          }
        ]
      }
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowSelection: false,
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: true
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
              <strong>Nom du site:</strong> {row.original.title}
            </Typography>

            <Typography variant="subtitle1">
              <strong>Société de l'utilisateur:</strong> {userDetails?.companyName || "-"}
            </Typography>

            <Typography variant="subtitle1">
              <strong>Objectif du site:</strong> {row.original.objectif}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Département de l'utilisateur:</strong> {userDetails?.department || "-"}
            </Typography>

            <Typography variant="subtitle1">
              <strong>Adresse du site:</strong> {row.original.url}
            </Typography>

            <Typography variant="subtitle1">
              <strong>Métier de l'utilisateur:</strong> {userDetails?.jobTitle || "-"}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Type du site:</strong> {row.original.template}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Téléphone de l'utilisateur:</strong> {userDetails?.mobilePhone || "-"}
            </Typography>

            <Typography variant="subtitle1">
              <strong>Description du site:</strong> {row.original.description}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Identité de l'utilisateur:</strong> {userDetails?.mail || "-"}
            </Typography>
          </Box>
        </Box>
      </Box>
    )
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
          {creatingSite && (
            <div
              style={{
                position: "fixed", // Utiliser fixed pour qu'il apparaisse toujours au-dessus
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(255, 255, 255, 0.7)",
                zIndex: 1500, // Un z-index élevé pour être sûr qu'il soit au-dessus de tout
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <MatxLoading />
            </div>
          )}
          <MaterialReactTable table={table} data={data} />
          <Dialog
            open={openDialog === "reject"}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
              style: {
                zIndex: 1400 // Assurez-vous que le z-index soit inférieur à celui de MatxLoading
              }
            }}
          >
            <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
              <WarningIcon color="error" style={{ fontSize: 40, marginBottom: "10px" }} />
              <Typography variant="h6">{"Confirmation de rejet"}</Typography>
            </DialogTitle>

            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Tu es sûr de rejeter cette demande ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Annuler
              </Button>
              <Button onClick={handleConfirmReject} color="error" autoFocus>
                Oui
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openDialog === "accept"}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
              style: {
                zIndex: 1400 // Assurez-vous que le z-index soit inférieur à celui de MatxLoading
              }
            }}
          >
            <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
              <WarningIcon color="success" style={{ fontSize: 40, marginBottom: "10px" }} />
              <Typography variant="h6">{"Confirmation d'acceptation"}</Typography>
            </DialogTitle>

            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Tu es sûr d'accepter cette demande ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Annuler
              </Button>
              <Button onClick={handleConfirmAccept} color="success" autoFocus>
                Oui
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
};

const TabDemandeWithThemeProvider = () => (
  <ThemeProvider theme={theme}>
    <div style={{ margin: "auto", width: "85%", fontFamily: "DM Sans", padding: "2%" }}>
      <Box marginBottom={"2%"} className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Demandes" }]} />
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TabDemande />
      </LocalizationProvider>
      <ToastContainer />
    </div>
  </ThemeProvider>
);

export default TabDemandeWithThemeProvider;
