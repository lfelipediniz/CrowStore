# Crow Store


## Navigation Diagram

```mermaid
  graph TD;
      Home[<a href='https://github.com/lfelipediniz/CrowStore/blob/08317affc3ff2eef954d9de8bf898a5c1f85b319/mockup-imgs/mockhome.png?raw=true'>Home</a>]---Carrinho[<a href='https://github.com/lfelipediniz/CrowStore/blob/08317affc3ff2eef954d9de8bf898a5c1f85b319/mockup-imgs/mockcart.png?raw=true'>Carrinho</a>];
      
      Home---Produto[<a href='https://github.com/lfelipediniz/CrowStore/blob/08317affc3ff2eef954d9de8bf898a5c1f85b319/mockup-imgs/mockproduct.png?raw=true'>Produto</a>];
      Produto---Carrinho
      
      Home---Search[<a href='https://github.com/lfelipediniz/CrowStore/blob/08317affc3ff2eef954d9de8bf898a5c1f85b319/mockup-imgs/mocksearch.png?raw=true'>Search</a>];
      Search---Produto
      Produto---Carrinho
```

## Project Report

Guilherme de Abreu Barreto - 12543033

João Vitor Pereira Candido - 13751131

Luiz Felipe Diniz Costa - 13782032

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

### Project Description

- O projeto consiste no desenvolvimento de uma loja online para a venda de roupas.
A idealização da loja e design inicial da mesma já era existente, feita por um dos integrantes do grupo. Se for de interesse, aqui está a idealização original: https://github.com/JV-PC/CrowStore.
Neste projeto, o cliente é direcionado a uma homepage que mostra alguns produtos disponíveis na loja e a maioria das funcionalidades disponíveis no site, como a busca por produtos;

### Comments About the Code

### Test Plan

### Test Results

### Build Procedures

### Problems

### Comments
