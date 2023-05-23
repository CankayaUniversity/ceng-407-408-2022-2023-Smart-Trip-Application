
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
    public HttpResponse<?> save(@Body @NonNull Facility facility) {
        String id = facilityRepository.save(facility);
        return HttpResponse.created(UriBuilder.of("/facility").path(id).build()); // <2>
    }

    @Get("/{id}")
    public Optional<Facility> show(@PathVariable @NonNull @NotBlank String id) {
        return facilityRepository.findById(id);
    }

}


