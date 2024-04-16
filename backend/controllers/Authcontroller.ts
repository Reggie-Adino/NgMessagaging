import {Request, Response} from 'express'
import { loginSchema, resgisterSchema } from '../_helpers/validators';
import bcrypt from 'bcrypt';
import { UserModel } from '../db/user';
import { IUser } from '../models/common.model';
import { generateToken } from '../middleware/authentication';
import { IRequest } from '../models/common.model';

class AuthController {
   public async login(request: Request, response: Response) {
  try {
    const { email, password } = request.body;
    loginSchema.parse({ email, password });

    const user = await UserModel.findOne({ email });

    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        const data: IUser = {
          _id: user._id.toString(),
          email: user.email,
          name: user.name,
          token: '',
        };

        const token = generateToken(data); // Generate the token
        user.token = token; // Attach the token to the user object
        await user.save(); // Save the user with the updated token

        data.token = token; // Attach the token to the data object

        return response.status(201).json({ message: "User logged in", data });
      }
    }

    return response.status(400).json({ status: false, message: "Invalid credentials" });
  } catch (error) {
    return response.status(400).json({ status: false, error });
  }
}


    public async register(request: Request, response: Response) {
        try {
            const {name,email,password} = request.body;
            resgisterSchema.parse({name,email,password});

            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds)
            const hashPassword = await bcrypt.hash(password, salt)

            const user = new UserModel ({name, email, password:hashPassword})
            await user.save()

            return response.status(201).json({message:"User succesfully registered"})
            

        } catch (error) {
            return response.status(400).json({status: false, error})
        }        
    }

    public async me(request:IRequest, response:Response) {
        try {
            const email = request.user?.email;
            const user = await UserModel.findOne({email})

            if(user) {
                const data:IUser = {
                    _id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    token: user.token || ''
                }
            }
            return response.status(201).json({data:request.user})

        } catch (error) {
           return response.status(400).json({status: false, error})
        }
    }

    public async logout(request: IRequest, response: Response) {
        try {
          const email = request.user?.email;
          const user = await UserModel.findOne({
            email,
          });
    
          if (user) {
            user.token = null;
            await user.save();
          }
    
          return response
            .status(200)
            .json({ message: 'User logged out successfully' });
        } catch (error) {
          return response.status(400).json({ status: false, error });
        }
      }

        
        
    }


export  default new AuthController();


// import React from 'react'

// const Authcontroller = () => {
//   return (
//     <div>Authcontroller</div>
//   )
// }

// export default Authcontroller