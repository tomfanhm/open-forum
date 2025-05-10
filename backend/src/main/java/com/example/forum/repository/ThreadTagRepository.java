package com.example.forum.repository;

import com.example.forum.model.ThreadTag;
import com.example.forum.model.ThreadTagId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThreadTagRepository extends JpaRepository<ThreadTag, ThreadTagId> {
}
