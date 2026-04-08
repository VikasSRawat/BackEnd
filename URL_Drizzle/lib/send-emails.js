import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Website <website@resend.dev>",
      to: [to], //* If passing to multiple people then passing an array
      html,
      subject,
    });
    if (error) 
        console.log("Error seding email ", error);
    else 
        console.log(data);
  } catch (error) {
    console.error(error);
  }
};
