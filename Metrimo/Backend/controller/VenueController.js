import Venue from "../models/venueSchema.js";
import User from "../models/userSchema.js";
import Booking from '../models/bookingSchema.js'; // Adjust path as needed
import { cloudinary } from "../config/cloudinary.js";



export const createVenue = async (req, res) => {
  console.log('📦 Request Body:', "hit create");
  const uploadedFiles = []; 
  
  try {
    console.log('📦 Request Body:', req.body);
    console.log('🖼️  Files Received:', req.files?.length || 0);

    const { name, description, address, city, capacity, pricePerDay, amenities } = req.body;

    // 1. Validation
    if (!name || !description || !address || !city || !capacity || !pricePerDay) {
      return res.status(400).json({ 
        success: false,
        message: "Please provide all required fields" 
      });
    }

    // 2. Process images (already uploaded to Cloudinary by multer-storage-cloudinary)
    let images = [];
    if (req.files && req.files.length > 0) {
      console.log(`✅ Processing ${req.files.length} images...`);
      
      images = req.files.map((file, index) => {
        uploadedFiles.push(file.filename); // Store for cleanup if needed
        return {
          url: file.path, // Cloudinary URL
          publicId: file.filename, // Cloudinary public_id
          isPrimary: index === 0,
        };
      });
    }

    // 3. Parse amenities
    let parsedAmenities = [];
    if (amenities) {
      try {
        parsedAmenities = typeof amenities === 'string' 
          ? JSON.parse(amenities) 
          : Array.isArray(amenities) ? amenities : [];
      } catch (error) {
        console.warn('⚠️  Invalid amenities format:', error);
      }
    }

    // 4. Create venue
    const venue = await Venue.create({
      ownerId: req.user.id,
      name: name.trim(),
      description: description.trim(),
      address: address.trim(),
      city: city.trim(),
      capacity: parseInt(capacity),
      pricePerDay: parseFloat(pricePerDay),
      amenities: parsedAmenities,
      images: images,
    });

    console.log('✅ Venue created successfully:', venue._id);

    res.status(201).json({ 
      success: true, 
      message: images.length > 0 
        ? `Venue created with ${images.length} image(s)` 
        : 'Venue created successfully',
      venue,
    });
    
  } catch (error) {
    console.error("❌ Create venue error:", error);
    
    // Cleanup uploaded images from Cloudinary if venue creation fails
    if (uploadedFiles.length > 0) {
      console.log(`🧹 Cleaning up ${uploadedFiles.length} images from Cloudinary...`);
      const cleanupPromises = uploadedFiles.map(publicId => 
        cloudinary.uploader.destroy(publicId).catch(err => 
          console.error(`Failed to delete ${publicId}:`, err)
        )
      );
      await Promise.allSettled(cleanupPromises);
    }
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false,
        message: messages.join(', ') 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: "Failed to create venue", 
      error: error.message 
    });
  }
};

export const getOwnerVenues = async (req, res) => {
     console.log('🎯 CREATE VENUE CONTROLLER HIT'); // Add this

  try {
    const venues = await Venue.find({ ownerId: req.user.id })
      .sort({ createdAt: -1 })
      .lean();
      
    res.json({ 
      success: true, 
      count: venues.length, 
      venues 
    });
  } catch (error) {
    console.error("Get owner venues error:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch your venues", 
      error: error.message 
    });
  }
};


// export const deleteVenue = async (req, res) => {
//   console.log('dlt hit')
//   try {
//     const venue = await Venue.findOne({
//       _id: req.params.venueId,
//       ownerId: req.user.id,
//     });

//     if (!venue) {
//       return res.status(404).json({ 
//         success: false,
//         message: "Venue not found or unauthorized" 
//       });
//     }

//     // Delete all images from Cloudinary
//     if (venue.images && venue.images.length > 0) {
//       console.log(`🧹 Deleting ${venue.images.length} images from Cloudinary...`);
//       const deletePromises = venue.images
//         .filter(image => image.publicId)
//         .map(image => 
//           cloudinary.uploader.destroy(image.publicId)
//             .then(() => console.log(`✅ Deleted: ${image.publicId}`))
//             .catch(err => console.error(`❌ Failed to delete ${image.publicId}:`, err))
//         );
      
//       await Promise.allSettled(deletePromises);
//     }

//     await venue.deleteOne();
    
//     res.json({ 
//       success: true, 
//       message: "Venue deleted successfully" 
//     });
//   } catch (error) {
//     console.error("Delete venue error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Failed to delete venue", 
//       error: error.message 
//     });
//   }
// };

export const deleteVenue = async (req, res) => {
  console.log('dlt hit');
  try {
    const venue = await Venue.findOne({
      _id: req.params.venueId,
      ownerId: req.user.id,
    });

    if (!venue) {
      return res.status(404).json({
        success: false,
        message: "Venue not found or unauthorized"
      });
    }

    // Delete all bookings associated with this venue
    const bookingsResult = await Booking.deleteMany({ venueId: req.params.venueId });
    console.log(`🗑️ Deleted ${bookingsResult.deletedCount} bookings associated with venue`);

    // Delete all images from Cloudinary
    if (venue.images && venue.images.length > 0) {
      console.log(`🧹 Deleting ${venue.images.length} images from Cloudinary...`);
      const deletePromises = venue.images
        .filter(image => image.publicId)
        .map(image =>
          cloudinary.uploader.destroy(image.publicId)
            .then(() => console.log(`✅ Deleted: ${image.publicId}`))
            .catch(err => console.error(`❌ Failed to delete ${image.publicId}:`, err))
        );

      await Promise.allSettled(deletePromises);
    }

    await venue.deleteOne();

    res.json({
      success: true,
      message: "Venue deleted successfully",
      deletedBookings: bookingsResult.deletedCount
    });

  } catch (error) {
    console.error("Delete venue error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete venue",
      error: error.message
    });
  }
};


export const getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id)
      .populate("ownerId", "name phone email profileImage");

    if (!venue) {
      return res.status(404).json({ 
        success: false,
        message: "Venue not found" 
      });
    }

    res.json({ success: true, venue });
  } catch (error) {
    console.error("Get venue error:", error);
    
    // Handle invalid ObjectId format
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false,
        message: "Invalid venue ID format" 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch venue", 
      error: error.message 
    });
  }
};

export const getVenuesByCity = async (req, res) => {
  try {
    const { city } = req.params;

    if (!city) {
      return res.status(400).json({
        success: false,
        message: "City parameter is required",
      });
    }

    const venues = await Venue.find({
      city: { $regex: new RegExp(`^${city}$`, "i") }, // case-insensitive
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: venues.length,
      venues,
    });
  } catch (error) {
    console.error("Get venues by city error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch venues",
    });
  }
};

// @desc    Update venue
// @route   PUT /api/venues/:id
// @access  Private (Owner only)


// @desc    Delete venue
// @route   DELETE /api/venues/:id
// @access  Private (Owner only)

//