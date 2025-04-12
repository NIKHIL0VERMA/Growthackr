import { Platform } from "@src/pages/background/types/storage"

export const popularPlatforms : Platform[] = [
    { name: "Facebook", url: "facebook.com", icon: "fa-facebook", timeLimit: {hours : 0, minutes: 0.1}, isCustom: false },
    { name: "YouTube", url: "youtube.com", icon: "fa-youtube", timeLimit: {hours : 0, minutes: 0.1}, isCustom: false },
    { name: "Instagram", url: "instagram.com", icon: "fa-instagram", timeLimit: {hours : 0, minutes: 0.1}, isCustom: false },
    { name: "X", url: "x.com", icon: "fa-square-x-twitter", timeLimit: {hours : 0, minutes: 0.1}, isCustom: false },
    { name: "TikTok", url: "tiktok.com", timeLimit: {hours : 0, minutes: 0.1}, icon: "fa-tiktok", isCustom: false},
    { name: "Snapchat", url: "snapchat.com", timeLimit: {hours : 0, minutes: 0.1}, icon: "fa-snapchat", isCustom: false },
  ]