package com.example.forum.repository;

import com.example.forum.model.ForumStatistic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForumStatisticRepository extends JpaRepository<ForumStatistic, Long> {
}
