// routes/venueRoutes.js

import express from 'express';
import { uploadVenue } from '../config/cloudinary.js';
import { 
  createVenue, 
  getOwnerVenues,
  getVenueById,
  deleteVenue,
  getVenuesByCity,
 
} from '../controller/VenueController.js';
import { protect } from '../middleware/auth.js';
console.log('✅ Venue routes loaded');
const router = express.Router();

// ====================================
// PUBLIC ROUTES (No authentication)
// ====================================

// ====================================
// PROTECTED ROUTES (Owner only)
// ====================================
router.use(protect);
// router.use(restrictTo('owner'));

// IMPORTANT: Specific routes MUST come BEFORE dynamic routes (:id)
// Owner's venues (must be before /:id)
router.get('/getowner', getOwnerVenues);

// Create new venue with images
router.post('/create', uploadVenue.array('images', 10), createVenue);

router.get('/city/:city', getVenuesByCity)
router.get('/:id', getVenueById);



// Delete venue
router.delete('/delete/:venueId', deleteVenue);

// ====================================
// IMAGE MANAGEMENT ROUTES
// ====================================
// Delete specific image from venue


export default router;