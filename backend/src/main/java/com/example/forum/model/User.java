package com.example.forum.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(onlyExplicitlyIncluded = true)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class User {

    @ToString.Include
    @EqualsAndHashCode.Include
    @Id
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "firebase_uid", nullable = false, unique = true)
    private String firebaseUid;

    @Column(name = "email", nullable = true)
    private String email;

    @Builder.Default
    @Column(name = "email_verified", nullable = false)
    private boolean emailVerified = false;

    @Column(name = "display_name", nullable = true, length = 50)
    private String displayName;

    @Column(name = "avatar_url", nullable = true)
    private String avatarUrl;

    @Column(name = "bio", columnDefinition = "TEXT", nullable = true)
    private String bio;

    @Column(name = "location", nullable = true)
    private String location;

    @Column(name = "website", nullable = true)
    private String website;

    @Builder.Default
    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;

    @Column(name = "last_login_at", nullable = true)
    private Instant lastLoginAt;

    @Builder.Default
    @Column(name = "reputation_points", nullable = false)
    private Integer reputationPoints = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", nullable = true)
    private UserRole userRole;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}