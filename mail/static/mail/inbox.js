document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox')
});

// Create the composition of the email
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
  const submit_email = document.querySelector("#compose-form")
  submit_email.addEventListener('submit', (event) => {
    event.stopImmediatePropagation();
    send_email(event)
  });
};

// Send composed email
function send_email(event) {
  event.preventDefault();

  // Get the content of the email
  const recipients = document.querySelector("#compose-recipients").value;
  const subject = document.querySelector("#compose-subject").value;
  const body = document.querySelector("#compose-body").value;


  //debugger
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
    console.log(result.status);
  })
  .then(() => {
    // Load Sent Mail Box
    load_mailbox('sent')
  });
}

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
        row.addEventListener('click', () => {
          load_email(email.id, 'inbox');
        })

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
        row.setAttribute('data-email', email.id)
        row.addEventListener('click', (event) => {
          load_email(email.id, 'sent');
        })

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
      })
    })
  };

  // Load Archive Mailbox
  if (mailbox === 'archive') {
    fetch("emails/archive")
    .then(response => response.json())
    .then(emails => {
      emails.forEach(email => {
        // Create row container
        const row = document.createElement('div')
        row.setAttribute('class', 'row')
        row.setAttribute('id', 'email-row')
        row.addEventListener('click', (event) => {
          load_email(email.id, 'inbox');
        })

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

function load_email(email_id, mailbox) {
  // Show the mail and hide other views

  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector("#email-view").style.display = 'block';

  if (mailbox === 'inbox') {
    document.querySelector('#archive').style.display = 'block';
  }
  else {
    document.querySelector('#archive').style.display = 'none';
  }

  // Event listener to reply an email
  //debugger
  container = document.querySelector("#reply")

  const reply_button = document.createElement('button')
  reply_button.className = "btn btn-sm btn-outline-primary"
  reply_button.innerHTML = "Reply"

  container.append(reply_button)

  reply_button.addEventListener('click', (event) => {
    //debugger
    event.stopImmediatePropagation(true);
    reply(email_id)
    container.removeChild(reply_button)
  })

  // Get the email content
  fetch(`emails/${email_id}`)
  .then(response => response.json())
  .then(data => {
    //console.log(data)
    document.querySelector("#view-from").innerHTML = data.sender
    document.querySelector("#view-to").innerHTML = data.recipients.toString()
    document.querySelector("#view-subject").innerHTML = data.subject
    document.querySelector("#view-timestamp").innerHTML = data.timestamp
    document.querySelector("#view-body").innerHTML = data.body

    if (mailbox === 'inbox') {
      if (data.archived === false) {
        document.querySelector("#archive").innerHTML = "Archive"
        document.querySelector("#archive").addEventListener('click', () => archive(email_id))
      }
      else {
        document.querySelector("#archive").innerHTML = "Remove From Archive"
        document.querySelector("#archive").addEventListener('click', () => archive(email_id))
      }
    }
  })

  // Mark as read
  fetch(`emails/${email_id}`, {
    method: "PUT",
    body: JSON.stringify({
      read: true
    })
  })
  .then(response => console.log(response.status))
}


function archive(email_id) {
  // Add to Archive or Remove from archive
  fetch(`emails/${email_id}`)
  .then(response => response.json())
  .then(email => {
  fetch(`emails/${email.id}`, {
    method: "PUT",
    body: JSON.stringify({
      archived: !(email.archived)
    })
  })
  .then((event) => event.stopImmediatePropagation(true))
  .then(response => console.log(response.status))
  .then(location.reload(true))
  .then(() => load_mailbox('inbox'))
  })
}


function reply(email_id) {

  //debugger
  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector("#email-view").style.display = 'none'
  document.querySelector('#compose-view').style.display = 'block';

  document.querySelector("#compose-title").innerHTML = "Reply Email"

  fetch(`emails/${email_id}`)
  .then(response => response.json())
  .then(email => {

    form = document.getElementById('compose-form').reset();

    // Pre-fill form
    document.querySelector('#compose-recipients').value = email.sender;

    if (email.subject.startsWith("Re: ")) {
      document.querySelector('#compose-subject').value = email.subject;
    }
    else {
      document.querySelector('#compose-subject').value = "Re: " + email.subject;
    }

    document.querySelector('#compose-body').value = `On ${email.timestamp} ${email.sender} wrote: ${email.body}`
  })
  .then((event) => {
    document.querySelector("#compose-form").addEventListener('submit', (event) => {
      //debugger
      event.stopImmediatePropagation();
      send_email(event);
    });
  })
  //debugger
}
