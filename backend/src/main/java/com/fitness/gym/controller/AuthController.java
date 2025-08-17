package com.fitness.gym.controller;

import com.fitness.gym.dto.AuthResponse;
import com.fitness.gym.dto.LoginRequest;
import com.fitness.gym.dto.RegisterRequest;
import com.fitness.gym.dto.ProfileUpdateRequest;
import com.fitness.gym.dto.ChangePasswordRequest;
import com.fitness.gym.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.login(loginRequest));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest registerRequest) {
        return ResponseEntity.ok(authService.register(registerRequest));
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody ProfileUpdateRequest profileUpdateRequest, @RequestHeader("Authorization") String token) {
        try {
            String jwt = token.replace("Bearer ", "");
            return ResponseEntity.ok(authService.updateProfile(profileUpdateRequest, jwt));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update profile: " + e.getMessage());
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader("Authorization") String token) {
        try {
            String jwt = token.replace("Bearer ", "");
            return ResponseEntity.ok(authService.getProfile(jwt));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to get profile: " + e.getMessage());
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request, @RequestHeader("Authorization") String token) {
        try {
            String jwt = token.replace("Bearer ", "");
            authService.changePassword(request, jwt);
            return ResponseEntity.ok("Password changed successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to change password: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete-account")
    public ResponseEntity<?> deleteAccount(@RequestHeader("Authorization") String token) {
        try {
            String jwt = token.replace("Bearer ", "");
            authService.deleteAccount(jwt);
            return ResponseEntity.ok("Account deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to delete account: " + e.getMessage());
        }
    }
}
