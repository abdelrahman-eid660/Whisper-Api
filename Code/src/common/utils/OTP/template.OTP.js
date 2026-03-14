import { FACEBOOK_LINK, INSTAGRAM_LINK, TWITER_LINK } from "../../../../config/config.service.js";

export const verifyEmailTemplate = ({ code, title = "Verify Your Email" }) => {
  return `<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<style type="text/css">
  body {
    background-color: #f0f4f5;
    margin: 0;
    font-family: 'Arial', sans-serif;
  }
  a { text-decoration: none; }
  .otp-code {
    display: inline-block;
    font-size: 28px;
    font-weight: bold;
    color: #fff;
    background-color: #5D2E8C;
    padding: 15px 25px;
    border-radius: 8px;
    letter-spacing: 4px;
  }
  .social-icons img {
    width: 40px;
    height: 40px;
    margin: 0 10px;
  }
</style>
<body>
  <table border="0" width="60%" style="margin:auto;padding:30px;background-color: #ffffff;border-radius: 12px;box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
    <tr>
      <td style="text-align:center;">
        <img width="100px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670702280/Group_35052_icaysu.png" alt="Whisper Logo"/>
        <h2 style="color:#5D2E8C;margin-top:10px;">${title}</h2>
        <p style="color:#333;">Your Whisper verification code is:</p>
        <p class="otp-code">${code}</p>
        <p style="color:#555;margin-top:20px;">Enter this code in the app to verify your email address.</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:center;padding-top:30px;">
        <h3 style="color:#333;">Stay in touch</h3>
        <div class="social-icons">
          <a href="${FACEBOOK_LINK}" target="_blank"><img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35062_erj5dx.png" alt="Facebook"></a>
          <a href="${INSTAGRAM_LINK}" target="_blank"><img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35063_zottpo.png" alt="Instagram"></a>
          <a href="${TWITER_LINK}" target="_blank"><img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group_35064_i8qtfd.png" alt="Twitter"></a>
        </div>
      </td>
    </tr>
    <tr>
      <td style="text-align:center;padding-top:30px;color:#aaa;font-size:12px;">
        &copy; ${new Date().getFullYear()} Whisper. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>`;
};
