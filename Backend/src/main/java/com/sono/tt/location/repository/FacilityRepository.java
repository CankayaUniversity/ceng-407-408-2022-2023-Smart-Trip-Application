package com.sono.tt.location.repository;

import com.sono.tt.location.model.Facility;
import io.micronaut.core.annotation.NonNull;
import io.micronaut.core.annotation.Nullable;

import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Optional;

public interface FacilityRepository {
    @NonNull
    List<Facility> findAll();

    @NonNull
    Optional<Facility> findById(@NonNull @NotBlank String id);
    @NonNull
    Optional<Facility> findById(@NonNull @NotBlank String latitude, @NonNull @NotBlank String longitude);

    @NonNull
    String save(@NonNull @NotBlank String facilityName,
                @NonNull @NotBlank String latitude,
                @NonNull @NotBlank String longitude,
                @NonNull @NotBlank String isAvm,
                @NonNull @NotBlank String userId,
                @NonNull @NotBlank String timestamp,
                @NonNull @NotBlank String additionalComment,
                @NonNull @NotBlank String rating,
                @Nullable List<String> comments,
                @NonNull @NotBlank String hasToilet,
                @NonNull @NotBlank String hasDisabled,
                @NonNull @NotBlank String hasBabycare,
                @NonNull @NotBlank String hasMosque
                );

    @NonNull
    String update(Facility facility);

    //void update(Facility facility);

    //String save(Facility facility);

}
