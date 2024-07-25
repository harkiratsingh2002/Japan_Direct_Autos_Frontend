import { useEffect } from "react"
import myColors from "../assets/util/myColors"
import { Grid } from "@mui/material"
import StarIcon from '@mui/icons-material/Star';

const RatingBarComponent = ({percent, numberOfVotes, feild})=>{

    useEffect(()=>{

        console.log('in rating bar component...!!!')
    },[])

    
    return (

        <>
        
            <Grid container >

            <Grid item style={{
                height: '0.32em',
                width: '69%',
                backgroundColor: myColors.offWhite,
                marginBottom: '0.45em',
                marginTop: '0.65em',
                borderRadius: '5px',
                
            }}>
                <Grid item style={{
                    height: '100%',
                    width: percent +'%',
                    backgroundColor: myColors.primaryBlue,
                    transition: 'width 1s ease-in-out'
                }}>
        
                </Grid>
            </Grid>
                <Grid item style={{
                    width: '29%',
                    marginTop: '0.27em',
                    fontSize: '0.9em',
                    height: '1.1em',
                    paddingLeft: '1.1em',
                    color: myColors.textBlack
                    // paddingBottom
                }}>{`${feild} `} <StarIcon sx={{
                    fontSize: '1.5em',
                    // paddingTop: '0.5em'
                    verticalAlign: 'middle'
                }} /><span style={{
                    fontWeight: 'light'
                }}> {` ${numberOfVotes} reviews`}  </span></Grid>
            </Grid>
           

            
        </>
    )
}

export default RatingBarComponent;