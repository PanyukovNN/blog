package org.reactivetales.blog.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.reactivetales.blog.model.entity.user.User;
import org.reactivetales.blog.model.response.UserResponse;

@Mapper(componentModel = "spring", uses = UserMapperDecorator.class)
public interface UserMapper {

    @Mapping(target = "roles", ignore = true)
    UserResponse convert(User user);
}
