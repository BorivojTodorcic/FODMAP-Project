"use client"
import { Fragment, useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});



export default function SubmitImage() {

    const [file, setFile] = useState();

    
    
    function handleSubmit() {
        const formData = new FormData();
        formData.append('recipe_image', file);
        fetch('http://localhost:3001/api/upload_image', {
            method:'POST',
            body: formData
        })
    };

    return (
        <Fragment>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}

                startIcon={<CloudUploadIcon />}
            >
                Upload image
            <VisuallyHiddenInput
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                multiple
            />
            </Button>
            <Button
                onClick={handleSubmit}
            >
                Submit
            </Button>
        </Fragment>
    );
};