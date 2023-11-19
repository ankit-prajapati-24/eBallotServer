const Catagory = require('../models/Catagory');

// create  catagory

exports.CreateCatagory = async(req,res) =>{
    try{
       const {name,description} = req.body;

       if(!name || !description) {
        return res.status(400).send({message:"Name and description are required"});
       }
       const catagory = await Catagory.create({name:name,description:description});
       console.log(catagory);
       return res.status(200).json({
        message:"catagory created successfully",
        catagory
       });
    }
    catch(err){
        res.status(500).send({message:"Error creating catagory"});
    }
}
// fetcha all catagory


exports.getAllCatagory = async(req,res) =>{
    try{
        const catagories = await Catagory.find({},{name:true,description:true});
        return res.status(200).json({
           success:true,
            message:"catagories fetched successfully",
            catagories
        });
    } 

    catch(err){
        res.status(500).send({message:"Error fetching catagory"});
    }
}



// get categories page details 

exports.categoryPageDetails = async(req,res) =>{
    try{
        // fetch the category 
        const {cateroryID} = req.body;
        const selectedcotegoryDetails = await Catagory.findByID(cateroryID).pupulate("courses").exec();
        console.log(cotegoryDetails);
        
        if(!selectedcotegoryDetails) {
            return res.status(400).send({message:"Category not found"});
        }

        const differentCategories = await Catagory.find({_id:{$na:cateroryID}}).pupulate("courses").exec();

        return res.status(200).json({
            success:true,
            data:{
                selectedcotegoryDetails,
                differentCategories
            }
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).send({
            message: err.message || "Some error occuurrented while retrieving categories."
        });
    }
}