import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
 
 
  const authConfig  =  {
  providers: [Google({
    clientId: process.env.AUTH_GOOGL_ID,
    clientSecret : process.env.AUTH_GOOGL_SECRET 
  })],
  callbacks : {
    authorized({auth , request}) {
       return !! auth?.user;
    }
  },
  pages : {
    signIn : "/login"
  }
}
export const { handlers : {GET , POST}, auth, signOut ,signIn } = NextAuth(authConfig)