import { Fragment, useState } from "react";
import { Autocomplete, styled, TextField } from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";

const AutoComplete = styled(Autocomplete)(() => ({ width: 300, marginBottom: "16px" }));

const countries = [
  { label: "Afghanistan" },
  { label: "Albania" },
  { label: "Algeria" },
  { label: "Andorra" },
  { label: "Angola" },
  { label: "Antigua and Barbuda" },
  { label: "Argentina" },
  { label: "Armenia" },
  { label: "Australia" },
  { label: "Austria" },
  { label: "Azerbaijan" },
  { label: "Bahamas" },
  { label: "Bahrain" },
  { label: "Bangladesh" },
  { label: "Barbados" },
  { label: "Belarus" },
  { label: "Belgium" },
  { label: "Belize" },
  { label: "Benin" },
  { label: "Bhutan" },
  { label: "Bolivia, Plurinational State of" },
  { label: "Bosnia and Herzegovina" },
  { label: "Botswana" },
  { label: "Brazil" },
  { label: "Brunei Darussalam" },
  { label: "Bulgaria" },
  { label: "Burkina Faso" },
  { label: "Burundi" },
  { label: "Cabo Verde" },
  { label: "Cambodia" },
  { label: "Cameroon" },
  { label: "Canada" },
  { label: "Central African Republic" },
  { label: "Chad" },
  { label: "Chile" },
  { label: "China" },
  { label: "Colombia" },
  { label: "Comoros" },
  { label: "Congo" },
  { label: "Costa Rica" },
  { label: "Croatia" },
  { label: "Cuba" },
  { label: "Cyprus" },
  { label: "Czech Republic" },
  { label: "Denmark" },
  { label: "Djibouti" },
  { label: "Dominica" },
  { label: "Dominican Republic" },
  { label: "Ecuador" },
  { label: "Egypt" },
  { label: "El Salvador" },
  { label: "Equatorial Guinea" },
  { label: "Eritrea" },
  { label: "Estonia" },
  { label: "Eswatini" },
  { label: "Ethiopia" },
  { label: "Fiji" },
  { label: "Finland" },
  { label: "France" },
  { label: "Gabon" },
  { label: "Gambia" },
  { label: "Georgia" },
  { label: "Germany" },
  { label: "Ghana" },
  { label: "Greece" },
  { label: "Grenada" },
  { label: "Guatemala" },
  { label: "Guinea" },
  { label: "Guinea-Bissau" },
  { label: "Guyana" },
  { label: "Haiti" },
  { label: "Holy See" },
  { label: "Honduras" },
  { label: "Hungary" },
  { label: "Iceland" },
  { label: "India" },
  { label: "Indonesia" },
  { label: "Iran, Islamic Republic of" },
  { label: "Iraq" },
  { label: "Ireland" },
  { label: "Italy" },
  { label: "Jamaica" },
  { label: "Japan" },
  { label: "Jordan" },
  { label: "Kazakhstan" },
  { label: "Kenya" },
  { label: "Kiribati" },
  { label: "Korea, Democratic People's Republic of" },
  { label: "Korea, Republic of" },
  { label: "Kuwait" },
  { label: "Kyrgyzstan" },
  { label: "Lao People's Democratic Republic" },
  { label: "Latvia" },
  { label: "Lebanon" },
  { label: "Lesotho" },
  { label: "Liberia" },
  { label: "Libya" },
  { label: "Liechtenstein" },
  { label: "Lithuania" },
  { label: "Luxembourg" },
  { label: "Macao" },
  { label: "Madagascar" },
  { label: "Malawi" },
  { label: "Malaysia" },
  { label: "Maldives" },
  { label: "Mali" },
  { label: "Malta" },
  { label: "Marshall Islands" },
  { label: "Mauritania" },
  { label: "Mauritius" },
  { label: "Mexico" },
  { label: "Micronesia, Federated States of" },
  { label: "Moldova, Republic of" },
  { label: "Monaco" },
  { label: "Mongolia" },
  { label: "Montenegro" },
  { label: "Montserrat" },
  { label: "Morocco" },
  { label: "Mozambique" },
  { label: "Myanmar" },
  { label: "Namibia" },
  { label: "Nauru" },
  { label: "Nepal" },
  { label: "Netherlands" },
  { label: "New Zealand" },
  { label: "Nicaragua" },
  { label: "Niger" },
  { label: "Nigeria" },
  { label: "Niue" },
  { label: "Norfolk Island" },
  { label: "North Macedonia" },
  { label: "Northern Mariana Islands" },
  { label: "Norway" },
  { label: "Oman" },
  { label: "Pakistan" },
  { label: "Palau" },
  { label: "Palestine" },
  { label: "Panama" },
  { label: "Papua New Guinea" },
  { label: "Paraguay" },
  { label: "Peru" },
  { label: "Philippines" },
  { label: "Pitcairn" },
  { label: "Poland" },
  { label: "Portugal" },
  { label: "Puerto Rico" },
  { label: "Qatar" },
  { label: "Réunion" },
  { label: "Romania" },
  { label: "Russian Federation" },
  { label: "Rwanda" },
  { label: "Saint Barthélemy" },
  { label: "Saint Helena, Ascension and Tristan da Cunha" },
  { label: "Saint Kitts and Nevis" },
  { label: "Saint Lucia" },
  { label: "Saint Martin (French part)" },
  { label: "Saint Pierre and Miquelon" },
  { label: "Saint Vincent and the Grenadines" },
  { label: "Samoa" },
  { label: "San Marino" },
  { label: "Sao Tome and Principe" },
  { label: "Saudi Arabia" },
  { label: "Senegal" },
  { label: "Serbia" },
  { label: "Seychelles" },
  { label: "Sierra Leone" },
  { label: "Singapore" },
  { label: "Sint Maarten (Dutch part)" },
  { label: "Slovakia" },
  { label: "Slovenia" },
  { label: "Solomon Islands" },
  { label: "Somalia" },
  { label: "South Africa" },
  { label: "South Georgia and the South Sandwich Islands" },
  { label: "South Sudan" },
  { label: "Spain" },
  { label: "Sri Lanka" },
  { label: "Sudan" },
  { label: "Suriname" },
  { label: "Svalbard and Jan Mayen" },
  { label: "Sweden" },
  { label: "Switzerland" },
  { label: "Syrian Arab Republic" },
  { label: "Taiwan, Province of China" },
  { label: "Tajikistan" },
  { label: "Tanzania, United Republic of" },
  { label: "Thailand" },
  { label: "Timor-Leste" },
  { label: "Togo" },
  { label: "Tokelau" },
  { label: "Tonga" },
  { label: "Trinidad and Tobago" },
  { label: "Tunisia" },
  { label: "Turkey" },
  { label: "Turkmenistan" },
  { label: "Turks and Caicos Islands" },
  { label: "Tuvalu" },
  { label: "Uganda" },
  { label: "Ukraine" },
  { label: "United Arab Emirates" },
  { label: "United Kingdom" },
  { label: "United States" },
  { label: "Uruguay" },
  { label: "Uzbekistan" },
  { label: "Vanuatu" },
  { label: "Venezuela, Bolivarian Republic of" },
  { label: "Viet Nam" },
  { label: "Wallis and Futuna" },
  { label: "Western Sahara" },
  { label: "Yemen" },
  { label: "Zambia" },
  { label: "Zimbabwe" }
];


const filter = createFilterOptions();

export default function AutocompleteCombo() {
  const [value, setValue] = useState(null);

  const handleChange = (_, newValue) => {
    if (newValue && newValue.inputValue) {
      setValue({ label: newValue.inputValue });
      return;
    }
    setValue(newValue);
  };

  const filterOptions = (options, params) => {
    const filtered = filter(options, params);
    if (params.inputValue !== "") {
      filtered.push({ inputValue: params.inputValue, label: `Add "${params.inputValue}"` });
    }
    return filtered;
  };

  return (
    <Fragment>
      <AutoComplete
        options={countries}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField {...params} label="Pays" variant="outlined" fullWidth />
        )}
      />

      <AutoComplete
        value={value}
        options={countries}
        onChange={handleChange}
        filterOptions={filterOptions}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === "string") return option;
          if (option.inputValue) return option.inputValue;
          return option.label;
        }}
        renderOption={(option) => option.label}
        style={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Free solo with text demo" variant="outlined" fullWidth />
        )}
      />

      <AutoComplete
        options={countries}
        getOptionLabel={(option) => option.label}
        getOptionDisabled={(option) => option === countries[0] || option === countries[2]}
        renderInput={(params) => (
          <TextField {...params} label="Disabled option" variant="outlined" fullWidth />
        )}
      />
    </Fragment>
  );
}
