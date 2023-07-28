var express=require('express');
var cors=require('cors');
const mongoose=require('mongoose');
const multer= require("multer");
//express object
var api=express()
//cors object
api.use(cors())
api.use(express.urlencoded({extended: true}))
api.use(express.static("upload"))
//json
api.use(express.json())

api.use(express.urlencoded({extended:true}))

//table structure
const empStructure=new mongoose.Schema({fname:String,email:String,password:String})
const prodStructure=new mongoose.Schema({pname:String,disc:String,prodcategory:String,prodprice:Number,stock:Number,fileurl:String})
const catgStructure=new mongoose.Schema({category:String})
const demo=mongoose.Schema({fname:String,email:String,password:String,fileurl:String});
//create model
const empModel = new mongoose.model('employees',empStructure)
const prodModel = new mongoose.model('products',prodStructure)
const catgModel = new mongoose.model('category',catgStructure)
const demoM=mongoose.model('demoTable',demo);

//multer
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{cb(null,'upload/user')},
    filename:(req,file,cb)=>{cb(null,file.originalname)} 
});
//upload file
const upload = multer({storage:storage})

api.post('/add', (req, res) => {
  var fname = req.body.fname;
  var email = req.body.email;
  var password = req.body.password;
  const obj = new empModel({ fname: fname, email: email, password: password });
  obj.save().then(() => {
      res.send({ "msg": "send successfully" });
  }).catch((error) => {
      res.status(500).send({ "error": "An error occurred while saving the object" });
  });
});
//****************** add category************************
api.post('/addcatg',(req,res)=>{
  var catgnm =req.body.catgnm;
  const obj =new catgModel({catgnm:catgnm});
  obj.save().then(()=>{
    res.send({"msg":"send successfully"});
    }).catch((err)=>{
      res.status(500).send({"error":"An error occured while saving"});
  })
});
////**************************************category *************************************************/
api.post('/category', async (req, res) => {
  var category= req.body.category;
  category=category.toUpperCase(); 
  try {
    // Check if the category already exists in the database
    const existingCategory = await catgModel.findOne({ category: category });

    if (existingCategory) {
      // Category already exists, send an error response
      return res.send({ "msg": "Category already exists" });
    }

    // Category doesn't exist, save it to the database
    const obj = new catgModel({ category: category });
    await obj.save();

    res.send({ "msg": "category added" });
  } catch (error) {
    res.status(500).send({ "error": "An error occurred while saving category" });
  }
});

api.get('/catgetdata',async(req,res)=>{
  var data=await catgModel.find()
  res.send(
      data)
})

api.post('/addproduct',upload.single('file'), (req, res) => {
  var pname = req.body.pname;
  var disc= req.body.disc;
  var prodcategory = req.body.prodcategory;
  var prodprice = req.body.prodprice;
  var stock = req.body.stock;
  const url = req.file.filename;
  
  const obj = new prodModel({ pname: pname, disc:disc,prodcategory:prodcategory,prodprice:prodprice,stock:stock,fileurl: url });
  obj.save().then(() => {
      res.send({ "msg": "send successfully" });
  }).catch((error) => {
      res.status(500).send({ "error": "An error occurred while saving the object" });
  });
});

api.post('/uploadimg', upload.single('file'), (req, res) => {
    const url = req.file.filename;
    console.log(url);
    res.send({ 'msg': 'success' });
  });

  api.post('/uploadform', upload.single('file'), (req, res) => {
    var fname = req.body.fname;
    var email = req.body.email;
    var password = req.body.password;
    const url = req.file.filename;
    const obj = new demoM({ fname: fname, email: email, password: password,fileurl: url });
    obj.save().then(() => {
      res.send({ "msg": "send successfully" });
    }).catch((error) => {
      res.status(500).send({ "error": "An error occurred while saving the object" });
    });
  
  });


//mongoose connection
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/empDB');
  console.log("Database Connected")
}
//server creation 
api.listen(9000,()=>{
    console.log("Server running http://localhost:9000")
})