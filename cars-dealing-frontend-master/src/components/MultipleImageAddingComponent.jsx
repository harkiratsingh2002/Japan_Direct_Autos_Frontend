import { Button, Input } from "@mui/material";
import { useState } from "react";

const MultipleImageAddingComponent = (props) => {
  const [selectedImages, setSelectedImages] = useState([]);

  
  return (
    <>
      <div>
        <Input type="file" multiple onChange={props.handleImageChange} />
        <Button variant="contained" component="span" style={{ marginTop: 10 }}>
          Upload Images
        </Button>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {selectedImages.map((image) => (
            <img
              key={image.name}
              src={URL.createObjectURL(image)}
              alt="Preview"
              style={{ width: 100, margin: 10 }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MultipleImageAddingComponent;
