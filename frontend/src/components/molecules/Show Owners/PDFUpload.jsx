import React, { useState, useRef, useEffect } from 'react';
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

const PDFPreview = styled('embed')({
    width: '200px', // Same width as DragDropArea
    height: '100px', // Same height as DragDropArea
    borderRadius: '10px',
    overflow: 'hidden',
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

const PDFUpload = ({ cardName }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        console.log('File input ref:', fileInputRef.current);
    }, []);

    const handleUploadClick = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = () => {
                setSelectedFile(reader.result);
            };
        } else {
            alert('Please upload a valid PDF file.');
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = () => {
                setSelectedFile(reader.result);
            };
        } else {
            alert('Please upload a valid PDF file.');
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
                            {selectedFile ? (
                                <PDFPreview src={selectedFile} type="application/pdf" />
                            ) : (
                                <>
                                    <UploadIcon style={{ fontSize: '24px' }} />
                                    <Typography variant="body2">Upload</Typography>
                                </>
                            )}
                        </DragDropArea>
                    </Grid>
                </Grid>
                <HiddenInput
                    accept="application/pdf"
                    id={`contained-button-file-${cardName}`}
                    multiple
                    type="file"
                    onChange={handleUploadClick}
                    ref={fileInputRef} // Assign ref to file input
                />
                {selectedFile && (
                    <Grid container direction="column" alignItems="center">
                        <Grid item>
                            <BorderButton
                                variant="outlined"
                                color="primary"
                                onClick={handleUploadAgain}
                            >
                                Upload Again
                            </BorderButton>
                        </Grid>
                    </Grid>
                )}
            </CustomCard>
        </Root>
    );
};

export default PDFUpload;
