import { styled } from '@mui/material/styles';
import Button from "@mui/material/Button";
import myColors from '../assets/util/myColors';

const CustomButton = styled(Button)(({ theme, customColor }) => ({
    color: myColors.myGrey,
    margin: '1em',
    backgroundColor: myColors.textBlack,
    '&:hover': {
      backgroundColor: 'black',
    },

  }));


export default CustomButton;