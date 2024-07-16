exports.contactUsEmail = (
    fullName
  ) => {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Your Response</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 20px;
                padding: 20px;
                background-color: #f4f4f4;
                text-align: center;
            }
    
            .container {
                background-color: #fff;
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                max-width: 600px;
                margin: 0 auto;
            }
    
            h1 {
                color: #333;
            }
    
            p {
                color: #555;
                line-height: 1.6;
            }
    
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #4CAF50;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
                transition: background-color 0.3s;
            }
    
            .button:hover {
                background-color: #45a049;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <h1>Thank You for Your Response and Feedback!</h1>
            <p>
                Dear ${fullName},
            </p>
           <p>
           Thank you for reaching out to me via my portfolio website. I appreciate your interest in my work and the time you took to connect with me.

           <br>
           I have received your message and will get back to you as soon as possible. In the meantime, feel free to explore more of my projects and services on my website.
          <br>
            If your inquiry is urgent, please do not hesitate to contact me directly at [ankitprajpat4565@gmail.com].
            </p>
             <p>
             Best regards,
            </p>
             <p>

            Ankit prajapat
            </p>
        </div>
    </body>
    
    </html>
    `
  }
