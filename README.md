This project aims to automate repetetive emails. It allows you to save email as templates and use those templates to rapidly compose your email. It's built with Angular 15. It utilizes [Tailwind](https://tailwindcss.com/) as it's base CSS utility and uses [daisyUI](https://daisyui.com) for the prebuilt components. A docker-compose file is provided for easy usage and self hosting.

## Demo
Here's a link for a quick demo: https://email.marvielb.com

# Tutorial

## 1. Templates
Head over in the [Templates tab](https://email.marvielb.com/template) and click on "Create New Template" if you still have no existing templates yet. The templates tab manages the templates you currently have.

![image](https://github.com/marvielb/lazy-email/assets/50162243/4f26fcdf-2d49-4389-af6e-376a70393f5b)


## 1.1 Input the necessary details. 
- `Name` will be the name of the template
- `Default To` default recepient of the email
- `Default CC` default CC of the email
- `Fields` fields are a list of "variables" so to speak that will be replaced later on upon sending the email
- `Body` is the content of the email. You use the fileds defined by surrounding it with double curly braces `{{field_id_here}}`. It uses [handlebars](https://handlebarsjs.com/guide/#what-is-handlebars) syntax.

In this tutorial, I'll put the following details. Also add a field with id of `database_name` and name of `Database Name`. After filling these up, click `Save`

![image](https://github.com/marvielb/lazy-email/assets/50162243/23ea3fc2-f2cb-485e-94dc-3146604e288c)

## 2. Account
We must login our account that will be used to send our emails. Do note that only gmail is supported for now but if requests comes in, other email providers can be supported. 
1. Head over to the [Account tab](https://email.marvielb.com/account).
2. After that, click on "Login with Google".
3. Login your account.

![image](https://github.com/marvielb/lazy-email/assets/50162243/8e1ea353-248c-4a17-b541-1a1dbf5895c1)

## 3. Sending Emails
Once the proper setup has been placed, you can now send emails.
1. Head over to the [Send tab](https://email.marvielb.com/send)
2. Select the template we created earlier
3. Customize it as you like.

![image](https://github.com/marvielb/lazy-email/assets/50162243/d860ec45-bd6b-48c0-9006-7809701678d4)

4. Click on `Send` button.
5. A dialog will pop up and after confirming the contents, hit send.
6. After that, a message will pop up saying it has been sent.

## 4. Result
After sending in the app, the following email should be sent. Notice that the `database_name` from the template earlier has been replaced by the text we input during the sending of the email.

![image](https://github.com/marvielb/lazy-email/assets/50162243/374332ed-145f-44a3-9c72-b0b9922e45ed)


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
