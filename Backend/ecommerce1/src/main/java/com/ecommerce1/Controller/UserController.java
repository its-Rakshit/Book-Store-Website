package com.ecommerce1.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce1.Entities.OrderDetails;
import com.ecommerce1.Entities.ProductEntity;
import com.ecommerce1.Entities.ReviewEntity;
import com.ecommerce1.Entities.UserEntity;
import com.ecommerce1.service.UserService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UserController {

	@Autowired
	UserService service;
	
	@PostMapping(value = "/addUser", consumes = "application/json")
	public ResponseEntity<String> addUser(@RequestBody UserEntity entity){
		service.addUser(entity);
		return ResponseEntity.ok().body("Successfully Added Data to Database");
	}
	
	@PostMapping("/addProduct")
	public ResponseEntity<String> addProduct(@RequestBody ProductEntity entity){
		service.addProduct(entity);
		return ResponseEntity.ok().body("Successfully Added Data to Database");
	}
	
	@GetMapping("/addToCart")
	public ResponseEntity<List<ProductEntity>> addToCart(@RequestParam Integer userId, @RequestParam Integer productId ){
		return ResponseEntity.ok().body(service.addToCart(userId, productId));
	}
	
	@GetMapping("/removeFromCart")
	public ResponseEntity<List<ProductEntity>> removeFromCart(@RequestParam Integer userId, @RequestParam Integer productId ){
		return ResponseEntity.ok().body(service.removeFromCart(userId, productId));
	}
	@GetMapping("/buyAllFromCart")
	public ResponseEntity<String> buyAllFromCart(@RequestParam Integer userId) {
		service.buyAllFromCart(userId);
		return ResponseEntity.ok().body("Thank You Purchasing");
	}
	
	@GetMapping("/showAllProducts")
	public ResponseEntity<List<ProductEntity>> showAllProducts(){
		return ResponseEntity.ok().body(service.showAllProducts());
	}
	
	@PutMapping("/updateProduct")
	public ResponseEntity<ProductEntity> updateProduct(@ModelAttribute ProductEntity entity){ 
		System.out.println(entity.getReleaseddate());
		System.out.println(entity.getName());//need form data
		return ResponseEntity.ok().body(service.updateProduct(entity));
	}
	
	@GetMapping("/getProduct")
	public ResponseEntity<ProductEntity> getProduct(@RequestParam Integer productId){  //need form data
		return ResponseEntity.ok().body(service.getProduct(productId));
	}
	
	
	@GetMapping("/getAllUsers")
	public ResponseEntity<List<UserEntity>> getAllUsers(){
		return ResponseEntity.ok().body(service.getAllUsers());
	}
	
	@GetMapping("/userEdit")
	public ResponseEntity<UserEntity> userEdit(@RequestParam Integer id){
		return ResponseEntity.ok().body(service.userEdit(id));
	}
	
	@PostMapping("/userUpdate")
	public ResponseEntity<UserEntity> UserUpdate(@ModelAttribute UserEntity entity){
		return ResponseEntity.ok().body(service.UserUpdate(entity));
	}
	
	@PostMapping("/addReview")
	public ResponseEntity<String> addReview(@ModelAttribute ReviewEntity entity){
		System.out.println(entity.toString());
		service.addReview(entity);
		return ResponseEntity.ok().body("Successfully Added");
	}
	
	@GetMapping("/show")
	public ResponseEntity<List<ReviewEntity>> showAllReviews(@RequestParam Integer proid){
		System.out.println(service.showAllReviews(proid));
		return ResponseEntity.ok().body(service.showAllReviews(proid));
	}
	
	@GetMapping("/deleteReview")
	public ResponseEntity<String> deleteReview(@RequestParam Integer productid, @RequestParam Integer reviewid){
		service.deleteReview(productid, reviewid);
		return ResponseEntity.ok().body("Successfully Deleted");
	}
	
	@GetMapping("/getPlacedOrder")
	public ResponseEntity<List<OrderDetails>> getPlacedOrder(@RequestParam Integer userid){
		return ResponseEntity.ok().body(service.getPlacedOrder(userid));
	}
	
	@GetMapping("/cancelOrder")
	public  ResponseEntity<String> cancelOrder(@RequestParam Integer userid,@RequestParam String productname){
		service.cancelOrder(userid, productname);
		return ResponseEntity.ok().body("The Order Has Been Cancelled...");
	}
	
	@GetMapping("/likeProduct")
	public  ResponseEntity<Integer> likeProduct(@RequestParam Integer productid){
		return ResponseEntity.ok().body(service.likeProduct(productid));
	}
	
	@GetMapping("/searchProducts")
	public ResponseEntity<List<ProductEntity>> searchProducts(@RequestParam String query) {
	    return ResponseEntity.ok().body(service.searchProducts(query));
	}

	@GetMapping("/searchemail")
	public ResponseEntity<UserEntity> searchemail(String email, String password){
		return ResponseEntity.ok().body(service.searchemail(email, password));
	}
	
	@GetMapping("getAllCartProductFromUser")
	public ResponseEntity<List<ProductEntity>> getAllCartProductFromUser(@RequestParam int userID){
		return ResponseEntity.ok().body(service.getAllCartProductFromUser(userID));
	}
	
	@GetMapping("checkProductIsInCart")
	public ResponseEntity<Boolean> checkProductIsInCart(@RequestParam int userID, @RequestParam int ProID) {
		return ResponseEntity.ok().body(service.checkProductIsInCart(userID, ProID));
	}
	
	@DeleteMapping("deleteProductFromDB")
	public ResponseEntity<Boolean> deleteProductFromDB(int proID){
		return ResponseEntity.ok().body(service.deleteProductFromDB(proID));
	}
	
	@DeleteMapping("deleteUserFromDB")
	public ResponseEntity<Boolean> deleteUserFromDB(int id){
		return ResponseEntity.ok().body(service.deleteUserFromDB(id));
	}

	@GetMapping("/getUserById")
	public ResponseEntity<UserEntity> getUserById(int id){
		return ResponseEntity.ok().body(service.getUserById(id));
	}
}
