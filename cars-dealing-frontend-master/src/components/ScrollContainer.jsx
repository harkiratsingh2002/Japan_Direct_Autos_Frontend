import { Grid, Paper, Typography } from "@mui/material";
import CarCardComponent from "./carCardComponent";
import styles from "./ScrollContainer.module.css"
import myColors from "../assets/util/myColors";

function ScrollContainer(props){
    return (
        <>
       
        <Grid  sx={{
            overflowX: 'scroll',
            // overflowY: 'hidden',
            whiteSpace: 'nowrap',
            display: 'flex',
                scrollbarWidth: 'thin',          /* "auto" or "thin" */
                scrollbarColor: `${myColors.primaryBlue} ${'#D3D3D3'}`   /* scroll thumb and track */ 
            
            // height: '30vh'
        }} >
            {
                (props.cars).map((car)=>{
                    return <>
                        {/* <Grid m={3} item sx={{
                            display:'inline-flex'
                        }}  > */}
                        <div style={{
                            margin: '2em'
                        }}>

                        <CarCardComponent car={car}  />
                        </div>
                        {/* </Grid> */}
                    </>
                })
            }
        
        </Grid>
        </>
    )
}

export default ScrollContainer;