document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox')
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector("#email-view").style.display = 'none'
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';

  // Send Emails
  document.querySelector("#compose-form").addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the content of the email
    const recipients = document.querySelector("#compose-recipients").value;
    const subject = document.querySelector("#compose-subject").value;
    const body = document.querySelector("#compose-body").value;

    // Make a post request
    fetch("/emails", {
      method: "POST",
      body: JSON.stringify({
        recipients: recipients,
        subject: subject,
        body: body
      })
    })
    .then(response => response.json())
    .then(result => {
      // Print result
      console.log(result.error);
    })
    .then(() => {
      // Load Sent Mail Box
      load_mailbox('sent')
    });
  });
};

function load_mailbox(mailbox) {

  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector("#email-view").style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // Load Inbox
  if (mailbox === 'inbox') {
    fetch("emails/inbox")
    .then(response => response.json())
    .then(emails => {
      emails.forEach(email => {
        // Create row container
        const row = document.createElement('div')
        row.setAttribute('class', 'row')
        row.setAttribute('id', 'email-row')
        row.setAttribute('data-email', email.id)

        if (email.read === true) {
          row.setAttribute('class', 'row read')
        }

        // Append sender
        const sender = document.createElement('div');
        sender.setAttribute('class', 'col-sm');
        sender.setAttribute('id', 'sender')
        sender.innerHTML = email.sender;
        row.appendChild(sender)

        // Append subject
        const subject = document.createElement('div');
        subject.setAttribute('class', 'col-sm');
        subject.setAttribute('id', 'subject')
        subject.innerHTML = email.subject;
        row.appendChild(subject)

        // Append timestamp
        const timestamp = document.createElement('div');
        timestamp.setAttribute('class', 'col-sm');
        timestamp.setAttribute('id', 'timestamp')
        timestamp.innerHTML = email.timestamp
        row.appendChild(timestamp)

        // Append row to main container
        document.querySelector("#emails-view").append(row)
      })
    })
    .then(function() {
      // Add an event handler to access each email when user clicks on it
      document.querySelectorAll(".row").forEach(email => {
        email.addEventListener('click', (event) => {
          //debugger
          email_id = email.dataset.email;
          load_email(email_id);
        });
      });
    });
  };

  // Load Sent Mailbox
  if (mailbox === 'sent') {
    fetch("emails/sent")
    .then(response => response.json())
    .then(emails => {
      emails.forEach(email => {
        // Create row container
        const row = document.createElement('div')
        row.setAttribute('class', 'row')
        row.setAttribute('id', 'email-row')

        // Append recipients
        const recipients = document.createElement('div');
        recipients.setAttribute('class', 'col-sm');
        recipients.innerHTML = email.recipients.toString();
        row.appendChild(recipients)

        // Append subject
        const subject = document.createElement('div');
        subject.setAttribute('class', 'col-sm');
        subject.setAttribute('id', 'subject')
        subject.innerHTML = email.subject;
        row.appendChild(subject)

        // Append timestamp
        const timestamp = document.createElement('div');
        timestamp.setAttribute('class', 'col-sm');
        timestamp.setAttribute('id', 'timestamp')
        timestamp.innerHTML = email.timestamp
        row.appendChild(timestamp)

        // Append row to main container
        document.querySelector("#emails-view").append(row)
      });
    });
  };
};

function load_email(email_id) {
  // Show the mail and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector("#email-view").style.display = 'block';

  fetch(`emails/${email_id}`)
  .then(response => response.json())
}
