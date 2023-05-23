package com.sono.tt.location.repository;

import com.sono.tt.location.model.Location;
import io.micronaut.core.annotation.NonNull;

import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Optional;

public interface LocationRepository {
    @NonNull
    List<Location> findAll();

    @NonNull
    Optional<Location> findById(@NonNull @NotBlank String id);

    @NonNull
    String save(@NonNull @NotBlank String name,
                @NonNull @NotBlank String latitude,
                @NonNull @NotBlank String longitude,
                @NonNull @NotBlank String isAvm);

    String save(Location location);
}
