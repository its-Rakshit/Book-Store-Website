package com.ecommerce1.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce1.Dao.UserDao;
import com.ecommerce1.Entities.OrderDetails;
import com.ecommerce1.Entities.ProductEntity;
import com.ecommerce1.Entities.ReviewEntity;
import com.ecommerce1.Entities.UserEntity;


@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserDao dao;
	@Override
	public void addUser(UserEntity userEntity) {
		dao.saveUser(userEntity);
	}
	@Override
	public void addProduct(ProductEntity productEntity) {
		dao.saveProduct(productEntity);
		
	}
	@Override
	public List<ProductEntity> addToCart(Integer userId, Integer productId) {
		return dao.saveToCart(userId, productId);
		
	}
	@Override
	public List<ProductEntity> removeFromCart(Integer userId, Integer productId) {
		return dao.removeFromCart(userId, productId);
	}
	@Override
	public void buyAllFromCart(Integer userId) {
		dao.buyAllFromCart(userId);
		
	}
	@Override
	public List<ProductEntity> showAllProducts() {
		return dao.showAllProducts();
	}
	@Override
	public ProductEntity getProduct(Integer productId) {
		return dao.getProduct(productId);
	}
	@Override
	public ProductEntity updateProduct(ProductEntity productEntity) {
		return dao.updateProduct(productEntity);
	}
	@Override
	public List<UserEntity> getAllUsers() {
		return dao.getAllUsers();
	}
	@Override
	public UserEntity userEdit(Integer id) {
		return dao.userEdit(id);
	}
	@Override
	public UserEntity UserUpdate(UserEntity entity) {
		return dao.UserUpdate(entity);
	}
	@Override
	public void addReview(ReviewEntity entity) {
		dao.addReview(entity);
		
	}
	@Override
	public List<ReviewEntity> showAllReviews(Integer productid) {
		return dao.showAllReviews(productid);
	}
	@Override
	public void deleteReview(Integer productid, Integer reviewid) {
		dao.deleteReview(productid, reviewid);
	}
	@Override
	public List<OrderDetails> getPlacedOrder(Integer userid) {
		return dao.getPlacedOrder(userid);
	}
	@Override
	public void cancelOrder(Integer userid, String productname) {
		dao.cancelOrder(userid, productname);
		
	}
	@Override
	public int likeProduct(Integer productid) {
		return dao.likeProduct(productid);
	}
	@Override
	public List<ProductEntity> searchProducts(String query) {
	
		return dao.searchProducts(query);
	}
	@Override
	public UserEntity searchemail(String email, String password) {
		return dao.searchemail(email, password);
	}
	@Override
	public List<ProductEntity> getAllCartProductFromUser(int userID) {
		return dao.getAllCartProductFromUser(userID);
	}
	@Override
	public Boolean checkProductIsInCart(int userID, int ProID) {
		return dao.checkProductIsInCart(userID, ProID);
	}
	@Override
	public Boolean deleteProductFromDB(int priID) {
		return dao.deleteProductFromDB(priID);
	}
	@Override
	public Boolean deleteUserFromDB(int id) {
		return dao.deleteUserFromDB(id);
	}
	@Override
	public UserEntity getUserById(int id) {
		
		return dao.getUserById(id);
	}

}
