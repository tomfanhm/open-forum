package com.example.forum.service;

import com.example.forum.dto.request.LoginRequest;
import com.example.forum.dto.request.RegisterRequest;
import com.example.forum.dto.response.AuthResponse;
import com.example.forum.exception.EmailNotVerifiedException;
import com.example.forum.exception.UserAlreadyExistsException;
import com.example.forum.exception.UserNotFoundException;
import com.example.forum.exception.UserRoleNotFoundException;
import com.example.forum.model.User;
import com.example.forum.model.UserRole;
import com.example.forum.repository.UserRepository;
import com.example.forum.repository.UserRoleRepository;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AuthService {
    // Repositories
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final FirebaseAuth firebaseAuth;

    // Auth operations
    @Transactional
    public void register(RegisterRequest request) throws FirebaseAuthException {
        // Verify the ID token and decode it
        FirebaseToken decoded = firebaseAuth.verifyIdToken(request.getIdToken());
        String uid = decoded.getUid();
        // Check if the user already exists
        if (userRepository.existsByFirebaseUid(uid)) {
            throw new UserAlreadyExistsException("User already exists");
        }
        // Create a new user
        createUser(decoded);
    }

    @Transactional
    public AuthResponse login(LoginRequest request) throws FirebaseAuthException {
        // Verify the ID token and decode it
        FirebaseToken decoded = firebaseAuth.verifyIdToken(request.getIdToken());
        String uid = decoded.getUid();
        // Check if the user exists
        boolean userExists = userRepository.existsByFirebaseUid(uid);
        // If the user does not exist, create a new user immediately
        if (!userExists) {
            createUser(decoded);
        }
        // Check if email is verified
        if (!decoded.isEmailVerified()) {
            throw new EmailNotVerifiedException("Email not verified");
        }
        // Update the last login time
        User user = userRepository.findByFirebaseUid(uid)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        user.setLastLoginAt(Instant.now());
        userRepository.save(user);
        // Create and return the AuthResponse
        AuthResponse authResponse = new AuthResponse();
        authResponse.setEmail(user.getEmail());
        authResponse.setDisplayName(user.getDisplayName());
        authResponse.setAvatarUrl(user.getAvatarUrl());
        authResponse.setRoles(Collections.singletonList(user.getUserRole().getName()));
        return authResponse;
    }

    private void createUser(FirebaseToken decoded) {
        User user = new User();
        user.setFirebaseUid(decoded.getUid());
        user.setEmail(decoded.getEmail());
        user.setDisplayName(decoded.getName());
        user.setAvatarUrl(decoded.getPicture());
        user.setEmailVerified(decoded.isEmailVerified());
        // Set User roles, default to USER
        UserRole userRole = userRoleRepository.findByName("USER")
                .orElseThrow(() -> new UserRoleNotFoundException("User role not found"));
        user.setUserRole(userRole);
        userRepository.save(user);
    }
}
