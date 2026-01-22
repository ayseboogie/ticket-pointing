import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { render } from "@react-email/components";
import ContactEmail from "@/components/Slices/Contact/ContactEmail";
import SenderReplyEmail from "@/components/Slices/Contact/SenderReplyEmail";
import { createElement } from "react";
import axios from "axios";

export async function POST(request: NextRequest) {
  // check the request headers to prevent duplicate execution:
  // otherwise each request triggers twice
  if (request.headers.get("x-next-request-id")) {
    console.log("Skipping duplicate request");
    return NextResponse.json(
      { message: "Duplicate request ignored" },
      { status: 200 },
    );
  }

  const { email, name, message, token } = await request.json();

  // Verify reCAPTCHA
  try {
    const googleResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      new URLSearchParams({
        secret: process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY ?? "",
        response: token,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    if (!googleResponse.data.success) {
      console.log("googleResponse.data ", googleResponse.data);
      return NextResponse.json(
        { success: false, message: "Captcha validation failed" },
        { status: 400 },
      );
    }
  } catch (err) {
    console.error("Error validating captcha:", err);
    return NextResponse.json(
      { success: false, message: "Error validating captcha" },
      { status: 500 },
    );
  }

  // setting up connection to nodemailer
  const transport = nodemailer.createTransport({
    service: "gmail",
    /*
      setting service as 'gmail' is same as providing these setings:
      host: "smtp.gmail.com",
      port: 465,
      secure: true
      If you want to use a different email provider other than gmail, you need to provide these manually.
      Or you can go use these well known services and their settings at
      https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
  */
    auth: {
      user: process.env.NEXT_PUBLIC_MY_EMAIL,
      pass: process.env.NEXT_PUBLIC_NODEMAILER_PASSWORD,
    },
  });

  // email formatting to owner of website
  const ownerEmailHtml = await render(
    createElement(ContactEmail, {
      name: name,
      email: email,
      message: message,
    }),
  );

  // email formatting to sender
  const senderEmailHtml = await render(
    createElement(SenderReplyEmail, {
      message: message,
    }),
  );

  // formatting email
  const toOwnerOfWebsiteOptions: Mail.Options = {
    from: process.env.NEXT_PUBLIC_MY_EMAIL,
    to: process.env.NEXT_PUBLIC_MY_EMAIL,
    subject: `${process.env.NEXT_PUBLIC_SITE_NAME} Contact Form From - ${email}`,
    html: ownerEmailHtml,
  };

  const toSenderOptions: Mail.Options = {
    from: process.env.NEXT_PUBLIC_MY_EMAIL,
    to: email,
    subject: `${process.env.NEXT_PUBLIC_SITE_NAME}`,
    html: senderEmailHtml,
  };

  // tries to send formatted email with nodemailer transport to owner of website & copy of person who sent the
  // email, catch if error
  try {
    console.log("API route executed");

    // Send both emails separately and waits for both to complete
    await Promise.all([
      transport.sendMail(toOwnerOfWebsiteOptions),
      transport.sendMail(toSenderOptions),
    ]);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json({ error: "error ", err }, { status: 500 });
  }
}
