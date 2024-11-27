import React, { useState, useEffect } from 'react';
import { Container, Typography, Alert, Snackbar } from '@mui/material';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import taskService from './services/taskService';

function App() {
    const [tasks, setTasks] = useState([]);
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [notification, setNotification] = useState({ open: false, message: '', type: 'success' });

    const loadTasks = async () => {
        try {
            const response = statusFilter === 'ALL' 
                ? await taskService.getAllTasks()
                : await taskService.getTasksByStatus(statusFilter);
            setTasks(response.data);
        } catch (error) {
            showNotification('Error loading tasks', 'error');
        }
    };

    useEffect(() => {
        loadTasks();
    }, [statusFilter]);

    const showNotification = (message, type = 'success') => {
        setNotification({ open: true, message, type });
    };

    const handleSubmit = async (task) => {
        try {
            await taskService.createTask(task);
            showNotification('Task created successfully');
            loadTasks();
        } catch (error) {
            showNotification('Error creating task', 'error');
        }
    };

    const handleDelete = async (id) => {
        try {
            await taskService.deleteTask(id);
            showNotification('Task deleted successfully');
            loadTasks();
        } catch (error) {
            showNotification('Error deleting task', 'error');
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const task = tasks.find(t => t.id === id);
            await taskService.updateTask(id, { ...task, status: newStatus });
            showNotification('Task status updated successfully');
            loadTasks();
        } catch (error) {
            showNotification('Error updating task status', 'error');
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Task Management System
            </Typography>
            <TaskForm onSubmit={handleSubmit} />
            <TaskList
                tasks={tasks}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
                statusFilter={statusFilter}
                onFilterChange={setStatusFilter}
            />
            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={() => setNotification({ ...notification, open: false })}
            >
                <Alert severity={notification.type} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default App;