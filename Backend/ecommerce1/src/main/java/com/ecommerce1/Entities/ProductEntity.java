package com.ecommerce1.Entities;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Product_Table")
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Product ID")
    private int id;

    @Column(name = "Product Name")
    private String name;
    
    private int price;
    
    private int discountedprice;
    
    private String author;
    
    private String releaseddate;
    
    private int likes;
    
    private int copiessold;
    
    private String image1;
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ReviewEntity> reviews = new ArrayList<>();

    @Lob
    @Column(name = "Product Description", columnDefinition="TEXT")
    private String description;


	@Column(name = "Product Stock")
    private int stock;
    
    
//    @ManyToMany(mappedBy = "cart")
//    private List<UserEntity> users = new ArrayList<>();

    // Getters and setters...

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public int getDiscountedprice() {
		return discountedprice;
	}

	public void setDiscountedprice(int discountedprice) {
		this.discountedprice = discountedprice;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getReleaseddate() {
		return releaseddate;
	}

	public void setReleaseddate(String releaseddate) {
		this.releaseddate = releaseddate;
	}

	public int getLikes() {
		return likes;
	}

	public void setLikes(int likes) {
		this.likes = likes;
	}

	public int getCopiessold() {
		return copiessold;
	}

	public void setCopiessold(int copiessold) {
		this.copiessold = copiessold;
	}

	public String getImage1() {
		return image1;
	}

	public void setImage1(String image1) {
		this.image1 = image1;
	}

	

	public List<ReviewEntity> getReviews() {
		return reviews;
	}

	public void setReviews(List<ReviewEntity> reviews) {
		this.reviews = reviews;
	}

//	public List<UserEntity> getUsers() {
//		return users;
//	}
//
//	public void setUsers(List<UserEntity> users) {
//		this.users = users;
//	}
}
