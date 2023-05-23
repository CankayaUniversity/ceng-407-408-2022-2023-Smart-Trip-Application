package com.sono.tt.location.repository;

import com.sono.tt.location.model.Facility;
import com.sono.tt.location.model.Location;
import com.sono.tt.location.model.User;
import io.micronaut.core.annotation.NonNull;

import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Optional;

public interface FacilityRepository {
    @NonNull
    List<Facility> findAll();

    @NonNull
    Optional<Facility> findById(@NonNull @NotBlank String id);

    @NonNull
    String save(@NonNull @NotBlank Location location,
                @NonNull @NotBlank User user,
                @NonNull @NotBlank String Timestamp,
                @NonNull @NotBlank String Note,
                @NonNull @NotBlank String AdditionalComment);

    String save(Facility facility);
}
