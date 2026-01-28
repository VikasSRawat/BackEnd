import z from "zod";

export const shorternerSchema = z.object({
    url : z.string({required_error: "URL is required"}).trim().url({message:"Please enter a valid url"}).max(1024,{message:"URL cannot be bigger than 1024 characters"}),
    shortCode : z.string({required_error: "ShortCode is required"}).trim().min(3,{message:"Please enter a shortCode of length at least 3"}).max(50,{message:"shortcode cannot be bigger than 50 characters"}),
})