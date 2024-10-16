// Import statements
import React, { useState } from 'react';
import {
  Paper,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  Autocomplete,
  FormHelperText,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Swal from 'sweetalert2';
import axios from 'axios';
import links from '../assets/util/links';
import { startLoader, endLoader } from '../reduxStore/loadingSlice';
import { ReactSortable } from 'react-sortablejs';


// Custom components and utilities
import myColors from '../assets/util/myColors';
import CustomButton from './CustomButton';
import { Man } from '@mui/icons-material';

// Start of the component
const AddCarForm = () => {
  const [onForm, setOnForm] = useState('basicInformation');
  const [carFormData, setCarFormData] = useState({
    id: '',
    stockId: '',
    name: '',
    oldOrNew: '',
    body: '',
    make: '',
    grade: '',
    chassisNo: '',
    odometer: '',
    model: '',
    year: '',
    price: '',
    description: '',
    engine: '',
    suspension: '',
    transmission: '',
    fuelType: '',
    mileage: '',
    seatingCapacity: '',
    color: '',
  });
  const [adminInfo, setAdminInfo] = useState({
    costPrice: '',
    brokerForwarderHandlingFees: '',
    preShipInspection: '',
    inlandTransport: '',
    freightInsurance: '',
    gst: '',
    customClearance: '',
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [errors, setErrors] = useState({});

  const handleImageRemove = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  const handleImageReorder = (evt) => {
    const { oldIndex, newIndex } = evt;
    if (oldIndex === newIndex) return;

    setSelectedImages((prevImages) => {
      const newImages = [...prevImages];
      const movedItem = newImages.splice(oldIndex, 1)[0];
      newImages.splice(newIndex, 0, movedItem);
      return newImages;
    });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userToken = useSelector((state) => state.userDataSlice.userToken);

  // Handler for TextField and Select components
  const handleCarFormChange = (field) => (event) => {
    setCarFormData((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }));
    // Clear error for this field
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };

  // Handler for Autocomplete components
  const handleAutocompleteChange = (field) => (event, value) => {
    setCarFormData((prevState) => ({
      ...prevState,
      [field]: value || '',
    }));
    // Clear error for this field
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };

  const handleAdminInfoChange = (field) => (event) => {
    setAdminInfo((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }));
    // Clear error for this field
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };

  // Validation function
  const validateForm = (currentForm, updateErrors = false) => {
    const newErrors = {};
    let isValid = true;

    const checkField = (field, value, isNumeric = false) => {
      if (!value || value.toString().trim() === '') {
        newErrors[field] = 'This field is required';
        isValid = false;
      } else if (isNumeric && isNaN(Number(value))) {
        newErrors[field] = 'Please enter a valid number';
        isValid = false;
      }
    };

    switch (currentForm) {
      case 'basicInformation':
        checkField('name', carFormData.name);
        checkField('stockId', carFormData.stockId);
        checkField('make', carFormData.make);
        checkField('oldOrNew', carFormData.oldOrNew);
        checkField('year', carFormData.year, true); // Numeric validation
        checkField('mileage', carFormData.mileage); // Numeric validation
        checkField('body', carFormData.body);
        checkField('price', carFormData.price, true); // Numeric validation
        break;
      case 'specificationInformation':
        checkField('engine', carFormData.engine);
        checkField('suspension', carFormData.suspension);
        checkField('grade', carFormData.grade);
        checkField('chassisNo', carFormData.chassisNo);
        checkField('odometer', carFormData.odometer, true); // Numeric validation
        checkField('model', carFormData.model);
        checkField('transmission', carFormData.transmission);
        checkField('fuelType', carFormData.fuelType);
        checkField('seatingCapacity', carFormData.seatingCapacity);
        checkField('color', carFormData.color);
        break;
      case 'descriptionInformation':
        checkField('description', carFormData.description);
        break;
      case 'adminInfo':
        checkField('costPrice', adminInfo.costPrice);
        checkField('brokerForwarderHandlingFees', adminInfo.brokerForwarderHandlingFees);
        checkField('preShipInspection', adminInfo.preShipInspection);
        checkField('inlandTransport', adminInfo.inlandTransport);
        checkField('freightInsurance', adminInfo.freightInsurance);
        checkField('gst', adminInfo.gst);
        checkField('customClearance', adminInfo.customClearance);
        break;
      case 'addImages':
        if (selectedImages.length === 0) {
          if (updateErrors) {
            Swal.fire({
              title: 'Error',
              text: 'Please upload at least one image.',
              icon: 'error',
            });
          }
          isValid = false;
        }
        break;
      default:
        isValid = false;
    }

    if (updateErrors) {
      setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    }

    return isValid;
  };

  // Handle image selection
  const handleImageChange = (event) => {
    const newImages = Array.from(event.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!validateForm(onForm, true)) return;

    const finalCarFormData = new FormData();
    Object.keys(carFormData).forEach((key) => {
      finalCarFormData.append(key, carFormData[key]);
    });
    selectedImages.forEach((image) => {
      finalCarFormData.append('images[]', image);
    });

    dispatch(startLoader());
    fetch(`${links.backendUrl}/add-car`, {
      method: 'POST',
      body: finalCarFormData,
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        dispatch(endLoader());
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((res) => {
        // Add admin info
        axios
          .post(`${links.backendUrl}/add-car-admin-info`, {
            carId: res.carId,
            adminInfo: adminInfo,
          })
          .then(() => {
            // Optionally send emails
            Swal.fire({
              title: 'Success',
              text: 'Car Added Successfully',
              icon: 'success',
            });
            navigate('/dashboard/main'); // Adjust the navigation as needed
          })
          .catch((err) => {
            console.error('Error adding admin info:', err);
          });
      })
      .catch((err) => {
        console.error('Error adding car:', err);
        Swal.fire({
          title: 'Error',
          text: 'There was an error adding the car.',
          icon: 'error',
        });
      });
  };

  // Handle navigation between forms
  const handleNext = () => {
    if (!validateForm(onForm, true)) return;

    const forms = [
      'basicInformation',
      'specificationInformation',
      'descriptionInformation',
      'adminInfo',
      'addImages',
    ];
    const currentIndex = forms.indexOf(onForm);
    if (currentIndex < forms.length - 1) {
      setOnForm(forms[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const forms = [
      'basicInformation',
      'specificationInformation',
      'descriptionInformation',
      'adminInfo',
      'addImages',
    ];
    const currentIndex = forms.indexOf(onForm);
    if (currentIndex > 0) {
      setOnForm(forms[currentIndex - 1]);
    }
  };

  // Form components

  // Basic Car Information Form
  const BasicCarInformationForm = (
    <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
      <Typography variant="h5" textAlign="center" gutterBottom>
        Add Basic Car Information
      </Typography>
      <Grid container spacing={2}>
        {/* Car Name */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Car Name"
            placeholder="Enter the car name"
            fullWidth
            value={carFormData.name}
            onChange={handleCarFormChange('name')}
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>
        {/* Stock ID */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Stock ID"
            placeholder="Enter the stock ID"
            fullWidth
            value={carFormData.stockId}
            onChange={handleCarFormChange('stockId')}
            error={!!errors.stockId}
            helperText={errors.stockId}
          />
        </Grid>
        {/* Make */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Make"
            placeholder="Enter the car make"
            fullWidth
            value={carFormData.make}
            onChange={handleCarFormChange('make')}
            error={!!errors.make}
            helperText={errors.make}
          />
        </Grid>
        {/* Old or New Selector */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required error={!!errors.oldOrNew}>
            <InputLabel>Condition</InputLabel>
            <Select
              value={carFormData.oldOrNew}
              label="Condition"
              onChange={handleCarFormChange('oldOrNew')}
            >
              <MenuItem value="Featured">Featured</MenuItem>
              <MenuItem value="Used">Used</MenuItem>
              <MenuItem value="Rental">Rental</MenuItem>
            </Select>
            {errors.oldOrNew && <FormHelperText>{errors.oldOrNew}</FormHelperText>}
          </FormControl>
        </Grid>
        {/* Model Year */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Model Year"
            placeholder="Enter the model year"
            fullWidth
            value={carFormData.year}
            onChange={handleCarFormChange('year')}
            error={!!errors.year}
            helperText={errors.year}
            type="number"

          />
          <FormHelperText>Input number only</FormHelperText>
        </Grid>
        {/* Price */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Price"
            placeholder="Enter the price"
            fullWidth
            value={carFormData.price}
            onChange={handleCarFormChange('price')}
            error={!!errors.price}
            helperText={errors.price}
            type="number"
          />
          <FormHelperText>Input number only</FormHelperText>

        </Grid>

        {/* Car Type Selector */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required error={!!errors.body}>
            <InputLabel>Body Type</InputLabel>
            <Select
              value={carFormData.body}
              label="Body Type"
              onChange={handleCarFormChange('body')}
            >
              <MenuItem value="Hatchback">Hatchback</MenuItem>
              <MenuItem value="Sedan">Sedan</MenuItem>
              <MenuItem value="MPV">MPV</MenuItem>
              <MenuItem value="SUV">SUV</MenuItem>
              <MenuItem value="Crossover">Crossover</MenuItem>
              <MenuItem value="Coupe">Coupe</MenuItem>
              <MenuItem value="Convertible">Convertible</MenuItem>
            </Select>
            {errors.body && <FormHelperText>{errors.body}</FormHelperText>}
          </FormControl>
        </Grid>

        {/* Mileage */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Mileage"
            placeholder="Enter the mileage"
            fullWidth
            value={carFormData.mileage}
            onChange={handleCarFormChange('mileage')}
            error={!!errors.mileage}
            helperText={errors.mileage}
          />
        </Grid>

      </Grid>
    </Paper>
  );

  // Specification Form
  const SpecificationForm = (
    <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
      <Typography variant="h5" textAlign="center" gutterBottom>
        Add Car Specification Information
      </Typography>
      <Grid container spacing={2}>
        {/* Engine */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Engine"
            placeholder="Enter the engine details"
            fullWidth
            value={carFormData.engine}
            onChange={handleCarFormChange('engine')}
            error={!!errors.engine}
            helperText={errors.engine}
          />
        </Grid>
        {/* Suspension */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Suspension"
            placeholder="Enter the suspension type"
            fullWidth
            value={carFormData.suspension}
            onChange={handleCarFormChange('suspension')}
            error={!!errors.suspension}
            helperText={errors.suspension}
          />
        </Grid>
        {/* Grade */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Grade"
            placeholder="Enter the grade"
            fullWidth
            value={carFormData.grade}
            onChange={handleCarFormChange('grade')}
            error={!!errors.grade}
            helperText={errors.grade}
          />
        </Grid>
        {/* Chassis No */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Chassis No"
            placeholder="Enter the chassis number"
            fullWidth
            value={carFormData.chassisNo}
            onChange={handleCarFormChange('chassisNo')}
            error={!!errors.chassisNo}
            helperText={errors.chassisNo}
          />
        </Grid>

        {/* Model */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Model"
            placeholder="Enter the model"
            fullWidth
            value={carFormData.model}
            onChange={handleCarFormChange('model')}
            error={!!errors.model}
            helperText={errors.model}
          />
        </Grid>
        {/* Transmission */}
        <Grid item xs={12} sm={6}>
          {/* Transmission Selector */}
          <Autocomplete
            options={[
              'Automatic (AT)',
              'Continuously Variable (CVT)',
              'Dual-Clutch (DCT)',
              'Single-Clutch (SCT)',
              'Automated Manual (AMT)',
              "Manual (MT)",
            ]}
            value={carFormData.transmission}
            onChange={handleAutocompleteChange('transmission')}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Transmission"
                placeholder="Select the transmission type"
                required
                fullWidth
                error={!!errors.transmission}
                helperText={errors.transmission}
              />
            )}
          />
        </Grid>
        {/* Fuel Type */}
        <Grid item xs={12} sm={6}>
          {/* Fuel Type Selector */}
          <Autocomplete
            options={['Unleaded (ULP)', 'Diesel', 'Liquid Petroleum Gas (LPG)', 'Hybrid', 'Electric']}
            value={carFormData.fuelType}
            onChange={handleAutocompleteChange('fuelType')}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Fuel Type"
                placeholder="Select the fuel type"
                required
                fullWidth
                error={!!errors.fuelType}
                helperText={errors.fuelType}
              />
            )}
          />
        </Grid>
        {/* Seating Capacity */}
        <Grid item xs={12} sm={6}>
          {/* Seating Capacity Selector */}
          <Autocomplete
            options={[
              '1 Seater',
              '2 Seater',
              '3 Seater',
              '4 Seater',
              '5 Seater',
              '6 Seater',
              '7 Seater',
              '8 Seater',
            ]}
            value={carFormData.seatingCapacity}
            onChange={handleAutocompleteChange('seatingCapacity')}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Seating Capacity"
                placeholder="Select the seating capacity"
                required
                fullWidth
                error={!!errors.seatingCapacity}
                helperText={errors.seatingCapacity}
              />
            )}
          />
        </Grid>
        {/* Color */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Color"
            placeholder="Enter the color"
            fullWidth
            value={carFormData.color}
            onChange={handleCarFormChange('color')}
            error={!!errors.color}
            helperText={errors.color}
          />
        </Grid>
        {/* Odometer */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Odometer"
            placeholder="Enter the odometer reading"
            fullWidth
            value={carFormData.odometer}
            onChange={handleCarFormChange('odometer')}
            error={!!errors.odometer}
            helperText={errors.odometer}
            type="number"
          />
          <FormHelperText>Input number only</FormHelperText>


        </Grid>

      </Grid>
    </Paper>
  );

  // Description Form
  const DescriptionForm = (
    <Paper elevation={3} sx={{ p: 4, mt: 3, width: '80%', mx: 'auto' }}>
      <Typography variant="h5" textAlign="center" gutterBottom>
        Add Car Description
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            label="Car Description"
            placeholder="Enter the car description"
            multiline
            rows={6} // Minimum rows when not expanded
            maxRows={10} // Maximum rows when expanded
            fullWidth
            width="100%"
            value={carFormData.description}
            onChange={handleCarFormChange('description')}
            error={!!errors.description}
            helperText={errors.description}
          />
        </Grid>
      </Grid>
    </Paper>
  );

  // Admin Info Form
  const AdminInfoForm = (
    <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
      <Typography variant="h5" textAlign="center" gutterBottom>
        Add Car Admin Information
      </Typography>
      <Grid container spacing={2}>
        {/* Cost Price */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Cost Price"
            placeholder="Enter the cost price"
            fullWidth
            value={adminInfo.costPrice}
            onChange={handleAdminInfoChange('costPrice')}
            error={!!errors.costPrice}
            helperText={errors.costPrice}
          />
        </Grid>
        {/* Broker Forwarder Handling Fee */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Broker Forwarder Handling Fee"
            placeholder="Enter the broker forwarder handling fee"
            fullWidth
            value={adminInfo.brokerForwarderHandlingFees}
            onChange={handleAdminInfoChange('brokerForwarderHandlingFees')}
            error={!!errors.brokerForwarderHandlingFees}
            helperText={errors.brokerForwarderHandlingFees}
          />
        </Grid>
        {/* Pre-Ship Inspection */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Pre-Ship Inspection"
            placeholder="Enter the pre-ship inspection cost"
            fullWidth
            value={adminInfo.preShipInspection}
            onChange={handleAdminInfoChange('preShipInspection')}
            error={!!errors.preShipInspection}
            helperText={errors.preShipInspection}
          />
        </Grid>
        {/* Inland Transport */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Inland Transport"
            placeholder="Enter the inland transport cost"
            fullWidth
            value={adminInfo.inlandTransport}
            onChange={handleAdminInfoChange('inlandTransport')}
            error={!!errors.inlandTransport}
            helperText={errors.inlandTransport}
          />
        </Grid>
        {/* Freight Insurance */}
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Freight Insurance"
            placeholder="Enter the freight insurance cost"
            fullWidth
            value={adminInfo.freightInsurance}
            onChange={handleAdminInfoChange('freightInsurance')}
            error={!!errors.freightInsurance}
            helperText={errors.freightInsurance}
          />
        </Grid>
        {/* GST */}
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="GST"
            placeholder="Enter the GST amount"
            fullWidth
            value={adminInfo.gst}
            onChange={handleAdminInfoChange('gst')}
            error={!!errors.gst}
            helperText={errors.gst}
          />
        </Grid>
        {/* Custom Clearance */}
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Custom Clearance"
            placeholder="Enter the custom clearance cost"
            fullWidth
            value={adminInfo.customClearance}
            onChange={handleAdminInfoChange('customClearance')}
            error={!!errors.customClearance}
            helperText={errors.customClearance}
          />
        </Grid>
      </Grid>
    </Paper>
  );

  // Image Upload Form
  const ImageUploadForm = (
    <Paper elevation={3} sx={{ p: 4, mt: 3, textAlign: 'center' }}>
      <Typography variant="h5" textAlign="center" gutterBottom>
        Add Car Images
      </Typography>
      <Button
        variant="contained"
        component="label"
        startIcon={<PhotoCameraIcon />}
      >
        Upload Images
        <input
          type="file"
          hidden
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
      </Button>
      <ReactSortable
        list={selectedImages}
        setList={setSelectedImages}
        animation={150}
        style={{ marginTop: 16 }}
      >
        <Grid container spacing={2} justifyContent="center">
          {selectedImages.map((image, index) => (
            <Grid item key={index}>
              <div style={{ position: 'relative' }}>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index}`}
                  style={{ maxWidth: '150px' }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleImageRemove(index)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  }}
                  aria-label="Remove image"
                >
                  <span style={{ fontSize: 16 }}>×</span>
                </IconButton>
              </div>
            </Grid>
          ))}
        </Grid>
      </ReactSortable>
    </Paper>
  );


  // Main render
  return (
    <Grid container justifyContent="center">
      {onForm === 'basicInformation' && BasicCarInformationForm}
      {onForm === 'specificationInformation' && SpecificationForm}
      {onForm === 'descriptionInformation' && DescriptionForm}
      {onForm === 'adminInfo' && AdminInfoForm}
      {onForm === 'addImages' && ImageUploadForm}

      <Grid container mt={3} xs={12} justifyContent="center">
        <Grid item pl={2} xs={12} md={7}>
          <Grid container justifyContent="center" spacing={2}>
            {onForm !== 'basicInformation' && (
              <Grid item xs={6} sm="auto">
                <Button variant="contained" onClick={handleBack} fullWidth>
                  Back
                </Button>
              </Grid>
            )}
            {onForm !== 'addImages' && (
              <Grid item xs={6} sm="auto">
                <Button variant="contained" onClick={handleNext} fullWidth>
                  Next
                </Button>
              </Grid>
            )}
            {onForm === 'addImages' && (
              <Grid item xs={12} sm="auto">
                <Button variant="contained" onClick={handleSubmit} fullWidth>
                  Add Car
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddCarForm;
