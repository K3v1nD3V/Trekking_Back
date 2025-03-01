const jwt = require('jsonwebtoken');

const authMiddleware = (requiredPermissions = []) => {
    return (req, res, next) => {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
        }
        console.log(process.env.JWT_SECRET);
        console.log(token);
        console.log(jwt.verify(token, process.env.JWT_SECRET));
        
        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET); // Usar el secreto desde .env
            req.user = verified;
            
            
            // // Verificar permisos si se requieren
            // if (requiredPermissions.length > 0 && !requiredPermissions.includes(req.user.role)) {
            //     return res.status(403).json({ message: 'No tienes permisos para acceder a esta ruta.' });
            // }

            // next();
        } catch (error) {
            res.status(400).json({ message: 'Token no válido.' });
        }
    };
};

module.exports = authMiddleware;
