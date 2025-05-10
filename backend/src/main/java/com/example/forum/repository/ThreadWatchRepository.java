package com.example.forum.repository;

import com.example.forum.model.ThreadWatch;
import com.example.forum.model.ThreadWatchId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThreadWatchRepository extends JpaRepository<ThreadWatch, ThreadWatchId> {
}
