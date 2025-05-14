package com.example.forum.service;

import com.example.forum.dto.request.UpdateProfileRequest;
import com.example.forum.dto.response.ProfileResponse;
import com.example.forum.model.User;
import com.example.forum.repository.UserRepository;
import com.example.forum.repository.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    private final UserRoleRepository userRoleRepository;

    public ProfileResponse getProfile(String uid) {
        User user = userRepository.findByFirebaseUid(uid)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return mapToProfileResponse(user);
    }

    @Transactional
    public ProfileResponse updateProfile(String uid, UpdateProfileRequest request) {
        User user = userRepository.findByFirebaseUid(uid)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setDisplayName(request.getDisplayName());
        user.setAvatarUrl(request.getAvatarUrl());
        user.setBio(request.getBio());
        user.setLocation(request.getLocation());
        user.setWebsite(request.getWebsite());
        userRepository.save(user);
        return mapToProfileResponse(user);
    }

    private ProfileResponse mapToProfileResponse(User user) {
        return ProfileResponse.builder()
                .displayName(user.getDisplayName())
                .avatarUrl(user.getAvatarUrl())
                .bio(user.getBio())
                .location(user.getLocation())
                .website(user.getWebsite())
                .build();
    }
}
