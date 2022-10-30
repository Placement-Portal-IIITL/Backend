exports.emailVerificationEmailTemplate = (otp) => `
<div>
<div>
<p style="font-size:1.1em">Hi,</p>
<p>Use the following OTP to verify your email. OTP is valid for 5 minutes</p>
<h2><strong>${otp}</strong></h2>
<p style="font-size:0.9em;">Regards<br />IIITL Placement Cell</p>
</div>
</div>
`;

exports.passwordResetEmailTemplate = (otp) => `
<div>
<div>
<p style="font-size:1.1em">Hi,</p>
<p>Use the following OTP to Reset your password. OTP is valid for 5 minutes</p>
<h2><strong>${otp}</strong></h2>
<p style="font-size:0.9em;">Regards<br />IIITL Placement Cell</p>
</div>
</div>
`;
