package com.example.forum.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Entity
@IdClass(BoardModeratorId.class)
@Table(name = "board_moderators")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(onlyExplicitlyIncluded = true)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class BoardModerator {

    @ToString.Include(name = "boardId")
    @EqualsAndHashCode.Include
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id", nullable = false)
    private Board board;

    @ToString.Include(name = "userId")
    @EqualsAndHashCode.Include
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Builder.Default
    @Column(name = "can_delete", nullable = false)
    private boolean canDelete = true;

    @Builder.Default
    @Column(name = "can_lock", nullable = false)
    private boolean canLock = true;

    @Builder.Default
    @Column(name = "can_pin", nullable = false)
    private boolean canPin = true;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}