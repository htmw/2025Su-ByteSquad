package com.fitness.gym.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "Purchase")
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "User_Id" , foreignKey = @ForeignKey(name = "fk_purchase_user"))
    private User user;

    @ManyToOne
    @JoinColumn(name = "Product_Id" , foreignKey = @ForeignKey(name = "fk_purchase_product"))
    private Product product;

    @Column(name = "Quantity_Purchase")
    private int quantityPurchased;






}
