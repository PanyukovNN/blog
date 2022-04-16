package org.reactivetales.blog.util;

import java.time.format.DateTimeFormatter;
import java.util.Locale;

/**
 * Utility method for working with date time.
 */
public class DateTimeUtil {

    public static DateTimeFormatter FRONT_DT_FORMATTER = DateTimeFormatter.ofPattern("dd MMMM yyyy года в HH:mm", new Locale("ru"));
}
