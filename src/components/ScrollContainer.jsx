import { Card, CardContent, CardMedia, Grid, Paper, Typography } from "@mui/material";
import CarCardComponent from "./carCardComponent";
import styles from "./ScrollContainer.module.css";
import myColors from "../assets/util/myColors";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ScrollContainer(props) {
  const matches = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  return (
    <>
      <Grid
        sx={{
          overflowX: "scroll",
          // overflowY: 'hidden',
          whiteSpace: "nowrap",
          display: "flex",
          scrollbarWidth: "thin" /* "auto" or "thin" */,
          scrollbarColor: `${
            myColors.primaryBlue
          } ${"#D3D3D3"}` /* scroll thumb and track */,

          // height: '30vh'
        }}
      >
        <>
          {props.cars.map((car) => {
            return (
              <>
                {/* <Grid m={3} item sx={{
                            display:'inline-flex'
                        }}  > */}
                <div
                  style={{
                    margin: "2em",
                  }}
                >
                  <CarCardComponent inMobile={matches} car={car} />
                </div>
                {/* </Grid> */}
              </>
            );
          })}
          <Card
            sx={{
              maxWidth: 345,
              // width: props.inMobile ? 280 : 345,
              minWidth: 280,
              maxHeight: 280,
              marginTop: 5,
              display: "inline-flex",
              justifyContent: "space-between",
              flexDirection: "column",
              borderRadius: "32px",
              background: "#e0e0e0",
              boxShadow: "24px 24px 26px #a8a8a8, -24px -24px 26px #ffffff",
              cursor: 'pointer'
            }}
            onClick={()=>{
                if(props.carType=='new'){
                    navigate('/new-cars')
                }
                else if(props.carType == 'used'){
                    navigate('/used-cars')
                }
                else if(props.carType == 'rental'){
                    navigate('/rental-cars')
                }
            }}
          >
            {/* <CardMedia
              sx={{ height: 140 }}
              // image={links.backendUrl + "/" + props.car.images[0]}
              // title={props.car.name}
            /> */}
            <CardContent sx={{
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '35%'
            }}>
                <Typography variant="h6">

                    See More
                </Typography>
                
                </CardContent>
          </Card>
        </>
      </Grid>
    </>
  );
}

export default ScrollContainer;
