package com.fitness.gym.model;

import lombok.Data;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "supplements")
public class Supplement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    private String imageUrl;

    @Column(nullable = false)
    private String category;

    private String brand;

    @Column(nullable = false)
    private Integer stockQuantity;

    @Column(name = "usage_instructions")
    private String usageInstructions;

    private String benefits;

    @Column(name = "is_available", nullable = false)
    private Boolean isAvailable = true;
}
