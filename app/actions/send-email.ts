"use server"

import emailjs from "@emailjs/browser"

export async function sendEmail(formData: { name: string; email: string; message: string }) {
  try {
    const templateParams = {
      user_name: formData.name,
      user_email: formData.email,
      message: formData.message,
    }

    const result = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID || "",
      process.env.EMAILJS_TEMPLATE_ID || "",
      templateParams,
      process.env.EMAILJS_PUBLIC_KEY || "",
    )

    if (result.text === "OK") {
      return { success: true, message: "Email sent successfully!" }
    } else {
      return { success: false, message: "Failed to send email." }
    }
  } catch (error) {
    console.error("EmailJS Error:", error)
    return { success: false, message: "Failed to send email. Please try again." }
  }
}
