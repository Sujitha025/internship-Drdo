import UserModel from '../model/User.model.js';
import VideoModel from '../model/Video.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js'
import otpGenerator from 'otp-generator';

/** middleware for verify user */
export async function verifyUser(req, res, next){
    try {
        
        const { username } = req.method == "GET" ? req.query : req.body;

        // check the user existance
        let exist = await UserModel.findOne({ username });
        if(!exist) return res.status(404).send({ error : "Can't find User!"});
        next();

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error"});
    }
}


/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
export async function register(req, res) {
    try {
        const { username, password, profile, email } = req.body;

        // Check if the username already exists
        const existingUser = await UserModel.findOne({ username }).exec();

        if (existingUser) {
            return res.status(400).send({ error: "Username already exists" });
        }

        // Check if the email already exists
        const existingEmail = await UserModel.findOne({ email }).exec();

        if (existingEmail) {
            return res.status(400).send({ error: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const user = new UserModel({
            username,
            password: hashedPassword,
            profile: profile || '',
            email
        });

        // Save the user to the database
        await user.save();

        res.status(201).send({ msg: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
}

// export async function register(req,res){

//     try {
//         const { username, password, profile, email } = req.body;        

//         // check the existing user
//     const existUsername = UserModel.findOne({ username }).exec()
//     .then(user => {
//         if (user) {
//             throw new Error("Please use a unique username");
//         }
//     })
//     .catch(error => {
//         throw new Error(error.message);
//     });

// // check for existing email
// const existEmail = UserModel.findOne({ email }).exec()
//     .then(existingEmail => {
//         if (existingEmail) {
//             throw new Error("Please use a unique email");
//         }
//     })
//     .catch(error => {
//         throw new Error(error.message);
//     });


//         Promise.all([existUsername, existEmail])
//             .then(() => {
//                 if(password){
//                     bcrypt.hash(password, 10)
//                         .then( hashedPassword => {
                            
//                             const user = new UserModel({
//                                 username,
//                                 password: hashedPassword,
//                                 profile: profile || '',
//                                 email
//                             });

//                             // return save result as a response
//                             user.save()
//                                 .then(result => res.status(201).send({ msg: "User Register Successfully"}))
//                                 .catch(error => res.status(500).send({error: error.message}))

//                         }).catch(error => {
//                             return res.status(500).send({
//                                 error : "Enable to hashed password"
//                             })
//                         })
//                 }
//             }).catch(error => {
//                 return res.status(500).send({error : error.message} )
//             })


//     } catch (error) {
//         return res.status(500).send(error);
//     }

// }

/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export async function login(req,res){
   
    const { username, password } = req.body;

    try {
        
        UserModel.findOne({ username })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {

                        if(!passwordCheck) return res.status(400).send({ error: "Don't have Password"});

                        // create jwt token
                        const token = jwt.sign({
                                        userId: user._id,
                                        username : user.username
                                    }, ENV.JWT_SECRET , { expiresIn : "24h"});
                    
                        return res.status(200).send({
                            msg: "Login Successful...!",
                            username: user.username,
                            token
                        });                                    

                    })
                    .catch(error =>{
                        return res.status(400).send({ error: "Password does not Match"})
                    })
            })
            .catch( error => {
                return res.status(404).send({ error : "Username not Found"});
            })

    } catch (error) {
        return res.status(500).send({ error});
    }
}


/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req, res) {
    const { username } = req.params;

    try {
        if (!username) {
            return res.status(501).send({ error: "Invalid Username" });
        }

        UserModel.findOne({ username }).exec()
            .then(user => {
                if (!user) {
                    return res.status(501).send({ error: "Couldn't Find the User" });
                }

                /** remove password from user */
                // mongoose returns unnecessary data with object, so convert it into JSON
                const { password, ...rest } = Object.assign({}, user.toJSON());

                return res.status(201).send(rest);
            })
            .catch(error => {
                return res.status(500).send({ error: error.message });
            });
    } catch (error) {
        return res.status(404).send({ error: "Cannot Find User Data" });
    }
}


/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export async function updateUser(req, res) {
    try {
        const { userId } = req.user;

        if (userId) {
            const body = req.body;

            // Update the data using async/await
            const updatedUser = await UserModel.updateOne({ _id: userId }, body);

            if (updatedUser.modifiedCount > 0) {
                return res.status(201).send({ msg: "Record Updated...!" });
            } else {
                return res.status(404).send({ error: "User not found or no changes made" });
            }
        } else {
            return res.status(401).send({ error: "User Not Found...!" });
        }
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}


/** GET: http://localhost:8080/api/generateOTP */
export async function generateOTP(req,res){
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
    res.status(201).send({ code: req.app.locals.OTP })
}


/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req,res){
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
        return res.status(201).send({ msg: 'Verify Successsfully!'})
    }
    return res.status(400).send({ error: "Invalid OTP"});
}


// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req,res){
   if(req.app.locals.resetSession){
        return res.status(201).send({ flag : req.app.locals.resetSession})
   }
   return res.status(440).send({error : "Session expired!"})
}


// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req, res) {
    try {
        if(!req.app.locals.resetSession) return res.status(440).send({error : "Session expired!"});
        const { username, password } = req.body;

        try {
            const user = await UserModel.findOne({ username }).exec();

            if (!user) {
                return res.status(404).send({ error: "Username not Found" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await UserModel.updateOne({ username: user.username }, { password: hashedPassword });

            req.app.locals.resetSession = false; // reset session
            return res.status(201).send({ msg: "Record Updated...!" });
        } catch (error) {
            return res.status(500).send({ error });
        }
    } catch (error) {
        return res.status(401).send({ error });
    }
}
/** POST: http://localhost:8080/api/savevideo */
export async function savevideo(req, res) {
    try {
      const { recordedVideo ,userData } = req.body;
      console.log(userData);
      console.log(recordedVideo);
      // Check if the email already exists in the database
      const existingVideo = await VideoModel.findOne({ senderEmail: userData.email });
  
      if (existingVideo) {
        // Email already exists, show a toast message or handle the error accordingly
        return res.status(400).json({ error: 'Email already exists' });
      }
  
      // Email doesn't exist, create a new instance of the VideoModel with the data
      const video = new VideoModel({
        senderName: userData.username,
        senderEmail: userData.email,
        recordedVideo,
      });
  
      // Save the video to the database
      await video.save();
  
      res.status(200).json({ message: 'Video saved successfully' });
    } catch (error) {
      console.error('Error saving video:', error);
      res.status(500).json({ error: 'Failed to save video' });
    }
  }