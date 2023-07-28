import { msgModel } from '../../../DB/Models/message.model.js'
import { userModel } from '../../../DB/Models/user.model.js'

//send message 
export const sendMessage = async (req, res, next) => {
  const { content, sendTo } = req.body

  const user = await userModel.findById(sendTo)
  if (!user) {
    return next(new Error('invalid account', { cause: 400 }))
  }

  const message = new msgModel({ content, sendTo })
  await message.save()
  res.status(201).json({ message: 'Done' })
}

//get messages 
export const getUserMessages = async (req, res, next) => {
  const { _id } = req.authUser
  const messages = await msgModel.find({ sendTo: _id })
  if (messages.length) {
    return res.status(200).json({ message: 'Done', messages })
  }
  res.status(200).json({ message: 'empty inbox' })
}

//delete message 
export const deleteMessages = async (req, res, next) => {
  const { _id } = req.authUser
  const { msgId } = req.params
  const message = await msgModel.findOneAndDelete({
    _id: msgId,
    sendTo: _id,
  })

  if (message) {
    return res.status(200).json({ message: 'Done' })
  }
  return next(new Error('Unauthorized to delete this message', { cause: 400 }))
}
