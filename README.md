This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
using Yarn
yarn android
```

### For iOS

```bash
using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

# Detalles Adicionales

## Vista General de la Base de Datos

### Tablas

1. **Tabla OTP**  
   - Esta tabla se genera automáticamente al ejecutar el backend.  

2. **Tabla ASESOR**  
   - Esta tabla debe llenarse manualmente a través de un gestor de bases de datos como **DBViewer**.  
   - Cada entrada en esta tabla representa un asesor (ASESOR) con sus credenciales correspondientes.

---

## Proceso de Sincronización

La aplicación realiza un proceso de sincronización en dos pasos para asegurarse de que la base de datos local esté actualizada con los datos del servidor:

1. **Obtener Asesores**  
   La aplicación recupera la lista de asesores creados en el sistema contable y los guarda en la base de datos local.

2. **Obtener OTPs**  
   La aplicación descarga los registros de OTP generados en el servidor y los guarda en la base de datos local.

Estos dos pasos son fundamentales para sincronizar los datos del celular con los del servidor.

---

## Inicio de Sesión

- El **ASESOR** debe iniciar sesión en la aplicación utilizando el usuario y la contraseña creados en la tabla **ASESOR**.
- Sin credenciales válidas, la aplicación no permitirá el acceso a sus funcionalidades.

---

Este proceso garantiza una sincronización fluida y un acceso seguro a las funciones de la aplicación.
