# mail

Front End of email client that makes API calls to send and receive emails.

The website has been designed as a single page application, using Django for the backend and JavaScript to manipulate the DOM.

- **Inbox**

![Screenshot from 2022-04-10 20-07-40](https://user-images.githubusercontent.com/64209661/162643828-ec4c5911-88d9-40b9-8ff1-283a7a6c48eb.png)

Once the user created an account and is logged, the inbox is loaded since is the default view. Then, the user can explore the received emails clicking 
on them.

- **Email View**

![Screenshot from 2022-04-10 20-10-27](https://user-images.githubusercontent.com/64209661/162643928-e6c8a05a-e78e-404e-8d1f-8651438faef7.png)

The email content shows all previous conversations in case there are. In addition, there are buttons to reply the email and to move it to the archive. 

![Screenshot from 2022-04-10 20-15-01](https://user-images.githubusercontent.com/64209661/162644057-3c8ff6e1-454e-4a22-8b9d-933f76acc7c4.png)

If the email is currently in the archive the user can remove it from there by clicking on the same button

- **Reply Email View**

![Screenshot from 2022-04-10 20-16-45](https://user-images.githubusercontent.com/64209661/162644445-d27fa746-6320-4a0d-8125-f1f62de807b5.png)

Clicking on the reply button, the app will render a pre-filled form with the content of previous emails in a formated as it is displayed in the above
image.

- **Sent Mailbox**

The sent mailbox and archive can be accesed through the corresponding buttons on the upper nav-bar.

![Screenshot from 2022-04-10 20-22-23](https://user-images.githubusercontent.com/64209661/162644680-8b6aad5d-c0b2-4c3f-a91f-6144a4201a9d.png)

- **Archive Mailbox**

![Screenshot from 2022-04-10 20-22-39](https://user-images.githubusercontent.com/64209661/162644688-f0434006-b914-4b83-a442-f7d4dfd614b2.png)

- **Compose Email**

To create a new email, click on compose button. Then insert the recipients, the subjects and the content of your email. Once all the fields are filled
the user must click on the sumbit button to send the email.

![Screenshot from 2022-04-10 20-23-41](https://user-images.githubusercontent.com/64209661/162644695-b731eb8d-877e-46cd-b3de-aa09a80f73d4.png)



