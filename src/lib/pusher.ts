import Pusher from "pusher"
import PusherClient from "pusher-js"

export const pusherServer = new Pusher({
    appId: process.env.PUSHER_APP_ID || "app-id",
    key: process.env.NEXT_PUBLIC_PUSHER_KEY || "key",
    secret: process.env.PUSHER_SECRET || "secret",
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "cluster",
    useTLS: true,
})

export const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY || "key", {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "cluster",
})
