import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import bcrypt from 'bcryptjs'
import { prisma } from '../db/lib/prisma.js'

declare global {
    namespace Express {
        interface User {
            id: number
            username: string
        }
    }
}

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await prisma.user.findUnique({ where: { username } })
            if (!user) return done(null, false, { message: "Incorrect Email" })
            const match = await bcrypt.compare(password, user.password!)
            if (!match) return done(null, false, { message: "Incorrect password" })
            return done(null, user)
        } catch (err) {
            return done(err)
        }
    })
)

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: process.env.GOOGLE_CALLBACK_URL!
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await prisma.user.findUnique({
                where: { googleId: profile.id }
            })
            if (!user) {
                user = await prisma.user.create({
                    data: {
                        googleId: profile.id,
                        username: String((profile.emails?.[0]?.value ?? profile.id ?? 'user').split('@')[0]),
                        displayname: profile.displayName,
                        pictureURL: profile.photos?.[0]?.value ?? ''
                    }
                })
            }
            return done(null, { id: user.id, username: user.username })
        } catch (err) {
            return done(err)
        }
    })
)