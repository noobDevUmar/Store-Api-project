const Product = require('../models/product')


                        // FILTERING .... 

            // getting all the products from database ..

const getAllProductsStatic  = async (req,res)=>{
  // const products = await Product.find({}) // will get all data from DB


  //const products = await Product.find({featured:true}) // will filter only those in which featured is true

  const search = 'table' // line 1 
  
  //put this in between find()>> name : {$regex: search,$options: 'i'}, // it will print all the result matching whatever youve written in sarch var
  const products = await Product.find({price:{$gt:30}})
.select('name price ')
.limit(10)
.skip(5)

  res.status(200).json({products ,nbHits:products.length})
} 



//DYNAMIC APPROACHS 


const getAllProducts  = async (req,res)=>{
  const {featured,company,name, sort,fields,numericFilters} =req.query
  const queryObject = {}

  if(featured){
    queryObject.featured=featured =='true'? true : false
  }
  if(company){
    queryObject.company = company
  }
  if(name){
    queryObject.name={$regex: name,$options: 'i'};
  }

  if(numericFilters){
    const operatorMap = {
      '>':'$gt',
      '>=':'$gte',
      '=':'$et',
      '<':'$lt',
      '<=':'$lte',

    }
    const regEx = /\b(<|>|>=|=|<|<=)\b/g
  let filters = numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)
   const options = ['price','rating'];
   filters = filters.split(',').forEach((item)=>{
    const [field,operator,value]= item.split('-');
    if(options.includes(field)){
      queryObject[field]= {[operator]:Number(value)}
    }
   })
  }


 // req.query will get the input result and find method will insert into filter method
 // const products= await Product.find(req.query);

console.log(queryObject)
let result= Product.find(queryObject);
//sort
if(sort){
const sortList = sort.split(',').join(' ')
result = result.sort(sortList)
}else{
  result = result.sort('createdAt')
}

if(fields){
  const fieldList = fields.split(',').join(' ')
result = result.select(fieldList)
}

const page = Number(req.query.page) || 1
const limit = Number(req.query.limit)||10
const skip = (page -1 ) * limit;

result  = result.skip(skip).limit(limit)

// 23 products. 
//4pages 7 7 7 2



const products = await result 
res.status(200).json({products,nbHits:products.length })


} 



module.exports = { getAllProducts, getAllProductsStatic }