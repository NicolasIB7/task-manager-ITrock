# IT Rock - API RESTful Task manager 

<p align="center">
  <a href="https://www.itrock.com.ar/" target="blank"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8ZQolQsWlH2un9fCZVk2rqWoHU5Y505P0AA&s" width="120" alt="ITrock Logo" /></a>
</p>

## Introducción 

 El objetivo de este proyecto es realizar una API restful que cumpla con un sistema de gestión de tareas. Esta tendrá un proceso de autenticación estático que primero permitirá al usuario poder loguearse, para luego poder utilizar las demás funcionalidades, tales como crear una tarea, poder buscar las totalidad de las mismas así como también una en particular. Por otro lado, también interactuará con una API externa para poder obtener tareas y guardarlas en nuestra base de datos.

## Características principales:

#### Autenticación JWT Token
Se podrá loguear con credenciales estáticas, que primero validará el usuario y contraseña para luego entregar un token que será utilizado para acceder e interactuar con los demás endpoints.

#### Persistencia de datos
El sistema obtendrá los datos de las tareas a través de una API o una base de datos. Así como también guardar las tareas creadas.

#### Gestionar tareas
El sistema permitirá que el usuario, una vez logueado, pueda interactuar con el sistema creando tareas, buscando todas las que son de su propiedad así como también tareas especificas. 


## Descripción

La API fue desarrollada con una arquitectura monolitica y con estructura de archivos con arquitectura por capas, estructura que provee Nestjs.

Se ha decidido utilizar MySQL como base de datos para este proyecto. Aunque es de pequeña escala, considero que la relación entre tareas y usuarios es fundamental, lo que hace que una base de datos relacional sea la opción más adecuada. Con esta elección, se logrará una mejor organización, permitiendo establecer una estructura clara de usuarios, así como su relación con las tareas y otras funcionalidades que puedan agregarse en el futuro.

Las principales características y componentes del diseño son los siguientes:

1) Utilización de esquemas de datos: Se utilizan esquemas de datos para las tareas.

2) Utilización de endpoints: Se utilizan endpoints específicos para cada funcionalidad, lo que permite obtener la información necesaria de la base de datos.

3) Uso de Docker: Se utiliza Docker para contenerizar nuestra API, lo que facilita su uso y aplicación en cualquier sistema. Esto hace que el proyecto sea más fluido y escalable.



## Tecnologías utilizadas

**Lenguaje principal**: Typescript 


**Entorno de ejecución**: Node.js 


**Framework**: NestJs 


**Sistema de contenedores**: Docker 


**Base de datos**: MySql (BDD relacional) 


**Biblioteca**: TypeORM



## Ejecución y uso de la API

A continuacion se detallaran los pasos para lograr levantar el servidor y utilizar la API restful:

Antes que todo, aquí se pondrán las variables de entorno necesarias para la base de datos y para el archivo de constants.ts que utiliza el módulo de autorización. Esto solo a modo de descripción, en un entorno REAL no se debe hacer.

`DATABASE_HOST=mysql`

`DATABASE_PORT=3306`

`DATABASE_USER=root`

`DATABASE_PASSWORD=root`

`DATABASE_NAME=task_manager_itrock`

Para el archivo constants: 

`secret: 'task_auth_jwt' `

### Localmente

1. Abre la terminal o línea de comandos en tu computadora.

2. Navega a la ubicación donde deseas clonar el repositorio utilizando el comando `cd` (ejemplo: `cd carpeta/destino`).

3. Clona el repositorio ejecutando el siguiente comando:
        git clone <URL_DEL_REPOSITORIO>
    
    Reemplaza `<URL_DEL_REPOSITORIO>` por la URL del repositorio en GitHub.

4. Una vez que el repositorio se haya clonado correctamente, navega al directorio del proyecto usando `cd` (ejemplo: `cd nombre_del_proyecto`).

5. Instala las dependencias del proyecto ejecutando el siguiente comando:

        `npm install`

    Esto instalará todas las dependencias definidas en el archivo `package.json`.

6. Asegúrate de tener una instancia de MySQL en ejecución. Puedes instalar MySQL localmente y utilizar MySQL Workbench.

7. Configura la conexión a la base de datos, deberás crear un archivo `.env` y rellenar los datos necesarios para la conexión.

8. Inicia el servidor ejecutando uno de los siguientes comandos:

    - `npm run start`: para iniciar el servidor con NestJs

        Esto iniciará el servidor y estará listo para recibir solicitudes en el puerto especificado.

9. Ahora puedes comenzar a realizar solicitudes HTTP a los diferentes endpoints utilizando herramientas como Postman o Insomnia. Por ejemplo:

        `http://localhost:3000/<ENDPOINT_ESPECIFICO>`


¡Ahora estás listo para clonar el repositorio, configurar el servidor y utilizar la API localmente!



### Con docker (local)

1. Abre la terminal o línea de comandos en tu computadora.

2. Navega a la ubicación donde deseas clonar el repositorio utilizando el comando `cd` (ejemplo: `cd carpeta/destino`).

3. Clona el repositorio ejecutando el siguiente comando:
        git clone <URL_DEL_REPOSITORIO>
    
        Reemplaza `<URL_DEL_REPOSITORIO>` por la URL del repositorio en GitHub.

4. Una vez que el repositorio se haya clonado correctamente, navega al directorio del proyecto usando `cd` (ejemplo: `cd nombre_del_proyecto`).

5. Instala las dependencias del proyecto ejecutando el siguiente comando:

        `npm install`

    Esto instalará todas las dependencias definidas en el archivo `package.json`.


6. Configura la conexión a la base de datos, deberás crear un archivo `.env` y rellenar los datos necesarios para la conexión.

7. Antes de iniciar el servidor deberás tener correctamente instalado Docker, para ello te dejo dos videos introductorios para su descarga, instalacion y primeros pasos:

        
    [Instalación](https://www.youtube.com/watch?v=BK-C2RofmTE&t=12s)

    [Primeros pasos](https://www.youtube.com/watch?v=iLlmm0L-VpQ)


8. Una vez tengas Docker correctamente instalado, pasaremos a orquestar nuestro proyecto gracias al archivo docker-compose.yml. 
    Abre la terminal y ejecuta:

        docker-compose up --build   


9. Esperamos a que se instale lo necesario y ya podremos utilizar los ejecutar las funcionalidades.


10. Esto es así ya que se utilizó una arquitectura monolítica, pero si se decide utilizar microservicios los pasos a seguir cambian un poco ya que debemos tener varios archivos Dockerfile en cada carpeta que queramos que sea un servicio especifico. 

11. Luego de esto sí, orquestar todo con el compose para que se comuniquen entre sí.


## Aclaraciones importantes - cosas a destacar

En este apartado, comentaré algunas mejoras y consideraciones adicionales para el proyecto. Si bien obviamente se pueden implementar muchas cosas adicionales, me limitaré a comentar lo que hubiese agregado para mejorar las funcionalidades del servicio pedido.

- **Módulo usuarios más completo**: Aunque se implementó un módulo de usuarios, este es de caracter estático. Para una funcionalidad más real e interactiva, lo ideal sería agregar un nuevo módulo de usuarios donde contenga su propia tabla que almacene información de cada usuario y que cada usuario se relacione con la tabla de tareas. Es decir que haya una relación uno a muchos, ya que un usuario puede tener una o más tareas.

- **Agregar endpoints faltantes**: Para una funcionalidad completa, sería correcto agregar la totalidad del CRUD, que un usuario autenticado pueda borrar o actualizar sus tareas, así como también tener determinados filtros que le permita la búsqueda más sencilla para eso.

- **Agregar testing**: Es fundamental que nuestro proyecto posea el apartado de testing. Probar funcionalidades especificas o testear end to end utilizando heeramientas como Jest.

Cada una de ellas no se realizaron solamente por una cuestion de tiempos, pero me parecía correcto nombrar como mejoraría y ampliaria la aplicación.


## Recursos utilizados

Check out a few resources that may come in handy when working with NestJS:

- Documentación [NestJS](https://docs.nestjs.com) 

