import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getClients } from '../api';

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        console.log('Fetching clients...');
        const data = await getClients();
        console.log('Clients received:', data);
        setClients(data);
      } catch (err) {
        console.error('Error fetching clients:', err);
        setError('Failed to load clients. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          Client Management Dashboard
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center" style={{ padding: '2rem' }}>
              <div className="spinner"></div>
              <p>Loading clients data...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger">
              <p>{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="btn btn-primary"
                style={{ marginTop: '1rem' }}
              >
                Retry
              </button>
            </div>
          ) : clients.length === 0 ? (
            <div className="text-center" style={{ padding: '2rem' }}>
              <div style={{ fontSize: '4rem', color: '#94a3b8', marginBottom: '1rem' }}>📋</div>
              <h3>No Clients Registered Yet</h3>
              <p>When clients register, they will appear here.</p>
              <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                Register New Client
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="client-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Project</th>
                    <th>Budget</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client._id}>
                      <td>{client.name}</td>
                      <td>{client.company}</td>
                      <td>
                        {client.project.length > 50
                          ? `${client.project.substring(0, 50)}...`
                          : client.project}
                      </td>
                      <td>₹{client.budget.toLocaleString()}</td>
                      <td>
                        <StatusBadge status={client.status} />
                      </td>
                      <td>
                        <Link 
                          to={`/admin/${client._id}`}
                          className="btn-view"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
      backgroundColor = '#f59e0b'; // Orange
      break;
    case 'COMPLETED':
      backgroundColor = '#10b981'; // Green
      break;
    case 'CANCELLED':
      backgroundColor = '#ef4444'; // Red
      break;
    default:
      backgroundColor = '#64748b'; // Gray
  }

  return (
    <span style={{
      backgroundColor,
      color: textColor,
      padding: '0.25rem 0.5rem',
      borderRadius: '0.25rem',
      fontSize: '0.75rem',
      fontWeight: '600',
      textTransform: 'uppercase'
    }}>
      {status.replace('_', ' ')}
    </span>
  );
}