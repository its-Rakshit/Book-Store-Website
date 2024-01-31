import axios from "axios";
const BASE_URL_save = "http://localhost:8080/addUser"
const BASE_URL_fetchAllProduct = "http://localhost:8080/showAllProducts"
const BASE_URL_getProduct = "http://localhost:8080/getProduct?productId="
const BASE_URL_Review = "http://localhost:8080/addReview"
const BASE_URL_getReviews = "http://localhost:8080/show?proid="
const BASE_URL_searchProduct = "http://localhost:8080/searchProducts?query="

const BASE_URL_addProduct = "http://localhost:8080/addProduct"
const BASE_URL_deleteProductFromDB = "http://localhost:8080/deleteProductFromDB?proID="
const BASE_URL_UpdateProduct = "http://localhost:8080/updateProduct"
const BASE_URL_showALLUSERS = "http://localhost:8080/getAllUsers"
const BASE_URL_UpdateUser = "http://localhost:8080/userUpdate"
//const BASE_URL_AddToCart = "http://localhost:8080/addToCart?userId={}&productId={}"

class userService{
    save(user){
        return axios.post(BASE_URL_save, user)
    }

    fetchAllProducts(){
        return axios.get(BASE_URL_fetchAllProduct)
    }

    login(email, password){
        return axios.get("http://localhost:8080/searchemail?email="+ email + "&password=" + password);
    }

    getProduct(id){
        return axios.get(BASE_URL_getProduct+id);
    }

    postReview(review){

        var bodyFormData = new FormData();

        for(let key in review) {
            bodyFormData.append(key, review[key]);
            console.log(key, review[key]);
        }
        
        axios({
            method: "post",
            url: BASE_URL_Review,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (response) {
              
              console.log(response);
            })
            .catch(function (response) {
              
              console.log(response);
            });
    }

    getAllReviwes(pro_id){
        return axios.get(BASE_URL_getReviews + pro_id);
    }

    addToCart(pro_id, user_id){
        return axios.get("http://localhost:8080/addToCart?userId=" +  user_id +  "&productId=" + pro_id);
    }

    removeFromCart(pro_id, user_id){
        return axios.get("http://localhost:8080/removeFromCart?userId=" + user_id + "&productId=" + pro_id);
    }

    checkProductIsInCart(pro_id, user_id){
        return axios.get("http://localhost:8080/checkProductIsInCart?userID="+user_id+"&ProID="+pro_id);
    }

    getCartProduct(userID){
        return axios.get("http://localhost:8080/getAllCartProductFromUser?userID=" + userID);
    }

    removeFromCart(pro_id, user_id){
        return axios.get("http://localhost:8080/removeFromCart?userId=" + user_id + "&productId=" + pro_id)
    }

    buyAllFromCart(userID){
        return axios.get("http://localhost:8080/buyAllFromCart?userId=" + userID)
    }

    boughtProducts(userID){
        return axios.get("http://localhost:8080/getPlacedOrder?userid=" + userID)
    }

    adminAddProduct(product){
        return axios.post(BASE_URL_addProduct, product)
    }

    adminDeleteProduct(proID){
        return axios.delete(BASE_URL_deleteProductFromDB + proID)
    }

    adminAllUserList(){
        return axios.get("http://localhost:8080/getAllUsers").then((res)=>res.data)
    }

    adminDeleteUser(id){
        return axios.delete("http://localhost:8080/deleteUserFromDB?id=" + id)
    }

    adminGetUserById(id){
        return axios.get("http://localhost:8080/getUserById?id=" + id)
    }

    adminUpdateUser(user) {
        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('address', user.address);
        formData.append('phone_no', user.phone_no);
        formData.append('password', user.password);
        formData.append('userid', user.userid);
        console.log(formData);
    
        return axios.post(BASE_URL_UpdateUser, formData);
    }

    cancelOrder(userid , productname){
        return axios.get("http://localhost:8080/cancelOrder?userid="+ userid +"&productname=" + productname)
    }
    
    likeProduct(id){
        return axios.get("http://localhost:8080/likeProduct?productid=" + id)
    }

    searchProduct(query){
        return axios.get(BASE_URL_searchProduct + query)
    }
    

    adminUpdateProduct(product) {
        var bodyFormData = new FormData();
    
       
        for (let key in product) {
            if (key === 'reviews') {
                
            } else {
                bodyFormData.append(key, product[key]);
            }
        }
    
        
        for (var pair of bodyFormData.entries()) {
            console.log(pair[0]+ ', '+ pair[1]);
        }
    
        return axios({
            method: "put", 
            url: BASE_URL_UpdateProduct,
            data: bodyFormData,
        })
        
    }

    
    
    
    
    
    
    
      
}

export default new userService();