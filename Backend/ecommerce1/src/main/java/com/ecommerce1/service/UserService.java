package com.ecommerce1.service;

import java.util.List;

import com.ecommerce1.Entities.OrderDetails;
import com.ecommerce1.Entities.ProductEntity;
import com.ecommerce1.Entities.ReviewEntity;
import com.ecommerce1.Entities.UserEntity;

public interface UserService {
	
	public void addUser(UserEntity userEntity);
	public void addProduct(ProductEntity productEntity);
	public List<ProductEntity> addToCart(Integer userId,Integer productId);
	public List<ProductEntity> removeFromCart(Integer userId,Integer productId);
	public void buyAllFromCart(Integer userId);
	public List<ProductEntity> showAllProducts();
	public ProductEntity getProduct(Integer productId);  //to fetch current product details to update
	public ProductEntity updateProduct(ProductEntity productEntity);
	public List<UserEntity> getAllUsers();
	public UserEntity userEdit(Integer id);
	public UserEntity UserUpdate(UserEntity entity);
	public void addReview(ReviewEntity entity);
	public List<ReviewEntity> showAllReviews(Integer productid);
	public void deleteReview(Integer productid, Integer reviewid);
	public List<OrderDetails> getPlacedOrder(Integer userid);
	public void cancelOrder(Integer userid, String productname);
	public int likeProduct(Integer productid);
	public List<ProductEntity> searchProducts(String query);
	public UserEntity searchemail(String email, String password);
	public List<ProductEntity> getAllCartProductFromUser(int userID);
	public Boolean checkProductIsInCart(int userID, int ProID);
	public Boolean deleteProductFromDB(int priID);
	public Boolean deleteUserFromDB(int id);
	public UserEntity getUserById(int id);
}
