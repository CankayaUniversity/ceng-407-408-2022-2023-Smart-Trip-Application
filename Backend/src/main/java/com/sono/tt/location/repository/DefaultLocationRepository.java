package com.sono.tt.location.repository;

import com.sono.tt.location.DynamoConfiguration;
import com.sono.tt.location.DynamoRepository;
import com.sono.tt.location.IdGenerator;
import com.sono.tt.location.model.Location;
import io.micronaut.core.annotation.NonNull;
import io.micronaut.core.util.CollectionUtils;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Singleton // <1>
public class DefaultLocationRepository extends DynamoRepository<Location> implements LocationRepository {
    private static final Logger LOG = LoggerFactory.getLogger(DefaultLocationRepository.class);
    private static final String ATTRIBUTE_ID = "id";
    private static final String ATTRIBUTE_NAME = "name";
    private static final String ATTRIBUTE_LATITUDE = "latitude";
    private static final String ATTRIBUTE_LONGITUDE = "longitude";
    private static final String ATTRIBUTE_ISAVM = "isAvm";

    private final IdGenerator idGenerator;
    public DefaultLocationRepository(DynamoDbClient dynamoDbClient,
                                     DynamoConfiguration dynamoConfiguration,
                                     IdGenerator idGenerator) {
        super(dynamoDbClient, dynamoConfiguration);
        this.idGenerator = idGenerator;
    }

    @Override
    @NonNull
    public String save(@NonNull @NotBlank String name,
                       @NonNull @NotBlank String latitude,
                       @NonNull @NotBlank String longitude,
                       @NonNull @NotBlank String isAvm) {
        String id = idGenerator.generate();
        save(new Location(id,name,latitude,longitude,isAvm));
        return id;
    }

    protected void save(@NonNull @NotNull @Valid Location location) {
        PutItemResponse itemResponse = dynamoDbClient.putItem(PutItemRequest.builder()
                .tableName(dynamoConfiguration.getTableName())
                .item(item(location))
                .build());
        if (LOG.isDebugEnabled()) {
            LOG.debug(itemResponse.toString());
        }
    }

    @Override
    @NonNull
    public Optional<Location> findById(@NonNull @NotBlank String id) {
        return findById(Location.class, id)
                .map(this::locationOf);
    }


    @Override
    @NonNull
    public List<Location> findAll() {
        List<Location> result = new ArrayList<>();
        String beforeId = null;
        do {
            QueryRequest request = findAllQueryRequest(Location.class, beforeId, null);
            QueryResponse response = dynamoDbClient.query(request);
            if (LOG.isTraceEnabled()) {
                LOG.trace(response.toString());
            }
            result.addAll(parseInResponse(response));
            beforeId = lastEvaluatedId(response, Location.class).orElse(null);
        } while(beforeId != null); // <2>
        return result;
    }

    private List<Location> parseInResponse(QueryResponse response) {
        List<Map<String, AttributeValue>> items = response.items();
        List<Location> result = new ArrayList<>();
        if (CollectionUtils.isNotEmpty(items)) {
            for (Map<String, AttributeValue> item : items) {
                result.add(locationOf(item));
            }
        }
        return result;
    }

    @NonNull
    private Location locationOf(@NonNull Map<String, AttributeValue> item) {
        return new Location(item.get(ATTRIBUTE_ID).s(),
                item.get(ATTRIBUTE_NAME).s(),
                item.get(ATTRIBUTE_LATITUDE).s(),
                item.get(ATTRIBUTE_LONGITUDE).s(),
                item.get(ATTRIBUTE_ISAVM).s()
        );
    }

    @Override
    @NonNull
    protected Map<String, AttributeValue> item(@NonNull Location location) {
        Map<String, AttributeValue> result = super.item(location);
        result.put(ATTRIBUTE_ID, AttributeValue.builder().s(location.getId()).build());
        result.put(ATTRIBUTE_NAME, AttributeValue.builder().s(location.getName()).build());
        result.put(ATTRIBUTE_LATITUDE, AttributeValue.builder().s(location.getLatitude()).build());
        result.put(ATTRIBUTE_LONGITUDE, AttributeValue.builder().s(location.getLongitude()).build());
        result.put(ATTRIBUTE_ISAVM, AttributeValue.builder().s(location.getIsAvm()).build());
        return result;
    }
}
