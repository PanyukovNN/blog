package org.reactivetales.blog.service;

import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.reactivetales.blog.property.JWTProperties;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * JWT фильтр для обработки токена пользователя 
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtFilter extends GenericFilterBean {
  
    private static final String BEARER = "Bearer ";  
    private static final String AUTHORIZATION = "Authorization";  
  
    private final AppUserDetailService appUserDetailService;  
    private final JWTProperties jwtProperties;
  
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        String token = getTokenFromRequest((HttpServletRequest) servletRequest);
  
        if (token != null && validateToken(token)) {  
            String userLogin = getLoginFromToken(token);  
            UserDetails customUserDetails = appUserDetailService.loadUserByUsername(userLogin);
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
  
        filterChain.doFilter(servletRequest, servletResponse);  
    }  
  
    private String getTokenFromRequest(HttpServletRequest request) {  
        String bearer = request.getHeader(AUTHORIZATION);  
  
        if (StringUtils.isNotBlank(bearer) && bearer.startsWith(BEARER)) {
            return bearer.substring(7);  
        }  
  
        return null;  
    }  
  
    private boolean validateToken(String token) {  
        try {  
            Jwts.parser().setSigningKey(jwtProperties.getSecret()).parseClaimsJws(token);
  
            return true;  
        } catch (ExpiredJwtException expEx) {
            log.error("Token expired");  
        } catch (UnsupportedJwtException unsEx) {
            log.error("Unsupported jwt");  
        } catch (MalformedJwtException mjEx) {
            log.error("Malformed jwt");  
        } catch (SignatureException sEx) {
            log.error("Invalid signature");  
        } catch (Exception e) {  
            log.error("invalid token");  
        }  
  
        return false;  
    }  
  
    private String getLoginFromToken(String token) {  
        Claims claims = Jwts.parser().setSigningKey(jwtProperties.getSecret()).parseClaimsJws(token).getBody();  
  
        return claims.getSubject();  
    }  
}