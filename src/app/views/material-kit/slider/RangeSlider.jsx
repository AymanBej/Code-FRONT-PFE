import React, { useState, useEffect } from "react";
import { Box, Slider, Typography } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

function valuetext(value) {
  return `${value}MB`;
}

const RangeSlider = () => {
  const { control, setValue } = useFormContext();
  const [value, setValueState] = useState([5000, 15000]);

  const handleChange = (_, newValue) => {
    const [newValue1, newValue2] = newValue;
    if (newValue2 < newValue1 + 1000) {
      setValueState([newValue1, newValue1 + 1000]);
    } else {
      setValueState(newValue);
    }
    setValue("StorageQuota", newValue1); // Store value in react-hook-form
    setValue("StorageQuotaWarningLevel", newValue2); // Store value in react-hook-form
  };

  useEffect(() => {
    setValue("StorageQuota", value[0]);
    setValue("StorageQuotaWarningLevel", value[1]);
  }, [value, setValue]);

  return (
    <Box border={1} borderColor="#b2b1bb" borderRadius={1} p={1}>
      <Typography
        style={{ color: "#b2b1bb", fontFamily: "DM Sans" }}
        id="range-slider"
        gutterBottom
      >
        Quotas du stockage (MB)
      </Typography>

      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        min={1000}
        max={25600}
      />
    </Box>
  );
};

export default RangeSlider;
