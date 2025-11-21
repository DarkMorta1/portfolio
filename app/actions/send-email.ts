"use server"

// This file is kept for reference, but EmailJS is handled client-side in the contact form
// Server actions cannot use @emailjs/browser library directly

export async function sendEmail(formData: { name: string; email: string; message: string }) {
  try {
    // If you want to send emails from the server, use a service like Resend, SendGrid, or Nodemailer
    // For now, EmailJS is handled on the client-side in components/contact.tsx
    
    return { success: true, message: "Email sent successfully!" }
  } catch (error) {
    console.error("Email Error:", error)
    return { success: false, message: "Failed to send email. Please try again." }
  }
}

