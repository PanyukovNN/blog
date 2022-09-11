package org.reactivetales.blog.service.mapper;

import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.reactivetales.blog.persistence.dto.UserDto;
import org.reactivetales.blog.persistence.entity.user.Role;
import org.reactivetales.blog.persistence.entity.user.RoleName;
import org.reactivetales.blog.persistence.entity.user.User;

import java.util.List;
import java.util.Map;

/**
 * Дополнительная логика маппера пользователей.
 * Необходим для добавления названий ролей.
 */
@Mapper(componentModel = "spring")
public abstract class UserMapperDecorator {

    private static final Map<RoleName, String> eng2RusRoleName = Map.of(
            RoleName.ROLE_ADMIN, "Администратор",
            RoleName.ROLE_USER, "Пользователь"
    );

    @AfterMapping
    public UserDto setRoles(User user, @MappingTarget UserDto userDto) {
        List<String> rolesRusName = user.getRoles().stream()
                .map(this::getRusName)
                .toList();

        userDto.setRoles(rolesRusName);

        return userDto;
    }

    /**
     * Получить название роли на русском языке.
     * Если значения на русском языке отсутствует - возвращает на английском языке.
     *
     * @param role роль
     * @return наименование роли на русском языке
     */
    public String getRusName(Role role) {
        RoleName roleName = RoleName.valueOf(role.getName());

        return eng2RusRoleName.getOrDefault(roleName, roleName.name());
    }
}