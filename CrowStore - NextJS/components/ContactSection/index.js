import { React } from "react";
import {
  ContactContainer,

} from "./ContactElements";


import { WrapContent } from "../ReusedComponents/WrapContent";

const ContactSection = () => {
  return (
    <>
      <ContactContainer id="contact">
        <WrapContent>
         --Contato--
        </WrapContent>
      </ContactContainer>
    </>
  );
};

export default ContactSection;
