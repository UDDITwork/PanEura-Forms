const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api/clients';

// Console log to help with debugging
console.log('Using API URL:', API_URL);

export async function createClient(data) {
  console.log('Sending data to API:', data);
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to register client');
    }
    
    return res.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export async function getClients() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function getClient(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

export async function updateClientStatus(id, status) {
  const res = await fetch(`${API_URL}/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  return res.json();
}
