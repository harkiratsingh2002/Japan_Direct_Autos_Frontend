import { Grid, Typography } from "@mui/material";
import jumbotronImg from "../assets/images/car-home-bg-3.jpeg";

const JumbotronMobile = () => {
  return (
    <>
      <Grid container
        sx={{
          backgroundImage: `url(${jumbotronImg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "75vh", // Adjust height and width as needed
          width: "100vw",
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        justifyContent={'center'} xs={12}
      >
        <Grid xs={10} mt={3} style={{
          textAlign: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: "20px",
          borderRadius: "10px",
        }}>

          <Typography color={"white"} variant="h5" component={"h1"} sx={{ fontFamily: 'Garamond, serif' }}>
            Get your Dream Car Today!
          </Typography>
          <Typography mt={1} color={"white"} variant="h6" component={"h2"} sx={{ fontFamily: 'Garamond, serif' }}>
            Specialist in new and old japanese vehicles.
          </Typography>
        </Grid>
      </Grid>
      <Grid container height={'75vh'}>

      </Grid>
    </>
  );
};

export default JumbotronMobile;
