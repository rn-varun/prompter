import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { TwitterProvider } from "next-auth/providers/twitter"
import { connectToDB } from "@utils/db";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // TwitterProvider({
    //   clientId:process.env.TWITTER_CLIENT_ID,
    //   clientSecret: process.env.TWITTER_CLIENT_SECRET
    // })
    
  ],
  
  callbacks: {
    async session({ session }) {

      const sessionUser = await User.findOne({
          email: session.user.email
      })
      session.user.id = sessionUser._id.toString(); // enhancing the sessions id with database id
      return session;
    },
    async signIn({ profile }) {
      try {
          await connectToDB(); // first connect to database
          
  
          // check if user exists in the database, if it does then return true
          const userExists = await User.findOne({ 
              email:profile.email
          })
  
          // if the user does not exist, create a user using the User model by using the profile
          if(!userExists){ 
              await User.create({
                  email: profile.email,
                  username: profile.name.replace(" ", "").toLowerCase(),
                  image: profile.picture
              })
          }
          return true;
      } catch (error) {
          console.log(error);
          return false;
      }
    },
  }
  
});

export { handler as GET, handler as POST };
