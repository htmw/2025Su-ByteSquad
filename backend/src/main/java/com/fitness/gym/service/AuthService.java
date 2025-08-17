package com.fitness.gym.service;

import com.fitness.gym.dto.AuthResponse;
import com.fitness.gym.dto.LoginRequest;
import com.fitness.gym.dto.RegisterRequest;
import com.fitness.gym.dto.ProfileUpdateRequest;
import com.fitness.gym.dto.ChangePasswordRequest;
import com.fitness.gym.model.User;
import com.fitness.gym.repository.UserRepository;
import com.fitness.gym.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    public AuthResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();
        String token = tokenProvider.generateToken(loginRequest.getEmail());
        
        return new AuthResponse(token, user.getEmail(), user.getFirstName(), user.getLastName());
    }

    public AuthResponse register(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email is already taken!");
        }

        User user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setWeight(registerRequest.getWeight());
        user.setHeight(registerRequest.getHeight());
        user.setFitnessGoal(registerRequest.getFitnessGoal());
        user.setRoles(Collections.singleton("ROLE_USER"));

        userRepository.save(user);

        String token = tokenProvider.generateToken(user.getEmail());
        return new AuthResponse(token, user.getEmail(), user.getFirstName(), user.getLastName());
    }

    public User updateProfile(ProfileUpdateRequest profileUpdateRequest, String token) {
        String email = tokenProvider.getEmailFromJWT(token);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update only the fields that are provided
        if (profileUpdateRequest.getFirstName() != null) {
            user.setFirstName(profileUpdateRequest.getFirstName());
        }
        if (profileUpdateRequest.getLastName() != null) {
            user.setLastName(profileUpdateRequest.getLastName());
        }
        if (profileUpdateRequest.getWeight() != null) {
            user.setWeight(profileUpdateRequest.getWeight());
        }
        if (profileUpdateRequest.getHeight() != null) {
            user.setHeight(profileUpdateRequest.getHeight());
        }
        if (profileUpdateRequest.getFitnessGoal() != null) {
            user.setFitnessGoal(profileUpdateRequest.getFitnessGoal());
        }
        if (profileUpdateRequest.getAge() != null) {
            user.setAge(profileUpdateRequest.getAge());
        }
        if (profileUpdateRequest.getProfilePicture() != null) {
            user.setProfilePicture(profileUpdateRequest.getProfilePicture());
        }

        User savedUser = userRepository.save(user);
        
        // Return a clean user object without problematic relationships
        User cleanUser = new User();
        cleanUser.setId(savedUser.getId());
        cleanUser.setEmail(savedUser.getEmail());
        cleanUser.setFirstName(savedUser.getFirstName());
        cleanUser.setLastName(savedUser.getLastName());
        cleanUser.setWeight(savedUser.getWeight());
        cleanUser.setHeight(savedUser.getHeight());
        cleanUser.setFitnessGoal(savedUser.getFitnessGoal());
        cleanUser.setAge(savedUser.getAge());
        cleanUser.setProfilePicture(savedUser.getProfilePicture());
        
        return cleanUser;
    }

    public User getProfile(String token) {
        String email = tokenProvider.getEmailFromJWT(token);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Return a clean user object without problematic relationships
        User cleanUser = new User();
        cleanUser.setId(user.getId());
        cleanUser.setEmail(user.getEmail());
        cleanUser.setFirstName(user.getFirstName());
        cleanUser.setLastName(user.getLastName());
        cleanUser.setWeight(user.getWeight());
        cleanUser.setHeight(user.getHeight());
        cleanUser.setFitnessGoal(user.getFitnessGoal());
        cleanUser.setAge(user.getAge());
        cleanUser.setProfilePicture(user.getProfilePicture());
        
        return cleanUser;
    }

    public void changePassword(ChangePasswordRequest request, String token) {
        String email = tokenProvider.getEmailFromJWT(token);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Verify current password
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        // Update to new password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    public void deleteAccount(String token) {
        String email = tokenProvider.getEmailFromJWT(token);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Delete the user
        userRepository.delete(user);
    }
}
