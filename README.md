# CreditApp

### Iniciar el proyecto de forma local:

#### 1. Primer paso:

Descarga todas las dependencias de el archivo package.json

```bash
  npm install
```

#### 2. Segundo paso:

Ejecuta la aplicacion

```bash
  npx expo start
```

puedes escoger entre estas opciones de expo:

| key | emulador  |
| :-- | :-------- |
| `a` | `android` |
| `i` | `ios`     |

o simplemente puedes `escanear el codigo QR` con tu celular y te genera automaticamente una vista previa

### No tiene instaldo EXPO?

#### 1. Primer paso:

Instalar Eas cli de forma global

```bash
  npm install -g eas-cli
```

### No tienes configurado tu cuenta de expo al proyecto?
#### Paso 1:
ejecutar :
```bash
  eas login
```
ingresar las credenciales de tu `nueva cuenta`

### Deseas generar el apk del proyecto?

#### Paso 1 (opcional):

si en caso se realizo un cambio que afecte directamente los archivos de android, ejecutar el siguiente comando :
```bash
  npx expo prebuild -p android
```
esto volvera a generar la carpeta android y con las nuevas configuraciones

#### Paso 2:

para generar el apk:
```bash
  eas build -p android --profile release
```
 se indica el `perfil release`, ya que este esta configurado para que `genere el build en tipo apk`

### Cambiar de cuenta de expo:
#### Paso 1:
ejecutar :
```bash
  eas login
```
ingresar las credenciales de tu `nueva cuenta`

#### Paso 2:

eliminar archivo: `app.json`

#### Paso 3:

ejecutar :
```bash
  eas build:configure
```
y elegir para `android`
#### Paso 4 (opcional):

si en caso se realizo un cambio que afecte directamente los archivos de android, ejecutar el siguiente comando :
```bash
  npx expo prebuild -p android
```
esto volvera a generar la carpeta android y con las nuevas configuraciones

#### Paso 5:

para generar el apk:
```bash
  eas build -p android --profile release
```
 se indica el `perfil release`, ya que este esta configurado para que `genere el build en tipo apk`


### Actualizar version de SDK:
#### Paso 1:
ejecutar para instalar la version del SDK que desea

se brinda un ejemplo, la version la puede cambiar :
```bash
  npm install expo@49
```

#### Paso 2:
verificar si las dependencias coinciden con la version del SDK, si no coincide las intala
```bash
  npx expo install --fix
```