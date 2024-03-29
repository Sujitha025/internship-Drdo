import jwt from 'jsonwebtoken';
import ENV from '../config.js'

/** auth middleware */
export default async function Auth(req, res, next){
    try {
        const authorizationHeader = req.headers.authorization;
        console.log(req.headers.authorization);
      if (!authorizationHeader) {
    return res.status(401).json({ error: "Authorization header not provided" });
}
        // access authorize header to validate request
        const token = authorizationHeader.split(" ")[1];

        // retrive the user details fo the logged in user
        const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);
        // console.log(decodedToken);
        req.user = decodedToken;

        next()

    } catch (error) {
        res.status(401).json({ error : "Authentication Failed!"})
    }
}


export function localVariables(req, res, next){
    req.app.locals = {
        OTP : null,
        resetSession : false
    }
    next()
}