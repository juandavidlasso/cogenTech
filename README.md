## Pasos para ejecutar el proyecto

# 1.

Clonar el repositorio

# 2.

Abrir el proyecto clonado desde una consola CMD

# 3.

Entrar a la carpeta `cliente` desde la consola y ejecutar el comando `npm i` para instalar las dependencias.

# 4.

Ejecutar el mismo paso dentro de la carpeta `servidor`

## Pasos para crear la base de datos

# 1.

Utilizar un gestor de bases de datos, en mi caso utilice XAMPP

# 2.

En phpMyAdmin crear una base de datos con nombre `cogentech`

# 3.

Dentro de la base de datos ejecutar las instrucciones adjuntas en el bloc de notas

# 4.

La base de datos esta lista

## Pasos para levantar el proyecto

# 1.

Después de instalar las dependencias, levantar el servidor, desde la consola ejecutar el comando `npm run start:dev`, por defecto se levantará en el puerto 3000.

# 2.

Después ejecutar el comando `npm run dev` dentro de la carpeta del cliente, este se levantará en el otro puerto disponible, por defecto en 3001.

# 3.

En el navegador entrar a la url: `http://localhost:3001/`

# 4.

El proyecto se puede probar de la siguiente manera:

4.1. Hay dos botones en la vista principal, uno redirige a la vista para gestionar los empleados, el otro a la vista para registrar un empleado.(Hay 3 jefes ya registrados en la base de datos)

4.2 Proceden a registrar varios empleados, la asignación del jefe es opcional, les pueden asignar jefe a los que deseen.

4.3 Después en la vista de gestión de empleados pueden ver el historial de todos los empleados con la información del jefe y la última versión, el botón ver historial lo redirige a la vista de cada empleado donde puede ver el historial completo de dicho empleado.

4.4 En la vista de cada empleado puede actualizar el jefe de dicho empleado y verá como se irá actualizando en tiempo real el historial ordenando las versiones por fecha desde la más reciente hasta la más antigua.

# 5.

Paso opcional (Recomendable)

5.1 Dentro de la carpeta de cliente en la consola, ejecutar el comando `npm run build` para compilar el proyecto.

5.1 Una vez termine ejecutar el comando `npm start` para ejecutar el proyecto en ambiente de producción, esto mejora la velocidad de carga de la aplicación.

## Consideraciones

# 1.

El enfoque del desarrollo lo hice pensando en una forma de ir guardando la información cada que se realiza una actualización de algún empleado, para este caso tengo 3 tablas en la base de datos, una llamada employees donde guardo información del empleado, otra llamada boss donde guardo la información de los jefes, y otra llamada history_change donde guardo el historial de cada actualización de cada empleado.

# 2.

En la tabla history_change cada que se actualiza un empleado de jefe, guardo el id de ese empleado, el id del nuevo jefe y la fecha de actualización, así puedo saber cuales son los cambios de cada empleado, ver cuantas versiones ha tenido y en que fecha se hizo cada actualización. Con estos datos cubro todos los aspectos posibles al problema.
