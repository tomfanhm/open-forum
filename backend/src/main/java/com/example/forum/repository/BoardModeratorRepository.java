package com.example.forum.repository;

import com.example.forum.model.BoardModerator;
import com.example.forum.model.BoardModeratorId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardModeratorRepository extends JpaRepository<BoardModerator, BoardModeratorId> {
}
