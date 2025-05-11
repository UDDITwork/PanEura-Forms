const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const { sendClientConfirmationEmail, sendAdminNotificationEmail } = require('../utils/emailService');

// Create client with email confirmation
router.post('/', async (req, res) => {
  try {
    console.log('Received client registration data:', {
      name: req.body.name,
      email: req.body.email,
      company: req.body.company,
      phone: req.body.phone
    });

    // Create the client in database
    const client = await Client.create(req.body);
    console.log('Client saved to database:', client._id);
    
    // Send confirmation email to client
    console.log('Attempting to send welcome email to client...');
    sendClientConfirmationEmail(client)
      .then(emailSent => {
        if (emailSent) {
          console.log(`✅ Confirmation email sent successfully to ${client.email}`);
        } else {
          console.log(`❌ Failed to send confirmation email to ${client.email}`);
        }
      })
      .catch(error => {
        console.error('Error in email sending process:', error);
      });
    
    // Send notification email to admin
    console.log('Attempting to send admin notification...');
    sendAdminNotificationEmail(client)
      .then(emailSent => {
        if (emailSent) {
          console.log('✅ Admin notification email sent successfully');
        } else {
          console.log('❌ Failed to send admin notification email');
        }
      })
      .catch(error => {
        console.error('Error in admin notification process:', error);
      });
    
    // Return successful response immediately (don't wait for emails)
    res.status(201).json({
      success: true,
      message: 'Client registered successfully',
      client: client
    });
  } catch (err) { 
    console.error('Error creating client:', err);
    res.status(400).json({ 
      success: false,
      error: err.message 
    }); 
  }
});

// Read all
router.get('/', async (req, res) => {
  try {
    const list = await Client.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    console.error('Error fetching clients:', err);
    res.status(500).json({ error: 'Failed to fetch clients' });
  }
});

// Read one
router.get('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    
    res.json(client);
  } catch (err) {
    console.error('Error fetching client details:', err);
    res.status(500).json({ error: 'Failed to fetch client details' });
  }
});

// Update status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['IN_PROCESS', 'COMPLETED', 'CANCELLED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }
    
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    
    res.json(client);
  } catch (err) {
    console.error('Error updating client status:', err);
    res.status(500).json({ error: 'Failed to update client status' });
  }
});

module.exports = router;
