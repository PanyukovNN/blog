package org.reactivetales.blog.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.reactivetales.blog.persistence.dto.UserDto;
import org.reactivetales.blog.persistence.entity.user.User;

@Mapper(componentModel = "spring", uses = UserMapperDecorator.class)
public interface UserMapper {

    @Mapping(target = "creationDate", dateFormat = "dd.MM.yyyy")
    @Mapping(target = "roles", ignore = true)
    UserDto convert(User user);
}
