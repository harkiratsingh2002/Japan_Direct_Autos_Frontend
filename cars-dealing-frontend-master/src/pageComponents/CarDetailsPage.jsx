import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import carTestImage from "../assets/images/car-home-bg-3.jpeg";
import { useParams } from "react-router-dom";
import links from "../assets/util/links";
import CustomizedTable from "../components/CustomizedTable";
import ScrollingImageComponent from "../components/ScrollingImageComponent";
import ReviewsComponent from "../components/ReviewsComponent";
import EnquireNowModal from "../components/EnquireNowModal";
import { useDispatch } from "react-redux";
import { endLoader, startLoader } from "../reduxStore/loadingSlice";
const CarDetailsPage = (props) => {
  // const [images, setImages] = useState([]);
  const imageStyles = {};
  // useEffect to get params
  const params = useParams();
  const [carInfo, setCarInfo] = useState(null);
  // const [loadingData, setLoadingData] = useState(true);
  const [rows, setRows] = useState([]);
  // const [price, setPrice] = useState(0);

  const [currentImage, setCurrentImage] = useState(null);
  const [openEnquiryModal, setOpenEnquiryModal] = useState(false);
  let carId = params.carId;
  // let myRows = [];
  const handleOpenEnquiry = ()=>{
    setOpenEnquiryModal(true);
  }
  const handleCloseEnquiry = ()=>{
    setOpenEnquiryModal(false);
  }
  const dispatch = useDispatch()
  useEffect(() => {
    // const asyncGetCarFn = async () => {
      try {
       
        dispatch(startLoader())
        const carResult = fetch(links.backendUrl + "/get-car", {
          method: "POST",
          body: JSON.stringify({ carId: carId }),
          headers: { "Content-Type": "application/json" },
        }).then((carResult)=>{

          if (carResult.status < 200 || carResult.status > 299) {
            // alert("error while geting car info..!!");
            let newError = { message: 'error while getting car'}
            throw newError;
          }
          return carResult.json()
        })
        .then((finalcarInfoResult)=>{

          // let finalcarInfoResult = await carResult.json();
          console.log("car info:-", finalcarInfoResult.car);
          setCarInfo(finalcarInfoResult.car);
          let myRows = [
            {name: finalcarInfoResult.car.name},
            {price: finalcarInfoResult.car.price},
            {carType: finalcarInfoResult.car.carType},
            {color: finalcarInfoResult.car.color},
            {seatingCapacity: finalcarInfoResult.car.seatingCapacity},
            {model: finalcarInfoResult.car.year},
            {mileage: finalcarInfoResult.car.mileage},
            {brand: finalcarInfoResult.car.brand},
            {oldOrNew: finalcarInfoResult.car.oldOrNew},
            {fuelType: finalcarInfoResult.car.fuelType},
            {suspension: finalcarInfoResult.car.suspension},
            {transmission: finalcarInfoResult.car.transmission}
          ]
          setRows(myRows);
          setCurrentImage(finalcarInfoResult.car.images[0])
          dispatch(endLoader())
        })
        // setLoadingData(false);
      } catch (err) {
        console.log("err:-", err);
        dispatch(endLoader())
      }
    
    
  }, []);

  const headCols = ["Specification Type", "Value"];
  // if(carInfo){
  //   // setTimeout(()=>{},1000)
   
  // }

  const handleImageChange = (image) => {
    setCurrentImage(image);
  };

  return (
    <>

    {carInfo && 
      
      <Grid
        container
        sx={{
          justifyContent: {
            xs: "center",
            md: "start",
          },
        }}
        spacing={2}
        p={3}
        xs={12}
        md={10}
        ml={'auto'}
        mr={'auto'}

      >
        <Grid item xs={11}>
          <Typography variant="h2">

          {carInfo.name}
          </Typography>
        </Grid>
        <Grid item my={3.2} xs={11} md={7}>
           
            <>
              <img
                style={{
                  height: "23em",
                  width: "100%",
                  borderRadius: "25px",
                }}
                src={links.backendUrl + "/" + currentImage}
              ></img>

              <Grid container>
                <ScrollingImageComponent
                  handleImageChange={handleImageChange}
                  images={carInfo.images}
                />
              </Grid>
            </>
          
        </Grid>
        <Grid item my={3.2} xs={11} md={5}>
          
            <Grid container sx={{
              border: '1px solid black',
              borderRadius: '2em',
              textAlign: 'center'
            }} p={3}>
              <Grid item xs={12}>

            <Typography variant="body1">
              Avaialable At
            </Typography>
              </Grid>
              <Grid item xs={12}
              >

            <Typography variant="h4">
              ${carInfo.price}
            </Typography>
              </Grid>
            </Grid>          
          
        </Grid>
        <Grid item xs={11}>
          <Typography variant="h6">
            Description
          </Typography>
          <Typography mt={1}>
            {carInfo.description}
          </Typography>
        </Grid>
      </Grid>
    }
    <Grid container xs={11} md={10} mb={4} ml={'auto'} mr={'auto'}>
    <CustomizedTable headerCols={headCols} rows={rows} />
    </Grid>
    <ReviewsComponent />
    <Button sx={{
      position: 'fixed',
      right: '40px',
      bottom: '40px',
      zIndex: 999
    }} onClick={handleOpenEnquiry} size="large" variant="contained">Enquire Now</Button>
      <EnquireNowModal openModal={openEnquiryModal} handleCloseModal={handleCloseEnquiry} carId={carId}  />
    </>
  );
};

export default CarDetailsPage;
