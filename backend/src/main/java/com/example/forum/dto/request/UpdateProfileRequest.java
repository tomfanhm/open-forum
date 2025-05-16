package com.example.forum.dto.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.URL;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateProfileRequest {
    @Size(max = 255, message = "Display name must be at most 255 characters")
    private String displayName;

    @URL(message = "Avatar URL must be a valid URL")
    @Size(max = 2048, message = "Avatar URL is too long")
    private String avatarUrl;

    @Size(max = 3000, message = "Bio must be at most 3000 characters")
    private String bio;

    @Size(max = 255, message = "Location must be at most 255 characters")
    private String location;

    @URL(message = "Website URL must be a valid URL")
    @Size(max = 2048, message = "Website URL is too long")
    private String website;
}
