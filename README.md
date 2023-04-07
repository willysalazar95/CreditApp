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

### Generar APK en EXPO

#### 1. Primer paso:

Instalar Eas, si ya lo tienes instalado no es necesario

```bash
  npm install east
```

#### 2. Segundo paso:

Crea un nuevo proyect ID para poder compilar en EXPO

```bash
  eas init
```

#### 3. Tercer paso:

Enlaza tu proyecto local con expo web para generar el apk

```bash
  eas build
```

y escoges la plataforma de android
