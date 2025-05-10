import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClient, updateClientStatus } from '../api';

export default function ClientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        console.log('Fetching client details for ID:', id);
        const data = await getClient(id);
        console.log('Client details received:', data);
        setClient(data);
      } catch (err) {
        console.error('Error fetching client details:', err);
        setError('Failed to load client details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      setUpdating(true);
      console.log('Updating client status:', newStatus);
      const updatedClient = await updateClientStatus(id, newStatus);
      console.log('Client updated:', updatedClient);
      setClient(updatedClient);
    } catch (err) {
      console.error('Error updating client status:', err);
      alert('Failed to update client status. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div>Loading client details...</div>;
  }

  if (error) {
    return (
      <div style={{ color: 'red' }}>
        <p>{error}</p>
        <button onClick={() => navigate('/admin')}>Back to Client List</button>
      </div>
    );
  }

  if (!client) {
    return <div>Client not found.</div>;
  }

  const createdDate = new Date(client.createdAt).toLocaleDateString();
  const updatedDate = new Date(client.updatedAt).toLocaleDateString();

  return (
    <div>
      <h2>Client Details</h2>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button 
          onClick={() => navigate('/admin')}
          style={{
            backgroundColor: '#9e9e9e',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Back to List
        </button>
        
        <div>
          <strong>Status: </strong>
          <StatusBadge status={client.status} />
          
          {client.status !== 'COMPLETED' && (
            <button 
              onClick={() => handleStatusChange('COMPLETED')}
              disabled={updating}
              style={statusButtonStyle('#4caf50')}
            >
              Mark as Completed
            </button>
          )}
          
          {client.status !== 'CANCELLED' && (
            <button 
              onClick={() => handleStatusChange('CANCELLED')}
              disabled={updating}
              style={statusButtonStyle('#f44336')}
            >
              Cancel Project
            </button>
          )}
          
          {client.status !== 'IN_PROCESS' && (
            <button 
              onClick={() => handleStatusChange('IN_PROCESS')}
              disabled={updating}
              style={statusButtonStyle('#ff9800')}
            >
              Mark as In Process
            </button>
          )}
        </div>
      </div>
      
      <div style={cardStyle}>
        <div style={rowStyle}>
          <div style={colStyle}>
            <div style={fieldStyle}>
              <strong>Name:</strong> {client.name}
            </div>
            <div style={fieldStyle}>
              <strong>Company:</strong> {client.company}
            </div>
            <div style={fieldStyle}>
              <strong>Email:</strong> {client.email}
            </div>
            <div style={fieldStyle}>
              <strong>Phone:</strong> {client.phone}
            </div>
          </div>
          
          <div style={colStyle}>
            <div style={fieldStyle}>
              <strong>Budget:</strong> ₹{client.budget.toLocaleString()}
            </div>
            <div style={fieldStyle}>
              <strong>Time Limit:</strong> {client.timeLimit}
            </div>
            <div style={fieldStyle}>
              <strong>Registered:</strong> {createdDate}
            </div>
            <div style={fieldStyle}>
              <strong>Last Updated:</strong> {updatedDate}
            </div>
          </div>
        </div>
        
        <div style={fieldStyle}>
          <strong>Address:</strong>
          <p>{client.address}</p>
        </div>
        
        <div style={fieldStyle}>
          <strong>Project Description:</strong>
          <p style={{ whiteSpace: 'pre-wrap' }}>{client.project}</p>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  let backgroundColor;
  let textColor = 'white';
  
  switch (status) {
    case 'IN_PROCESS':
      backgroundColor = '#ff9800'; // Orange
      break;
    case 'COMPLETED':
      backgroundColor = '#4caf50'; // Green
      break;
    case 'CANCELLED':
      backgroundColor = '#f44336'; // Red
      break;
    default:
      backgroundColor = '#9e9e9e'; // Gray
  }

  return (
    <span style={{
      backgroundColor,
      color: textColor,
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 'bold',
      marginRight: '10px'
    }}>
      {status.replace('_', ' ')}
    </span>
  );
}

function statusButtonStyle(color) {
  return {
    backgroundColor: color,
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    marginLeft: '5px',
    cursor: 'pointer',
    fontSize: '12px'
  };
}

const cardStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  padding: '20px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const rowStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  marginBottom: '20px'
};

const colStyle = {
  flex: '1',
  minWidth: '250px',
  marginRight: '20px'
};

const fieldStyle = {
  marginBottom: '15px'
};