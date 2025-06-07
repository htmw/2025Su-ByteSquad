package com.bytesquad.supplementaistore.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Entity
@Data
@Table(name = "Product")
public class Product {
    @Id
    @GeneratedValue
    @Column(name = "Id")
    private UUID id;
    @Column(name = "ProductId")
    private String productId;
    @Column(name = "Name",nullable = false)
    private String name;
    @Column(name = "Quantity", nullable = false)
    private int quantity;
    @Column(name = "Price", nullable = false)
    private double price;
    @OneToMany(mappedBy = "product")
    private List<Purchase> purchases;

}
