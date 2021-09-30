var Db  = require('./dboperations');
var Order = require('./order');
const dboperations = require('./dboperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


router.use((request,response,next)=>{
   console.log('middleware');
   next();
})

//all student

router.route('/student').get((request,response)=>{

    dboperations.getOrders().then(result => {
       response.json(result[0]);
    })

})

//student by name

router.route('/student/:name').get((request,response)=>{

    dboperations.getOrder(request.params.name).then(result => {
       response.json(result[0]);
    })

})

//student by roll no
router.route('/studentByRollno/:rollno').get((request,response)=>{

    dboperations.getOrderId(request.params.rollno).then(result => {
       response.json(result[0]);
    })

})

//add new student
router.route('/addStudent').post((request,response)=>{

   let order = {...request.body}

   dboperations.addOrder(order).then(result => {
      response.status(201).json(result);
   })

})
//delete
router.route('/deleteStudent/:name').delete((request,response)=>{

    dboperations.delOrder(request.params.name).then(result => {
       response.json(result[0]);
    })

})


//update
router.route('/student/:rollno').patch((request,response)=>{

    let order = {...request.body}
    dboperations.getOrderId(request.params.rollno).then(result => {
       let preOrder = result[0]

       dboperations.updateOrder(order,preOrder,request.params.rollno).then(result => {
             response.status(201).json(result);
          })
    })
})




var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at '+ port);



