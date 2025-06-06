package com.bytesquad.supplementaistore.Model;
import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Data
@Table(name = "User")
public class User {
    @Id
    @GeneratedValue
    @Column(name = "ID")
    private UUID id;
    @Column(name = "Name",nullable = false)
    private String name;
    @Column(name = "Age", nullable = false)
    private int age;
    @Column(name = "Weight", nullable = false)
    private double weight;
    @Column(name = "Height", nullable = false)
    private double Height;
}
