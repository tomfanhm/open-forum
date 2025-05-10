package com.example.forum.repository;

import com.example.forum.model.ThreadUserAlias;
import com.example.forum.model.ThreadUserAliasId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThreadUserAliasRepository extends JpaRepository<ThreadUserAlias, ThreadUserAliasId> {
}
