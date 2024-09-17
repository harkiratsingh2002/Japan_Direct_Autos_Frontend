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
import Swal from "sweetalert2";
import { endLoader, startLoader } from "../reduxStore/loadingSlice";
import axios from "axios";

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
      renderInput={(params) => <TextField {...params} label="Body" />}
    />
  );
}
function OldNewSelector(props) {
  const carTypes = ["New", "Used", "Rental"];
  return (
    <Autocomplete
      disablePortal
      id="oldNewSelector"
      options={carTypes}
      onChange={props.onChange}
      value={props.value}
      //   sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Old Or New or Rental" />
      )}
    />
  );
}

const AddCarForm = () => {
  const [onForm, setOnForm] = React.useState("basicInformation");
  //   const carFormData = new FormData();
  const finalCarFormData = new FormData();
  const adminEmail = useSelector((state) => state.userDataSlice.email);
  console.log("adminEmail:- ", adminEmail);
  // finalCarFormData.append('email',adminEmail)
  const nextClickedHandler = (page) => {

    setOnForm(page);
  };
  const carFormDataInitital = {
    id: "",
    stockId: "",
    name: "",
    oldOrNew: "",
    body: "",
    make: "",
    grade: "",
    chassisNo: "",
    odometer: "",
    model: "",
    year: "",
    price: "",
    brand: "",
    description: "",
    // images: new FormData(),
    engine: "",
    suspension: "",
    transmission: "",
    fuelType: "",
    mileage: "",
    seatingCapacity: "",
    color: "",
  };

  const adminInfoInitial = {
    costPrice: "",
    brokerForwarderHandlingFees: "",
    preShipInspection: "",
    inlandTransport: "",
    freightInsurance: "",
    gst: "",
    customClearance: "",
  };

  const validateForm = (currentForm) => {
    switch (currentForm) {
      case 'basicInformation':
        // Check if the basic information fields are not empty
        return carFormData.name && carFormData.stockId && carFormData.make && carFormData.brand && carFormData.year && carFormData.price && carFormData.body && carFormData.oldOrNew;
      case 'specificationInformation':
        // Ensure all specifications are filled
        return carFormData.engine && carFormData.suspension && carFormData.grade && carFormData.chassisNo && carFormData.odometer && carFormData.model && carFormData.transmission && carFormData.fuelType && carFormData.mileage && carFormData.seatingCapacity && carFormData.mileage && carFormData.color;
      case 'descriptionInformation':
        // Description must not be empty
        return carFormData.description.length > 0;
      case 'adminInfo':
        // Check if admin information fields are not empty
        return adminInfo.costPrice && adminInfo.brokerForwarderHandlingFees && adminInfo.preShipInspection && adminInfo.inlandTransport && adminInfo.freightInsurance && adminInfo.gst && adminInfo.customClearance;
      default:
        return true;
    }
  }


  const [carFormData, setCarFormData] = useState(carFormDataInitital);
  const [adminInfo, setAdminInfo] = useState(adminInfoInitial);

  const dispatch = useDispatch();

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
              required
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
            <CssTextField
              required
              onChange={(e) => {
                setCarFormData((oldState) => {
                  let newState = { ...oldState };
                  newState.stockId = e.target.value;
                  return newState;
                });
              }}
              value={carFormData.stockId}
              fullWidth
              label="Stock Id"
              id="stockId"
            />
          </Grid>
          <Grid pt={2} container justifyContent={"space-between"} item xs={12}>
            <Grid pt={2} item xs={5}>
              <CssTextField
                required
                onChange={(e) => {
                  setCarFormData((oldState) => {
                    let newState = { ...oldState };
                    newState.make = e.target.value;
                    return newState;
                  });
                }}
                value={carFormData.make}
                fullWidth
                label="Make"
                id="make"
              />
            </Grid>
            <Grid pt={2} item xs={5}>
              <OldNewSelector
                required
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
        </Grid>

        <Grid pt={2} container justifyContent={"space-between"} item xs={12}>
          <Grid item xs={5}>
            <CssTextField

              required
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
              required
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
              required
              onChange={(e, newValue) => {
                setCarFormData((oldState) => {
                  let newState = { ...oldState };
                  newState.body = newValue;
                  return newState;
                });
              }}
              value={carFormData.body}
            />
          </Grid>
          <Grid item xs={5}>
            <CssTextField
              required
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


  const descriptionForm = (
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
        Add Car Description
      </Typography>
      <Grid pt={2} container item xs={12}>
        <TextField
          required
          id="outlined-multiline-static"
          label="Car Description"
          multiline
          rows={6}
          onChange={(e) => {
            setCarFormData((oldState) => {
              let newState = { ...oldState };
              newState.description = e.target.value;
              return newState;
            });
          }}
          fullWidth
        />
      </Grid>
    </Grid>
  );
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
              required
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
            <CssTextField
              required
              onChange={(e) => {
                setCarFormData((oldState) => {
                  let newState = { ...oldState };
                  newState.suspension = e.target.value;
                  return newState;
                });
              }}
              value={carFormData.suspension}
              fullWidth
              label="Suspension"
              id="suspension"
            />
          </Grid>
        </Grid>
        <Grid pt={2} container justifyContent={"space-between"} item xs={12}>
          <Grid item xs={5}>
            <CssTextField
              required
              onChange={(e) => {
                setCarFormData((oldState) => {
                  let newState = { ...oldState };
                  newState.grade = e.target.value;
                  return newState;
                });
              }}
              value={carFormData.grade}
              fullWidth
              label="Grade"
              id="grade"
            />
          </Grid>
          <Grid item xs={5}>
            <CssTextField
              required
              onChange={(e) => {
                setCarFormData((oldState) => {
                  let newState = { ...oldState };
                  newState.chassisNo = e.target.value;
                  return newState;
                });
              }}
              value={carFormData.chassisNo}
              fullWidth
              label="Chassis No"
              id="chassisNo"
            />
          </Grid>
        </Grid>
        <Grid pt={2} container justifyContent={"space-between"} item xs={12}>
          <Grid item xs={5}>
            <CssTextField
              required
              onChange={(e) => {
                setCarFormData((oldState) => {
                  let newState = { ...oldState };
                  newState.odometer = e.target.value;
                  return newState;
                });
              }}
              value={carFormData.odometer}
              fullWidth
              label="Odometer"
              id="odometer"
            />
          </Grid>
          <Grid item xs={5}>
            <CssTextField
              required
              onChange={(e) => {
                setCarFormData((oldState) => {
                  let newState = { ...oldState };
                  newState.model = e.target.value;
                  return newState;
                });
              }}
              value={carFormData.model}
              fullWidth
              label="Model"
              id="model"
            />
          </Grid>
        </Grid>
        <Grid pt={2} container justifyContent={"space-between"} item xs={12}>
          <Grid item xs={5}>
            <CssTextField
              required
              onChange={(e) => {
                setCarFormData((oldState) => {
                  let newState = { ...oldState };
                  newState.transmission = e.target.value;
                  return newState;
                });
              }}
              value={carFormData.transmission}
              fullWidth
              label="Transmission"
              id="transmission"
            />
          </Grid>
          <Grid item xs={5}>
            <CssTextField
              required
              onChange={(e) => {
                setCarFormData((oldState) => {
                  let newState = { ...oldState };
                  newState.fuelType = e.target.value;
                  return newState;
                });
              }}
              value={carFormData.fuelType}
              fullWidth
              label="Fuel Type"
              id="Fuel"
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
              required
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
              required
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
              required
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

  const adminInfoForm = (
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
        <Typography textAlign={"center"} variant="h5" required>
          Add Car Admin Information
        </Typography>

        <Grid pt={2} container justifyContent={"space-between"} item xs={12}>
          <Grid item xs={5}>
            <CssTextField
              required
              onChange={(e) => {
                setAdminInfo((oldState) => {
                  let newState = { ...oldState };
                  newState.costPrice = e.target.value;
                  return newState;
                });
              }}
              value={adminInfo.costPrice}
              fullWidth
              label="Cost Price"
              id="cp"
            />
          </Grid>
          <Grid item xs={5}>
            <CssTextField
              required
              onChange={(e) => {
                setAdminInfo((oldState) => {
                  let newState = { ...oldState };
                  newState.brokerForwarderHandlingFees = e.target.value;
                  return newState;
                });
              }}
              value={adminInfo.brokerForwarderHandlingFees}
              fullWidth
              label="Broker Forwarder Handling Fee"
              id="bfhf"
            />
          </Grid>
        </Grid>
        <Grid pt={2} container justifyContent={"space-between"} item xs={12}>
          <Grid item xs={5}>
            <CssTextField
              required
              onChange={(e) => {
                setAdminInfo((oldState) => {
                  let newState = { ...oldState };
                  newState.preShipInspection = e.target.value;
                  return newState;
                });
              }}
              value={adminInfo.preShipInspection}
              fullWidth
              label="Pre-Ship Inspection"
              id="psi"
            />
          </Grid>
          <Grid item xs={5}>
            <CssTextField
              required
              onChange={(e) => {
                setAdminInfo((oldState) => {
                  let newState = { ...oldState };
                  newState.inlandTransport = e.target.value;
                  return newState;
                });
              }}
              value={adminInfo.inlandTransport}
              fullWidth
              label="Inland Transport"
              id="it"
            />
          </Grid>
        </Grid>
        <Grid pt={2} container justifyContent={"space-between"} item xs={12}>
          <Grid item xs={3}>
            <CssTextField
              required
              onChange={(e) => {
                setAdminInfo((oldState) => {
                  let newState = { ...oldState };
                  newState.freightInsurance = e.target.value;
                  return newState;
                });
              }}
              value={adminInfo.freightInsurance}
              fullWidth
              label="Freight Insurance"
              id="fi"
            />
          </Grid>
          <Grid item xs={3}>
            <CssTextField
              required
              onChange={(e) => {
                setAdminInfo((oldState) => {
                  let newState = { ...oldState };
                  newState.gst = e.target.value;
                  return newState;
                });
              }}
              value={adminInfo.gst}
              fullWidth
              label="GST"
              id="gst"
            />
          </Grid>
          <Grid item xs={3}>
            <CssTextField
              required
              onChange={(e) => {
                setAdminInfo((oldState) => {
                  let newState = { ...oldState };
                  newState.customClearance = e.target.value;
                  return newState;
                });
              }}
              value={adminInfo.customClearance}
              fullWidth
              label="Custom Clearance"
              id="cc"
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );

  // const [noOfImages, setNoOfImages] = useState(0);
  const navigate = useNavigate();
  // const [allImages,setAllImages] = useState([]);
  const ImageAddingComponent = (props) => {
    // const [selectedImage, setSelectedImage] = useState(null);

    React.useEffect(() => {
      console.log("current image number", currImage);
      console.log("props current image number", props.currImage);
    }, []);

    const [imageUrl, setImageUrl] = useState(null);
    const [currImage, setcurrImage] = useState(props.currImage);
    const [allImages, setAllImages] = useState(props.allImages);

    const [showAnotherImageUploader, setShowAnotherImageUploader] =
      useState(false);

    // const handleImageChange = (event) => {};
    const handleImageChange = (event) => {
      console.log("files:-", event.target.files);
      const imageFile = event.target.files[0];
      if (!imageFile) return;

      // Basic image validation (optional)
      if (!imageFile.type.match("image/.*")) {
        // alert("Please select a valid image file (JPEG, PNG, etc.)");
        Swal.fire({
          title: "error",
          text: "Please select a valid image file (JPEG, PNG, etc.)",
          icon: "error",
          // confirmButtonText: 'Cool'
        });
        return;
      }

      // setSelectedImage(imageFile);

      console.log("img-", imageFile);
      // finalCarFormData.append(`carImg-${props.currImage}`, imageFile);
      // finalCarFormData.append('carImages[]', imageFile);
      setAllImages((oldState) => {
        let newState = [...oldState];
        // console.log('oldFileState:-', oldState);
        newState.push(imageFile);
        finalCarFormData.append("images[]", imageFile);
        console.log("newImagesState:- ", newState);
        localStorage.setItem("noOfImages:- ", newState.length);
        return newState;
      });
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
            allImages={allImages}
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
  const handleNext = () => {
    const pages = [
      "basicInformation",
      "specificationInformation",
      "descriptionInformation",
      "adminInfo",
      "addImages",
    ];
    let currPageIndex = pages.findIndex((el) => el === onForm);
    if (currPageIndex < pages.length - 1) {
      if (validateForm(onForm)) {
        setOnForm(pages[currPageIndex + 1]);
      } else {
        // Optionally show an error message
        alert('Please fill all required fields.');
      }
    }
  };
  const handleImageChange = (event) => {
    const newImages = Array.from(event.target.files); // Convert FileList to array
    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
    for (const image of newImages) {
      finalCarFormData.append("images[]", image); // Append each image to the form data with the key 'images[]' (an array)
    }
  };
  return (
    <>
      <Grid container justifyContent={"center"}>
        {onForm == "basicInformation" && BasicCarInformationForm}
        {onForm == "specificationInformation" && specificationForm}
        {onForm == "descriptionInformation" && descriptionForm}
        {onForm == "adminInfo" && adminInfoForm}
        {onForm == "addImages" && (
          <ImageAddingComponent allImages={[]} currImage={0} totalImages={3} />
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
                    "descriptionInformation",
                    "adminInfo",
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
                onClick={handleNext}
              >
                Next
              </CustomButton>

            )}
            {onForm == "addImages" && (
              <CustomButton
                variant="contained"
                onClick={() => {
                  if (!finalCarFormData.get("brand")) {
                    Object.keys(carFormData).forEach((key) => {
                      finalCarFormData.append(key, carFormData[key]);
                    });
                  }
                  console.log(finalCarFormData);
                  console.log(finalCarFormData.get("brand"));
                  console.log(finalCarFormData.get("carImg-0"));
                  console.log(finalCarFormData.get("carImg-1"));
                  console.log(finalCarFormData.get("carImg-0"));

                  console.log(
                    "no of images:- ",
                    localStorage.getItem("noOfImages")
                  );
                  // console.log('all images',finalCarFormData.get('carImages[]'));

                  // console.log('all images',)
                  const userToken = JSON.parse(
                    localStorage.getItem("userData")
                  ).userToken;
                  dispatch(startLoader());
                  fetch(links.backendUrl + "/add-car", {
                    method: "POST",
                    body: finalCarFormData,
                    headers: {
                      authorization: `Bearer ${userToken}`,
                    },
                  })
                    .then((res) => {
                      dispatch(endLoader());
                      console.log("result :-", res);
                      if (res.status < 200 || res.status > 299) {
                        let newError = "some error";
                        throw newError;
                      }
                      return res.json();
                    })
                    .then((res) => {
                      // add admin info
                      console.log("saved car data:- ", res);
                      console.log("admin data", adminInfo);
                      axios
                        .post(links.backendUrl + "/add-car-admin-info", {
                          carId: res.carId,
                          adminInfo: adminInfo,
                        })
                        .then((response) => {
                          if (
                            finalCarFormData.get("oldOrNew") == "new" ||
                            finalCarFormData.get("oldOrNew") == "New"
                          ) {
                            Swal.fire({
                              title: "Success",
                              text: "Car Added Successfully",
                              icon: "success",
                              // confirmButtonText: 'Cool'
                            });
                            navigate("/new-cars");
                          } else if (
                            finalCarFormData.get("oldOrNew") == "used" ||
                            finalCarFormData.get("oldOrNew") == "Used"
                          ) {
                            Swal.fire({
                              title: "Success",
                              text: "Car Added Successfully",
                              icon: "success",
                              // confirmButtonText: 'Cool'
                            });
                            navigate("/used-cars");
                          } else {
                            Swal.fire({
                              title: "Success",
                              text: "Car Added Successfully",
                              icon: "success",
                              // confirmButtonText: 'Cool'
                            });
                            navigate("/rental-cars");
                          }
                        })
                        .catch((err) => {
                          console.log("err while adding admin info", err);
                        });
                    })
                    .catch((err) => {
                      console.log("error:-", err);
                      alert("error while adding car.");
                    });
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
