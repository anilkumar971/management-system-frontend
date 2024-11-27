import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Switch,
    Box,
    Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskItem = ({ task, onDelete, onStatusChange }) => {
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            onDelete(task.id);
        }
    };

    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">{task.title}</Typography>
                    <Box>
                        <Switch
                            checked={task.status === 'COMPLETED'}
                            onChange={() => onStatusChange(task.id, 
                                task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED')}
                        />
                        <IconButton onClick={handleDelete} color="error">
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Typography color="textSecondary" sx={{ mb: 1 }}>
                    {task.description}
                </Typography>
                <Box display="flex" gap={1}>
                    <Chip 
                        label={`Due: ${new Date(task.dueDate).toLocaleDateString()}`}
                        size="small"
                    />
                    <Chip 
                        label={task.status}
                        color={task.status === 'COMPLETED' ? 'success' : 'warning'}
                        size="small"
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default TaskItem;
