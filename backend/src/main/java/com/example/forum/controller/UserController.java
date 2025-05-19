package com.example.forum.controller;

import com.example.forum.dto.request.UpdatePreferenceRequest;
import com.example.forum.dto.request.UpdateProfileRequest;
import com.example.forum.dto.response.ProfileResponse;
import com.example.forum.security.FirebaseUserDetails;
import com.example.forum.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@AuthenticationPrincipal FirebaseUserDetails userDetails) {
        String uid = userDetails.getUid();
        ProfileResponse profileResponse = userService.getProfile(uid);
        return ResponseEntity.ok(profileResponse);
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@AuthenticationPrincipal FirebaseUserDetails userDetails, @Valid @RequestBody UpdateProfileRequest request) {
        String uid = userDetails.getUid();
        ProfileResponse profileResponse = userService.updateProfile(uid, request);
        return ResponseEntity.ok(profileResponse);
    }

    @GetMapping("/preferences")
    public ResponseEntity<?> getUserPreferences(@AuthenticationPrincipal FirebaseUserDetails userDetails) {
        String uid = userDetails.getUid();
        return ResponseEntity.ok(userService.getUserPreferences(uid));
    }

    @PutMapping("/preferences")
    public ResponseEntity<?> updateUserPreferences(@AuthenticationPrincipal FirebaseUserDetails userDetails, @Valid @RequestBody UpdatePreferenceRequest request) {
        String uid = userDetails.getUid();
        return ResponseEntity.ok(userService.updateUserPreferences(uid, request));
    }
}
