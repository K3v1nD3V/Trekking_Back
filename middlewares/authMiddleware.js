const jwt = require('jsonwebtoken');

const authMiddleware = (requiredPermissions = []) => {
    return (req, res, next) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        console.log('auth: ', req.body);
        
        if (!token) {
            return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
        }
        
        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = verified; // Contiene { id, rol }
            // Verificar permisos si se requieren
            if (requiredPermissions.length > 0 && !requiredPermissions.includes(req.user.rol)) {
                return res.status(403).json({ message: 'No tienes permisos para acceder a esta ruta.' });
            }

            next();
        } catch (error) {
            res.status(400).json({ message: 'Token no válido.' });
        }
    };
};

module.exports = authMiddleware;


module.exports = authMiddleware;
