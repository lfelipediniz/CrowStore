import React, { useState } from "react";
import { TextField } from "@mui/material"
import {
    PaymentOptionsContainer,
    PaymentLogo,
    ModalityContainer,
    Option,
    OptionLabel,
    ContactInfo,
    ConfirmButton,
} from "./PaymentOptionsElements";
import { PaymentContainer } from "../WrapShopCart/WrapElements";


const PaymentForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        clientName: "",
        cep: "",
        address: "",
        phone: ""
    });
    const [paymentMethod, setPaymentMethod] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check for blank fields
        const hasBlankFields = Object.values(formData).some((value) => value === "");
        if (hasBlankFields) {
            alert("Please fill in all the required fields.");
            return;
        }

        // Validate CEP and phone number
        const cepPattern = /^\d{5}-\d{3}$/;
        const phonePattern = /(\D*\d){11}/;
        if (!cepPattern.test(formData.cep)) {
            alert("Please enter a valid CEP.");
            return;
        }
        if (!phonePattern.test(formData.phone)) {
            alert("Please enter a valid phone number.");
            return;
        }

        // Sanitize form data (optional step, depends on the specific requirements)
        const sanitizedData = {
            clientName: sanitizeString(formData.clientName),
            cep: sanitizeString(formData.cep),
            address: sanitizeString(formData.address),
            phone: sanitizeString(formData.phone),
            paymentMethod
        };

        // Send form data to the parent component
        onSubmit(sanitizedData);
    };

    const sanitizeString = (input) => {
        const sanitizedInput = input.replace(/[&<>"']/g, (char) => {
            switch (char) {
                case '&':
                    return '&amp;';
                case '<':
                    return '&lt;';
                case '>':
                    return '&gt;';
                case '"':
                    return '&quot;';
                case "'":
                    return '&#39;';
                default:
                    return char;
            }
        });

        return sanitizedInput;
    };

    return (
        <PaymentOptionsContainer>
            <PaymentLogo src="/CrowStore/imgs/CROWPayments.svg" alt="Crow Store Payments" />
            <form onSubmit={handleSubmit}>
                <ModalityContainer>
                    <Option
                        onClick={() => handlePaymentMethodChange("pix")}
                        className={paymentMethod === "pix" ? "selected" : ""}
                    >
                        <img
                            src={paymentMethod === "pix" ? "/CrowStore/imgs/pix_selected.svg" : "/CrowStore/imgs/pix_unselected.svg"}
                            alt="Pix"
                        />
                        <OptionLabel selected={paymentMethod === "pix"}>PIX</OptionLabel>
                    </Option>
                    <Option
                        onClick={() => handlePaymentMethodChange("credit")}
                        className={paymentMethod === "credit" ? "selected" : ""}
                    >
                        <img
                            src={paymentMethod === "credit" ? "/CrowStore/imgs/credit_selected.svg" : "/CrowStore/imgs/credit_unselected.svg"}
                            alt="Cartão de crédito"
                        />
                        <OptionLabel selected={paymentMethod === "credit"}>Cartão de Crédito</OptionLabel>
                    </Option>
                </ModalityContainer>
                <ContactInfo>
                    <label htmlFor="clientName">Nome</label>
                    <input
                        type="text"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="cep">CEP</label>
                    <input type="text" name="cep" value={formData.cep} onChange={handleChange} required />
                    <label htmlFor="address">Endereço de entrega</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="phone">Telefone</label>
                    <input type="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                </ContactInfo>
                <ConfirmButton type="submit">Comprar</ConfirmButton>
            </form>
        </PaymentOptionsContainer>
    );
};

export default PaymentForm;
