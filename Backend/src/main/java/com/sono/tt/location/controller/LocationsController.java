package com.sono.tt.location.controller;

import com.sono.tt.location.model.Location;
import com.sono.tt.location.repository.LocationRepository;
import io.micronaut.core.annotation.NonNull;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.*;
import io.micronaut.http.uri.UriBuilder;
import io.micronaut.scheduling.TaskExecutors;
import io.micronaut.scheduling.annotation.ExecuteOn;

import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Optional;

@ExecuteOn(TaskExecutors.IO) // <1>
@Controller("/location") // <2>
public class LocationsController {
    private final LocationRepository locationRepository;

    public LocationsController(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    @Get
    public List<Location> index() {
        return locationRepository.findAll();
    }

    @Post
    public HttpResponse<?> save(@Body("name")  @NonNull String name,
                                @Body("latitude")  @NonNull String latitude,
                                @Body("longitude")  @NonNull String longitude,
                                @Body("isAvm")  @NonNull String isAvm
                                ) {
        String id = locationRepository.save(name,latitude,longitude,isAvm);
        return HttpResponse.created(UriBuilder.of("/location").path(id).build());
    }

    @Get("/{id}")
    public Optional<Location> show(@PathVariable @NonNull @NotBlank String id) {
        return locationRepository.findById(id);
    }

}
