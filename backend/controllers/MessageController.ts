import {Request, Response} from 'express';
import { messageModel } from "../db/message";
import {messageSchema} from "../_helpers/validators/index"
import { result } from 'lodash';

class MessageController {
    public async getAllMessages (reques:Request, response:Response) {
        try {
            const messages = await messageModel.find()
        .populate('to', '_id name email')
        .populate('sender', '_id name email');

            return response.status(200).json({data:messages})
        } catch (error) {
            return response.status(400).json({status:false, error})
        }
    }

    public async getMessage(request:Request, response:Response) {
        try {
            const {id} = request.params
            const message = messageModel.findById(id)
            return response.status(200).json({data:message})

        } catch (error) {
            return response.status(400).json({status:false, error})
        }
    }

    public async createMessage(request:Request, response:Response) {
        try {
            const {sender, to, subject, body} = request.body;
            messageSchema.parse({sender, to, subject, body})
            const message = new messageModel({
                sender,
                to,
                subject,
                body,
                status: 1
            })

            await message.save();
            return response.status(200).json({message:'Message Sent', data: message})
        } catch (error) {
            return response.status(400).json({status:false, error})
        }
    }

    public async readMessage(request:Request, response:Response) {
        try {
            const {id} = request.params;
            const message = await messageModel.findById(id);
            if( message) {
                message.status = 2
                await message.save()
                return response.status(200).json({message:"Message updated", data: message})
            }
        } catch (error) {
            return response.status(400).json({status: false, error})
        }
    }

    public async deleteMessage(request:Request, response:Response) {
        try {
            const {id} = request.params;
            const message = await messageModel.findById(id)
            if (message) {
                message.status = 3
                await message.save()
                return response.status(200).json({message:"Message deleted", data: message})
            }
            
        } catch (error) {
            return response.status(400).json({status: false, error})
        }
    }
}

export default new MessageController