import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onDelete, onStatusChange, statusFilter, onFilterChange }) => {
    return (
        <Box>
            <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Filter by Status</InputLabel>
                <Select
                    value={statusFilter}
                    label="Filter by Status"
                    onChange={(e) => onFilterChange(e.target.value)}
                >
                    <MenuItem value="ALL">All Tasks</MenuItem>
                    <MenuItem value="PENDING">Pending</MenuItem>
                    <MenuItem value="COMPLETED">Completed</MenuItem>
                </Select>
            </FormControl>
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onDelete={onDelete}
                    onStatusChange={onStatusChange}
                />
            ))}
        </Box>
    );
};

export default TaskList;