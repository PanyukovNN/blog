package org.reactivetales.blog.repository;

import org.reactivetales.blog.model.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Репозиторий пользователей.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Находит пользователя по имени (без учета регистра).
     *
     * @param username имя пользователя
     * @return пользователь
     */
    Optional<User> findByUsernameIgnoreCase(String username);

    /**
     * Находит пользователя по почтовому ящику (без учета регистра).
     *
     * @param email почтовый ящик
     * @return пользователь
     */
    Optional<User> findByEmailIgnoreCase(String email);
}
