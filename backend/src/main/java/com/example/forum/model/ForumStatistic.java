package com.example.forum.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Entity
@Table(name = "forum_statistics")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(onlyExplicitlyIncluded = true)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ForumStatistic {

    @ToString.Include
    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Builder.Default
    @Column(name = "total_users", nullable = false)
    private Long totalUsers = 0L;

    @Builder.Default
    @Column(name = "total_threads", nullable = false)
    private Long totalThreads = 0L;

    @Builder.Default
    @Column(name = "total_posts", nullable = false)
    private Long totalPosts = 0L;

    @Builder.Default
    @Column(name = "active_users_last_day", nullable = false)
    private Long activeUsersLastDay = 0L;

    @Builder.Default
    @Column(name = "active_users_last_week", nullable = false)
    private Long activeUsersLastWeek = 0L;

    @Builder.Default
    @Column(name = "active_users_last_month", nullable = false)
    private Long activeUsersLastMonth = 0L;

    @CreationTimestamp
    @Column(name = "last_calculated_at", nullable = false, updatable = false)
    private Instant lastCalculatedAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}