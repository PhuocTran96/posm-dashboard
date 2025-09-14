// Simplified auth middleware for progress dashboard only
// Bypasses authentication since we're running in standalone mode

/**
 * Simplified token verification that always passes for progress dashboard
 */
const verifyToken = async (req, res, next) => {
  // Mock user object for progress dashboard
  req.user = {
    _id: 'dashboard-user',
    userid: 'dashboard',
    username: 'Progress Dashboard',
    role: 'admin',
    isActive: true
  };

  next();
};

/**
 * Admin access middleware - always passes in standalone mode
 */
const requireAdmin = (req, res, next) => {
  next();
};

module.exports = {
  verifyToken,
  requireAdmin,
};