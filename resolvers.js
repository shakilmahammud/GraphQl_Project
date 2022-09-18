import {quotes,users} from './fackdb.js'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const User  = mongoose.model("User")
const resolvers = {
    Query:{
       users:()=>users,
       user:(_,{_id})=>users.find(user=>user._id == _id),
       quotes:()=>quotes,
       iquote:(_,{by})=>quotes.filter(quote=>quote.by == by)
    },
    User:{
        quotes:(ur)=>quotes.filter(quote=>quote.by == ur._id)
    },
    Mutation:{
        signupUser:async(_,{userNew})=>{
         const user = await User.findOne({email:userNew.email}) 
         if (user){
            throw new Error('User already Exists')
         }
        const hashPassword =await bcrypt.hash(userNew.password,12)
      const newUser = new User({
        ...userNew,
        password:hashPassword
       })
       return await newUser.save() 
    },
    signingUser:async(_,{userSignin})=>{
     const user = await User.findOne({email:userSignin.email})
     if(!user){
        throw new Error('User not Exists') 
     }
    const match= await bcrypt.compare(userSignin.password,user.password)
     if(!match){
        throw new Error ("invalid email or Password")
     }
     const JWT_SECRET= process.env.JWT_SECRET
     const accessToken =jwt.sign({userId:user._id},JWT_SECRET)
     return{
        token:accessToken
     }
    } 
    }
}

export default resolvers