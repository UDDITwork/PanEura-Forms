import React, { useState } from 'react';
import { createClient } from '../api';

export default function ClientForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    address: '',
    phone: '',
    email: '',
    project: '',
    timeLimit: '',
    budget: 0
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'budget' ? Number(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      // Log the data being sent to the API
      console.log('Submitting client data:', formData);
      
      const result = await createClient(formData);
      console.log('API response:', result);
      
      setSuccess(true);
      setFormData({
        name: '',
        company: '',
        address: '',
        phone: '',
        email: '',
        project: '',
        timeLimit: '',
        budget: 0
      });
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.message || 'An error occurred while registering the client');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {success ? (
        <div className="welcome-message">
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
          
          <h2 className="welcome-title">Successfully Registered!</h2>
          <p className="welcome-text">
            Welcome! We are delighted to onboard you at PanEura Automations, Eurasia's fastest growing Internet Solutions Provider and Automation Organization. Our team will review your project details and get back to you shortly.
          </p>
          
          <div style={{ marginTop: "2rem" }}>
            <button 
              onClick={() => setSuccess(false)} 
              className="btn btn-primary"
            >
              Register Another Client
            </button>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-header">
            Client Registration
          </div>
          <div className="card-body">
            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="company" className="form-label">Company Name</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="form-control"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter your company name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="address" className="form-label">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form-control"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your full address"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="project" className="form-label">Project Description</label>
                <textarea
                  id="project"
                  name="project"
                  className="form-control"
                  value={formData.project}
                  onChange={handleChange}
                  placeholder="Please describe your project requirements in detail"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="timeLimit" className="form-label">Expected Timeline</label>
                <input
                  type="text"
                  id="timeLimit"
                  name="timeLimit"
                  className="form-control"
                  value={formData.timeLimit}
                  onChange={handleChange}
                  placeholder="e.g., 2 weeks, 1 month"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="budget" className="form-label">Budget (₹)</label>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  className="form-control"
                  value={formData.budget}
                  onChange={handleChange}
                  min="0"
                  placeholder="Enter your budget in Indian Rupees"
                  required
                />
              </div>
              
              <div className="form-group" style={{ textAlign: 'center' }}>
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg"
                  disabled={loading}
                  style={{ 
                    display: 'inline-block', 
                    width: 'auto', 
                    minWidth: '180px', 
                    margin: '0 auto'
                  }}
                >
                  {loading ? 'Processing...' : 'Register Client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}