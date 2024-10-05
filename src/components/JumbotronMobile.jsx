import { Grid, Typography } from "@mui/material";
import jumbotronImg from "../assets/images/mobile_bg.png";

const JumbotronMobile = () => {
  return (
    <>
      <Grid container
        sx={{
          backgroundImage: `url(${jumbotronImg})`,
          backgroundPosition: "fixed",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh", // Adjust height and width as needed
          width: "100vw",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        justifyContent={'center'} xs={12}
      >

      </Grid>



    </>
  );
};

export default JumbotronMobile;
