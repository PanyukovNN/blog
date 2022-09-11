package org.reactivetales.blog.util;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class Constants {

    public static final String USER_NOT_FOUND_ERROR = "Пользователь не найден.";
    public static final String USER_NOT_ACTIVATED = "Аккаунт \"%s\" не активирован.";
    public static final String USER_ALREADY_EXISTS_BY_NAME = "Пользователь с данным именем уже зарегистрирован";
    public static final String USER_ALREADY_EXISTS_BY_EMAIL = "Пользователь с данным почтовым ящиком уже зарегистрирован";
    public static final String BLANK_USER_NAME_ERROR_MSG = "Имя пользователя не может быть пустым";
    public static final String BLANK_PASSWORD_ERROR_MSG = "Пароль не может быть пустым";
    public static final String WRONG_EMAIL_ERROR_MSG = "Некорректный email";
    public static final String BLANK_EMAIL_ERROR_MSG = "Email не может быть пустым";
    public static final String WRONG_PASSWORD_ERROR_MSG = "Неверный пароль.";
    public static final String PASSWORDS_DO_NOT_MATCH_ERROR_MSG = "Пароли не совпадают";

    public static final String DEFAULT_ARTICLE_PAGE_SIZE = "5";

    public static final String CONFIRM_PASSWORD_KEY = "confirmPassword";
}
