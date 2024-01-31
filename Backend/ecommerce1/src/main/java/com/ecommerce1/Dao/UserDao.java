package com.ecommerce1.Dao;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ecommerce1.Entities.OrderDetails;
import com.ecommerce1.Entities.ProductEntity;
import com.ecommerce1.Entities.ReviewEntity;
import com.ecommerce1.Entities.UserEntity;
import com.ecommerce1.exceptionPackage.ProductNotFoundException;
import com.ecommerce1.repository.OrderDetailsRepository;
import com.ecommerce1.repository.ProductRepository;
import com.ecommerce1.repository.ReviewRepository;
import com.ecommerce1.repository.UserRepository;

import ch.qos.logback.core.spi.ErrorCodes;

@Repository
public class UserDao {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private ReviewRepository reviewRepository;

	@Autowired
	OrderDetailsRepository orderDetailsRepository;

	// Saving the User
	public void saveUser(UserEntity userEntity) {
		userRepository.save(userEntity);
	}

	// Saving the Product
	public void saveProduct(ProductEntity productEntity) {
		productRepository.save(productEntity);
	}

	// Add a product to the user's cart
	public List<ProductEntity> saveToCart(Integer userId, Integer productId) {
		Optional<UserEntity> dbUserEntity = userRepository.findById(userId);
		Optional<ProductEntity> dbProductEntity = productRepository.findById(productId);

		if (dbUserEntity.isPresent() && dbProductEntity.isPresent()) {
			UserEntity userEntity = dbUserEntity.get();
			ProductEntity productEntity = dbProductEntity.get();

			userEntity.getCart().add(productEntity);

			userRepository.save(userEntity);

			return userEntity.getCart();
		} else {
			System.out.println("Error: User or Product not found!");
			return null;
		}
	}

	public List<ProductEntity> removeFromCart(Integer userId, Integer productId) {
		Optional<UserEntity> dbUserEntity = userRepository.findById(userId);
		Optional<ProductEntity> dbProductEntity = productRepository.findById(productId);

		if (dbUserEntity.isPresent() && dbProductEntity.isPresent()) {
			UserEntity userEntity = dbUserEntity.get();
			ProductEntity productEntity = dbProductEntity.get();

			System.out.println(userEntity.getCart().remove(productEntity));

			userRepository.save(userEntity);
			return userEntity.getCart();
		} else {
			System.out.println("Error: User or Product not found!");
			return null;
		}

	}

	// Buy all items from the user's cart
	public void buyAllFromCart(Integer userId) {
		Optional<UserEntity> dbUserEntity = userRepository.findById(userId);

		if (dbUserEntity.isPresent()) {
			UserEntity userEntity = dbUserEntity.get();
			List<ProductEntity> cartItems = userEntity.getCart();

			// Reduce quantity by 1 for each product in the cart
			for (ProductEntity productEntity : cartItems) {
				int currentQuantity = productEntity.getStock();
				if (currentQuantity > 0) {
					productEntity.setStock(currentQuantity - 1);
					productEntity.setCopiessold(productEntity.getCopiessold() + 1);
					OrderDetails orderEntity = new OrderDetails();
					orderEntity.setUserid(userId);
					orderEntity.setPname(productEntity.getName());
					orderEntity.setImg(productEntity.getImage1());
					LocalDate currentDate = LocalDate.now();
					LocalDate futureDate = currentDate.plusDays(5);
					DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
					String formattedCurrentDate = currentDate.format(formatter);
					String formattedFutureDate = futureDate.format(formatter);
					orderEntity.setOrderdate(formattedCurrentDate);
					orderEntity.setDeliverydate(formattedFutureDate);
					orderEntity.setStatus("Booked");
					orderEntity.setProid(productEntity.getId());
					orderDetailsRepository.save(orderEntity);
					
				} else {
					System.out.println("Error: Product quantity cannot be negative.");
				}
			}

			cartItems.clear();

			userRepository.save(userEntity);
			productRepository.saveAll(cartItems);
		} else {
			System.out.println("Error: User not found!");
		}

	}

	// Show all Products
	public List<ProductEntity> showAllProducts() {
		List<ProductEntity> allProductdb = productRepository.findAll();

		if (!allProductdb.isEmpty()) {
			return allProductdb;
		} else {
			return null;
		}

	}

	// Get Product
	public ProductEntity getProduct(Integer productId) {
		Optional<ProductEntity> dbProduct = productRepository.findById(productId);

		if (dbProduct.isPresent()) {
			ProductEntity product = dbProduct.get();
			return product;
		} else {
			return null;
		}
	}

	// Update Product
	public ProductEntity updateProduct(ProductEntity productEntityToUpdate) {
		Optional<ProductEntity> dbProduct = productRepository.findById(productEntityToUpdate.getId());

		if (dbProduct.isPresent()) {
			ProductEntity product = dbProduct.get();
			product.setName(productEntityToUpdate.getName());
			product.setDescription(productEntityToUpdate.getDescription());
			product.setStock(productEntityToUpdate.getStock());
			product.setAuthor(productEntityToUpdate.getAuthor());
			product.setCopiessold(productEntityToUpdate.getCopiessold());
			product.setDiscountedprice(productEntityToUpdate.getDiscountedprice());
			product.setPrice(productEntityToUpdate.getPrice());
			product.setReleaseddate(productEntityToUpdate.getReleaseddate());
			product.setLikes(productEntityToUpdate.getLikes());
			product.setImage1(productEntityToUpdate.getImage1());

			productRepository.save(product);

			return product;
		} else {
			return null;
		}
	}

	// Get All Users
	public List<UserEntity> getAllUsers() {
		List<UserEntity> dbUsers = userRepository.findAll();

		if (!dbUsers.isEmpty()) {
			System.out.println("Sending");
			return dbUsers;
		} else {
			System.out.println("NULL");
			return null;
		}
	}

	// Get Specific User
	public UserEntity userEdit(Integer id) {
		Optional<UserEntity> dbUser = userRepository.findById(id);

		if (dbUser.isPresent()) {
			UserEntity user = dbUser.get();
			return user;
		} else {
			return null;
		}
	}

	// Update User
	public UserEntity UserUpdate(UserEntity entity) {
		Optional<UserEntity> dbUser = userRepository.findById(entity.getUserid());
		System.out.println(entity.getUserid());
		if (dbUser.isPresent()) {
			UserEntity user = dbUser.get();

			user.setName(entity.getName());
			user.setEmail(entity.getEmail());
			user.setAddress(entity.getAddress());
			user.setPhone_no(entity.getPhone_no());
			System.err.println("Updated");

			userRepository.save(user);
			return user;
		} else {
			return null;
		}
	}

	// Adding Review
	public void addReview(ReviewEntity entity) {
		Optional<ProductEntity> dbProduct = productRepository.findById(entity.getProductid());
		if (dbProduct.isPresent()) {
			ProductEntity product = dbProduct.get();

			entity.setProduct(product);

			reviewRepository.save(entity);

			product.getReviews().add(entity);
			System.out.println(product.getReviews());
			productRepository.save(product);

		}
	}

	// Get all Review
	public List<ReviewEntity> showAllReviews(Integer productid) {
		Optional<ProductEntity> dbProduct = productRepository.findById(productid);
		if (dbProduct.isPresent()) {
			ProductEntity product = dbProduct.get();
			return product.getReviews();
		} else {
			throw new ProductNotFoundException("Product with id " + productid + " not found");
		}
	}

	// Delete Review
	public void deleteReview(Integer productid, Integer reviewid) {
		Optional<ProductEntity> dbProduct = productRepository.findById(productid);
		if (dbProduct.isPresent()) {
			ProductEntity product = dbProduct.get();
			List<ReviewEntity> reviews = product.getReviews();
			ReviewEntity reviewToDelete = null;
			for (ReviewEntity review : reviews) {
				if (review.getId() == reviewid) {
					reviewToDelete = review;
					break;
				}
			}
			if (reviewToDelete != null) {
				reviews.remove(reviewToDelete);
				reviewRepository.delete(reviewToDelete);
			}
		} else {
			throw new ProductNotFoundException("Product with id " + productid + " not found");
		}
	}

	// get all placed orders of user
	public List<OrderDetails> getPlacedOrder(Integer userid){
		List<OrderDetails> orders = orderDetailsRepository.findByuserid(userid);
		if(!orders.isEmpty()) {
			return orders;
		}else {
			return null;
		}
	}
	
	// Cancel Order
	public void cancelOrder(Integer userid, String productname) {
		List<OrderDetails> orders = orderDetailsRepository.findByuserid(userid);
		if(!orders.isEmpty()) {
			for(OrderDetails entity : orders) {
				if(entity.getPname().equals(productname)) {
					entity.setStatus("Cancelled");
					entity.setDeliverydate("Not Delivering");
					orderDetailsRepository.save(entity);
					
				}
			}
		}
	}
	
	// Like Product
	public int likeProduct(Integer productid) {
		Optional<ProductEntity> dbproduct = productRepository.findById(productid);
		
		if(dbproduct.isPresent()) {
			ProductEntity product = dbproduct.get();
			int currentlikes = product.getLikes();
			product.setLikes(currentlikes + 1);
			productRepository.save(product);
			return product.getLikes();
		}else {
			return 0;
		}
	}
	
	// Search Products
	public List<ProductEntity> searchProducts(String query) {
	    List<ProductEntity> allProducts = productRepository.findAll();
	    List<ProductEntity> matchingProducts = new ArrayList<>();

	    for (ProductEntity product : allProducts) {
	        if (product.getName().toLowerCase().contains(query.toLowerCase())) {
	            matchingProducts.add(product);
	        }
	    }

	    return matchingProducts;
	}
	
	// Login
	public UserEntity searchemail(String email, String password) {
		UserEntity userdb = userRepository.findByEmail(email);
		if(userdb != null && userdb.getPassword().equals(password)) {
			System.out.println(userdb.getPassword());
			return userdb;
		}else {
			System.out.println("Null");
			System.out.println(userdb.getPassword());
			return null;
		}
		
		
	}
	
	// get all cart product from user
	public List<ProductEntity> getAllCartProductFromUser(int userID){
		Optional<UserEntity> userdb = userRepository.findById(userID);
		
		if(userdb.isPresent()) {
			UserEntity user = userdb.get();
			return user.getCart();
		}else {
			return null;
		}
	}
	
	// Check Product is in Cart
	public Boolean checkProductIsInCart(int userID, int ProID) {
		Optional<UserEntity> userdb = userRepository.findById(userID);
		Optional<ProductEntity> prodb = productRepository.findById(ProID);
		
		if(userdb.isPresent()) {
			UserEntity user = userdb.get();
			return user.getCart().contains(prodb.get());
		}else {
			return false;
		}
	}
	
	//Delete Product
	public Boolean deleteProductFromDB(int priID) {
		productRepository.deleteById(priID);
		return true;
	}
	
	
	//Delete User From DB
	public Boolean deleteUserFromDB(int id) {
		userRepository.deleteById(id);
		return true;
	}
	
	//Get user by ID
	public UserEntity getUserById(int id) {
		Optional<UserEntity> userdb = userRepository.findById(id);
		
		if(userdb.isPresent()) {
			return userdb.get();
		}else {
			return null;
		}
	}


}