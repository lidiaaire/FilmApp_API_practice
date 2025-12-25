const admin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        status: "error",
        message: "Acceso denegado: se requieren privilegios de administrador",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Acesso denegado, solo administradores",
      error: error.message,
    });
  }
};

module.exports = admin;
