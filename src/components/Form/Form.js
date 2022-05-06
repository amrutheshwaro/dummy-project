import React, {useState} from 'react';
import { Button, Typography, Grid, Paper } from '@mui/material';
import FileBase from 'react-file-base64';
import IPFS from 'ipfs-mini';
// import axios from 'axios';
// import base64 from 'file-base64';

const Form = () => {
  const [postData, setPostData] = useState({selectedFile: null});

  const uploadSequence = async (event) => {
    if (postData.selectedFile === null) {
      alert('Select a file for upload');
    } else {
      event.preventDefault();
      const ipfs = new IPFS({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});
      await ipfs.add(postData.selectedFile, async (error, output) => {
        if (!error) {
          // const data = await axios.get('https://ipfs.infura.io/ipfs/' + output);
          // const decodedData = await base64.decode(data);
          // console.log(decodedData);
          window.open('https://ipfs.infura.io/ipfs/' + output);
        }
      });
    }
  }

  return (
    <Grid align='center'>
      <Paper elevation={10} style={styles.paperStyle}>
        <h2 style={styles.headerStyle}>IPFS UPLOAD</h2>
        <Typography variant='caption'>Select a file to upload to IPFS</Typography>
        <form>
          <div style={styles.fileBase}>
            <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })} />
          </div>
          <Button type='submit' variant='contained' color='primary' onClick={(event) => uploadSequence(event)} style={styles.buttonStyle}>Upload</Button>
        </form>
      </Paper>
    </Grid>
  );
}

export default Form;

const styles = {
  paperStyle : {
    padding: '30px 20px 20px', 
    width: 300, 
    margin: '20px auto'
  },
  headerStyle : {
    margin: 0,
  },
  fileBase: {
    margin: '10px'
  },
  buttonStyle : {
    margin: '10px 0 0',
  }
}