package org.reactivetales.blog.util;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class Constants {

    public static final String ARTICLE_NOT_FOUND_ERROR = "Article not found";
    public static final String ADMIN_NOT_FOUND_ERROR = "Admin not found";
    public static final String ADMIN_NOT_AUTHENTICATED_ERROR = "Admin not authenticated";
    public static final String BLANK_USER_NAME_ERROR_MSG = "Username can't be null";
    public static final String BLANK_PASSWORD_ERROR_MSG = "Password can't be null";
    public static final String BLANK_OLD_PASSWORD_ERROR_MSG = "Old password can't be null";
    public static final String BLANK_CONFIRM_PASSWORD_ERROR_MSG = "Confirm password can't be null";
    public static final String WRONG_EMAIL_ERROR_MSG = "Wrong email";
    public static final String BLANK_EMAIL_ERROR_MSG = "Email can't be null";
    public static final String WRONG_PASSWORD_ERROR_MSG = "Wrong password";
    public static final String PASSWORDS_DO_NOT_MATCH_ERROR_MSG = "Passwords do not match";
    public static final String OLD_PASSWORD_DOES_NOT_MATCH_USER_PASSWORD = "Old password does not match user password";

    public static final String DEFAULT_ARTICLE_PAGE_SIZE = "5";

    public static final String CONFIRM_PASSWORD_KEY = "confirmPassword";
}
