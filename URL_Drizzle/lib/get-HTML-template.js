import fs from "fs/promises";
import mjml2html from "mjml";
import path from "path";
import ejs from 'ejs';

export const getHtmlFromMjmlTemplate = async (template, data) => {
    // console.log("Over here in get-HTML-template.js");
  const mjmlTemplate = await fs.readFile(
    path.join(import.meta.dirname, "..", "emails", `${template}.mjml`),
    "utf-8"
  );
//   console.log(mjmlTemplate);
  const filledTemplate = await ejs.render(mjmlTemplate, data);
  return mjml2html(filledTemplate).html;
};
