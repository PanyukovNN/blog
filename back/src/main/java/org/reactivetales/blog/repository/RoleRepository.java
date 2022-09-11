package org.reactivetales.blog.repository;

import org.reactivetales.blog.persistence.entity.user.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Репозиторий ролей.
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}
