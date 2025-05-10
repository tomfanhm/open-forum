package com.example.forum.repository;

import com.example.forum.model.ThreadView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ThreadViewRepository extends JpaRepository<ThreadView, UUID> {
}
