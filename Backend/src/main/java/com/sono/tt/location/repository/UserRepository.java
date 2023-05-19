package com.sono.tt.location.repository;

import com.sono.tt.location.model.User;
import io.micronaut.core.annotation.NonNull;

import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Optional;

public interface UserRepository {
    @NonNull
    List<User> findAll();

    @NonNull
    Optional<User> findById(@NonNull @NotBlank String id);

    void delete(@NonNull @NotBlank String id);

    @NonNull
    String save(@NonNull @NotBlank String username,
                @NonNull @NotBlank String mail,
                @NonNull @NotBlank String password);
}