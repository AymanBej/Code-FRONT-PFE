import { Box, Card, Grid, IconButton, styled, Tooltip } from "@mui/material";
import {  Phone ,Place, Email, Language} from "@mui/icons-material";
import { Small } from "app/components/Typography";

// STYLED COMPONENTS
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "24px !important",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: { padding: "16px !important" }
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  
  "& small": { fontSize:"16px", color: theme.palette.text.secondary },
  "& .icon": { opacity: 0.6, fontSize: "44px", color: theme.palette.primary.main }
}));

const Heading = styled("h6")(({ theme }) => ({
  margin: 0,
  marginTop: "4px",
  fontSize: "14px",
  fontWeight: "500",
  color: theme.palette.primary.main
}));

export default function CardsAide() {
  const cardList = [
    { name: "Téléphone", amount: "+216 123 456 789", Icon: Phone },
    { name: "Localisation", amount: "Sfax ,Tunisie & France", Icon: Place },
    { name: "Email", amount: "Société@gmail.com", Icon: Email },
    { name: "Site web", amount: "www.Société.com", Icon: Language}
  ];

  return (
    <Grid container spacing={3} sx={{ mb: "24px" }}>
      {cardList.map(({ amount, Icon, name }) => (
        <Grid item xs={12} md={6} key={name}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon" />

              <Box ml="12px">
                <Small>{name}</Small>
                <Heading>{amount}</Heading>
              </Box>
            </ContentBox>

            
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
}
