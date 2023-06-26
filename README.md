This project aims to automate repetetive emails. It allows you to save email as templates and use those templates to rapidly compose your email. It's built with Angular 15. It utilizes [Tailwind](https://tailwindcss.com/) as it's base CSS utility and uses [daisyUI](https://daisyui.com) for the prebuilt components. A docker-compose file is provided for easy usage and self hosting.

# Installation
You must configure the environment.ts file for it to serve / build correctly. You can copy the environment.example.ts file and edit that. To copy, you can run the following command:
```bash
cp ./src/environments/environment.example.ts ./src/environments/environment.ts
```

This file contains the following environment variables:
```typescript
export const environment = {
  googleClientId: '',
  googleApiKey: '',
  gmailDiscoveryDoc: '',
};
```

For the `googleClientId` and `gooaleApiKey`, you need to generate it by creating a project on [Google Cloud Console](https://console.cloud.google.com). For the `gmailDiscoveryDoc`, as of writing this, it's value must be`https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
