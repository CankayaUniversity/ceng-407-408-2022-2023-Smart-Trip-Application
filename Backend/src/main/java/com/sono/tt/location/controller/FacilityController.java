
package com.sono.tt.location.controller;

import com.sono.tt.location.model.Facility;
import com.sono.tt.location.repository.FacilityRepository;
import io.micronaut.core.annotation.NonNull;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.*;
import io.micronaut.http.uri.UriBuilder;
import io.micronaut.scheduling.TaskExecutors;
import io.micronaut.scheduling.annotation.ExecuteOn;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.rules.SecurityRule;
import io.micronaut.http.annotation.Put;
import io.micronaut.http.annotation.PathVariable;

import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Optional;

@ExecuteOn(TaskExecutors.IO)
@Controller("/facility") // <1>
@Secured(SecurityRule.IS_AUTHENTICATED)
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
                                @Body("isAvm") @NonNull String isAvm,
                                @Body("userId") @NonNull String userId,
                                @Body("timestamp") @NonNull String timestamp,
                                @Body("additionalComment") @NonNull String additionalComment,
                                @Body("rating") @NonNull String rating,
                                @Body("comments") @NonNull List<String> comments,
                                @Body("hasToilet") @NonNull String hasToilet,
                                @Body("hasDisabled") @NonNull String hasDisabled,
                                @Body("hasBabycare") @NonNull String hasBabycare,
                                @Body("hasMosque") @NonNull String hasMosque
    ) {
        String id = facilityRepository.save(facilityName,latitude,longitude,isAvm,userId,timestamp,additionalComment,rating,comments,hasToilet,hasDisabled,hasBabycare,hasMosque);
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
            return null;
        }
    }

/*    @Get("/by_geolocation/{latitude}/{longitude}")
    public Optional<Facility> show(@PathVariable @NonNull @NotBlank String latitude, @PathVariable @NonNull @NotBlank String longitude) {
        Optional<Facility> facility = facilityRepository.findById(latitude, longitude);
        if (facility.isPresent()) {
            return facilityRepository.findById(facility.get().getId());
        } else {
            Facility newFacility = new Facility(null, null,latitude, longitude, null, null, null, null,
                    null, null, null, null,  null, null);
            //newFacility.setFacilityName(); // Varsayılan bir tesis adı belirleyin
            return newFacility;
        }
    }*/
    @Put
    public HttpResponse<?> updateFacility(Facility updatedFacility) {
        if (updatedFacility != null) {
            String updatedId = facilityRepository.update(updatedFacility);
            if (updatedId != null) {
                return HttpResponse.ok(updatedId);
            } else {
                return HttpResponse.serverError();
            }
        } else {
            return HttpResponse.notFound();
        }
    }

}

