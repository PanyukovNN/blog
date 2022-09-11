package org.reactivetales.blog.service;

import lombok.RequiredArgsConstructor;
import org.reactivetales.blog.persistence.entity.user.Role;
import org.reactivetales.blog.persistence.entity.user.RoleName;
import org.reactivetales.blog.repository.RoleRepository;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

/**
 * Сервис ролей.
 */
@Service
@RequiredArgsConstructor
public class RoleService {

    private static final Map<RoleName, Role> roleCache = new EnumMap<>(RoleName.class);


    private final RoleRepository roleRepository;

    /**
     * Загружаем роли в кэш.
     */
    @PostConstruct
    private void postConstruct() {
        List<Role> allRoles = roleRepository.findAll();

        allRoles.forEach(role -> roleCache.put(RoleName.valueOf(role.getName()), role));
    }

    /**
     * Возвращает сущность роли по её наименовании.
     *
     * @param roleName наименование роли
     * @return сущность роли
     */
    public Role findByRoleName(RoleName roleName) {
        return roleCache.get(roleName);
    }
}
