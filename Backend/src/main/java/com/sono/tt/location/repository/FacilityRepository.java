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
    Optional<Facility> findById(@NonNull @NotBlank String latitude, @NonNull @NotBlank String longitude);

    @NonNull
    String save(@NonNull @NotBlank String facilityName,
                @NonNull @NotBlank String latitude,
                @NonNull @NotBlank String longitude,
                @NonNull @NotBlank String IsAvm,
                @NonNull @NotBlank String userId,
                @NonNull @NotBlank String Timestamp,
                @NonNull @NotBlank String AdditionalComment,
                @NonNull @NotBlank String rating,
                @NonNull @NotBlank List<String> comments,
                @NonNull @NotBlank String hasToilet,
                @NonNull @NotBlank String hasDisabled,
                @NonNull @NotBlank String hasBabycare,
                @NonNull @NotBlank String hasMosque
                );

    @NonNull
    String save(@NonNull Facility facility);

    //String save(Facility facility);

}
