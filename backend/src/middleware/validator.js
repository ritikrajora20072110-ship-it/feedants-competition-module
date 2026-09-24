const mongoose = require('mongoose');

/**
 * Validates whether the given string is a valid MongoDB ObjectId
 */
const validateObjectId = (paramName = 'id') => {
  return (req, res, next) => {
    const id = req.params[paramName];
    // Allow slug or ObjectId
    if (id && !mongoose.Types.ObjectId.isValid(id) && !/^[a-z0-9-]+$/i.test(id)) {
      return res.status(400).json({
        success: false,
        error: `Invalid ${paramName} parameter format`,
        code: 'INVALID_ID_FORMAT',
      });
    }
    next();
  };
};

/**
 * Validates competition submission payload
 */
const validateSubmission = (req, res, next) => {
  const { title, mediaUrl, notes } = req.body;

  if (!mediaUrl || typeof mediaUrl !== 'string' || !mediaUrl.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Media URL (video link) is required',
      code: 'MISSING_MEDIA_URL',
    });
  }

  // URL format validation
  const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
  if (!urlPattern.test(mediaUrl.trim())) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid media URL (http:// or https://)',
      code: 'INVALID_URL_FORMAT',
    });
  }

  if (title && (typeof title !== 'string' || title.length > 120)) {
    return res.status(400).json({
      success: false,
      error: 'Performance title cannot exceed 120 characters',
      code: 'TITLE_TOO_LONG',
    });
  }

  if (notes && (typeof notes !== 'string' || notes.length > 1000)) {
    return res.status(400).json({
      success: false,
      error: 'Choreography notes cannot exceed 1000 characters',
      code: 'NOTES_TOO_LONG',
    });
  }

  next();
};

/**
 * Validates registration payload
 */
const validateRegistration = (req, res, next) => {
  const { paymentId, paymentGateway } = req.body;

  if (paymentGateway && typeof paymentGateway !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Invalid paymentGateway format',
      code: 'INVALID_GATEWAY',
    });
  }

  next();
};

module.exports = {
  validateObjectId,
  validateSubmission,
  validateRegistration,
};
