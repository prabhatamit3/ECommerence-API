
const mongoose=require('mongoose');
const Product=require('../models/products');
const Counter=require('../models/conter');


//home page displaying all the posts

module.exports.index= async function(req,res){
          try{
          //finding all the products    
          let product= await Product.find({});
          
          //sending response 
              return res.json(200,{
                data:{ 
                      products:product
                      }
                    });
            }
            //if error occurs
          catch(err)
          {
              console.log(`error${err}`);
              return res.json(500,{
                  message:'error in fetching post '
                });
            
          }
          
}

//function to increase seq by 1 whenever called which is further used as _id of roduct
async function getNextSequence(name) {
  var ret =await Counter.findOneAndUpdate(
        { _id: name },
        { $inc: { seq: 1 } },
        { new: true }
  );
        console.log(ret);
  return ret.seq;
}

//to create a product
// module.exports.create=async function(req,res){
//       try{  
//        //if product of same name existed in list
//         let ifExist= await Product.findOne({name:req.body.name});

//       if(ifExist!=null)
//       {
//         return await res.json(404,{
//           message:"product already exist"
//         })
//       }

//         let length= (await Counter.find({})).length;
//           let id;

//           //if length of Counter is 0 then creating counter
//           if(length==0)
//           {
//             await Counter.create(
//                 {
//                   _id: "userid",
//                   seq: 0
//                 })
//           }
              

          
//           id=await getNextSequence("userid");
          
//         //creating product
//         await Product.create({
//               _id:id,
//               name:req.body.name,
//               quantity:req.body.quantity
//           });
          
//           // removing id from product
//           let product=  await Product.findById(id).select('-_id');
          
//           //responding if product creation is successfull
//           if(product){  
//           return  res.json(201,{
//                   data:{
//                       product:product
//                   }
//               });
//           }
              
//       }
//       catch(err){

//           console.log(`err${err}`);
//           return res.json(500,{
//               message:'Internal error'
//             });
//           }
// }
module.exports.create = async function(req, res) {
  console.log('Starting product creation...');
  console.log(req);
  console.log('req.body.quantity:', req.body.quantity);
  // Check if product of same name exists in list
  console.log('Checking if product exists...');
  let ifExist = await Product.findOne({name: req.body.name});
  console.log('Product exists:', ifExist);


  if(ifExist != null) {
      console.log('Product already exists, sending response...');
      return await res.json(404, {
          message: "product already exist"
      });
  }

  console.log('Product does not exist, proceeding to create...');

  // Check length of Counter
  console.log('Checking counter length...');
  let length = (await Counter.find({})).length;
  console.log('Counter length:', length);

  let id;

  // If length of Counter is 0 then creating counter
  if(length == 0) {
      console.log('Counter length is 0, creating counter...');
      await Counter.create({
          _id: "userid",
          seq: 0
      });
      console.log('Counter created.');
  }

  // Get next sequence
  console.log('Getting next sequence...');
  id = await getNextSequence("userid");
  console.log('Next sequence:', id);

  // Create product
  console.log('Creating product...');
  await Product.create({
      _id: id,
      name: req.body.name,
      quantity: req.body.quantity
  });
  console.log('Product created.');

  // Remove id from product
  console.log('Removing id from product...');
  let product = await Product.findById(id).select('-_id');
  console.log('Id removed from product:', product);

  // Respond if product creation is successful
  if(product) {
      console.log('Product creation successful, sending response...');
      return res.json(201, {
          data: {
              product: product
          }
      });
  }
}

// TO DELETE THE PRODUCT

module.exports.delete=async function(req,res){
    try{  
    let id=req.params.id;
   
    //finding product  by id
    let product=await Product.findById(id);
    //if product not fount then responding 401 not found    
    if(product==null)
        {
            return res.json(401,{
                message:'post id not found'
              });      
        }
       
      //removing product  
        product.remove();
      
        return res.json(401,{
        message:'  post deleted Succesfully'
      });

    }catch(err)
    {
        console.log(`err${err}`);
        return res.json(500,{
            message:'Internal error in deleing post post'
        });

    }
}
  
// TO UPDATE THE QUANTITY OF PRODUCT
module.exports.update= async function(req,res)
{
  try{
    //if quantity is -ve then returning 
    if(req.query.number<0)
    {
      return res.json(400,{
          message:"error quantity can't be negative"
        });  
    }
    //finding and updating ther product if product not fornd it will return null
   
    let product=await Product.findOneAndUpdate({_id:req.params.id},{quantity:req.query.number},{new:true});
     if(product==null)
        {
        return res.json(404,{
             message:'post id not found'
           });      
       }
    return res.json(200,{
      data:{
        product:product
     }
    });
    }
    catch(err)
    {
      console.log(`error ${err}`)
      return res.json(500,{
        message:'Internal error in updating  post'
      });
    }
}
