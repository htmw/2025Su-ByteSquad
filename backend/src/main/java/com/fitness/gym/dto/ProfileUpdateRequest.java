package com.fitness.gym.dto;

import lombok.Data;

@Data
public class ProfileUpdateRequest {
    private String firstName;
    private String lastName;
    private Double weight;
    private Double height;
    private String fitnessGoal;
    private Integer age;
    private String profilePicture;
}
