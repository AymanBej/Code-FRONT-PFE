import React, { useState, useEffect } from "react";
import { MenuItem, Grid, Autocomplete, TextField } from "@mui/material";
import { Controller, useWatch, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import RangeSlider from "../../slider/RangeSlider";

// FormField Component
const FormField = ({ id, label, required = true, InputLabelProps = {}, ...props }) => (
  <Controller
    name={id}
    render={({ field }) => (
      <TextField
        id={id}
        label={label}
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{ fontFamily: "DM Sans" }}
        InputLabelProps={{
          sx: {
            fontFamily: "DM Sans",
            ...InputLabelProps.sx
          },
          ...InputLabelProps
        }}
        InputProps={{
          sx: {
            fontFamily: "DM Sans"
          }
        }}
        required={required}
        {...field}
        {...props}
      />
    )}
  />
);

// Define PropTypes for FormField
FormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool, // Not required because you have a default value
  InputLabelProps: PropTypes.object // Added PropTypes for InputLabelProps
};

const SiteForm = () => {
  const { setValue } = useFormContext();
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const siteName = useWatch({ name: "Title" });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem("authToken");
        const response = await fetch("https://graph.microsoft.com/beta/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        });
        const userData = await response.json();
        const email = userData.mail;
        const domainName = email.split("@")[1].split(".")[0];
        setDomain(`https://${domainName}.sharepoint.com/sites/`);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const accessToken = localStorage.getItem("authToken");
        const response = await fetch("https://localhost:7048/api/GetUsers/users", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        });
        const userData = await response.json();

        if (userData && userData.value && Array.isArray(userData.value)) {
          const userEmails = userData.value.map((user) => user.mail);
          setUsers(userEmails);
          console.log(userEmails);
        } else {
          console.error("Unexpected user data format:", userData);
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };

    fetchUserData();
    fetchUsers();
  }, []);

  useEffect(() => {
    const sanitizedSiteName = siteName ? siteName.replace(/\s+/g, "") : "";
    setValue("Url", `${domain}${sanitizedSiteName}`);
  }, [siteName, domain, setValue]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormField id="Title" label="Nom du site" required />
      </Grid>

      <Grid item xs={6}>
        <FormField id="objectif" label="Objectif du site" required multiline />
      </Grid>

      <Grid item xs={6}>
        <FormField id="Template" label="Type du site" select required>
          {Templates.map((template) => (
            <MenuItem key={template.title} value={template.title} style={{ fontFamily: "DM Sans" }}>
              {template.label} {" ---> "} Réf : {template.title}
            </MenuItem>
          ))}
        </FormField>
      </Grid>

      <Grid item xs={6}>
        <FormField id="catégorie" label="Catégorie du site" select required>
          {Catégories.map((categorie) => (
            <MenuItem
              key={categorie.label}
              value={categorie.label}
              style={{ fontFamily: "DM Sans" }}
            >
              {categorie.label}
            </MenuItem>
          ))}
        </FormField>
      </Grid>

      <Grid item xs={6}>
        <Autocomplete
          options={users.filter((option) => option)}
          getOptionLabel={(option) => option || ""}
          renderInput={(params) => (
            <FormField
              {...params}
              id="Owner"
              label="Propriétaire du site"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
          )}
          onChange={(event, value) => {
            setValue("Owner", value);
          }}
        />
      </Grid>

      <Grid item xs={6}>
        <FormField
          label="Adresse du site"
          id="Url"
          variant="outlined"
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
            sx: {
              fontFamily: "DM Sans"
            }
          }}
          InputLabelProps={{
            shrink: true, // Force the label to shrink
            sx: {
              fontFamily: "DM Sans"
            }
          }}
        />
      </Grid>

      <Grid style={{ margin: "auto" }} item xs={6}>
        <FormField id="Description" label="Description du site" multiline required />
      </Grid>
      <Grid item xs={6}>
        <RangeSlider />
      </Grid>
    </Grid>
  );
};
export default SiteForm;

const Catégories = [
  { label: "Marketing" },
  { label: "RH" },
  { label: "Santé" },
  { label: "Développement Logiciel" },
  { label: "Agriculture" },
  { label: "Finance" },
  { label: "Droit" },
  { label: "Commerce" },
  { label: "Mécanique" },
  { label: "Électronique" },
  { label: "Autre domaine" }
];

const Templates = [
  { title: "GLOBAL#0", label: "Global template" },
  { title: "STS#3", label: "Team site (No Microsoft 365 group)" },
  { title: "STS#0", label: "Team site (Classic experience)" },
  { title: "STS#1", label: "Blank Site" },
  { title: "STS#2", label: "Document Workspace" },
  { title: "COMMUNITY#0", label: "Community Site" },
  { title: "COMMUNITYPORTAL#0", label: "Community Portal" },
  { title: "GROUP#0", label: "Team site" },
  { title: "SITEPAGEPUBLISHING#0", label: "Communication site" },
  { title: "TEAMCHANNEL#0", label: "Team Channel0" },
  { title: "TEAMCHANNEL#1", label: "Team Channel1" },
  { title: "TestSite#0", label: "Test Site" }
];
