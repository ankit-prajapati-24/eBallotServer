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
                I hope this message finds you well. Your feedback on the recent e-ballot is greatly appreciated. Your insights are invaluable and play a crucial role in shaping our initiatives.
            </p>
            <p>
                Thank you for being an active and engaged member of our community. We look forward to your continued involvement in future endeavors.
            </p>
            <p>
                If you have any further thoughts or suggestions, please feel free to reach out. Your input is highly valued, and we are always eager to hear from you.
            </p>
            <p>
                Once again, thank you for your time and dedication.
            </p>
            <p>Best regards,<br>Ankit Prajapati<br></p>
            <p>
                <a href="#" class="button">Back to Website</a>
            </p>
        </div>
    </body>
    
    </html>
    `
  }