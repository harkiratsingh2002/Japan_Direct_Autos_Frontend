import { Button, Grid, TextField, Typography, styled } from "@mui/material";
import myColors from "../assets/util/myColors";
import * as React from "react";
// import React, { useState } from 'react';
import { IconButton } from "@mui/material";
// import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

// import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/material/Autocomplete";
import CustomButton from "./CustomButton";
import { useState } from "react";
// import { Button, TextField, IconButton } from '@mui/material';
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import links from "../assets/util/links";
import MultipleImageAddingComponent from "./MultipleImageAddingComponent";
import Swal from 'sweetalert2'
import { startLoader } from "../reduxStore/loadingSlice";

// import { imageDb } from "../firebase";
// import { ref } from "firebase/storage";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#212121",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
    },
  },
});

function CarSuspensionSelector(props) {
  const carSuspentionTypes = [
    "Multi-Link Suspension",
    "Rigid Axle Suspension",
    "Macpherson Suspension",
    "Independent Suspension",
    "Rigid suspension – Leaf Spring",
    "Trailing Arm Suspension",
    "Double Wishbone Suspension",
    "Air Suspension",
  ];
  return (
    <Autocomplete
      disablePortal
      id="carSuspentionSelector"
      options={carSuspentionTypes}
      onChange={props.onChange}
      value={props.value}
      //   sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Car Suspension" />}
    />
  );
}

function CarFuelTypeSelector(props) {
  const carFuelTypes = [
    "Unleaded (ULP)",
    "Diesel",
    "Liquid Petroleum Gas (LPG)",
  ];
  return (
    <Autocomplete
      disablePortal
      id="carTypeSelector"
      options={carFuelTypes}
      onChange={props.onChange}
      value={props.value}
      //   sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Car Fuel Type" />}
    />
  );
}
function CarSeatingCapacitySelector(props) {
  const carSeaterTypes = [
    "1 Seater",
    "2 Seater",
    "3 Seater",
    "4 Seater",
    "5 Seater",
    "6 Seater",
    "7 Seater",
    "8 Seater",
  ];
  return (
    <Autocomplete
      disablePortal
      id="carTypeSelector"
      options={carSeaterTypes}
      onChange={props.onChange}
      value={props.value}
      //   sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Car Seater Type" />
      )}
    />
  );
}

function CarTransmissionSelector(props) {
  const carTransmissionTypes = [
    "Automatic (AT)",
    "Continuously Variable (CVT)",
    "Dual-Clutch (DCT)",
    "Single-Clutch (SCT)",
    "Automated Manual (AMT)",
  ];
  return (
    <Autocomplete
      disablePortal
      id="carTransmissionSelector"
      options={carTransmissionTypes}
      onChange={props.onChange}
      value={props.value}
      //   sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Car Transmission Type" />
      )}
    />
  );
}

function CarColorSelector(props) {
  const carTransmissionTypes = [
    "Automatic (AT)",
    "Continuously Variable (CVT)",
    "Dual-Clutch (DCT)",
    "Single-Clutch (SCT)",
    "Automated Manual (AMT)",
  ];
  return (
    <Autocomplete
      disablePortal
      id="carColorSelector"
      options={carTransmissionTypes}
      onChange={props.onChange}
      value={props.value}
      //   sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Car Transmission Type" />
      )}
    />
  );
}

function CarTypeSelector(props) {
  const carTypes = [
    "Hatchback",
    "Sedan",
    "MPV",
    "SUV",
    "Crossover",
    "Coupe",
    "Convertible",
  ];
  return (
    <Autocomplete
      disablePortal
      id="carTypeSelector"
      options={carTypes}
      onChange={props.onChange}
      value={props.value}
      //   sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Car Type" />}
    />
  );
}
function OldNewSelector(props) {
  const carTypes = [
    "New",
    "Used"
  ];
  return (
    <Autocomplete
      disablePortal
      id="oldNewSelector"
      options={carTypes}
      onChange={props.onChange}
      value={props.value}
      //   sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Old Or New" />}
    />
  );
}

const AddCarForm = () => {
  const [onForm, setOnForm] = React.useState("basicInformation");
  //   const carFormData = new FormData();
  const finalCarFormData = new FormData();
  const adminEmail = useSelector((state)=>state.userDataSlice.email)
  console.log('adminEmail:- ',adminEmail);
  // finalCarFormData.append('email',adminEmail)
  const nextClickedHandler = (page) => {
    setOnForm(page);
  };
  const carFormDataInitital = {
    id: "",
    name: "",
    oldOrNew: "",
    carType: "",
    year: "",
    price: "",
    brand: "",
    // images: new FormData(),
    engine: "",
    suspension: "",
    transmission: "",
    fuelType: "",
    mileage: "",
    seatingCapacity: "",
    color: "",
  };

  const [carFormData, setCarFormData] = useState(carFormDataInitital);
  const dispatch = useDispatch()
  // const carFormDataReducer = (state, action) => {
  //   let oldState = {};
  //   switch (action.type) {
  //     case "updateId":
  //       oldState = {...state};
  //       oldState.id = action.value.id;
  //       return oldState;

  //     case "updateName":
  //       oldState = {...state};
  //       state.name = action.value;
  //       return state;
  //     case "updateCarType":
  //       oldState = {...state};
  //       oldState.carType = action.value;
  //       return oldState;
  //     case "updateYear":
  //       oldState = {...state};
  //       oldState.year = action.value
  //       return oldState;
  //     case "updateBrand":
  //       oldState = {...state};
  //       oldState.brand = action.value;
  //       return oldState;
  //     case "updateEngine":
  //       oldState = {...state};
  //       oldState.specification.engine = action.value;
  //       return oldState;
  //     case "updateSuspension":
  //       oldState = {...state};
  //       oldState.specification.suspension = action.value.suspension;
  //       return oldState;
  //     case "updateTransmission":
  //       oldState = {...state};
  //       oldState.specification.transmission = action.value.transmission;
  //       return oldState;
  //     case "updateFuelType":
  //       oldState = {...state};
  //       oldState.specification.fuelType = action.value.fuelType;
  //       return oldState;
  //     case "updateMileage":
  //       oldState = {...state};
  //       oldState.specification.mileage = action.value.mileage;
  //       return oldState;
  //     case "updateSeatingCapacity":
  //       oldState = {...state};
  //       oldState.specification.seatingCapacity = action.value.seatingCapacity;
  //       return oldState;
  //     case "updateColor":
  //       oldState = {...state};
  //       oldState.specification.color = action.value.color;
  //       return oldState;
  //     case "updateImages":
  //       oldState = {...state};

  //   }
  // };
  // const [carFormData, carFormDataDispatch] = React.useReducer(
  //   carFormDataReducer,
  //   carFormDataInitital
  // );
  //   const carFormStyles = {};

  const BasicCarInformationForm = (
    <>
      <Grid
        bgcolor={myColors.myGrey}
        sx={{
          paddingY: "1.5em",
          paddingX: "1.5em",

          border: "1px solid #212121",
          boxShadow: "3px 3px",
          borderRadius: "25px",
        }}
        xs={10}
        md={7}
        mt={3}
      >
        <Typography textAlign={"center"} variant="h5">
          Add Basic Car Information
        </Typography>
        <Grid container justifyContent={"space-between"}>
          <Grid pt={2} item xs={5}>
            <CssTextField
              onChange={(e) => {
                setCarFormData((oldState) => {
                  let newState = { ...oldState };
                  newState.name = e.target.value;
                  return newState;
                });
              }}
              value={carFormData.name}
              fullWidth
              label="Car Name"
              id="carName"
            />
          </Grid>
          <Grid pt={2} item xs={5}>
          <OldNewSelector
              onChange={(e, newValue) => {
                setCarFormData((oldState) => {
                  let newState = { ...oldState };
                  newState.oldOrNew = newValue;
                  return newState;
                });
              }}
              value={carFormData.oldOrNew}
            />
          </Grid>
        </Grid>

        <Grid pt={2} container justifyContent={"space-between"} item xs={12}>
          <Grid item xs={5}>
            <CssTextField
              onChange={(e) => {
                setCarFormData((oldState) => {
                  let newState = { ...oldState };
                  newState.brand = e.target.value;
                  return newState;
                });
              }}
              value={carFormData.brand}
              fullWidth
              label="Brand"
              id="brand"
            />
          </Grid>
          <Grid item xs={5}>
            <CssTextField
              onChange={(e) => {
                setCarFormData((oldState) => {
                  let newState = { ...oldState };
                  newState.year = e.target.value;
                  return newState;
                });
              }}
              value={carFormData.year}
              fullWidth
              label="Model-Year"
              id="modelYear"
            />
          </Grid>
        </Grid>
        <Grid pt={2} container justifyContent={"space-between"} item xs={12}>
          <Grid item xs={5}>
            {/* <CssTextField fullWidth label="type" id="type" />
             */}
            {/* will add autofocus select */}
            <CarTypeSelector
              onChange={(e, newValue) => {
                setCarFormData((oldState) => {
                  let newState = { ...oldState };
                  newState.carType = newValue;
                  return newState;
                });
              }}
              value={carFormData.carType}
            />
          </Grid>
          <Grid item xs={5}>
            <CssTextField
              onChange={(e) => {
                setCarFormData((oldState) => {
                  let newState = { ...oldState };
                  newState.price = e.target.value;
                  return newState;
                });
              }}
              value={carFormData.price}
              fullWidth
              label="price"
              id="price"
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
  // const [basicCarInfoState, setBasicCarInfoState] = useState({
  //   id: "",
  //   name: "",
  //   carType: "",
  //   year: "",
  //   price: "",
  //   brand: "",
  // });
  // React.useEffect(()=>{
  //     return ()=>{
  //         console.log('hello there')
  //         localStorage.setItem('basicCarInfoState',JSON.stringify(basicCarInfoState))

  //     }
  // },[])

  //   const SpecificationForm = () => {
  //     const [specificationFormState, setBasicCarInfoState] = useState({
  //       engine: "",
  //       suspension: "",
  //       transmission: "",
  //       fuelType: "",
  //       mileage: "",
  //       seatingCapacity: "",
  //       color: "",
  //     });
  //     return (
  const specificationForm = (
    <>
      <Grid
        bgcolor={myColors.myGrey}
        sx={{
          paddingY: "1.5em",
          paddingX: "1.5em",

          border: "1px solid #212121",
          boxShadow: "3px 3px",
          borderRadius: "25px",
        }}
        xs={10}
        md={7}
        mt={3}
      >
        <Typography textAlign={"center"} variant="h5">
          Add Car Specification Information
        </Typography>

        <Grid pt={2} container justifyContent={"space-between"} item xs={12}>
          <Grid item xs={5}>
            <CssTextField
              onChange={(e) => {
                setCarFormData((oldState) => {
                  let newState = { ...oldState };
                  newState.engine = e.target.value;
                  return newState;
                });
              }}
              value={carFormData.engine}
              fullWidth
              label="Engine"
              id="engine"
            />
          </Grid>
          <Grid item xs={5}>
            <CarSuspensionSelector
              onChange={(e, newValue) => {
                setCarFormData((oldState) => {
                  let newState = { ...oldState };
                  newState.suspension = newValue;
                  return newState;
                });
              }}
              value={carFormData.suspension}
            />
          </Grid>
        </Grid>
        <Grid pt={2} container justifyContent={"space-between"} item xs={12}>
          <Grid item xs={5}>
            <CarTransmissionSelector
              onChange={(e, newValue) => {
                setCarFormData((oldState) => {
                  let newState = { ...oldState };
                  newState.transmission = newValue;
                  return newState;
                });
              }}
              value={carFormData.transmission}
            />
          </Grid>
          <Grid item xs={5}>
            <CarFuelTypeSelector
              onChange={(e, newValue) => {
                setCarFormData((oldState) => {
                  let newState = { ...oldState };
                  newState.fuelType = newValue;
                  return newState;
                });
              }}
              value={carFormData.fuelType}
            />
          </Grid>
        </Grid>
        <Grid
          pt={2}
          container
          spacing={1}
          justifyContent={"space-between"}
          item
          xs={12}
        >
          <Grid item xs={4}>
            <CarSeatingCapacitySelector
              onChange={(e, newValue) => {
                setCarFormData((oldState) => {
                  let newState = { ...oldState };
                  newState.seatingCapacity = newValue;
                  return newState;
                });
              }}
              value={carFormData.seatingCapacity}
            />
          </Grid>
          <Grid item xs={4}>
            <CssTextField
              onChange={(e) => {
                setCarFormData((oldState) => {
                  let newState = { ...oldState };
                  newState.mileage = e.target.value;
                  return newState;
                });
              }}
              value={carFormData.mileage}
              fullWidth
              label="mileage"
              id="mileage"
            />
          </Grid>
          <Grid item xs={4}>
            <CssTextField
              onChange={(e) => {
                setCarFormData((oldState) => {
                  let newState = { ...oldState };
                  newState.color = e.target.value;
                  return newState;
                });
              }}
              value={carFormData.color}
              fullWidth
              label="color"
              id="color"
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );

  
  // const [noOfImages, setNoOfImages] = useState(0);
  const navigate = useNavigate()
  // const [allImages,setAllImages] = useState([]);
  const ImageAddingComponent = (props) => {
    // const [selectedImage, setSelectedImage] = useState(null);

    React.useEffect(()=>{
      console.log('current image number',currImage);
      console.log('props current image number',props.currImage);

    },[])
   
    const [imageUrl, setImageUrl] = useState(null);
    const [currImage, setcurrImage] = useState(props.currImage);
    const [allImages,setAllImages] = useState(props.allImages);

    const [showAnotherImageUploader, setShowAnotherImageUploader] =
      useState(false);

    // const handleImageChange = (event) => {};
    const handleImageChange = (event) => {
        console.log('files:-',event.target.files)
        const imageFile = event.target.files[0];
        if (!imageFile) return;
    
        // Basic image validation (optional)
        if (!imageFile.type.match("image/.*")) {
          // alert("Please select a valid image file (JPEG, PNG, etc.)");
          Swal.fire({
            title: 'error',
            text: "Please select a valid image file (JPEG, PNG, etc.)",
            icon: 'error',
            // confirmButtonText: 'Cool'
          })
          return;
        }
    
        // setSelectedImage(imageFile);
    
        console.log("img-", imageFile);
        // finalCarFormData.append(`carImg-${props.currImage}`, imageFile);
        // finalCarFormData.append('carImages[]', imageFile);
        setAllImages((oldState)=>{
          let newState = [...oldState];
          // console.log('oldFileState:-', oldState);
          newState.push(imageFile);
          finalCarFormData.append('images[]',imageFile)
          console.log('newImagesState:- ',newState);
          localStorage.setItem('noOfImages:- ',newState.length)
          return newState;
        })
        // allImages.forEach((file)=>{
          
        //   finalCarFormData.append(`carImages[]`, allImages);
        // })
        // console.log('allImagesInner:- ',allImages)

       
    
        // console.log('currImage',props.currImage);
        // finalCarFormData.append('noOfImages',noOfImages);
    
        // console.log("finalCarFormDataIMG", finalCarFormData.get(`carImg-${currImage}`));
        // console.log("finalNoOFImages",finalCarFormData.get('noOfImages'));
        // console.log('finalColor',finalCarFormData.get('color'))
        // Preview image (optional)
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = (e) => setImageUrl(e.target.result);
      };


    return (
      // <form onSubmit={handleSubmit}>
      <>
        <Grid
          bgcolor={myColors.myGrey}
          sx={{
            paddingY: "1.5em",
            paddingX: "1.5em",

            border: "1px solid #212121",
            boxShadow: "3px 3px",
            borderRadius: "25px",
          }}
          xs={10}
          md={7}
          mt={3}
        >
          <Typography textAlign={"center"} variant="h5">
            Add Car Images [Max: 5]
          </Typography>

          <Grid item xs={11}>
            <TextField
              type="file"
              variant="outlined"
              margin="normal"
              fullWidth
              accept="image/*"
              onChange={handleImageChange}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <PhotoCameraIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid container xs={11}>
            {imageUrl && (
              <img src={imageUrl} alt="Preview" style={{ maxWidth: "300px" }} />
            )}
          </Grid>
          {currImage < 4 && (
            <Grid pt={2} container>
              <CustomButton
                onClick={() => {
                  setcurrImage((old) => old + 1);
                  // props.setNoOfImages((old)=> old +1);
                  // finalCarFormData.append('noOfImages',noOfImages);
                  // localStorage.setItem('noOfImages',currImage);
                  setShowAnotherImageUploader(true);
                }}
                variant="contained"
              >
                Add Another Image
              </CustomButton>
            </Grid>
          )}
        </Grid>
        {showAnotherImageUploader && (
          <ImageAddingComponent
            currImage={currImage}
            allImages = {allImages}
            totalImages={3}

          />
        )}
      </>

      //   <Button type="submit" variant="contained" color="primary">
      //     Add Image
      //   </Button>
      // </form>
    );
  };
  const handleImageChange = (event) => {
    const newImages = Array.from(event.target.files); // Convert FileList to array
    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
    for (const image of newImages) {
      finalCarFormData.append('images[]', image); // Append each image to the form data with the key 'images[]' (an array)
    }
  };
  return (
    <>
      <Grid container justifyContent={"center"}>
        {onForm == "basicInformation" && BasicCarInformationForm}
        {onForm == "specificationInformation" && specificationForm}
        {onForm == "addImages" && (
          <ImageAddingComponent
            allImages = {[]}
            currImage={0}
            totalImages={3}
          />
          // <MultipleImageAddingComponent handleImageChange={handleImageChange} />
        )}
        <Grid container mt={3} xs={12} justifyContent={"center"}>
          <Grid item pl={2} xs={10} md={7}>
            {onForm != "basicInformation" && (
              <CustomButton
                variant="contained"
                onClick={() => {
                  const pages = [
                    "basicInformation",
                    "specificationInformation",
                    "addImages",
                  ];
                  let currPageIndex = pages.findIndex((el) => {
                    return el == onForm;
                  });
                  setOnForm(pages[currPageIndex - 1]);
                }}
              >
                Back
              </CustomButton>
            )}

            {onForm != "addImages" && (
              <CustomButton
                variant="contained"
                onClick={() => {
                  const pages = [
                    "basicInformation",
                    "specificationInformation",
                    "addImages",
                  ];
                  let currPageIndex = pages.findIndex((el) => {
                    return el == onForm;
                  });
                  setOnForm(pages[currPageIndex + 1]);
                }}
              >
                Next
              </CustomButton>
            )}
            {onForm == "addImages" && (
              <CustomButton
                variant="contained"
                onClick={() => {
                  if (!finalCarFormData.get('brand')){

                    Object.keys(carFormData).forEach((key) => {
                      finalCarFormData.append(key, carFormData[key]);
                    });
                  }
                  console.log(finalCarFormData);
                  console.log(finalCarFormData.get('brand'))
                  console.log(finalCarFormData.get('carImg-0'))
                  console.log(finalCarFormData.get('carImg-1'))
                  console.log(finalCarFormData.get('carImg-0'))

                  console.log('no of images:- ',localStorage.getItem('noOfImages'));
                  // console.log('all images',finalCarFormData.get('carImages[]'));

                  // console.log('all images',)
                  const userToken = (JSON.parse(localStorage.getItem('userData'))).userToken ;
                  dispatch(startLoader())
                  fetch(links.backendUrl +  "/add-car", {
                    method: "POST",
                    body: finalCarFormData,
                    headers: {
                      'authorization': `Bearer ${userToken}`,
                    }

                  })
                  .then(res=>{
                    dispatch(endLoader())
                    console.log('result :-',res);
                    if(res.status<200 || res.status>299){
                      let newError = 'some error'
                      throw newError;
                    }
                    return res.json()
                  })
                  .then(res=>{
                    if((finalCarFormData.get('oldOrNew') )== 'new' || (finalCarFormData.get('oldOrNew'))== 'New'){
                      Swal.fire({
                        title: 'success',
                        text: "Car Added Successfully",
                        icon: 'Success',
                        // confirmButtonText: 'Cool'
                      })
                      navigate('/new-cars');
                    }
                      
                    else {
                      Swal.fire({
                        title: 'success',
                        text: "Car Added Successfully",
                        icon: 'Success',
                        // confirmButtonText: 'Cool'
                      })
                      navigate('/used-cars');
                    }
                  })
                  .catch(err=>{
                    console.log('error:-',err);
                    alert('error while adding car.')
                  })


                }}
              >
                Add Car
              </CustomButton>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AddCarForm;
