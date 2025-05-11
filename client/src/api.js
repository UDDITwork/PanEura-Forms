const API_URL = '/api/clients';

export async function createClient(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
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
