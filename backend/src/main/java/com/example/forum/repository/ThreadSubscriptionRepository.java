package com.example.forum.repository;

import com.example.forum.model.ThreadSubscription;
import com.example.forum.model.ThreadSubscriptionId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThreadSubscriptionRepository extends JpaRepository<ThreadSubscription, ThreadSubscriptionId> {
}
