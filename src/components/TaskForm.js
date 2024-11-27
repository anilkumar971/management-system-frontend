import React, { useState } from 'react';
import { 
    TextField, 
    Button, 
    Box, 
    Card, 
    CardContent, 
    Typography 
} from '@mui/material';

const TaskForm = ({ onSubmit }) => {
    const initialState = {
        title: '',
        description: '',
        dueDate: '',
        status: 'PENDING'
    };

    const [task, setTask] = useState(initialState);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!task.title.trim()) newErrors.title = 'Title is required';
        if (!task.dueDate) newErrors.dueDate = 'Due date is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(task);
            setTask(initialState);
        }
    };

    return (
        <Card sx={{ mb: 3 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Create New Task
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Title"
                        value={task.title}
                        onChange={(e) => setTask({...task, title: e.target.value})}
                        fullWidth
                        margin="normal"
                        error={!!errors.title}
                        helperText={errors.title}
                    />
                    <TextField
                        label="Description"
                        value={task.description}
                        onChange={(e) => setTask({...task, description: e.target.value})}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={3}
                    />
                    <TextField
                        label="Due Date"
                        type="date"
                        value={task.dueDate}
                        onChange={(e) => setTask({...task, dueDate: e.target.value})}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.dueDate}
                        helperText={errors.dueDate}
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        sx={{ mt: 2 }}
                    >
                        Add Task
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TaskForm;
// ... existing imports
