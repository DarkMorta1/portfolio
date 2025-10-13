"use server"

import clientPromise from "@/lib/mongodb"

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface ContactResponse {
  success: boolean
  message: string
  error?: string
}

export async function submitContactForm(formData: FormData): Promise<ContactResponse> {
  try {
    // Extract form data
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    // Validate input
    if (!name || !email || !message) {
      return {
        success: false,
        message: "All fields are required",
      }
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Invalid email format",
      }
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db("portfolio") // You can change this database name
    const collection = db.collection("messages")

    // Prepare message document
    const messageDoc = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      createdAt: new Date(),
      read: false,
      ip: null, // You can add IP tracking if needed
    }

    // Insert message into database
    const result = await collection.insertOne(messageDoc)

    if (result.acknowledged) {
      return {
        success: true,
        message: "Message sent successfully! I will get back to you soon.",
      }
    } else {
      throw new Error("Failed to save message")
    }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return {
      success: false,
      message: "Failed to send message. Please try again later.",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
