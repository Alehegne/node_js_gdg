// File: src/config/allConfig.js

class Config {
  getCorsConfig() {
    return {
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
      origin:
        process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL : "*",
    };
  }
  getCookieConfig() {
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // to prevent CSRF attacks
      maxAge: 5 * 60 * 60 * 1000, // 5 hours in milliseconds
    };
  }
  getResetPasswordMessage(mailto, resetUrl) {
    return {
      mailto: mailto,
      subject: "Reset Password",
      html: `
        <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; color: #333;">
          <h2 style="text-align: center; color: #007BFF;">Password Reset Request</h2>
          <p>Hi there,</p>
          <p>You recently requested to reset your password. Click the button below to proceed:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${resetUrl}" 
               style="background-color: #007BFF; color: white; padding: 12px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">
              Reset Your Password
            </a>
          </div>
          <p>If you did not request this, please ignore this email.</p>
          <p>Thanks,<br>Job Portal Team</p>
          <hr>
          <p style="font-size: 12px; color: #999; text-align: center;">
            If the button above doesn’t work, copy and paste the following URL into your browser:
            <br>
            <a href="${resetUrl}" style="color: #007BFF;">${resetUrl}</a>
          </p>
        </div>
      `,
    };
  }
}

module.exports = new Config();
