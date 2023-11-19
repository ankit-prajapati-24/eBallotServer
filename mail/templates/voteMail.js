exports.voteConfirmation = ( candidateName,date,voterName) =>{
    return `
    
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vote Confirmation Receipt</title>
    <!-- Add Tailwind CSS CDN -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        /* Add any additional custom styles here */
    </style>
</head>
<body class="bg-gray-100">

    <div class="container mx-auto my-8 p-8 bg-white rounded-md shadow-md">
        <!-- Logo placeholder -->
        <img src="https://res.cloudinary.com/depiyqis9/image/upload/v1700200787/MYCLOUDE/IMG_20230909_193215-removebg-preview-removebg-preview_qropin.png" alt="Your Organization Logo" class="mb-4">
        <h2 class="text-green-600 text-2xl font-bold mb-4">Vote Confirmation Receipt</h2>
        
        <table class="w-full mb-4">
            <tr>
                <td class="text-gray-600">Candidate:</td>
                <td class="font-bold">${candidateName}</td>
            </tr>
            <tr>
                <td class="text-gray-600">Date:</td>
                <td class="font-bold">${date}</td>
            </tr>
        </table>

        <p class="mb-4">Dear ${voterName},</p>
        <p>Your vote has been successfully cast to the candidate: <strong>${candidateName}</strong>.</p>
        <p>Thank you for participating in the democratic process!</p>
        <p>If you have any questions or concerns, feel free to contact us.</p>

        <p class="mt-4">Best regards,</p>
        <p>eBallot</p>
    </div>

</body>
</html>

    `

}