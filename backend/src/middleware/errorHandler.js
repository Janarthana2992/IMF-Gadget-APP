// src/middleware/errorHandler.js

/**
 * Global error handling middleware
 */
exports.errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    // Handle Prisma specific errors
    if (err.code && err.code.startsWith('P')) {
      if (err.code === 'P2002') {
        return res.status(409).json({ 
          message: 'Resource already exists with this unique constraint',
          field: err.meta?.target?.[0]
        });
      }
      
      if (err.code === 'P2025') {
        return res.status(404).json({ message: 'Resource not found' });
      }
    }
    
    // Default error response
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    
    res.status(statusCode).json({
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  };