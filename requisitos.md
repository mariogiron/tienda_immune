# Desarrollar la API de una Tienda Online

## Desarrollar la API de Productos

### Desarrollar la API para recuperar todos los productos

- GET /api/productos

PRUEBAS:
- Debo recibir el status 200
- Debo recibir un JSON como respuesta
- Debo recibir un array como respuesta
- Debo recibir un array de productos


### Desarrollar la API que me permita crear un nuevo producto

- POST /api/products

- PRUEBAS:
    - Pruebo si la URL funciona (status 200 y que devuelva JSON)
    - Pruebo si la respuesta tiene _id
    - Pruebo si los datos del objeto en la respuesta son los mismos que yo he insertado

### Desarrollar la API que me permita actualizar un producto concreto

- PUT /api/products/PRODUCTID

- PRUEBAS:
    - Pruebo si la URL funciona 
    - Pruebo si las modificaciones se llevan a cabo

### Desarrollar la API que me permita borrar un producto concreto

- DELETE /api/products/PRODUCTID

- PRUEBAS:
    - Pruebo si la URL funciona
    - Compruebo si el producto sigue en la Base de datos


- POST /api/users/register (username, email, password)
- POST /api/users/login (email, password)


- PUT /api/users/:userId/product/:productId
- GET /api/users/:userId