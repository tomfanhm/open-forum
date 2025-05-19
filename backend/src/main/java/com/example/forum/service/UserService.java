package com.example.forum.service;

import com.example.forum.dto.request.UpdatePreferenceRequest;
import com.example.forum.dto.request.UpdateProfileRequest;
import com.example.forum.dto.response.PreferenceResponse;
import com.example.forum.dto.response.ProfileResponse;
import com.example.forum.exception.UserNotFoundException;
import com.example.forum.exception.UserPreferenceNotFoundException;
import com.example.forum.mapper.UserMapper;
import com.example.forum.model.User;
import com.example.forum.model.UserPreference;
import com.example.forum.repository.UserPreferenceRepository;
import com.example.forum.repository.UserRepository;
import com.example.forum.repository.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    // Repositories
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final UserPreferenceRepository userPreferenceRepository;
    // Mapper
    private final UserMapper userMapper;

    // Basic CRUD operations
    public User getUserById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    public User getUserByFirebaseUid(String firebaseUid) {
        return userRepository.findByFirebaseUid(firebaseUid)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    // Profile operations
    @Transactional(readOnly = true)
    public ProfileResponse getProfile(String uid) {
        User user = getUserByFirebaseUid(uid);
        return userMapper.toProfileResponse(user);
    }

    @Transactional
    public ProfileResponse updateProfile(String uid, UpdateProfileRequest request) {
        User user = getUserByFirebaseUid(uid);
        user.setDisplayName(request.getDisplayName());
        user.setAvatarUrl(request.getAvatarUrl());
        user.setBio(request.getBio());
        user.setLocation(request.getLocation());
        user.setWebsite(request.getWebsite());
        userRepository.save(user);
        return userMapper.toProfileResponse(user);
    }

    // Preference operations
    @Transactional(readOnly = true)
    public PreferenceResponse getUserPreferences(String uid) {
        User user = getUserByFirebaseUid(uid);
        UserPreference pref = userPreferenceRepository.findById(user.getId())
                .orElseThrow(() -> new UserPreferenceNotFoundException("User preferences not found"));
        return PreferenceResponse.builder()
                .darkMode(pref.isDarkMode())
                .notificationEmails(pref.isNotificationEmails())
                .showAvatars(pref.isShowAvatars())
                .build();
    }

    @Transactional
    public PreferenceResponse updateUserPreferences(String uid, UpdatePreferenceRequest request) {
        User user = getUserByFirebaseUid(uid);
        UserPreference pref = userPreferenceRepository.findById(user.getId())
                .orElseThrow(() -> new UserPreferenceNotFoundException("User preferences not found"));
        // Update the preferences based on the request
        if (request.getDarkMode() != null) {
            pref.setDarkMode(request.getDarkMode());
        }
        if (request.getNotificationEmails() != null) {
            pref.setNotificationEmails(request.getNotificationEmails());
        }
        if (request.getShowAvatars() != null) {
            pref.setShowAvatars(request.getShowAvatars());
        }
        userPreferenceRepository.save(pref);
        return PreferenceResponse.builder()
                .darkMode(pref.isDarkMode())
                .notificationEmails(pref.isNotificationEmails())
                .showAvatars(pref.isShowAvatars())
                .build();
    }
}
