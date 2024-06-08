import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBox() {
  return (
    <Paper
      component="form"
      sx={{
        p: "0px 12px",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        borderRadius: "15px",
        width: "500px",
        boxShadow: "0px 2px 4px rgba(24, 24, 51, 0.3)" 
      }}
    >
      <InputBase
        style={{ fontFamily: "DM Sans" }}
        sx={{fontSize:"15px", ml: 1, flex: 1 }}
        
        placeholder="Rechercher..."
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

      <IconButton type="button" sx={{ p: "10px", color: "#0d5195" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
