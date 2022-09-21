import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const User  = mongoose.model("User")
const Quote = mongoose.model("Quote")
const resolvers = {
    Query:{
       users:async()=>await User.find({}),
       user:async(_,{_id})=>await User.findOne({_id}),
       quotes:async()=>await Quote.find({}).populate("by","_id firstName"),
       iquote:async(_,{by})=>await Quote.find(by)
    },
    User:{
        quotes:async(ur)=>await Quote.find({by:ur._id})
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
    },
    createQuote:async(_,{name},{userId}) =>{
      //TODO 
      if(!userId) throw new Error("You must be logged in")
     const newQuote=new Quote({
         name,
         by:userId,
      })
      await newQuote.save()
      return "Quote saved successfully"
    }
    }
}

export default resolvers