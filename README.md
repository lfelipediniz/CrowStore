# Crow Store

<p align="center">
  <img width="200" src="https://github.com/lfelipediniz/CrowStore/blob/main/mockup-imgs/crow-store.png?raw=true">
</p>

## Project Report

### Authors

| Name | USP number |
| :--- | :--- |
| [João Vitor Pereira Candido](https://github.com/JV-PC) | 13751131 |
| [Luiz Felipe Diniz Costa](https://github.com/lfelipediniz) | 13782032 |
| [Guilherme de Abreu Barreto](https://github.com/de-abreu) | 12543033 |

### Project Description

The CrowStore is a project for an online store for clothing. It's based off of an initial design proposal by one of its team members. To the interested reader, it is available [here](https://github.com/JV-PC/CrowStore).

Its structure follows closely its homepage, where all other pages can be directly accessed, such as product listings, searching and administrator's controls.

## Navigation Diagram

```mermaid
  graph TD;
      Home[<a href='https://lh3.googleusercontent.com/fife/APg5EOZnSl-KNCo5YlxmlSj5forRPXGg2yky-vdU-ManFLpkRNSbcQaXCYYl3tMpff_tw68Ye9tb-WfyF-TVfrXRwEppkIWS693cCEeJlm2RX9F5Wnai27trAsBbFSGG6g03zTnmNEhS6raT0ithJrj6U1BpyZXo45BC3i7zYpA-Odmf-ElKOV4aKGSFizUQvw7SyCk3E5BSBlfgNq7oK96OOGHYHti5kxPB0Oudd1AEiMdrGBOUiJUL-QADKhdl5aKhzxmWX8fLv9SO00xJIREYS4b5_7grjclrsT_-XkSsbCDh3bSJTCjCVOrH2f7cWfsVPeHOYTt8SwWk9eyo-tj7nz4ZWTBMaGdE73DhxIJeaa22jKyIb5BssJu-27h-h4N4lYkbugZYCZJCtiQ1AZR6tmFnh8ppHjDysQFWZyMI6Te6BmreJsfYwuc_wrpFnh7r83HukN7JwkxanJDIKheUSGyG2QpPVd1PgoNIKz1gd8vqV0LUSHhzIjftallbTbdthUHxsk552NNF5yJX3m7o8XAE73ehG6qf_Ngs37LUT2S7TWPcsE60Cv3z5brIYu2p8bADpL6-SFytaXsObxYL3zfUsm9Ijux34K1Lzg_KrCrZhwlLrmSocSszHvjlHbeXWaUeoglZYsBlNPAxS6M8Kt5fCSiOj-b-bdQ8ELJIowQJoQn67mNdxca3s0nZIr2XuFz4Og0tHtaTc33QVhEVNeyrx3DGPCrTUs6O2yXtRIyIqjnWlp48U5ptw4mSrfMEHtOMselgl0788iB_04Cs9-_2JPDlvr3onKu7_Ygq6cIheCuGxnBgb9cgTXHl3SxAvGuXweAvVJmvVWtpwjSwPoVKFG-w7RP6PMwB_Qh6XnDOUgpKTaCwyHgdD7yROZUEHRwZZL83TdF93CqIkR-Fbw8b2m1HaA4P0fztNHJUwTpB8qY5xyPSaZWgNly6WCzGaQiO8tUeviXYo8j6Nm0OynbFSJToY9ojlKDbhC51vVLJQWubXQec2I9I_41WKTAU8jrAE1tIQVda87g3tbk_RbuOnWUnxSzx_X_J_TfMZlNsjx5SsXQjERdfWOc-Rgtl_A-tJXpKayGoTxqBP6zBs6dHParPy1VmAsx2TG7UqwjOZZP24DaLoBux-oEf_tiJ1S3I0vA6r-mCkjirm2QEfkFX4NDldh17yBgIJ38KxWOUm8k2bQDYf1Ti7miqENawBVncesIEQln_fybmrwEG5jy1h8yEvT9xemRapdytmPSRqwkqgeFtdIekfZ64Nd_KuQbjeHGUwRMeezMFAO6rphHQcjpSfc0ZzCM-eKF5j8PKv_eM4L3Ps_Q8ssQIHoPReRZ7zxzUqvIPKhScGX7UhYookOMaD-b66X-G0dw7g7Qi_Nz1ZLi4v1hFi3CEecx5fzfhETv9cf1K3qD_HfXrcJBJP_QoHpWCUzGpOu2vl-erpLYtZFDF07Pzi6nWBhQuo-tZufd0d0j40RBeJ0mzRT42BifrqD3g4DC3MFRTLJ4jOsLICfnhQzUKoIfLSunT_5a1NE6uSYfjhNDWOtPk7YfIKuxOHMMhDnPD6uZy2GgA0tbylX_0tNIeyA-5b0ZPcLiUC7WNoJ19qvk44I3zbqgAzsdwsqC8PDyBeUj0psI-8tZuE7Q0wzEhFZ5obuAd9KzRsxs1dL0=w1919-h933'>Home</a>]---Carrinho[<a href='https://github.com/lfelipediniz/CrowStore/blob/main/mockup-imgs/mockcart.png?raw=true'>Carrinho</a>];
      
      Home---Produto[<a href='https://github.com/lfelipediniz/CrowStore/blob/08317affc3ff2eef954d9de8bf898a5c1f85b319/mockup-imgs/mockproduct.png?raw=true'>Produto</a>];
      Produto---Carrinho
      
      Home---Search[<a href='https://github.com/lfelipediniz/CrowStore/blob/main/mockup-imgs/mocksearch.png?raw=true'>Search</a>];
      Search---Produto
      Produto---Carrinho
```


## Project Report

### Requirements

- The system must have 2 types of users: Clients and Administrators

    - Administrators are responsible for registering/managing administrators, customers, and products/services provided. The application already comes with an account admin with password admin.

    - Customers are users who access the system to buy products/services.
  
- The admin record includes, at least: name, id, phone, email.

- Each customer's record includes, at least: name, id, address, phone, email
Product/services records include, at least: name, id, photo, description, price, quantity (in stock), quantity sold.

- Your store may sell products, services or both (you decide)

- Selling Products (or services): Products are selected, their quantity chosen, and are included in a cart. Products are purchased using a credit card number (any number is accepted by the system). The quantity of product sold is subtracted from the quantity in stock and added to the quantity sold. Carts are emptied only on payment or by customers.

- Product/Service Management: Administrators can create/update/read/delete (crud) new products and services. For example, they can change the stock quantity.

- Your functionality: Create a functionality that is specific to your application. It does not have to be something complicated. For instance, if you are selling cars, you may allow users to use an accelerator to hear how each car engine roars up and down.

- The system must provide accessibility requirements and provide good usability. The system must be responsive.

### Comments About the Code

### Test Plan

### Test Results

### Build Procedures

### Problems

### Comments
