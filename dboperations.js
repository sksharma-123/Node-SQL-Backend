var config = require('./dbconfig');
const sql = require('mssql');

//all students
async function getOrders() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from student");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

//get single student
async function getOrder(Name) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.VarChar, Name)
            .query("SELECT * from student where Name = @input_parameter");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}
//get single student
async function getOrderId(rollno) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.VarChar, rollno)
            .query("SELECT * from student where rollno = @input_parameter");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

//add new student
async function addOrder(order) {

    try {
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
            .input('Name', sql.VarChar, order.Name)
            .input('Age', sql.Int, order.Age)
            .input('class', sql.Int, order.class)
            .input('marks', sql.Int, order.marks)
            .input('rollno', sql.Int, order.rollno)
            .input('state', sql.VarChar, order.state)
            .input('city', sql.VarChar, order.city)
            .input('school', sql.VarChar, order.school)
            .input('profile', sql.Image, order.profile)
            .execute('InsertStudent');

        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}

//update student
async function updateOrder(order,preOrder,rollno) {
    try {
        // console.log('preorder',preOrder[0].Name)
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
            .input('Name', sql.VarChar, order.Name ?? preOrder.Name)
            .input('Age', sql.Int, order.Age ?? preOrder.Age)
            .input('class', sql.Int, order.class ?? preOrder.class)
            .input('marks', sql.Int, order.marks ?? preOrder.marks)
            .input('rollno', sql.Int, rollno)
            .input('state', sql.VarChar, order.state ?? preOrder.state)
            .input('city', sql.VarChar, order.city ?? preOrder.city)
            .input('school', sql.VarChar, order.school ?? preOrder.school)
            .input('profile', sql.Image, order.profile ?? preOrder.profile)
            .execute('UpdateStudent');
        return insertProduct.recordsets;
        
    }
    catch (err) {
        console.log(err);
    }
}

//delete student
async function delOrder(Name) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.VarChar, Name)
            .query("delete from student where Name = @input_parameter");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}




module.exports = {
    getOrders: getOrders,
    getOrder : getOrder,
    getOrderId:getOrderId,
    addOrder : addOrder,
    delOrder : delOrder,
    updateOrder : updateOrder
}