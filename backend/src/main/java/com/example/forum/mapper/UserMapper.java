package com.example.forum.mapper;

import com.example.forum.dto.response.ProfileResponse;
import com.example.forum.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public ProfileResponse toProfileResponse(User user) {
        return ProfileResponse.builder()
                .displayName(user.getDisplayName())
                .avatarUrl(user.getAvatarUrl())
                .bio(user.getBio())
                .location(user.getLocation())
                .website(user.getWebsite())
                .build();
    }
}