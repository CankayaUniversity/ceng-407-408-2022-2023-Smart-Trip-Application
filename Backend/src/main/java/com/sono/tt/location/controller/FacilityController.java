
package com.sono.tt.location.controller;

import com.sono.tt.location.model.Facility;
import com.sono.tt.location.repository.FacilityRepository;
import io.micronaut.core.annotation.NonNull;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.*;
import io.micronaut.http.uri.UriBuilder;
import io.micronaut.scheduling.TaskExecutors;
import io.micronaut.scheduling.annotation.ExecuteOn;

import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Optional;

@ExecuteOn(TaskExecutors.IO)
@Controller("/facility") // <1>
public class FacilityController {
    private final FacilityRepository facilityRepository;

    public FacilityController(FacilityRepository facilityRepository) {
        this.facilityRepository = facilityRepository;
    }

    @Get
    public List<Facility> index() {
        return facilityRepository.findAll();
    }

    @Post
    public HttpResponse<?> save(@Body("facilityName") @NonNull String facilityName,
                                @Body("latitude") @NonNull String latitude,
                                @Body("longitude") @NonNull String longitude,
                                @Body("IsAvm") @NonNull String IsAvm,
                                @Body("userId") @NonNull String userId,
                                @Body("Timestamp") @NonNull String Timestamp,
                                @Body("AdditionalComment") @NonNull String AdditionalComment,
                                @Body("rating") @NonNull String rating,
                                @Body("comments") @NonNull List<String> comments,
                                @Body("hasToilet") @NonNull String hasToilet,
                                @Body("hasDisabled") @NonNull String hasDisabled,
                                @Body("hasBabycare") @NonNull String hasBabycare,
                                @Body("hasMosque") @NonNull String hasMosque
    ) {
        String id = facilityRepository.save(facilityName,latitude,longitude,IsAvm,userId,Timestamp,AdditionalComment,rating,comments,hasToilet,hasDisabled,hasBabycare,hasMosque);
        return HttpResponse.created(UriBuilder.of("/facility").path(id).build());
    }

    @Get("/{id}")
    public Optional<Facility> show(@PathVariable @NonNull @NotBlank String id) {
        return facilityRepository.findById(id);
    }

    @Get("/by_geolocation/{latitude}/{longitude}")
    public Facility show(@PathVariable @NonNull @NotBlank String latitude, @PathVariable @NonNull @NotBlank String longitude) {
        Optional<Facility> facility = facilityRepository.findById(latitude, longitude);
        if (facility.isPresent()) {
            return facility.get();
        } else {
            Facility newFacility = new Facility(null, null,latitude, longitude, null, null, null, null,
                    null, null, null, null,  null, null);
            //newFacility.setFacilityName(); // Varsayılan bir tesis adı belirleyin
            return newFacility;
        }
    }

/*    @Get("/by_geolocation/{latitude}/{longitude}")
    public Optional<Facility> show(@PathVariable @NonNull @NotBlank String latitude, @PathVariable @NonNull @NotBlank String longitude) {
        Optional<Facility> facility = facilityRepository.findById(latitude, longitude);
        if (facility.isPresent()) {
            return facilityRepository.findById(facility.get().getId());
        } else {
            Facility newFacility = new Facility("1", null,latitude, longitude, null, null, null, null,
                    null, null, null, null,  null, null);
            //newFacility.setFacilityName(); // Varsayılan bir tesis adı belirleyin
            return facilityRepository.findById(newFacility.getId());
        }
    }*/
}

