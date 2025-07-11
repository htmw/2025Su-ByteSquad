package com.fitness.gym.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private Double weight;
    private Double height;
    private String fitnessGoal;
}
