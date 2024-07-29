import React, { useState, useRef } from 'react';
import { Card, Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import UploadIcon from '@mui/icons-material/Upload';

const Root = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
});

const HiddenInput = styled('input')({
  display: 'none',
});

const DragDropArea = styled('div')({
  width: '200px',
  height: '100px',
  border: '2px solid #007bff',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  margin: '10px 0',
  textAlign: 'center',
  color: '#007bff',
});

const Preview = styled('div')({
  width: '200px', // Same width as DragDropArea
  height: '100px', // Same height as DragDropArea
  borderRadius: '10px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Image = styled('img')({
  width: '100%', // Full width
  height: '100%', // Full height
  objectFit: 'cover', // Ensure the image covers the area
});

const PDFPreview = styled('embed')({
  width: '100%', // Full width
  height: '100%', // Full height
});

const CustomCard = styled(Card)({
  border: 'none',
  boxShadow: 'none',
});

const BorderButton = styled(Button)({
  border: '2px solid #007bff',
  color: '#007bff',
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
});

const ImageUpload = ({ cardName }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const MAX_SIZE_MB = 2; // Maximum file size in MB
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024; // Convert MB to bytes

  const handleUploadClick = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > MAX_SIZE_BYTES) {
        setErrorMessage('File size should not exceed 2MB.');
        return;
      }

      const fileType = file.type;
      if (fileType !== 'image/jpeg' && fileType !== 'application/pdf') {
        setErrorMessage('Upload a clear image in .jpeg or .pdf format only.');
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setSelectedFile({ src: reader.result, type: fileType });
        setErrorMessage('');
      };
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      if (file.size > MAX_SIZE_BYTES) {
        setErrorMessage('File size should not exceed 2MB.');
        return;
      }

      const fileType = file.type;
      if (fileType !== 'image/jpeg' && fileType !== 'application/pdf') {
        setErrorMessage('Upload a clear image in .jpeg or .pdf format only.');
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setSelectedFile({ src: reader.result, type: fileType });
        setErrorMessage('');
      };
    }
  };

  const handleUploadAgain = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear previous value
      fileInputRef.current.click(); // Trigger file input click
    } else {
      console.error('File input reference is not set.');
    }
  };

  return (
    <Root>
      <CustomCard className={cardName}>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <DragDropArea
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current && fileInputRef.current.click()} // Trigger file input click
            >
              <Preview>
                {selectedFile ? (
                  selectedFile.type === 'application/pdf' ? (
                    <PDFPreview src={selectedFile.src} type="application/pdf" />
                  ) : (
                    <Image src={selectedFile.src} alt="upload" />
                  )
                ) : (
                  <>
                    <UploadIcon style={{ fontSize: '24px' }} />
                    <Typography variant="body2">Upload</Typography>
                  </>
                )}
              </Preview>
            </DragDropArea>
            <HiddenInput
              accept="image/jpeg,application/pdf"
              id={`contained-button-file-${cardName}`}
              multiple
              type="file"
              onChange={handleUploadClick}
              ref={fileInputRef} // Assign ref to file input
            />
          </Grid>
          {errorMessage && (
            <Typography color="error" variant="body2">
              {errorMessage}
            </Typography>
          )}
          {selectedFile && (
            <Grid item>
              <BorderButton
                variant="outlined"
                color="primary"
                onClick={handleUploadAgain}
              >
                Upload Again
              </BorderButton>
            </Grid>
          )}
        </Grid>
      </CustomCard>
    </Root>
  );
};

export default ImageUpload;
