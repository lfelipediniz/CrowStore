import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";
import { TextWrapper, FAQH2 } from "./FAQElements";

const data = {
  rows: [
    {
      title: (
        <FAQH2>
          Quais são os principais produtos oferecidos pela CrowStore?
        </FAQH2>
      ),
      content: (
        <TextWrapper>
          Oferecemos uma ampla gama de produtos de moda urbana,
          incluindo roupas, calçados e acessórios inspirados no estilo das ruas.
          Seu catálogo inclui camisetas estampadas, jaquetas de couro, tênis da
          moda, bonés e muito mais.
        </TextWrapper>
      ),
    },
    {
      title: <FAQH2>Vocês tem lojas físicas em várias cidades?</FAQH2>,
      content: (
        <TextWrapper>
          A CrowStore possui várias lojas físicas espalhadas por diferentes
          cidades. Embora não seja possível fornecer uma lista específica de
          locais sem mais informações, a CrowStore busca oferecer acesso aos
          seus produtos em diferentes regiões, permitindo que os clientes
          visitem pessoalmente suas lojas e experimentem a atmosfera de moda
          urbana.
        </TextWrapper>
      ),
    },
    {
      title: <FAQH2>Exitem opções de compra online?</FAQH2>,
      content: (
        <TextWrapper>
          A nossa loja possui um site de compras online onde os clientes
          podem explorar seu catálogo e fazer pedidos. Eles oferecem uma
          experiência de compra conveniente e segura para atender às
          necessidades dos clientes que preferem comprar pela internet.
        </TextWrapper>
      ),
    },
    {
      title: (
        <FAQH2>
          A CrowStore realiza promoções especiais ou descontos sazonais?
        </FAQH2>
      ),
      content: (
        <TextWrapper>
          Costumamos oferecer promoções especiais e descontos
          sazonais aos seus clientes. Eles podem lançar vendas sazonais,
          descontos em determinados produtos ou até mesmo promoções exclusivas
          para membros do seu programa de fidelidade.
        </TextWrapper>
      ),
    },
  ],
};

export const DATA = data;

const FAQstyles = {
  bgColor: colors.primary,
  rowTitleColor: colors.textBlack,
  rowTitleTextSize: fonts.subtitle,
  titleTextSize: fonts.text,
  rowContentColor: colors.textBlack,
  arrowColor: colors.textBlack,
};

export const FAQSTYLE = FAQstyles;
