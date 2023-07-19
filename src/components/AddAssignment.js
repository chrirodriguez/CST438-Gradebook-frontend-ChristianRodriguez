import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, TextField } from '@mui/material';
import Cookies from 'js-cookie';
import { SERVER_URL } from '../constants.js';


const AddAssignment = () => {
  const history = useHistory();
  const [assignment, setAssignment] = useState({
    name: '',
    dueDate: '',
    courseId: ''
  });

  const handleInputChange = (event) => {
    setAssignment({
      ...assignment,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = () => {
    const token = Cookies.get('XSRF-TOKEN');
    fetch(`${SERVER_URL}/assignments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': token
      },
      body: JSON.stringify(assignment)
    })
      .then((response) => {
        if (response.ok) {
          toast.success('Assignment created successfully', {
            position: toast.POSITION.BOTTOM_LEFT
          });
          history.push('/assignments');
        } else {
          toast.error('Failed to create assignment', {
            position: toast.POSITION.BOTTOM_LEFT
          });
          console.error('Post http status =' + response.status);
        }
      })
      .catch((error) => {
        toast.error('Failed to create assignment', {
          position: toast.POSITION.BOTTOM_LEFT
        });
        console.error(error);
      });
  };

  return (
    <div>
      <h4>Add New Assignment</h4>
      <TextField
        label="Assignment Name"
        name="name"
        value={assignment.name}
        onChange={handleInputChange}
      />
      <TextField
        label="Due Date"
        name="dueDate"
        type="date"
        value={assignment.dueDate}
        onChange={handleInputChange}
        InputLabelProps={{
          shrink: true
        }}
      />
      <TextField
        label="Course ID"
        name="courseId"
        value={assignment.courseId}
        onChange={handleInputChange}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Add Assignment
      </Button>
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default AddAssignment;
