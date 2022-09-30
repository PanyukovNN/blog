package org.reactivetales.blog.controller.auth;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.reactivetales.blog.model.request.AuthRequest;
import org.reactivetales.blog.model.request.ChangePasswordRequest;
import org.reactivetales.blog.model.response.AuthResponse;
import org.reactivetales.blog.model.response.UserResponse;
import org.reactivetales.blog.model.request.UpdateAdminRequest;
import org.reactivetales.blog.model.response.SignInResponse;
import org.reactivetales.blog.model.entity.user.User;
import org.reactivetales.blog.service.AuthService;
import org.reactivetales.blog.service.mapper.UserMapper;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.TimeZone;

@Tag(name = "auth", description = "Admin auth controller")
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/auth")
public class AdminAuthController {

    private final UserMapper userMapper;
    private final AuthService authService;

    /**
     * Update admin.
     * Only for authenticated admin.
     *
     * @param request update admin request
     * @return created admin dto
     */
    @PostMapping("/update-admin")
    public UserResponse updateAdmin(@RequestBody @Valid UpdateAdminRequest request) {
        User admin = authService.updateAdmin(request);

        return userMapper.convert(admin);
    }

    /**
     * Admin authentication.
     *
     * @param request request dto
     * @param timeZone client time zone
     * @return response with token
     */
    @PostMapping("/sign-in")
    public AuthResponse signIn(@RequestBody @Valid AuthRequest request, TimeZone timeZone) {
        SignInResponse signInResponse = authService.signIn(request, timeZone);

        User user = signInResponse.getUser();

        UserResponse userResponse = userMapper.convert(user);

        return AuthResponse.builder()
                .userResponse(userResponse)
                .accessToken(signInResponse.getJwt())
                .build();
    }

    /**
     * Change admin password.
     *
     * @param request request dto
     * @return success message
     */
    @PostMapping("/change-password")
    public String changePassword(@RequestBody @Valid ChangePasswordRequest request) {
        authService.changePassword(request);

        return "Password successfully changed";
    }
}
