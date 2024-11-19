async function  getUserDetails(userObj, client) {
    const {phone,password}=userObj;
    const db = client.db("users");
    const collection = db.collection('user_details');
    const user_list = await collection.findOne({"phone":phone})
    console.log('yoges')
 return user_list
}

module.exports= {getUserDetails}