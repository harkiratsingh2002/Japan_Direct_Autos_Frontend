import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, Rating, TextField } from "@mui/material";
import importantFormFunctions from "../assets/util/importantFormFunctions";
import links from "../assets/util/links";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import { useDispatch } from "react-redux";
import { endLoader, startLoader } from "../reduxStore/loadingSlice";
import { useMediaQuery } from '@mui/material';


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '50%',
  bgcolor: "background.paper",
//   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function BasicModal({ openModal, handleCloseModal, setReviews }) {
  const navigate = useNavigate()
  const params = useParams();
  const dispatch = useDispatch();
  const matches = useMediaQuery('(max-width:600px)');
  if(matches){
    style.width = '65%'
  }
    // const [carRatingValue,setCarRatingValue] = React.useState(0);
    let userToken = null
    if(localStorage.getItem('userData')){

       userToken = (JSON.parse(localStorage.getItem('userData'))).userToken ;
      console.log('userToken',userToken);
    }
    const [reviewFormData,setReviewFormData] = React.useState({
      carRating: {
        value: null,
        error: '',
        hasError: false
      },
      carReviewText: {
        value: '',
        error: '',
        hasError: false
      }
    })
    
    const handleReviewFormDataSubmit = ()=>{
      if(importantFormFunctions.checkRequired(reviewFormData.carRating.value)){
        // alert('Rating feild is required.');
        Swal.fire({
          title: 'error',
          text: 'Rating feild is required.',
          icon: 'error',
          // confirmButtonText: 'Cool'
        })
      }
      else if((importantFormFunctions.checkRequired(reviewFormData.carReviewText.value))){
        // alert('Please add a review to continue.');
        Swal.fire({
          title: 'error',
          text: 'Please add a review to continue.',
          icon: 'error',
          // confirmButtonText: 'Cool'
        })
      }
      else if(!importantFormFunctions.checkReviewLength(reviewFormData.carReviewText.value)){
        // alert('review must be less than 500 words');
        Swal.fire({
          title: 'error',
          text: 'review must be less than 500 words',
          icon: 'error',
          // confirmButtonText: 'Cool'
        })
      }
      else{
        // post Review
        let reviewData = {
          carRating: reviewFormData.carRating.value,
          carReviewText: reviewFormData.carReviewText.value,
          carId: params.carId
        }
        if(userToken){
          dispatch(startLoader())
          fetch(links.backendUrl + '/post-review',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${userToken}`
            },
            body: JSON.stringify(reviewData) 
          })
          .then((res)=>{
            if(res.status<200 || res.status>299){
              res.json().then((err)=>{
                
                // alert(err.message)})
                dispatch(endLoader())
                Swal.fire({
                  title: 'error',
                  text: err.message,
                  icon: 'error',
                  // confirmButtonText: 'Cool'
                })
                

              })
            }
              
              return res.json();
            
          })
          .then((result)=>{
            
            // alert(result.message);
            Swal.fire({
              title: 'Success',
              text: result.message,
              icon: 'succeess',
              // confirmButtonText: 'Cool'
            })
            handleCloseModal();
            window.location.reload(true)
          })
        }
        else{
          navigate('/login')
        }
      }
      // let emailTest = importantFormFunctions.checkEmail
    }
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container>
            <Grid item xs={12}>
              <Typography component="legend">Rating</Typography>
              <Rating
                name="carRating"
                value={reviewFormData.carRating.value}
                onChange={(event, newValue) => {
                  setReviewFormData((oldState)=>{
                    let newState = {...oldState};
                    newState.carRating.value = newValue;
                    return newState;
                  })
                }}
              />
            </Grid>
            <Grid item mt={2} xs={12}>

          <TextField value={reviewFormData.carReviewText.value} onChange={(e)=>{
             setReviewFormData((oldState)=>{
              let newState = {...oldState}
              newState.carReviewText.value = e.target.value;
              return newState;
            })
          }}  fullWidth multiline rows={4} id="standard-basic" label="Your Review..." variant="standard" />
            </Grid>
            <Grid onClick={handleReviewFormDataSubmit} item mt={3} xs={8} alignSelf={'center'}>
                <Button variant="contained" color="primary">Post Review</Button>

            </Grid>
          </Grid>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </div>
  );
}

export default BasicModal;
