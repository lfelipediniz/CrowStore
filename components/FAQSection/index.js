import { React } from "react";
import { FAQContainer, Section1, FAQH1 } from "./FAQElements";
import Faq from "react-faq-component";

import { DATA, FAQSTYLE } from "./FAQInfo";
import { WrapContent } from "../ReusedComponents/WrapContent";


const FAQ = () => {
  return (
    <>
      <FAQContainer  id="doubts">
        <WrapContent>
        <Section1>
          <FAQH1>Dúvidas</FAQH1>

          <Faq data={DATA} styles={FAQSTYLE} />
        </Section1>
        </WrapContent>
      </FAQContainer>
    </>
  );
};

export default FAQ;
