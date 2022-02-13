# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints

### HomePage :
| Endpoint  | Request   | Parameters    | Requires Token | Usage           |
| --------- |:---------:| ------------- |:--------------:| --------------- |
| **/**     | **GET**   | **N/A**       | **false**      | **Root Route**  |

### Users :
| Endpoint        | Request   | Parameters                           | Requires Token | Usage              |
| --------------- |:---------:| ------------------------------------ |:--------------:| ------------------ |
| **/users**      | **GET**   | **N/A**                              | **true**       | **All Users**      | 
| **/users**      | **POST**  | **firstname,lastname,password**      | **false**      | **Create User**    | 
| **/users**      | **PUT**   | **id,firstname,lastname,password**   | **true**       | **Update User**    |
| **/users/:id**  | **DELETE**| **id**                               | **true**       | **Delete User**    |
| **/users/:id**  | **GET**   | **id**                               | **true**       | **Get User By Id** |
| **/users/login**| **POST**  | **firstname,lastname,password**      | **false**      | **Login User**     |
 

#### Products
| Endpoint        | Request   | Parameters                           | Requires Token | Usage                |
| --------------- |:---------:| ------------------------------------ |:--------------:| -------------------- |
| **/product**    | **GET**   | **N/A**                              | **true**       | **All Products**     | 
| **/product**    | **POST**  | **p_name,price,category**            | **false**      | **Create Product**   | 
| **/product**    | **PUT**   | **id,p_name,price,category**         | **true**       | **Update Product**   |
| **/product/:id**| **DELETE**| **id**                               | **true**       | **Delete Product**   |
| **/product/:id**| **GET**   | **id**                               | **true**       | **Get Product By Id**|

#### Orders
| Endpoint            | Request   | Parameters                     | Requires Token | Usage                  |
| --------------------|:---------:| -------------------------------|:--------------:| ---------------------- |
| **/orders**         | **GET**   | **N/A**                        | **true**   | **All Orders**             | 
| **/orders**         | **POST**  | **p_id,u_id,o_status**         | **false**  | **Create Order**           | 
| **/orders**         | **PUT**   | **id,p_id,u_id,o_status**      | **true**   | **Update Order**           |
| **/orders/:id**     | **DELETE**| **id**                         | **true**   | **Delete Order**           |
| **/orders/:id**     | **GET**   | **id**                         | **true**   | **Get Order By Id**        |
| **/orders_products**| **POST**  | **o_id,p_id,quantity**         | **true**   | **Create Order's Products**|


## Database Schema
#### users
| Field              | Data Type       | Special Attribute  |
| -------------------|:---------------:| -------------------|
| **id**             | **SERIAL**      | **PRIMARY KEY**    |
| **firstname**      | **VARCHAR(100)**| **N/A**            |  
| **lastname**       | **VARCHAR(100)**| **N/A**            | 
| **password_digest**| **VARCHAR**     | **N/A**            | 


#### product
| Field             | Data Type       | Special Attribute  |
| ------------------|:---------------:| -------------------|
| **id**            | **SERIAL**      | **PRIMARY KEY**    |
| **p_name**        | **VARCHAR(100)**| **N/A**            |  
| **price**         | **NUMERIC(6,2)**| **N/A**            | 
| **category**      | **VARCHAR(100)**| **N/A**            | 

#### orders
| Field             | Data Type       | Special Attribute  |
| ------------------|:---------------:| -------------------|
| **id**            | **SERIAL**      | **PRIMARY KEY**    |
| **p_id**          | **INTEGER**     | **FOREIGN KEY**    |  
| **u_id**          | **INTEGER**     | **FOREIGN KEY**    | 
| **o_status**      | **VARCHAR(10)** | **N/A**            | 

### products_orders
| Field             | Data Type       | Special Attribute  |
| ------------------|:---------------:| -------------------|
| **id**            | **SERIAL**      | **PRIMARY KEY**    |
| **o_id**          | **INTEGER**     | **FOREIGN KEY**    |  
| **p_id**          | **INTEGER**     | **FOREIGN KEY**    | 
| **quantity**      | **INTEGER**     | **N/A**            | 

