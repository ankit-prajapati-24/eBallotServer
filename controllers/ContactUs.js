const mailSender = require("../utils/mailSender");
const {contactUsEmail} =  require("../mail/templates/contactFormRes")


// 

exports.ContactUs = async(req,res) =>{
    try{
        const {firstName,lastName,email,contactNumber,message} = req.body;
        if(!firstName ||!lastName ||!email ||!contactNumber ||!message){
            return res.status(404).json({
                success:false,
                message :" all fields are required"
            })
        }
        const body =  contactUsEmail(email,firstName, lastName, message, contactNumber);
        const mailResponse = await mailSender(email,"Your Resonse is Recieved",body);
        return res.status(200).json({
            success:true,
            message :" Your Resonse is Recieved"
        });
    }
    catch(err){
        return res.status(404).json({
            success:false,
            message :" error in contact us request"
        })
    }
}